"use client";

import { useState, FormEvent } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

const CATEGORIES = ["U6", "U8", "U10", "U12", "U14", "U16", "U18", "U20"];

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full min-h-[48px] rounded-xl border border-board/10 bg-[#FFFDF8] px-4 py-3 font-body text-sm text-board placeholder:text-board/35 outline-none transition focus:border-brass focus:ring-2 focus:ring-brass/15";

const labelClass =
  "mb-2 block font-mono text-[11px] uppercase tracking-widest text-board/60";

export default function RegisterForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

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
        throw new Error(json.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-2xl border border-brass/25 bg-[#F9F4E8] px-6 py-10 text-center shadow-[0_18px_40px_rgba(16,32,22,0.08)] sm:px-8 sm:py-12">
        <CheckCircle2 size={32} className="text-brass" />
        <p className="font-display text-2xl text-board">You&apos;re in.</p>
        <p className="font-body text-sm leading-relaxed text-board/65">
          We&apos;ve received the registration. Venue and schedule details
          will be sent to the email and phone number provided.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 font-mono text-xs uppercase tracking-widest text-brass underline-offset-4 hover:underline"
        >
          Register another player
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-none flex-col gap-4 rounded-[20px] border border-board/10 bg-[#F9F4E8] px-3.5 py-4 text-left shadow-[0_18px_40px_rgba(16,32,22,0.08)] sm:max-w-2xl sm:gap-5 sm:rounded-[22px] sm:px-8 sm:py-8"
    >
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="playerName" className={labelClass}>
            Player Full Name *
          </label>
          <input id="playerName" name="playerName" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="dob" className={labelClass}>
            Date of Birth
          </label>
          <input id="dob" name="dob" type="date" className={inputClass} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="category" className={labelClass}>
            Category *
          </label>
          <select id="category" name="category" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              Select age category
            </option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="city" className={labelClass}>
            City
          </label>
          <input id="city" name="city" className={inputClass} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="parentName" className={labelClass}>
            Parent / Guardian Name *
          </label>
          <input id="parentName" name="parentName" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone Number *
          </label>
          <input id="phone" name="phone" type="tel" required className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email *
        </label>
        <input id="email" name="email" type="email" required className={inputClass} />
      </div>

      <div>
        <label htmlFor="experience" className={labelClass}>
          Chess Experience / Rating (optional)
        </label>
        <textarea
          id="experience"
          name="experience"
          rows={3}
          placeholder="Club, academy, FIDE/AICF rating, past tournaments — anything relevant."
          className={`${inputClass} min-h-[110px] resize-none`}
        />
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 rounded-lg border border-red-400/30 bg-red-50 px-4 py-3 text-sm text-red-800">
          <AlertCircle size={16} className="shrink-0" />
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-1 inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-full bg-brass px-7 py-3.5 font-mono text-xs uppercase tracking-widest text-ink transition hover:bg-brass-light disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" && <Loader2 size={15} className="animate-spin" />}
        {status === "submitting" ? "Submitting…" : "Register Now"}
      </button>

      <p className="mt-1 text-center font-mono text-[10px] uppercase tracking-widest text-board/40">
        Fields marked * are required
      </p>
    </form>
  );
}