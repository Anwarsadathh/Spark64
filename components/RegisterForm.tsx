"use client";

import { useState, FormEvent } from "react";
import {
  Loader2,
  CheckCircle2,
  AlertCircle,
  User,
  Calendar,
  Phone,
  Mail,
  BookOpen,
  ChevronDown,
  School,
  Trophy,
  Hash,
  Star,
  MapPin,
  Map,
  LocateFixed,
  Users,
} from "lucide-react";

const CATEGORIES = ["U6", "U8", "U10", "U12", "U14", "U16", "U18", "U20"];
const GENDERS = ["Male", "Female", "Other"];

type Status = "idle" | "submitting" | "success" | "error";

const BRASS = "#C9A227";
const BRASS_L = "#E2C158";

export default function RegisterForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [medalText, setMedalText] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Something went wrong.");
      }

      setStatus("success");
      setMedalText("");
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
          style={{
            background: "rgba(201,162,39,0.12)",
            border: "1.5px solid rgba(201,162,39,0.3)",
          }}
        >
          <CheckCircle2 size={30} style={{ color: BRASS }} />
        </div>

        <p
          className="font-display text-2xl sm:text-3xl"
          style={{ color: "#F4EEDF" }}
        >
          You&apos;re in.
        </p>

        <p
          className="max-w-xs font-body text-sm leading-relaxed"
          style={{ color: "rgba(244,238,223,0.72)" }}
        >
          Registration received. Venue and schedule will be sent to your email and phone.
        </p>

        <button
          type="button"
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
          min-height: 52px;
          border-radius: 14px;
          border: 1px solid rgba(31,61,46,0.12);
          background: #FFFFFF;
          padding: 0 14px 0 44px;
          font-family: var(--font-plex-sans, sans-serif);
          font-size: 14px;
          font-weight: 500;
          color: #16241C;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s, transform 0.2s;
          -webkit-appearance: none;
        }

        .rf-input::placeholder {
          color: rgba(22,36,28,0.42);
        }

        .rf-input:focus {
          border-color: rgba(201,162,39,0.75);
          background: #fffdf8;
          box-shadow: 0 0 0 4px rgba(201,162,39,0.12);
        }

        .rf-input option {
          background: #ffffff;
          color: #16241C;
        }

        .rf-textarea {
          width: 100%;
          border-radius: 14px;
          border: 1px solid rgba(31,61,46,0.12);
          background: #FFFFFF;
          padding: 14px 14px 14px 44px;
          font-family: var(--font-plex-sans, sans-serif);
          font-size: 14px;
          font-weight: 500;
          color: #16241C;
          outline: none;
          resize: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
          -webkit-appearance: none;
        }

        .rf-textarea::placeholder {
          color: rgba(22,36,28,0.42);
        }

        .rf-textarea:focus {
          border-color: rgba(201,162,39,0.75);
          background: #fffdf8;
          box-shadow: 0 0 0 4px rgba(201,162,39,0.12);
        }

        .rf-label {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 8px;
          font-family: var(--font-plex-sans, sans-serif);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #F8F3E7;
        }

        .rf-label .req {
          color: ${BRASS};
        }

        .rf-note {
          color: rgba(248,243,231,0.72);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: none;
        }

        .rf-field {
          position: relative;
        }

        .rf-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          color: rgba(22,36,28,0.42);
          transition: color 0.2s;
        }

        .rf-field:focus-within .rf-icon {
          color: rgba(201,162,39,0.9);
        }

        .rf-icon-top {
          position: absolute;
          left: 14px;
          top: 16px;
          pointer-events: none;
          color: rgba(22,36,28,0.42);
          transition: color 0.2s;
        }

        .rf-field:focus-within .rf-icon-top {
          color: rgba(201,162,39,0.9);
        }

        .rf-divider {
          height: 1px;
          background: linear-gradient(90deg, rgba(244,238,223,0.18), transparent);
          margin: 4px 0 2px;
        }

        .rf-submit {
          width: 100%;
          min-height: 54px;
          border-radius: 100px;
          border: none;
          background: linear-gradient(135deg, ${BRASS_L}, ${BRASS});
          color: #102016;
          font-family: var(--font-plex-mono, monospace);
          font-size: 11px;
          font-weight: 700;
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

        .rf-submit:hover:not(:disabled)::before {
          transform: translateX(120%) skewX(-12deg);
        }

        .rf-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 14px 36px rgba(201,162,39,0.36);
        }

        .rf-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        input[type="date"]::-webkit-calendar-picker-indicator {
          opacity: 0.72;
          cursor: pointer;
        }

        .rf-select-wrap {
          position: relative;
        }

        .rf-select-arrow {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          color: rgba(22,36,28,0.42);
        }

        .rf-counter {
          margin-top: 8px;
          text-align: right;
          font-family: var(--font-plex-mono, monospace);
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(244,238,223,0.42);
        }

        .rf-caption {
          color: rgba(244,238,223,0.52);
        }
      `}</style>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-1 sm:gap-5">
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          className="absolute left-[-9999px] h-0 w-0 opacity-0"
          aria-hidden="true"
        />

        <div className="mb-1">
          <p
            className="font-display text-lg font-semibold sm:text-xl"
            style={{ color: "#F4EEDF" }}
          >
            Register Now
          </p>
          <p
            className="mt-1 font-body text-sm font-medium"
            style={{ color: "#F8F3E7" }}
          >
            All India Youth Chess Talent Hunt
          </p>
          <p
            className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em]"
            style={{ color: "rgba(244,238,223,0.42)" }}
          >
            All eight categories · U6 — U20
          </p>
        </div>

        <div className="rf-divider" />

        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          <div>
            <label htmlFor="playerName" className="rf-label">
              Name <span className="req">*</span>
            </label>
            <div className="rf-field">
              <User size={15} className="rf-icon" />
              <input
                id="playerName"
                name="playerName"
                required
                placeholder="Player full name"
                className="rf-input"
              />
            </div>
          </div>

          <div>
            <label htmlFor="dob" className="rf-label">
              Date of birth <span className="req">*</span>
            </label>
            <div className="rf-field">
              <Calendar size={15} className="rf-icon" />
              <input
                id="dob"
                name="dob"
                type="date"
                required
                className="rf-input"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          <div>
            <label htmlFor="gender" className="rf-label">
              Gender <span className="req">*</span>
            </label>
            <div className="rf-field rf-select-wrap">
              <Users size={15} className="rf-icon" />
              <select
                id="gender"
                name="gender"
                required
                defaultValue=""
                className="rf-input"
                style={{ paddingRight: "36px", cursor: "pointer" }}
              >
                <option value="" disabled>
                  Select gender
                </option>
                {GENDERS.map((gender) => (
                  <option key={gender} value={gender}>
                    {gender}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="rf-select-arrow" />
            </div>
          </div>

          <div>
            <label htmlFor="schoolName" className="rf-label">
              School name <span className="req">*</span>
            </label>
            <div className="rf-field">
              <School size={15} className="rf-icon" />
              <input
                id="schoolName"
                name="schoolName"
                required
                placeholder="School name"
                className="rf-input"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          <div>
            <label htmlFor="category" className="rf-label">
              Category <span className="req">*</span>
            </label>
            <div className="rf-field rf-select-wrap">
              <BookOpen size={15} className="rf-icon" />
              <select
                id="category"
                name="category"
                required
                defaultValue=""
                className="rf-input"
                style={{ paddingRight: "36px", cursor: "pointer" }}
              >
                <option value="" disabled>
                  Select category
                </option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="rf-select-arrow" />
            </div>
          </div>

          <div>
            <label htmlFor="parentName" className="rf-label">
              Parent / guardian <span className="req">*</span>
            </label>
            <div className="rf-field">
              <User size={15} className="rf-icon" />
              <input
                id="parentName"
                name="parentName"
                required
                placeholder="Parent or guardian name"
                className="rf-input"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          <div>
            <label htmlFor="phone" className="rf-label">
              Mobile no <span className="req">*</span>
            </label>
            <div className="rf-field">
              <Phone size={15} className="rf-icon" />
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="+91 00000 00000"
                className="rf-input"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="rf-label">
              Email id <span className="req">*</span>
            </label>
            <div className="rf-field">
              <Mail size={15} className="rf-icon" />
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="your@email.com"
                className="rf-input"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
          <div>
            <label htmlFor="city" className="rf-label">
              City <span className="req">*</span>
            </label>
            <div className="rf-field">
              <MapPin size={15} className="rf-icon" />
              <input
                id="city"
                name="city"
                required
                placeholder="City"
                className="rf-input"
              />
            </div>
          </div>

          <div>
            <label htmlFor="state" className="rf-label">
              State <span className="req">*</span>
            </label>
            <div className="rf-field">
              <Map size={15} className="rf-icon" />
              <input
                id="state"
                name="state"
                required
                placeholder="State"
                className="rf-input"
              />
            </div>
          </div>

          <div>
            <label htmlFor="pincode" className="rf-label">
              Pincode <span className="req">*</span>
            </label>
            <div className="rf-field">
              <LocateFixed size={15} className="rf-icon" />
              <input
                id="pincode"
                name="pincode"
                required
                inputMode="numeric"
                pattern="[0-9]{6}"
                maxLength={6}
                placeholder="6-digit pincode"
                className="rf-input"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          <div>
            <label htmlFor="fideId" className="rf-label">
              FIDE id <span className="rf-note">(optional)</span>
            </label>
            <div className="rf-field">
              <Hash size={15} className="rf-icon" />
              <input
                id="fideId"
                name="fideId"
                placeholder="Enter FIDE ID"
                className="rf-input"
              />
            </div>
          </div>

          <div>
            <label htmlFor="fideRating" className="rf-label">
              FIDE rating <span className="rf-note">(optional)</span>
            </label>
            <div className="rf-field">
              <Star size={15} className="rf-icon" />
              <input
                id="fideRating"
                name="fideRating"
                type="number"
                min="0"
                placeholder="Enter FIDE rating"
                className="rf-input"
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="previousMedals" className="rf-label">
            Previous medals details{" "}
            <span className="rf-note">(optional · max 50 words)</span>
          </label>
          <div className="rf-field">
            <Trophy size={15} className="rf-icon-top" />
            <textarea
              id="previousMedals"
              name="previousMedals"
              rows={3}
              maxLength={350}
              value={medalText}
              onChange={(e) => {
                const words = e.target.value.trim().split(/\s+/).filter(Boolean);
                if (words.length <= 50) {
                  setMedalText(e.target.value);
                }
              }}
              placeholder="Mention previous medals, tournament achievements, or notable wins..."
              className="rf-textarea"
            />
          </div>
          <p className="rf-counter">
            {medalText.trim()
              ? medalText.trim().split(/\s+/).filter(Boolean).length
              : 0}
            /50 words
          </p>
        </div>

        {status === "error" && (
          <div
            className="flex items-start gap-3 rounded-xl px-4 py-3 text-sm"
            style={{
              background: "rgba(239,68,68,0.10)",
              border: "1px solid rgba(239,68,68,0.25)",
              color: "#fecaca",
            }}
          >
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="rf-submit mt-1"
        >
          {status === "submitting" && (
            <Loader2 size={16} className="animate-spin" />
          )}
          {status === "submitting" ? "Submitting…" : "Register Now"}
        </button>

        <p
          className="text-center font-mono text-[9px] uppercase tracking-[0.2em] rf-caption"
        >
          Fields marked * are required · Your data is safe with us
        </p>
      </form>
    </>
  );
}