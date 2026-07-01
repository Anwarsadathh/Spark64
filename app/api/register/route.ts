import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const WEBHOOK_URL  = process.env.GOOGLE_SHEET_WEBHOOK;
const SMTP_HOST    = process.env.SMTP_HOST    || "smtp.gmail.com";
const SMTP_PORT    = parseInt(process.env.SMTP_PORT || "465", 10);
const SMTP_USER    = process.env.SMTP_USER;
const SMTP_PASS    = process.env.SMTP_PASS;
const ADMIN_EMAIL  = process.env.ADMIN_EMAIL  || "ravenrows@gmail.com";

function getTransporter() {
  if (!SMTP_USER || !SMTP_PASS) throw new Error("SMTP credentials are missing");
  return nodemailer.createTransport({
    host:   SMTP_HOST,
    port:   SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth:   { user: SMTP_USER, pass: SMTP_PASS },
  });
}

function jsonError(message: string, status = 500) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

export async function POST(req: NextRequest) {
  try {
    if (!WEBHOOK_URL) {
      console.error("[register] Missing env: GOOGLE_SHEET_WEBHOOK");
      return jsonError("Server configuration error.", 500);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body: any = await req.json();
    console.log("[register] Incoming step:", body?._step || "init");

    // Honeypot
    if (body.company) {
      console.log("[register] Honeypot triggered");
      return NextResponse.json({ ok: true });
    }

    /* ── UTR confirmation step ── */
    if (body._step === "utr") {
      const { utr, rowId, playerName, email, category, phone } = body;

      const utrClean = (utr || "").toString().trim().toUpperCase();
      if (!utrClean || !/^[A-Z0-9]{10,22}$/.test(utrClean)) {
        console.warn("[register][utr] Invalid UTR:", utrClean);
        return jsonError("Invalid UTR number. Please enter a valid 10–22 character UTR / UPI reference.", 400);
      }

      // Guard: refuse if UTR is empty (belt-and-suspenders beyond client validation)
      if (!utrClean.trim()) {
        return jsonError("UTR is required before confirming registration.", 400);
      }

      let updateRes: Response;
      try {
        updateRes = await fetch(WEBHOOK_URL, {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify({ _action: "updateUTR", rowId, utr: utrClean, paymentStatus: "confirmed" }),
        });
      } catch (fetchErr) {
        console.error("[register][utr] Webhook fetch failed:", fetchErr);
        return jsonError("Could not reach sheet webhook.", 500);
      }

      const updateText = await updateRes.text();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let updateJson: any = {};
      try {
        updateJson = JSON.parse(updateText);
      } catch {
        console.error("[register][utr] Non-JSON webhook response");
        return jsonError("Invalid response from sheet webhook.", 500);
      }

      if (!updateRes.ok || !updateJson.ok) {
        console.error("[register][utr] Sheet update failed:", updateJson);
        return jsonError("Could not update payment status. Please contact support.", 500);
      }

      try {
        const transporter = getTransporter();
        await transporter.sendMail({
          from:    `"Spark64 Registration System" <${SMTP_USER}>`,
          to:      ADMIN_EMAIL,
          subject: `✅ Registration Confirmed — ${playerName} (${category})`,
          html:    adminNotificationEmail({ ...body, utr: utrClean, paymentStatus: "confirmed" }),
        });
        console.log("[register][utr] Admin confirmation mail sent");
      } catch (mailErr) {
        // Non-fatal: sheet is updated, just log
        console.error("[register][utr] Admin mail failed:", mailErr);
      }

      return NextResponse.json({ ok: true, message: "Registration confirmed!" });
    }

    /* ── Initial registration step ── */
    const required = [
      "playerName", "dob", "gender", "schoolName", "category",
      "parentName", "phone", "email", "city", "state", "pincode",
    ];

    for (const field of required) {
      if (!body[field]?.toString().trim()) {
        console.warn("[register][init] Missing field:", field);
        return jsonError(`${field} is required.`, 400);
      }
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return jsonError("Please enter a valid email address.", 400);
    }

    const phoneDigits = String(body.phone).replace(/\D/g, "");
    if (phoneDigits.length < 10) {
      return jsonError("Please enter a valid 10-digit mobile number.", 400);
    }

    const submittedAt = new Date().toISOString();
    const payload = {
      ...body,
      paymentStatus: "pending",
      utr:           "",
      submittedAt,
      _action:       "newRegistration",
    };

    let sheetRes: Response;
    try {
      sheetRes = await fetch(WEBHOOK_URL, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(payload),
      });
    } catch (fetchErr) {
      console.error("[register][init] Webhook fetch failed:", fetchErr);
      return jsonError("Could not reach sheet webhook.", 500);
    }

    const sheetText = await sheetRes.text();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let sheetJson: any = {};
    try {
      sheetJson = JSON.parse(sheetText);
    } catch {
      console.error("[register][init] Non-JSON webhook response");
      return jsonError("Invalid response from sheet webhook.", 500);
    }

    if (!sheetRes.ok || !sheetJson.ok) {
      console.error("[register][init] Sheet save failed:", sheetJson);
      return jsonError("Could not save registration. Please try again.", 500);
    }

    try {
      const transporter = getTransporter();
      await transporter.sendMail({
        from:    `"Spark64 Registration System" <${SMTP_USER}>`,
        to:      ADMIN_EMAIL,
        subject: `🕐 New Registration Pending — ${body.playerName} (${body.category})`,
        html:    adminNotificationEmail({ ...body, utr: "", paymentStatus: "pending", submittedAt }),
      });
      console.log("[register][init] Admin pending mail sent");
    } catch (mailErr) {
      // Non-fatal
      console.warn("[register][init] Admin notify failed:", mailErr);
    }

    return NextResponse.json({
      ok:      true,
      rowId:   sheetJson.rowId || sheetJson.id || "",
      message: "Registration saved. Please complete payment.",
    });

  } catch (err) {
    console.error("[register] Fatal error:", err);
    return jsonError("Registration failed. Please try again.", 500);
  }
}

