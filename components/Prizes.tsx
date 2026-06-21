"use client";

import { useEffect, useRef, useState } from "react";
import { Trophy, Medal, Sparkles } from "lucide-react";

function CrownMark() {
  return (
    <svg
      viewBox="0 0 88 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="pr-crown"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="pr-gold"
          x1="10"
          y1="10"
          x2="74"
          y2="76"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#E2C158" />
          <stop offset="52%" stopColor="#C9A227" />
          <stop offset="100%" stopColor="#8C6A12" />
        </linearGradient>
      </defs>
      <path
        d="M18 61L24 26L39 43L44 19L49 43L64 26L70 61"
        stroke="url(#pr-gold)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="20" y="61" width="48" height="9" rx="4.5" fill="url(#pr-gold)" />
      <circle cx="24" cy="24" r="4" fill="#E2C158" />
      <circle cx="44" cy="17" r="4" fill="#E2C158" />
      <circle cx="64" cy="24" r="4" fill="#E2C158" />
    </svg>
  );
}

function PrizeIcon({
  type,
  className = "",
}: {
  type: "trophy" | "medal";
  className?: string;
}) {
  return (
    <div className={`pr-icon-shell ${className}`} aria-hidden="true">
      {type === "trophy" ? (
        <Trophy size={26} strokeWidth={1.8} />
      ) : (
        <Medal size={26} strokeWidth={1.8} />
      )}
    </div>
  );
}

export default function Prizes() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes prFadeRight {
          from {
            opacity: 0;
            transform: translateX(44px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes prGlow {
          0%, 100% {
            opacity: .32;
            transform: scale(1);
          }
          50% {
            opacity: .6;
            transform: scale(1.06);
          }
        }

        @keyframes prFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-7px);
          }
        }

        @keyframes prShine {
          from {
            transform: translateX(-140%) skewX(-18deg);
            opacity: 0;
          }
          18% {
            opacity: .16;
          }
          to {
            transform: translateX(180%) skewX(-18deg);
            opacity: 0;
          }
        }

        .pr-section {
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(circle at 16% 24%, rgba(201,162,39,0.12), transparent 28%),
            radial-gradient(circle at 84% 18%, rgba(74,103,65,0.14), transparent 24%),
            linear-gradient(180deg, #F4EEDF 0%, #EDE4D0 100%);
        }

        .pr-section::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(45deg, rgba(31,61,46,0.03) 25%, transparent 25%),
            linear-gradient(-45deg, rgba(31,61,46,0.03) 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, rgba(31,61,46,0.03) 75%),
            linear-gradient(-45deg, transparent 75%, rgba(31,61,46,0.03) 75%);
          background-size: 64px 64px;
          background-position: 0 0, 0 32px, 32px -32px, -32px 0;
          opacity: 0.3;
          pointer-events: none;
        }

        .pr-orb {
          position: absolute;
          border-radius: 999px;
          filter: blur(70px);
          pointer-events: none;
          animation: prGlow 8s ease-in-out infinite;
        }

        .pr-animate {
          opacity: 0;
          transform: translateX(44px);
        }

        .pr-visible .pr-animate {
          animation: prFadeRight .8s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .pr-visible .pr-animate:nth-child(1) { animation-delay: 0.04s; }
        .pr-visible .pr-animate:nth-child(2) { animation-delay: 0.18s; }
        .pr-visible .pr-animate:nth-child(3) { animation-delay: 0.32s; }

        .pr-crown {
          width: 78px;
          height: 78px;
          animation: prFloat 4.8s ease-in-out infinite;
          filter: drop-shadow(0 10px 24px rgba(201,162,39,0.20));
        }

        .pr-hero-panel {
          position: relative;
          overflow: hidden;
          border-radius: 30px;
          border: 1px solid rgba(31,61,46,0.10);
          background:
            linear-gradient(135deg, rgba(255,255,255,0.60), rgba(255,255,255,0.28)),
            linear-gradient(180deg, rgba(201,162,39,0.05), rgba(201,162,39,0.01));
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.45),
            0 24px 70px rgba(31,61,46,0.12);
          backdrop-filter: blur(10px);
        }

        .pr-hero-panel::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            110deg,
            transparent 0%,
            rgba(255,255,255,0.24) 35%,
            transparent 70%
          );
          transform: translateX(-140%) skewX(-18deg);
          animation: prShine 7s ease-in-out infinite;
          pointer-events: none;
        }

        .pr-icon-shell {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 68px;
          height: 68px;
          border-radius: 20px;
          color: #C9A227;
          border: 1px solid rgba(201,162,39,0.18);
          background: linear-gradient(135deg, rgba(201,162,39,0.16), rgba(201,162,39,0.05));
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.28),
            0 10px 24px rgba(31,61,46,0.08);
        }

        .pr-card {
          position: relative;
          overflow: hidden;
          border-radius: 26px;
          border: 1px solid rgba(31,61,46,0.10);
          background:
            linear-gradient(180deg, rgba(255,255,255,0.62), rgba(255,255,255,0.40));
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.45),
            0 18px 46px rgba(31,61,46,0.10);
          transition:
            transform 280ms ease,
            border-color 280ms ease,
            box-shadow 280ms ease;
        }

        .pr-card:hover {
          transform: translateY(-5px);
          border-color: rgba(201,162,39,0.22);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.48),
            0 24px 58px rgba(31,61,46,0.14);
        }

        .pr-card::before {
          content: "";
          position: absolute;
          inset: auto 0 0 0;
          height: 1px;
          background: linear-gradient(90deg, #C9A227, transparent 75%);
          opacity: 0.8;
        }

        .pr-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          border-radius: 999px;
          padding: 0.42rem 0.78rem;
          border: 1px solid rgba(31,61,46,0.10);
          background: rgba(255,255,255,0.42);
          font-family: var(--font-plex-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(31,61,46,0.56);
        }

        .pr-note {
          border-radius: 18px;
          border: 1px solid rgba(201,162,39,0.14);
          background: rgba(201,162,39,0.08);
        }

        .pr-winner-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          border-radius: 24px;
          border: 1px solid rgba(31,61,46,0.10);
          background: rgba(255,255,255,0.35);
          padding: 1.5rem;
        }

        @media (max-width: 768px) {
          .pr-section {
            padding-top: 5rem !important;
            padding-bottom: 5rem !important;
          }

          .pr-hero-panel {
            border-radius: 24px;
          }

          .pr-crown {
            width: 56px;
            height: 56px;
          }

          .pr-icon-shell {
            width: 56px;
            height: 56px;
            border-radius: 16px;
          }

          .pr-pill {
            font-size: 9px;
            letter-spacing: 0.1em;
            padding: 0.42rem 0.68rem;
          }

          .pr-card {
            border-radius: 22px;
          }

          .pr-note {
            border-radius: 16px;
          }

          .pr-winner-box {
            padding: 1rem;
            gap: 0.75rem;
            border-radius: 20px;
            align-items: center;
          }
        }

        @media (max-width: 640px) {
          .pr-hero-panel {
            padding: 1.25rem !important;
            gap: 1.25rem !important;
          }

          .pr-winner-box {
            padding: 1rem;
          }

          .pr-mobile-title {
            font-size: 2rem !important;
            line-height: 1.02 !important;
          }

          .pr-mobile-copy {
            font-size: 15px !important;
            line-height: 1.75 !important;
          }

          .pr-mobile-subtitle {
            font-size: 22px !important;
            line-height: 1.16 !important;
          }

          .pr-mobile-card-title {
            font-size: 28px !important;
          }

          .pr-mobile-card-copy {
            font-size: 15px !important;
            line-height: 1.72 !important;
          }

          .pr-mobile-note-copy {
            font-size: 14px !important;
            line-height: 1.65 !important;
          }

          .pr-mobile-label {
            font-size: 11px !important;
            letter-spacing: 0.16em !important;
          }
        }

        @media (max-width: 520px) {
          .pr-section {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }

          .pr-hero-panel {
            border-radius: 22px;
          }

          .pr-winner-box {
            display: grid;
            grid-template-columns: 1fr auto;
            align-items: center;
            padding: 0.95rem;
            gap: 0.8rem;
          }

          .pr-crown {
            width: 48px;
            height: 48px;
          }

          .pr-icon-shell {
            width: 52px;
            height: 52px;
          }

          .pr-mobile-title {
            font-size: 1.85rem !important;
          }

          .pr-mobile-subtitle {
            font-size: 20px !important;
          }

          .pr-mobile-copy {
            font-size: 14px !important;
          }

          .pr-mobile-card-title {
            font-size: 26px !important;
          }

          .pr-mobile-card-copy {
            font-size: 14px !important;
          }

          .pr-mobile-note-copy {
            font-size: 13px !important;
          }

          .pr-mobile-label {
            font-size: 10px !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .pr-orb,
          .pr-crown,
          .pr-hero-panel::after,
          .pr-visible .pr-animate {
            animation: none !important;
          }

          .pr-card:hover {
            transform: none !important;
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        id="prizes"
        className={`pr-section px-6 py-24 ${visible ? "pr-visible" : ""}`}
      >
        <div
          className="pr-orb left-[-70px] top-[10px] h-[220px] w-[220px]"
          style={{ background: "rgba(201,162,39,0.12)" }}
          aria-hidden="true"
        />
        <div
          className="pr-orb right-[-60px] bottom-[0px] h-[210px] w-[210px]"
          style={{ background: "rgba(74,103,65,0.16)" }}
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="pr-hero-panel pr-animate grid gap-8 p-7 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <div className="rule-mono">
                <h2 className="pr-mobile-title font-display text-4xl font-semibold leading-[1.04] text-board sm:text-5xl">
                  Champions take
                  <br />
                  the board.
                </h2>
              </div>

              <p className="pr-mobile-copy mt-5 max-w-md font-body text-base leading-relaxed text-ink/70">
                Spark64 rewards standout performance with championship trophies,
                finishing medals, and a prize moment that feels worthy of the
                effort behind every move.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="pr-pill pr-mobile-label">
                  <Sparkles size={12} strokeWidth={1.8} />
                  8 categories
                </span>
                <span className="pr-pill pr-mobile-label">U6 to U20</span>
                <span className="pr-pill pr-mobile-label">2026 edition</span>
              </div>
            </div>

            <div className="pr-winner-box">
              <div className="min-w-0">
                <p className="pr-mobile-label font-mono text-[10px] uppercase tracking-[0.2em] text-brass">
                  Winner’s circle
                </p>
                <p className="pr-mobile-subtitle mt-3 font-display text-2xl leading-tight text-board">
                  Every category ends with a proper podium moment.
                </p>
              </div>

              <div className="shrink-0">
                <CrownMark />
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <article className="pr-card pr-animate p-7 sm:p-8">
              <PrizeIcon type="trophy" />
              <p className="pr-mobile-label mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-brass">
                Championship prize
              </p>
              <h3 className="pr-mobile-card-title mt-3 font-display text-3xl text-board">
                Trophies
              </h3>
              <p className="pr-mobile-card-copy mt-3 max-w-md font-body text-sm leading-relaxed text-ink/70">
                Awarded to the champion of each of the eight categories — from
                U6 through U20 — giving every winning board its own title moment.
              </p>

              <div className="pr-note mt-6 px-4 py-4">
                <p className="pr-mobile-label font-mono text-[10px] uppercase tracking-[0.16em] text-ink/45">
                  Includes
                </p>
                <p className="pr-mobile-note-copy mt-2 font-body text-sm leading-relaxed text-ink/75">
                  Category champion recognition, stage presentation, and premium
                  trophy handover.
                </p>
              </div>
            </article>

            <article className="pr-card pr-animate p-7 sm:p-8">
              <PrizeIcon type="medal" />
              <p className="pr-mobile-label mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-brass">
                Finisher recognition
              </p>
              <h3 className="pr-mobile-card-title mt-3 font-display text-3xl text-board">
                Medals
              </h3>
              <p className="pr-mobile-card-copy mt-3 max-w-md font-body text-sm leading-relaxed text-ink/70">
                Presented to top finishers in each category, recognising players
                who held their nerve, played strong rounds, and pushed hardest
                across the tournament.
              </p>

              <div className="pr-note mt-6 px-4 py-4">
                <p className="pr-mobile-label font-mono text-[10px] uppercase tracking-[0.16em] text-ink/45">
                  Designed for
                </p>
                <p className="pr-mobile-note-copy mt-2 font-body text-sm leading-relaxed text-ink/75">
                  Podium-style recognition beyond the winner, giving more young
                  players a memorable finish to the event.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}