"use client";

import { useState, FormEvent, useRef } from "react";
import {
  Loader2, CheckCircle2, AlertCircle,
  User, Calendar, Phone, Mail, BookOpen,
  ChevronDown, School, Trophy, Hash, Star,
  MapPin, Map, LocateFixed, Users, CreditCard,
  Copy, CheckCheck, ArrowRight,
} from "lucide-react";

const CATEGORIES = ["U6", "U8", "U10", "U12", "U14", "U16", "U18", "U20"];
const GENDERS    = ["Male", "Female", "Other"];

const BRASS  = "#C9A227";
const BRASS_L= "#E2C158";
const DARK   = "#1F3D2E";

const BANK = {
  name:   "Kotak Mahindra Bank Ltd",
  ac:     "7350327627",
  ifsc:   "KKBK0005203",
  branch: "KKBK0005203",
};

type Status = "idle" | "submitting" | "payment" | "verifying" | "success" | "error";

/* ── Copy button ── */
function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest transition"
      style={{
        background: copied ? "rgba(201,162,39,0.20)" : "rgba(201,162,39,0.08)",
        border:     `0.5px solid ${copied ? "rgba(201,162,39,0.5)" : "rgba(201,162,39,0.22)"}`,
        color:      BRASS,
      }}
    >
      {copied ? <CheckCheck size={10}/> : <Copy size={10}/>}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export default function RegisterForm() {
  const [status,    setStatus]    = useState<Status>("idle");
  const [error,     setError]     = useState("");
  const [medalText, setMedalText] = useState("");
  const [utr,       setUtr]       = useState("");
  const [rowId,     setRowId]     = useState("");
  const [savedData, setSavedData] = useState<Record<string,string>>({});

  /* ── Step 1: Submit registration ── */
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string,string>;
    try {
      const res  = await fetch("/api/register", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ ...data, _step: "init" }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Something went wrong.");
      setSavedData(data);
      setRowId(json.rowId || "");
      setStatus("payment");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setTimeout(() => setStatus("idle"), 100);
    }
  }

  /* ── Step 2: Submit UTR ── */
  async function handleUTR(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("verifying");
    setError("");
    const utrClean = utr.trim().toUpperCase();
    if (!/^[A-Z0-9]{10,22}$/.test(utrClean)) {
      setError("Invalid UTR. Please enter a valid 10–22 character UTR / UPI reference number.");
      setStatus("payment");
      return;
    }
    try {
      const res  = await fetch("/api/register", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          _step:      "utr",
          utr:        utrClean,
          rowId,
          playerName: savedData.playerName,
          email:      savedData.email,
          category:   savedData.category,
          phone:      savedData.phone,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Verification failed.");
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed.");
      setStatus("payment");
    }
  }

  /* ══════════════════════════════════════
     SUCCESS
     ══════════════════════════════════════ */
  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 px-4 py-10 text-center sm:px-6 sm:py-14">
        <div className="flex h-16 w-16 items-center justify-center rounded-full"
          style={{ background:"rgba(201,162,39,0.12)", border:"1.5px solid rgba(201,162,39,0.35)" }}>
          <CheckCircle2 size={32} style={{ color:BRASS }}/>
        </div>
        <p className="font-display text-2xl sm:text-3xl" style={{ color:"#F4EEDF" }}>
          You&apos;re confirmed. ♛
        </p>
        <p className="max-w-xs font-body text-sm leading-relaxed" style={{ color:"rgba(244,238,223,0.68)" }}>
          Registration complete. A confirmation email has been sent to{" "}
          <strong style={{ color:"#F4EEDF" }}>{savedData.email}</strong>.
          Venue and schedule details follow soon.
        </p>
        <div className="mt-1 rounded-xl px-5 py-3" style={{ background:"rgba(201,162,39,0.08)", border:"0.5px solid rgba(201,162,39,0.22)" }}>
          <p className="font-mono text-[9px] uppercase tracking-widest" style={{ color:"rgba(244,238,223,0.45)" }}>Registered category</p>
          <p className="mt-1 font-display text-xl font-semibold" style={{ color:BRASS }}>{savedData.category}</p>
        </div>
        <button type="button" onClick={() => { setStatus("idle"); setUtr(""); setSavedData({}); setRowId(""); }}
          className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] underline-offset-4 hover:underline"
          style={{ color:BRASS }}>
          Register another player
        </button>
      </div>
    );
  }

  /* ══════════════════════════════════════
     PAYMENT STEP
     ══════════════════════════════════════ */
  if (status === "payment" || status === "verifying") {
    return (
      <>
        <style>{`
          .utr-input {
            width:100%; min-height:52px;
            border-radius:14px;
            border:1.5px solid rgba(201,162,39,0.40);
            background:#fffdf8;
            padding:0 14px 0 44px;
            font-family:var(--font-plex-mono,monospace);
            font-size:15px; font-weight:600;
            color:#16241C; outline:none;
            letter-spacing:0.08em;
            transition:border-color 0.2s, box-shadow 0.2s;
            -webkit-appearance:none;
          }
          .utr-input::placeholder { color:rgba(22,36,28,0.35); font-weight:400; letter-spacing:0.04em; }
          .utr-input:focus { border-color:rgba(201,162,39,0.85); box-shadow:0 0 0 3px rgba(201,162,39,0.14); }
          .bank-row { display:flex; align-items:center; justify-content:space-between; gap:8px; padding:10px 0; border-bottom:0.5px solid rgba(244,238,223,0.08); }
          .bank-row:last-child { border-bottom:none; }
          .bank-label { font-family:var(--font-plex-mono,monospace); font-size:9px; letter-spacing:0.16em; text-transform:uppercase; color:rgba(244,238,223,0.38); }
          .bank-value { font-family:var(--font-plex-mono,monospace); font-size:13px; font-weight:700; color:#F4EEDF; }
        `}</style>

        <div className="flex flex-col gap-5 p-1">

          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <CreditCard size={16} style={{ color:BRASS }}/>
              <p className="font-display text-lg font-semibold sm:text-xl" style={{ color:"#F4EEDF" }}>
                Complete Payment
              </p>
            </div>
         <p className="font-body text-sm" style={{ color:"rgba(244,238,223,0.60)" }}>
  Transfer the registration fee to the bank account below, then enter your UTR reference number.
</p>
          </div>

          {/* Registered player recap */}
          <div className="rounded-xl px-4 py-3"
            style={{ background:"rgba(201,162,39,0.07)", border:"0.5px solid rgba(201,162,39,0.20)" }}>
            <p className="font-mono text-[9px] uppercase tracking-widest mb-1" style={{ color:"rgba(244,238,223,0.38)" }}>
              Registered for
            </p>
            <p className="font-display text-base font-semibold" style={{ color:"#F4EEDF" }}>
              {savedData.playerName} · <span style={{ color:BRASS }}>{savedData.category}</span>
            </p>
          </div>

          {/* Bank details */}
          <div className="rounded-2xl overflow-hidden"
            style={{ background:"rgba(244,238,223,0.05)", border:"1px solid rgba(244,238,223,0.10)" }}>

            <div className="px-5 py-3" style={{ background:"rgba(201,162,39,0.10)", borderBottom:"0.5px solid rgba(244,238,223,0.08)" }}>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color:BRASS }}>
                Bank Transfer Details
              </p>
            </div>

            <div className="px-5 py-2">
              {[
                { label:"Bank Name",     value:BANK.name   },
                { label:"Account No.",   value:BANK.ac     },
                { label:"IFSC Code",     value:BANK.ifsc   },
              ].map(({ label, value }) => (
                <div key={label} className="bank-row">
                  <div>
                    <p className="bank-label">{label}</p>
                    <p className="bank-value">{value}</p>
                  </div>
                  <CopyBtn text={value}/>
                </div>
              ))}
            </div>

         
          </div>

          {/* UTR form */}
          <form onSubmit={handleUTR} className="flex flex-col gap-3">
            <div>
              <label htmlFor="utr" className="flex items-center gap-2 mb-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] font-bold" style={{ color:"#F8F3E7" }}>
                  UTR / UPI Reference Number
                </span>
                <span className="font-mono text-[9px]" style={{ color:BRASS }}>*</span>
              </label>
              <p className="mb-2 font-body text-xs" style={{ color:"rgba(244,238,223,0.48)" }}>
                After transferring, enter the UTR number or UPI transaction reference from your bank app.
              </p>
              <div style={{ position:"relative" }}>
                <Hash size={15} style={{
                  position:"absolute", left:14, top:"50%",
                  transform:"translateY(-50%)",
                  color:"rgba(22,36,28,0.45)", pointerEvents:"none",
                }}/>
                <input
                  id="utr"
                  type="text"
                  value={utr}
                  onChange={(e) => setUtr(e.target.value.toUpperCase())}
                  required
                  placeholder="e.g. 517241XXXXXX or UPI ref"
                  className="utr-input"
                  autoCapitalize="characters"
                  autoCorrect="off"
                  spellCheck={false}
                  maxLength={30}
                />
              </div>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-widest" style={{ color:"rgba(244,238,223,0.28)" }}>
                10–22 alphanumeric characters
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-3 rounded-xl px-4 py-3 text-sm"
                style={{ background:"rgba(239,68,68,0.10)", border:"1px solid rgba(239,68,68,0.25)", color:"#fecaca" }}>
                <AlertCircle size={15} className="mt-0.5 shrink-0"/>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "verifying" || !utr.trim()}
              className="rf-submit"
            >
              {status === "verifying"
                ? <><Loader2 size={16} className="animate-spin"/> Verifying…</>
                : <><CheckCircle2 size={15}/> Confirm & Submit</>
              }
            </button>
          </form>

          <p className="text-center font-mono text-[9px] uppercase tracking-[0.16em]"
            style={{ color:"rgba(244,238,223,0.22)" }}>
            Your registration is saved · Payment pending confirmation
          </p>
        </div>

        <style>{`
          .rf-submit {
            width:100%; min-height:52px; border-radius:100px; border:none;
            background:linear-gradient(135deg,${BRASS_L},${BRASS});
            color:#102016; font-family:var(--font-plex-mono,monospace);
            font-size:11px; font-weight:700; letter-spacing:0.16em; text-transform:uppercase;
            cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px;
            transition:transform 0.2s,box-shadow 0.2s,opacity 0.2s;
            box-shadow:0 8px 24px rgba(201,162,39,0.28);
            position:relative; overflow:hidden;
          }
          .rf-submit:disabled { opacity:0.6; cursor:not-allowed; }
          .rf-submit:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 14px 32px rgba(201,162,39,0.36); }
        `}</style>
      </>
    );
  }

  /* ══════════════════════════════════════
     REGISTRATION FORM (Step 1)
     ══════════════════════════════════════ */
  return (
    <>
      <style>{`
        .rf-input {
          width:100%; min-height:48px;
          border-radius:12px;
          border:1px solid rgba(31,61,46,0.14);
          background:#FFFFFF;
          padding:0 12px 0 40px;
          font-family:var(--font-plex-sans,sans-serif);
          font-size:14px; font-weight:500; color:#16241C;
          outline:none; -webkit-appearance:none;
          transition:border-color 0.18s,box-shadow 0.18s,background 0.18s;
        }
        .rf-input::placeholder { color:rgba(22,36,28,0.38); }
        .rf-input:focus { border-color:rgba(201,162,39,0.70); background:#fffdf8; box-shadow:0 0 0 3px rgba(201,162,39,0.12); }
        .rf-input option { background:#fff; color:#16241C; }

        .rf-textarea {
          width:100%; border-radius:12px;
          border:1px solid rgba(31,61,46,0.14);
          background:#FFFFFF;
          padding:12px 12px 12px 40px;
          font-family:var(--font-plex-sans,sans-serif);
          font-size:14px; font-weight:500; color:#16241C;
          outline:none; resize:none; -webkit-appearance:none;
          transition:border-color 0.18s,box-shadow 0.18s;
        }
        .rf-textarea::placeholder { color:rgba(22,36,28,0.38); }
        .rf-textarea:focus { border-color:rgba(201,162,39,0.70); background:#fffdf8; box-shadow:0 0 0 3px rgba(201,162,39,0.12); }

        .rf-label {
          display:flex; align-items:center; gap:5px; margin-bottom:6px;
          font-family:var(--font-plex-sans,sans-serif);
          font-size:11px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase;
          color:#F8F3E7;
        }
        .rf-label .req  { color:${BRASS}; }
        .rf-label .note { color:rgba(248,243,231,0.50); font-weight:600; font-size:9.5px; text-transform:none; letter-spacing:0.02em; }

        .rf-field { position:relative; }
        .rf-icon  { position:absolute; left:12px; top:50%; transform:translateY(-50%); pointer-events:none; color:rgba(22,36,28,0.38); transition:color 0.18s; }
        .rf-field:focus-within .rf-icon { color:rgba(201,162,39,0.85); }
        .rf-icon-top { position:absolute; left:12px; top:14px; pointer-events:none; color:rgba(22,36,28,0.38); transition:color 0.18s; }
        .rf-field:focus-within .rf-icon-top { color:rgba(201,162,39,0.85); }

        .rf-select-wrap { position:relative; }
        .rf-select-arrow { position:absolute; right:12px; top:50%; transform:translateY(-50%); pointer-events:none; color:rgba(22,36,28,0.38); }

        .rf-divider { height:1px; background:linear-gradient(90deg,rgba(244,238,223,0.14),transparent); margin:2px 0; }

        .rf-section-head {
          font-family:var(--font-plex-mono,monospace);
          font-size:9px; font-weight:600; letter-spacing:0.20em; text-transform:uppercase;
          color:rgba(201,162,39,0.65);
          padding-bottom:8px;
          border-bottom:0.5px solid rgba(244,238,223,0.09);
          margin-bottom:2px;
        }

        .rf-submit {
          width:100%; min-height:52px; border-radius:100px; border:none;
          background:linear-gradient(135deg,${BRASS_L},${BRASS});
          color:#102016; font-family:var(--font-plex-mono,monospace);
          font-size:11px; font-weight:700; letter-spacing:0.16em; text-transform:uppercase;
          cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px;
          transition:transform 0.2s,box-shadow 0.2s,opacity 0.2s;
          box-shadow:0 8px 24px rgba(201,162,39,0.28);
          position:relative; overflow:hidden;
        }
        .rf-submit::before { content:""; position:absolute; inset:0; background:rgba(255,255,255,0.14); transform:translateX(-100%) skewX(-12deg); transition:transform 0.4s; }
        .rf-submit:hover:not(:disabled)::before { transform:translateX(120%) skewX(-12deg); }
        .rf-submit:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 12px 32px rgba(201,162,39,0.36); }
        .rf-submit:disabled { opacity:0.6; cursor:not-allowed; }

        .rf-grid-2 { display:grid; gap:10px; grid-template-columns:1fr; }
        .rf-grid-3 { display:grid; gap:10px; grid-template-columns:1fr; }
        .rf-counter { margin-top:5px; text-align:right; font-family:var(--font-plex-mono,monospace); font-size:9px; letter-spacing:0.10em; text-transform:uppercase; color:rgba(244,238,223,0.35); }

        input[type="date"]::-webkit-calendar-picker-indicator { opacity:0.65; cursor:pointer; }

        @media (min-width:480px) {
          .rf-grid-2 { grid-template-columns:1fr 1fr; gap:12px; }
        }
        @media (min-width:640px) {
          .rf-grid-2 { gap:14px; }
          .rf-grid-3 { grid-template-columns:1fr 1fr 1fr; gap:14px; }
          .rf-input,.rf-textarea { font-size:14px; }
          .rf-submit { min-height:54px; }
        }
      `}</style>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4">
        {/* Honeypot */}
        <input type="text" name="company" tabIndex={-1} autoComplete="off"
          className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden="true"/>

        {/* Header */}
        <div className="mb-0.5">
          <p className="font-display text-base font-semibold sm:text-lg" style={{ color:"#F4EEDF" }}>Register Now</p>
          <p className="mt-0.5 font-body text-[13px] font-medium" style={{ color:"rgba(248,243,231,0.78)" }}>
            All India Youth Chess Talent Hunt
          </p>
          <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em]" style={{ color:"rgba(244,238,223,0.36)" }}>
            All eight categories · U6 — U20
          </p>
        </div>

        <div className="rf-divider"/>

        {/* ── Player Details ── */}
        <p className="rf-section-head">Player Details</p>

        <div className="rf-grid-2">
          <div>
            <label htmlFor="playerName" className="rf-label">Name <span className="req">*</span></label>
            <div className="rf-field">
              <User size={14} className="rf-icon"/>
              <input id="playerName" name="playerName" required placeholder="Full name" className="rf-input"/>
            </div>
          </div>
          <div>
            <label htmlFor="dob" className="rf-label">Date of birth <span className="req">*</span></label>
            <div className="rf-field">
              <Calendar size={14} className="rf-icon"/>
              <input id="dob" name="dob" type="date" required className="rf-input"/>
            </div>
          </div>
        </div>

        <div className="rf-grid-2">
          <div>
            <label htmlFor="gender" className="rf-label">Gender <span className="req">*</span></label>
            <div className="rf-field rf-select-wrap">
              <Users size={14} className="rf-icon"/>
              <select id="gender" name="gender" required defaultValue="" className="rf-input" style={{ paddingRight:"36px", cursor:"pointer" }}>
                <option value="" disabled>Select gender</option>
                {GENDERS.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
              <ChevronDown size={13} className="rf-select-arrow"/>
            </div>
          </div>
          <div>
            <label htmlFor="schoolName" className="rf-label">School <span className="req">*</span></label>
            <div className="rf-field">
              <School size={14} className="rf-icon"/>
              <input id="schoolName" name="schoolName" required placeholder="School name" className="rf-input"/>
            </div>
          </div>
        </div>

        <div className="rf-grid-2">
          <div>
            <label htmlFor="category" className="rf-label">Category <span className="req">*</span></label>
            <div className="rf-field rf-select-wrap">
              <BookOpen size={14} className="rf-icon"/>
              <select id="category" name="category" required defaultValue="" className="rf-input" style={{ paddingRight:"36px", cursor:"pointer" }}>
                <option value="" disabled>Select category</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <ChevronDown size={13} className="rf-select-arrow"/>
            </div>
          </div>
          <div>
            <label htmlFor="fideRating" className="rf-label">FIDE rating <span className="note">(optional)</span></label>
            <div className="rf-field">
              <Star size={14} className="rf-icon"/>
              <input id="fideRating" name="fideRating" type="number" min="0" placeholder="Rating" className="rf-input"/>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="fideId" className="rf-label">FIDE ID <span className="note">(optional)</span></label>
          <div className="rf-field">
            <Hash size={14} className="rf-icon"/>
            <input id="fideId" name="fideId" placeholder="Enter FIDE ID" className="rf-input"/>
          </div>
        </div>

        <div className="rf-divider"/>

        {/* ── Parent / Guardian ── */}
        <p className="rf-section-head">Parent / Guardian</p>

        <div className="rf-grid-2">
          <div>
            <label htmlFor="parentName" className="rf-label">Name <span className="req">*</span></label>
            <div className="rf-field">
              <User size={14} className="rf-icon"/>
              <input id="parentName" name="parentName" required placeholder="Guardian name" className="rf-input"/>
            </div>
          </div>
          <div>
            <label htmlFor="phone" className="rf-label">Mobile <span className="req">*</span></label>
            <div className="rf-field">
              <Phone size={14} className="rf-icon"/>
              <input id="phone" name="phone" type="tel" required placeholder="+91 00000 00000" className="rf-input"/>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="email" className="rf-label">Email <span className="req">*</span></label>
          <div className="rf-field">
            <Mail size={14} className="rf-icon"/>
            <input id="email" name="email" type="email" required placeholder="your@email.com" className="rf-input"/>
          </div>
        </div>

        <div className="rf-divider"/>

        {/* ── Location ── */}
        <p className="rf-section-head">Location</p>

        <div className="rf-grid-3">
          <div>
            <label htmlFor="city" className="rf-label">City <span className="req">*</span></label>
            <div className="rf-field">
              <MapPin size={14} className="rf-icon"/>
              <input id="city" name="city" required placeholder="City" className="rf-input"/>
            </div>
          </div>
          <div>
            <label htmlFor="state" className="rf-label">State <span className="req">*</span></label>
            <div className="rf-field">
              <Map size={14} className="rf-icon"/>
              <input id="state" name="state" required placeholder="State" className="rf-input"/>
            </div>
          </div>
          <div>
            <label htmlFor="pincode" className="rf-label">Pincode <span className="req">*</span></label>
            <div className="rf-field">
              <LocateFixed size={14} className="rf-icon"/>
              <input id="pincode" name="pincode" required inputMode="numeric"
                pattern="[0-9]{6}" maxLength={6} placeholder="Pincode" className="rf-input"/>
            </div>
          </div>
        </div>

        <div className="rf-divider"/>

        {/* ── Achievements ── */}
        <p className="rf-section-head">Achievements</p>

        <div>
          <label htmlFor="previousMedals" className="rf-label">
            Previous medals <span className="note">(optional · max 50 words)</span>
          </label>
          <div className="rf-field">
            <Trophy size={14} className="rf-icon-top"/>
            <textarea id="previousMedals" name="previousMedals" rows={3}
              maxLength={350} value={medalText}
              onChange={(e) => {
                const words = e.target.value.trim().split(/\s+/).filter(Boolean);
                if (words.length <= 50) setMedalText(e.target.value);
              }}
              placeholder="Tournament wins, medals, or notable achievements…"
              className="rf-textarea"/>
          </div>
          <p className="rf-counter">
            {medalText.trim() ? medalText.trim().split(/\s+/).filter(Boolean).length : 0}/50 words
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-start gap-3 rounded-xl px-4 py-3 text-sm"
            style={{ background:"rgba(239,68,68,0.10)", border:"1px solid rgba(239,68,68,0.25)", color:"#fecaca" }}>
            <AlertCircle size={15} className="mt-0.5 shrink-0"/>
            {error}
          </div>
        )}

        {/* Submit */}
        <button type="submit" disabled={status === "submitting"} className="rf-submit mt-1">
          {status === "submitting"
            ? <><Loader2 size={16} className="animate-spin"/> Saving…</>
            : <>Proceed to Payment <ArrowRight size={14}/></>
          }
        </button>

        <p className="text-center font-mono text-[9px] uppercase tracking-[0.18em]"
          style={{ color:"rgba(244,238,223,0.25)" }}>
          Fields marked * are required · Your data is safe with us
        </p>
      </form>
    </>
  );
}