/* ── Email template ── */
function adminNotificationEmail(data: Record<string, string>): string {
  const fields: [string, string][] = [
    ["Player Name",    data.playerName],
    ["DOB",            data.dob],
    ["Gender",         data.gender],
    ["School",         data.schoolName],
    ["Category",       data.category],
    ["Parent/Guardian",data.parentName],
    ["Phone",          data.phone],
    ["Email",          data.email],
    ["City",           data.city],
    ["State",          data.state],
    ["Pincode",        data.pincode],
    ["FIDE ID",        data.fideId       || "—"],
    ["FIDE Rating",    data.fideRating    || "—"],
    ["Prev. Medals",   data.previousMedals|| "—"],
    ["UTR / Ref",      data.utr          || "—"],
    ["Payment Status", data.paymentStatus || "—"],
    ["Submitted At",   data.submittedAt  || new Date().toISOString()],
  ];

  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f4eedf;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4eedf;padding:32px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:560px;background:#1F3D2E;border-radius:20px;overflow:hidden;">
        <tr><td style="padding:24px 28px;border-bottom:1px solid rgba(244,238,223,0.10);">
          <p style="margin:0;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#C9A227;font-family:monospace;">
            Spark64 Admin Alert
          </p>
          <h2 style="margin:8px 0 0;font-size:22px;color:#F4EEDF;">
            ${data.paymentStatus === "confirmed" ? "✅" : "🕐"} ${data.playerName} — ${data.paymentStatus === "confirmed" ? "Confirmed" : "Pending"}
          </h2>
        </td></tr>
        <tr><td style="padding:24px 28px;">
          <table width="100%" cellpadding="0" cellspacing="0"
            style="background:rgba(244,238,223,0.05);border:1px solid rgba(244,238,223,0.10);border-radius:12px;">
            <tr><td style="padding:16px 20px;">
              ${fields.map(([k, v]) => detailRow(k, v)).join("")}
            </td></tr>
          </table>
        </td></tr>
        <tr><td style="padding:16px 28px;border-top:1px solid rgba(244,238,223,0.08);text-align:center;">
          <p style="margin:0;font-size:10px;color:rgba(244,238,223,0.28);font-family:monospace;letter-spacing:0.12em;text-transform:uppercase;">
            Spark64 Registration System
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function detailRow(label: string, value: string): string {
  return `
  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px;">
    <tr>
      <td width="38%" style="font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(244,238,223,0.42);font-family:monospace;vertical-align:top;padding-top:2px;">
        ${label}
      </td>
      <td style="font-size:13px;font-weight:600;color:#F4EEDF;word-break:break-all;">
        ${value || "—"}
      </td>
    </tr>
  </table>`;
}