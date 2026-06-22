import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const WEBHOOK_URL = process.env.GOOGLE_SHEET_WEBHOOK!;
const SMTP_HOST   = process.env.SMTP_HOST || "smtp.gmail.com";
const SMTP_PORT   = parseInt(process.env.SMTP_PORT || "465");
const SMTP_USER   = process.env.SMTP_USER!;
const SMTP_PASS   = process.env.SMTP_PASS!;
const ADMIN_EMAIL = "ravenrows@gmail.com";

const BANK = {
  name:   "Kotak Mahindra Bank Ltd",
  ac:     "7350327627",
  ifsc:   "KKBK0005203",
  branch: "Bengaluru – Koramangala",   // ← was duplicate of ifsc
};

function getTransporter() {
  return nodemailer.createTransport({
    host:   SMTP_HOST,
    port:   SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth:   { user: SMTP_USER, pass: SMTP_PASS },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    /* Honeypot */
    if (body.company) return NextResponse.json({ ok: true });

    /* ══ STEP 2 — UTR submission ══ */
    if (body._step === "utr") {
      const { utr, rowId, playerName, email, category, phone } = body;

      const utrClean = (utr || "").toString().trim().toUpperCase();
      if (!/^[A-Z0-9]{10,22}$/.test(utrClean)) {
        return NextResponse.json(
          { ok: false, error: "Invalid UTR number. Please enter a valid 10–22 character UTR / UPI reference." },
          { status: 400 }
        );
      }

      const updateRes = await fetch(WEBHOOK_URL, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          _action:       "updateUTR",
          rowId,
          utr:           utrClean,
          paymentStatus: "confirmed",
        }),
      });
      const updateJson = await updateRes.json().catch(() => ({ ok: false }));
      if (!updateJson.ok) {
        return NextResponse.json(
          { ok: false, error: "Could not update payment status. Please contact support." },
          { status: 500 }
        );
      }

      if (email) {
        const transporter = getTransporter();

        await transporter.sendMail({
          from:    `"Spark64 – Youth Chess Talent Hunt" <${SMTP_USER}>`,
          to:      email,
          subject: `Registration Confirmed – Spark64 2026 (${category})`,
          html:    playerConfirmationEmail({ playerName, category, utr: utrClean, phone }),
        });

        await transporter.sendMail({
          from:    `"Spark64 Registration System" <${SMTP_USER}>`,
          to:      ADMIN_EMAIL,
          subject: `✅ New Registration Confirmed — ${playerName} (${category})`,
          html:    adminNotificationEmail({ ...body, utr: utrClean, paymentStatus: "confirmed" }),
        });
      }

      return NextResponse.json({ ok: true, message: "Registration confirmed!" });
    }

    /* ══ STEP 1 — Initial registration ══ */
    const required = [
      "playerName","dob","gender","schoolName","category",
      "parentName","phone","email","city","state","pincode",
    ];
    for (const field of required) {
      if (!body[field]?.toString().trim()) {
        return NextResponse.json(
          { ok: false, error: `${field} is required.` },
          { status: 400 }
        );
      }
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const phoneDigits = body.phone.replace(/\D/g, "");
    if (phoneDigits.length < 10) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid 10-digit mobile number." },
        { status: 400 }
      );
    }

    const submittedAt = new Date().toISOString();
    const payload = {
      ...body,
      paymentStatus: "pending",
      utr:           "",
      submittedAt,
      _action:       "newRegistration",
    };

    const sheetRes  = await fetch(WEBHOOK_URL, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(payload),
    });
    const sheetJson = await sheetRes.json().catch(() => ({ ok: false }));

    if (!sheetJson.ok) {
      return NextResponse.json(
        { ok: false, error: "Could not save registration. Please try again." },
        { status: 500 }
      );
    }

    /* ── Notify admin on initial submission too ── */
    try {
      const transporter = getTransporter();
      await transporter.sendMail({
        from:    `"Spark64 Registration System" <${SMTP_USER}>`,
        to:      ADMIN_EMAIL,
        subject: `🕐 New Registration Pending — ${body.playerName} (${body.category})`,
        html:    adminNotificationEmail({ ...body, utr: "", paymentStatus: "pending", submittedAt }),
      });
    } catch (mailErr) {
      // Non-fatal: sheet already saved, just log
      console.warn("[register] Admin notify failed:", mailErr);
    }

    return NextResponse.json({
      ok:      true,
      rowId:   sheetJson.rowId || sheetJson.id || "",
      message: "Registration saved. Please complete payment.",
    });

  } catch (err) {
    console.error("[register]", err);
    return NextResponse.json(
      { ok: false, error: "Registration failed. Please try again." },
      { status: 500 }
    );
  }
}

