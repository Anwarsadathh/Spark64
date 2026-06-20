"use client";

import { ShieldCheck, Trophy, Users, Award } from "lucide-react";
import RegisterForm from "@/components/RegisterForm";

const BRASS   = "#C9A227";
const BRASS_L = "#E2C158";
const BG      = "#1a2e18";
const SQ_DARK = "#4A6741";
const SQ_LIGHT= "#E8E0CC";

/* ── Floating chess king ── */
function ChessKing() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="rc-king" aria-hidden="true">
      <defs>
        <linearGradient id="cta-kg" x1="8" y1="4" x2="52" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#E2C158" />
          <stop offset="55%"  stopColor="#C9A227" />
          <stop offset="100%" stopColor="#8B6912" />
        </linearGradient>
        <linearGradient id="cta-sh" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.35)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <filter id="cta-drop">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="rgba(0,0,0,0.5)" />
        </filter>
      </defs>
      <g filter="url(#cta-drop)">
        <rect x="29" y="3"  width="6"  height="16" rx="1.5" fill="url(#cta-kg)" />
        <rect x="22" y="7"  width="20" height="6"  rx="1.5" fill="url(#cta-kg)" />
        <path d="M24 19c0-1.5 16-1.5 16 0l4 18H20L24 19z" fill="url(#cta-kg)" opacity="0.9" />
        <rect x="14" y="37" width="36" height="8"  rx="1.5" fill="url(#cta-kg)" />
        <rect x="10" y="45" width="44" height="8"  rx="2.5" fill="url(#cta-kg)" />
        <path d="M24 19c0-1.5 13-1.5 15 0l3.5 14H22L24 19z" fill="url(#cta-sh)" opacity="0.45" />
      </g>
    </svg>
  );
}

/* ── Mini 8-file strip ── */
function FileStrip() {
  return (
    <div className="flex gap-1.5" aria-hidden="true">
      {["a","b","c","d","e","f","g","h"].map((f, i) => (
        <div key={f} className="flex flex-col items-center gap-0.5">
          <div
            className="h-7 w-7 rounded-md flex items-center justify-center font-mono text-[9px] font-medium uppercase"
            style={{
              background: i % 2 === 0 ? SQ_DARK  : SQ_LIGHT,
              color:      i % 2 === 0 ? SQ_LIGHT : SQ_DARK,
            }}
          >{f}</div>
        </div>
      ))}
    </div>
  );
}

/* ── Trust chips ── */
const CHIPS = [
  { icon: ShieldCheck, label: "Certified arbiters" },
  { icon: Trophy,      label: "Medals & trophies"  },
  { icon: Users,       label: "Family seating"      },
  { icon: Award,       label: "All 8 categories"    },
];

