import { NextRequest, NextResponse } from "next/server";

const WEBHOOK_URL = process.env.GOOGLE_SHEET_WEBHOOK!;

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Server-side honeypot check
    if (data.company) {
      return NextResponse.json({ ok: true }); // silently discard bots
    }

    // Basic server-side validation
    const required = ["playerName", "category", "parentName", "phone", "email"];
    for (const field of required) {
      if (!data[field]?.toString().trim()) {
        return NextResponse.json(
          { ok: false, error: `${field} is required.` },
          { status: 400 }
        );
      }
    }

    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (!json.ok) {
      throw new Error(json.error || "Google Sheets write failed.");
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[register]", err);
    return NextResponse.json(
      { ok: false, error: "Registration failed. Please try again." },
      { status: 500 }
    );
  }
}