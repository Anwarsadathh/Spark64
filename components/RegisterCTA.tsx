"use client";

import { ArrowRight, ShieldCheck, Trophy, Grid2X2 } from "lucide-react";
import RegisterForm from "@/components/RegisterForm";

function ChessSeal() {
  return (
    <svg
      viewBox="0 0 92 92"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="rc-seal"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="rc-gold" x1="16" y1="10" x2="72" y2="78" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E2C158" />
          <stop offset="55%" stopColor="#C9A227" />
          <stop offset="100%" stopColor="#8B6912" />
        </linearGradient>
      </defs>
      <circle cx="46" cy="46" r="34" stroke="url(#rc-gold)" strokeWidth="4" />
      <path
        d="M46 24V38M40 30H52M39 40C39 38 53 38 53 40L55.5 49H36.5L39 40ZM35 49C31 49 28.5 51.6 28 55L26.5 62H65.5L64 55C63.5 51.6 61 49 57 49H35Z"
        fill="url(#rc-gold)"
      />
    </svg>
  );
}

function MiniFiles() {
  return (
    <div className="rc-files" aria-hidden="true">
      {Array.from({ length: 8 }).map((_, i) => (
        <span key={i} style={{ background: i % 2 === 0 ? "#E7C96A" : "#F7F1E3" }} />
      ))}
    </div>
  );
}

export default function RegisterCTA() {
  return (
    <>
      <style>{`
        @keyframes rcFadeUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes rcGlow {
          0%, 100% {
            opacity: .26;
            transform: scale(1);
          }
          50% {
            opacity: .48;
            transform: scale(1.04);
          }
        }

        @keyframes rcFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-7px);
          }
        }

        @keyframes rcLine {
          from {
            transform: translateX(-14%);
          }
          to {
            transform: translateX(14%);
          }
        }

        .rc-section {
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(circle at 18% 18%, rgba(212,175,55,0.10), transparent 24%),
            radial-gradient(circle at 82% 22%, rgba(54,88,68,0.16), transparent 24%),
            linear-gradient(160deg, #102016 0%, #173024 100%);
        }

        .rc-section::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(45deg, rgba(247,241,227,0.028) 25%, transparent 25%),
            linear-gradient(-45deg, rgba(247,241,227,0.028) 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, rgba(247,241,227,0.028) 75%),
            linear-gradient(-45deg, transparent 75%, rgba(247,241,227,0.028) 75%);
          background-size: 64px 64px;
          background-position: 0 0, 0 32px, 32px -32px, -32px 0;
          opacity: .3;
          pointer-events: none;
        }

        .rc-orb {
          position: absolute;
          border-radius: 999px;
          filter: blur(80px);
          pointer-events: none;
          animation: rcGlow 8s ease-in-out infinite;
        }

        .rc-shell {
          position: relative;
          z-index: 1;
          overflow: hidden;
          border-radius: 34px;
          border: 1px solid rgba(247,241,227,0.12);
          background:
            linear-gradient(180deg, rgba(247,241,227,0.08), rgba(247,241,227,0.04));
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.05),
            0 24px 60px rgba(0,0,0,0.24);
          backdrop-filter: blur(12px);
          animation: rcFadeUp .85s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .rc-shell::after {
          content: "";
          position: absolute;
          inset: auto 0 0 0;
          height: 1px;
          background: linear-gradient(90deg, #D4AF37, transparent 72%);
          opacity: .85;
          animation: rcLine 4.5s ease-in-out infinite alternate;
        }

        .rc-seal {
          width: 88px;
          height: 88px;
          animation: rcFloat 5s ease-in-out infinite;
          filter:
            drop-shadow(0 14px 28px rgba(0,0,0,0.34))
            drop-shadow(0 0 24px rgba(212,175,55,0.20));
        }

        .rc-chip {
          display: inline-flex;
          align-items: center;
          gap: .55rem;
          border-radius: 999px;
          padding: .55rem .9rem;
          border: 1px solid rgba(247,241,227,0.10);
          background: rgba(247,241,227,0.05);
          font-family: var(--font-plex-mono), monospace;
          font-size: 10px;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: rgba(247,241,227,0.58);
        }

        .rc-files {
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          gap: 6px;
          max-width: 180px;
        }

        .rc-files span {
          height: 10px;
          border-radius: 999px;
        }

        .rc-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: .7rem;
          border-radius: 999px;
          padding: 1rem 1.35rem;
          background: linear-gradient(135deg, #E7C96A, #D4AF37);
          color: #102016;
          font-family: var(--font-plex-mono), monospace;
          font-size: 10px;
          letter-spacing: .18em;
          text-transform: uppercase;
          box-shadow: 0 14px 34px rgba(212,175,55,0.28);
          transition: transform 220ms ease, box-shadow 220ms ease;
        }

        .rc-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 18px 40px rgba(212,175,55,0.34);
        }

        .rc-primary svg {
          transition: transform 220ms ease;
        }

        .rc-primary:hover svg {
          transform: translateX(4px);
        }

        .rc-side {
          border-radius: 26px;
          border: 1px solid rgba(247,241,227,0.14);
          background:
            linear-gradient(180deg, rgba(247,241,227,0.12), rgba(247,241,227,0.07));
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.12),
            0 14px 34px rgba(0,0,0,0.14);
        }

        @media (prefers-reduced-motion: reduce) {
          .rc-orb,
          .rc-shell,
          .rc-shell::after,
          .rc-seal {
            animation: none !important;
          }

          .rc-primary:hover,
          .rc-primary:hover svg {
            transform: none !important;
          }
        }
      `}</style>

      <section id="register" className="rc-section px-6 py-24">
        <div
          className="rc-orb left-[-70px] top-[20px] h-[220px] w-[220px]"
          style={{ background: "rgba(212,175,55,0.12)" }}
          aria-hidden="true"
        />
        <div
          className="rc-orb right-[-70px] bottom-[10px] h-[230px] w-[230px]"
          style={{ background: "rgba(54,88,68,0.26)" }}
          aria-hidden="true"
        />

        <div className="mx-auto max-w-6xl">
          <div className="rc-shell grid gap-8 p-7 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <div className="rule-mono">
                <h2 className="font-display text-5xl font-semibold leading-[1.02] text-[#F7F1E3] sm:text-6xl">
                  Make your move.
                </h2>
              </div>

              <p className="mt-5 max-w-md font-body text-base leading-relaxed text-[rgba(247,241,227,0.74)]">
                Registrations are open across all eight categories.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rc-chip">
                  <Grid2X2 size={13} strokeWidth={1.9} />
                  U6 to U20
                </span>
                <span className="rc-chip">
                  <Trophy size={13} strokeWidth={1.9} />
                  Medals & trophies
                </span>
                <span className="rc-chip">
                  <ShieldCheck size={13} strokeWidth={1.9} />
                  Premium event
                </span>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <a href="#register-form" className="rc-primary">
                  Register your champion
                  <ArrowRight size={15} strokeWidth={2} />
                </a>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <ChessSeal />
                <MiniFiles />
              </div>
            </div>

            <div
              id="register-form"
              className="rc-side p-5 sm:p-6"
            >
              <RegisterForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}