export default function RegisterCTA() {
  return (
    <>
      <style>{`
        @keyframes rc2-fadeUp {
          from { opacity:0; transform:translateY(28px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes rc2-glow {
          0%,100% { opacity:0.22; transform:scale(1);    }
          50%     { opacity:0.42; transform:scale(1.06); }
        }
        @keyframes rc2-float {
          0%,100% { transform:translateY(0)    rotate(-3deg); }
          50%     { transform:translateY(-10px) rotate(2deg);  }
        }
        @keyframes rc2-shimmer {
          0%   { background-position:-200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes rc2-borderFlow {
          from { transform: translateX(-100%); }
          to   { transform: translateX(100%);  }
        }

        /* Section */
        .rc2-section {
          position: relative;
          overflow: hidden;
          background: linear-gradient(160deg, #0e1f0d 0%, #172416 50%, #1a2e18 100%);
        }
        .rc2-section::before {
          content:"";
          position:absolute; inset:0;
          background-image:
            linear-gradient(45deg, rgba(244,238,223,0.025) 25%, transparent 25%),
            linear-gradient(-45deg,rgba(244,238,223,0.025) 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, rgba(244,238,223,0.025) 75%),
            linear-gradient(-45deg,transparent 75%, rgba(244,238,223,0.025) 75%);
          background-size:64px 64px;
          background-position:0 0, 0 32px, 32px -32px, -32px 0;
          pointer-events:none;
        }

        /* Orbs */
        .rc2-orb {
          position:absolute; border-radius:50%;
          filter:blur(90px); pointer-events:none;
          animation: rc2-glow 9s ease-in-out infinite;
        }

        /* Left panel */
        .rc2-left {
          animation: rc2-fadeUp 0.8s 0.1s ease both;
        }

        /* King */
        .rc-king {
          width: clamp(56px, 10vw, 80px);
          height: clamp(56px, 10vw, 80px);
          animation: rc2-float 5s ease-in-out infinite;
          filter: drop-shadow(0 12px 28px rgba(0,0,0,0.45)) drop-shadow(0 0 20px rgba(201,162,39,0.22));
        }

        /* Form card */
        .rc2-form-card {
          position:relative;
          overflow:hidden;
          border-radius:24px;
          border:1px solid rgba(244,238,223,0.10);
          background: linear-gradient(160deg, rgba(244,238,223,0.07) 0%, rgba(244,238,223,0.03) 100%);
          backdrop-filter:blur(12px);
          -webkit-backdrop-filter:blur(12px);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.06),
            0 32px 64px rgba(0,0,0,0.28);
          animation: rc2-fadeUp 0.9s 0.2s ease both;
        }
        /* Animated top border */
        .rc2-form-card::before {
          content:"";
          position:absolute;
          top:0; left:0; right:0;
          height:1.5px;
          background:linear-gradient(90deg, transparent, ${BRASS}, ${BRASS_L}, ${BRASS}, transparent);
          background-size:200% auto;
          animation: rc2-shimmer 4s linear infinite;
        }

        /* Chip */
        .rc2-chip {
          display:inline-flex; align-items:center; gap:6px;
          border-radius:100px;
          padding:7px 14px;
          border:0.5px solid rgba(244,238,223,0.10);
          background:rgba(244,238,223,0.05);
          font-family:var(--font-plex-mono,monospace);
          font-size:9px;
          letter-spacing:0.14em;
          text-transform:uppercase;
          color:rgba(244,238,223,0.52);
          white-space:nowrap;
        }

        /* Stat row */
        .rc2-stat-row {
          display:grid;
          grid-template-columns:repeat(3,1fr);
          gap:8px;
        }
        .rc2-stat {
          border-radius:14px;
          padding:12px 10px;
          text-align:center;
          border:0.5px solid rgba(244,238,223,0.08);
          background:rgba(244,238,223,0.04);
        }

        @media (max-width:768px) {
          .rc2-form-card { border-radius:20px; }
          .rc2-stat-row  { grid-template-columns:repeat(3,1fr); }
        }
        @media (max-width:480px) {
          .rc2-form-card { border-radius:18px; }
        }
        @media (prefers-reduced-motion:reduce) {
          .rc2-orb,.rc-king,.rc2-form-card::before,
          .rc2-left { animation:none!important; opacity:1!important; transform:none!important; }
        }
      `}</style>

      <section id="register" className="rc2-section px-4 py-16 sm:px-6 sm:py-24">

        {/* Orbs */}
        <div className="rc2-orb h-[280px] w-[280px] -top-16 -left-20"
          style={{ background:"rgba(201,162,39,0.10)" }} aria-hidden="true" />
        <div className="rc2-orb h-[320px] w-[320px] -bottom-20 -right-16"
          style={{ background:"rgba(74,103,65,0.22)" }} aria-hidden="true" />
        <div className="rc2-orb h-[200px] w-[200px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ background:"rgba(201,162,39,0.06)" }} aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-10">

            {/* ── Left: pitch ── */}
            <div className="rc2-left flex flex-col gap-6">

              {/* King + eyebrow */}
              <div className="flex items-center gap-4">
                <ChessKing />
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em]"
                    style={{ color:"rgba(244,238,223,0.38)" }}>
                    2026 Edition · Open Now
                  </p>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em]"
                    style={{ color: BRASS }}>
                    Spark64 · Raven Rows
                  </p>
                </div>
              </div>

              {/* Heading */}
              <div className="rule-mono">
                <h2
                  className="font-display font-semibold leading-[1.0]"
                  style={{ fontSize:"clamp(38px,7vw,60px)", color:"#F4EEDF" }}
                >
                  Make your<br />
                  <em className="not-italic" style={{
                    background:`linear-gradient(135deg,${BRASS_L},${BRASS})`,
                    WebkitBackgroundClip:"text",
                    WebkitTextFillColor:"transparent",
                    backgroundClip:"text",
                  }}>move.</em>
                </h2>
              </div>

              <p className="font-body text-base leading-relaxed"
                style={{ color:"rgba(244,238,223,0.60)", maxWidth:"360px" }}>
                Registrations are open across all eight categories — U6 through U20.
                Secure your child&apos;s board before the field fills up.
              </p>

              {/* Stat row */}
              <div className="rc2-stat-row">
                {[
                  { n:"8",   l:"Categories" },
                  { n:"2",   l:"Days"       },
                  { n:"64",  l:"Squares"    },
                ].map(st => (
                  <div key={st.l} className="rc2-stat">
                    <p className="font-display text-2xl font-bold" style={{ color:BRASS }}>{st.n}</p>
                    <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.14em]"
                      style={{ color:"rgba(244,238,223,0.35)" }}>{st.l}</p>
                  </div>
                ))}
              </div>

              {/* Trust chips */}
              <div className="flex flex-wrap gap-2">
                {CHIPS.map(({ icon:Icon, label }) => (
                  <span key={label} className="rc2-chip">
                    <Icon size={12} strokeWidth={1.8} />
                    {label}
                  </span>
                ))}
              </div>

              {/* File strip */}
              <FileStrip />

              {/* Divider */}
              <div className="h-px" style={{ background:"rgba(244,238,223,0.07)" }} />

              {/* Bottom trust line */}
              <p className="font-mono text-[9px] uppercase tracking-[0.16em]"
                style={{ color:"rgba(244,238,223,0.25)" }}>
                Certified arbiters · Medals & trophies · Venue announced soon
              </p>
            </div>

            {/* ── Right: form card ── */}
            <div className="rc2-form-card p-4 sm:p-6 lg:p-7">
              <RegisterForm />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}