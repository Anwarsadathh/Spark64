"use client";

import { useState, FormEvent } from "react";
import { Loader2, CheckCircle2, AlertCircle, User, Calendar, MapPin, Phone, Mail, BookOpen, ChevronDown } from "lucide-react";

const CATEGORIES = ["U6", "U8", "U10", "U12", "U14", "U16", "U18", "U20"];

type Status = "idle" | "submitting" | "success" | "error";

const BRASS   = "#C9A227";
const BRASS_L = "#E2C158";
const DARK    = "#1F3D2E";
const SQ_DARK = "#4A6741";

export default function RegisterForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error,  setError]  = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res  = await fetch("/api/register", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Something went wrong.");
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 px-4 py-10 text-center sm:px-6 sm:py-12">
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full"
          style={{ background: "rgba(201,162,39,0.12)", border: "1.5px solid rgba(201,162,39,0.3)" }}
        >
          <CheckCircle2 size={30} style={{ color: BRASS }} />
        </div>
        <p className="font-display text-2xl sm:text-3xl" style={{ color: "#F4EEDF" }}>
          You&apos;re in.
        </p>
        <p className="max-w-xs font-body text-sm leading-relaxed" style={{ color: "rgba(244,238,223,0.6)" }}>
          Registration received. Venue and schedule will be sent to your email and phone.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] underline-offset-4 hover:underline"
          style={{ color: BRASS }}
        >
          Register another player
        </button>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .rf-input {
          width: 100%;
          min-height: 50px;
          border-radius: 12px;
          border: 1px solid rgba(244,238,223,0.10);
          background: rgba(244,238,223,0.06);
          padding: 0 14px 0 42px;
          font-family: var(--font-plex-sans, sans-serif);
          font-size: 14px;
          color: #F4EEDF;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
          -webkit-appearance: none;
        }
        .rf-input::placeholder { color: rgba(244,238,223,0.28); }
        .rf-input:focus {
          border-color: rgba(201,162,39,0.55);
          background: rgba(244,238,223,0.09);
          box-shadow: 0 0 0 3px rgba(201,162,39,0.10);
        }
        .rf-input option { background: #1F3D2E; color: #F4EEDF; }

        .rf-textarea {
          width: 100%;
          border-radius: 12px;
          border: 1px solid rgba(244,238,223,0.10);
          background: rgba(244,238,223,0.06);
          padding: 14px 14px 14px 42px;
          font-family: var(--font-plex-sans, sans-serif);
          font-size: 14px;
          color: #F4EEDF;
          outline: none;
          resize: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
          -webkit-appearance: none;
        }
        .rf-textarea::placeholder { color: rgba(244,238,223,0.28); }
        .rf-textarea:focus {
          border-color: rgba(201,162,39,0.55);
          background: rgba(244,238,223,0.09);
          box-shadow: 0 0 0 3px rgba(201,162,39,0.10);
        }

        .rf-label {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 7px;
          font-family: var(--font-plex-mono, monospace);
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(244,238,223,0.45);
        }
        .rf-label .req { color: ${BRASS}; }

        .rf-field {
          position: relative;
        }
        .rf-icon {
          position: absolute;
          left: 13px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          color: rgba(244,238,223,0.25);
          transition: color 0.2s;
        }
        .rf-field:focus-within .rf-icon { color: rgba(201,162,39,0.6); }

        .rf-icon-top {
          position: absolute;
          left: 13px;
          top: 16px;
          pointer-events: none;
          color: rgba(244,238,223,0.25);
          transition: color 0.2s;
        }
        .rf-field:focus-within .rf-icon-top { color: rgba(201,162,39,0.6); }

        .rf-divider {
          height: 0.5px;
          background: linear-gradient(90deg, rgba(244,238,223,0.10), transparent);
          margin: 4px 0;
        }

        .rf-submit {
          width: 100%;
          min-height: 52px;
          border-radius: 100px;
          border: none;
          background: linear-gradient(135deg, ${BRASS_L}, ${BRASS});
          color: #102016;
          font-family: var(--font-plex-mono, monospace);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
          box-shadow: 0 10px 28px rgba(201,162,39,0.28);
          position: relative;
          overflow: hidden;
        }
        .rf-submit::before {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.14);
          transform: translateX(-100%) skewX(-12deg);
          transition: transform 0.4s ease;
        }
        .rf-submit:hover:not(:disabled)::before { transform: translateX(120%) skewX(-12deg); }
        .rf-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 14px 36px rgba(201,162,39,0.36);
        }
        .rf-submit:disabled { opacity: 0.6; cursor: not-allowed; }

        /* Date input fix for dark bg */
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(0.7) sepia(1) saturate(3) hue-rotate(10deg);
          opacity: 0.5;
          cursor: pointer;
        }

        /* Select arrow */
        .rf-select-wrap { position: relative; }
        .rf-select-arrow {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          color: rgba(244,238,223,0.28);
        }
      `}</style>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-1 sm:gap-5">
        {/* Honeypot */}
        <input type="text" name="company" tabIndex={-1} autoComplete="off"
          className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden="true" />

        {/* Form title inside card */}
        <div className="mb-1">
          <p className="font-display text-lg font-semibold sm:text-xl" style={{ color: "#F4EEDF" }}>
            Register Your Champion
          </p>
          <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.16em]"
            style={{ color: "rgba(244,238,223,0.35)" }}>
            All eight categories · U6 — U20
          </p>
        </div>

        <div className="rf-divider" />

        {/* Row 1: Player name + DOB */}
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          <div>
            <label htmlFor="playerName" className="rf-label">
              Player full name <span className="req">*</span>
            </label>
            <div className="rf-field">
              <User size={15} className="rf-icon" />
              <input id="playerName" name="playerName" required placeholder="Full name"
                className="rf-input" />
            </div>
          </div>
          <div>
            <label htmlFor="dob" className="rf-label">Date of birth</label>
            <div className="rf-field">
              <Calendar size={15} className="rf-icon" />
              <input id="dob" name="dob" type="date" className="rf-input" />
            </div>
          </div>
        </div>

        {/* Row 2: Category + City */}
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          <div>
            <label htmlFor="category" className="rf-label">
              Category <span className="req">*</span>
            </label>
            <div className="rf-field rf-select-wrap">
              <BookOpen size={15} className="rf-icon" />
              <select id="category" name="category" required defaultValue=""
                className="rf-input" style={{ paddingRight: "36px", cursor: "pointer" }}>
                <option value="" disabled>Select category</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <ChevronDown size={14} className="rf-select-arrow" />
            </div>
          </div>
          <div>
            <label htmlFor="city" className="rf-label">City</label>
            <div className="rf-field">
              <MapPin size={15} className="rf-icon" />
              <input id="city" name="city" placeholder="Your city" className="rf-input" />
            </div>
          </div>
        </div>

        {/* Row 3: Parent name + Phone */}
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          <div>
            <label htmlFor="parentName" className="rf-label">
              Parent / guardian <span className="req">*</span>
            </label>
            <div className="rf-field">
              <User size={15} className="rf-icon" />
              <input id="parentName" name="parentName" required placeholder="Guardian name"
                className="rf-input" />
            </div>
          </div>
          <div>
            <label htmlFor="phone" className="rf-label">
              Phone <span className="req">*</span>
            </label>
            <div className="rf-field">
              <Phone size={15} className="rf-icon" />
              <input id="phone" name="phone" type="tel" required placeholder="+91 00000 00000"
                className="rf-input" />
            </div>
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="rf-label">
            Email <span className="req">*</span>
          </label>
          <div className="rf-field">
            <Mail size={15} className="rf-icon" />
            <input id="email" name="email" type="email" required
              placeholder="your@email.com" className="rf-input" />
          </div>
        </div>

        {/* Experience */}
        <div>
          <label htmlFor="experience" className="rf-label">
            Chess experience / rating
            <span style={{ color: "rgba(244,238,223,0.25)", letterSpacing: "0.1em" }}>(optional)</span>
          </label>
          <div className="rf-field">
            <BookOpen size={15} className="rf-icon-top" />
            <textarea id="experience" name="experience" rows={3}
              placeholder="Club, FIDE/AICF rating, past tournaments…"
              className="rf-textarea" />
          </div>
        </div>

        {/* Error */}
        {status === "error" && (
          <div
            className="flex items-start gap-3 rounded-xl px-4 py-3 text-sm"
            style={{
              background: "rgba(239,68,68,0.10)",
              border: "1px solid rgba(239,68,68,0.25)",
              color: "#fca5a5",
            }}
          >
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            {error}
          </div>
        )}

        {/* Submit */}
        <button type="submit" disabled={status === "submitting"} className="rf-submit mt-1">
          {status === "submitting" && <Loader2 size={16} className="animate-spin" />}
          {status === "submitting" ? "Submitting…" : "Register Now"}
        </button>

        <p className="text-center font-mono text-[9px] uppercase tracking-[0.2em]"
          style={{ color: "rgba(244,238,223,0.25)" }}>
          Fields marked * are required · Your data is safe with us
        </p>
      </form>
    </>
  );
}