/* ── Email templates ── */

function playerConfirmationEmail({
  playerName, category, utr, phone,
}: { playerName: string; category: string; utr: string; phone: string }) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4eedf;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4eedf;padding:32px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:560px;background:#1F3D2E;border-radius:20px;overflow:hidden;">

        <tr><td style="padding:32px 32px 24px;text-align:center;border-bottom:1px solid rgba(244,238,223,0.10);">
          <p style="margin:0;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:rgba(201,162,39,0.8);font-family:monospace;">
            Spark64 · Youth Chess Talent Hunt
          </p>
          <h1 style="margin:12px 0 0;font-size:32px;font-weight:800;color:#F4EEDF;letter-spacing:-1px;">
            You&rsquo;re In! ♛
          </h1>
          <p style="margin:8px 0 0;font-size:14px;color:rgba(244,238,223,0.65);">
            Registration Confirmed · 2026 Edition
          </p>
        </td></tr>

        <tr><td style="padding:28px 32px;">
          <p style="margin:0 0 16px;font-size:15px;color:rgba(244,238,223,0.85);line-height:1.6;">
            Dear <strong style="color:#F4EEDF;">${playerName}</strong>,
          </p>
          <p style="margin:0 0 24px;font-size:14px;color:rgba(244,238,223,0.72);line-height:1.7;">
            Your registration for <strong style="color:#C9A227;">Spark64 2026</strong> has been confirmed.
            We&rsquo;ve received your payment and you are now officially registered. Get ready to make your move!
          </p>

          <table width="100%" cellpadding="0" cellspacing="0"
            style="background:rgba(244,238,223,0.06);border:1px solid rgba(244,238,223,0.10);border-radius:14px;margin-bottom:24px;">
            <tr><td style="padding:20px 24px;">
              ${detailRow("Category",       category)}
              ${detailRow("Player Name",    playerName)}
              ${detailRow("Mobile",         phone)}
              ${detailRow("Payment Ref",    utr)}
              ${detailRow("Payment Status", "✅ Confirmed")}
            </td></tr>
          </table>

          <p style="margin:0 0 8px;font-size:13px;color:rgba(244,238,223,0.55);line-height:1.6;">
            Venue, schedule, and round timings will be shared shortly via email and the number registered.
          </p>
        </td></tr>

        <tr><td style="padding:20px 32px;border-top:1px solid rgba(244,238,223,0.08);text-align:center;">
          <p style="margin:0;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:rgba(244,238,223,0.28);font-family:monospace;">
            Powered by Raven Rows &middot;
            <a href="mailto:ravenrows@gmail.com" style="color:rgba(244,238,223,0.28);text-decoration:none;">
              ravenrows@gmail.com
            </a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function adminNotificationEmail(data: Record<string, string>) {
  const fields: [string, string][] = [
    ["Player Name",     data.playerName],
    ["DOB",             data.dob],
    ["Gender",          data.gender],
    ["School",          data.schoolName],
    ["Category",        data.category],
    ["Parent/Guardian", data.parentName],
    ["Phone",           data.phone],
    ["Email",           data.email],
    ["City",            data.city],
    ["State",           data.state],
    ["Pincode",         data.pincode],
    ["FIDE ID",         data.fideId         || "—"],
    ["FIDE Rating",     data.fideRating     || "—"],
    ["Prev. Medals",    data.previousMedals || "—"],
    ["UTR / Ref",       data.utr            || "—"],
    ["Payment Status",  data.paymentStatus],
    ["Submitted At",    data.submittedAt    || new Date().toISOString()],
  ];

  return `
<!DOCTYPE html>
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

function detailRow(label: string, value: string) {
  return `
  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px;">
    <tr>
      <td width="38%" style="font-size:10px;letter-spacing:0.12em;text-transform:uppercase;
          color:rgba(244,238,223,0.42);font-family:monospace;vertical-align:top;padding-top:2px;">
        ${label}
      </td>
      <td style="font-size:13px;font-weight:600;color:#F4EEDF;word-break:break-all;">
        ${value || "—"}
      </td>
    </tr>
  </table>`;
}