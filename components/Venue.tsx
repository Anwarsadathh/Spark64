"use client";

import { MapPin, CalendarClock } from "lucide-react";

export default function Venue() {
  return (
    <>
      <style>{`
        @keyframes venueFade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes venueClip {
          from {
            clip-path: inset(0 0 100% 0 round 24px);
            opacity: 0;
          }
          to {
            clip-path: inset(0 0 0 0 round 24px);
            opacity: 1;
          }
        }

        @keyframes venueGlow {
          0%, 100% {
            opacity: .28;
            transform: scale(1);
          }
          50% {
            opacity: .52;
            transform: scale(1.06);
          }
        }

        @keyframes venuePulse {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px);
          }
        }

        @keyframes venueLine {
          from {
            transform: translateX(-12%);
          }
          to {
            transform: translateX(12%);
          }
        }

        .venue-shell {
          position: relative;
          overflow: hidden;
        }

        .venue-panel {
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(139,90,43,0.18);
          background:
            linear-gradient(180deg, rgba(233,224,203,0.72), rgba(244,238,223,0.92));
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.55),
            0 18px 48px rgba(31,61,46,0.08);
          animation: venueClip .8s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .venue-panel::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 16% 20%, rgba(201,162,39,0.10), transparent 24%),
            radial-gradient(circle at 82% 22%, rgba(74,103,65,0.08), transparent 22%);
          pointer-events: none;
        }

        .venue-panel::after {
          content: "";
          position: absolute;
          left: 0;
          right: 35%;
          bottom: 0;
          height: 1px;
          background: linear-gradient(90deg, #C9A227, transparent);
          opacity: .85;
          animation: venueLine 4.5s ease-in-out infinite alternate;
          pointer-events: none;
        }

        .venue-orb {
          position: absolute;
          border-radius: 999px;
          filter: blur(48px);
          pointer-events: none;
          animation: venueGlow 8s ease-in-out infinite;
        }

        .venue-pin {
          animation: venuePulse 4s ease-in-out infinite;
          filter: drop-shadow(0 10px 16px rgba(201,162,39,0.18));
        }

        .venue-copy {
          color: rgba(22,36,28,0.68);
        }

        .venue-btn {
          position: relative;
          overflow: hidden;
          box-shadow: 0 12px 28px rgba(31,61,46,0.18);
          transition:
            transform 220ms ease,
            box-shadow 220ms ease,
            background-color 220ms ease;
        }

        .venue-btn::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            110deg,
            transparent 0%,
            rgba(255,255,255,0.18) 35%,
            transparent 70%
          );
          transform: translateX(-140%);
          transition: transform 700ms ease;
          pointer-events: none;
        }

        .venue-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 34px rgba(31,61,46,0.22);
        }

        .venue-btn:hover::before {
          transform: translateX(140%);
        }

        .venue-btn svg {
          transition: transform 220ms ease;
        }

        .venue-btn:hover svg {
          transform: rotate(-8deg) scale(1.05);
        }

        .venue-chess-dots {
          display: inline-grid;
          grid-template-columns: repeat(6, 10px);
          gap: 6px;
          margin-top: 1rem;
        }

        .venue-chess-dots span {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          animation: venueFade 1.1s ease both;
        }

        .venue-chess-dots span:nth-child(odd) {
          background: #C9A227;
        }

        .venue-chess-dots span:nth-child(even) {
          background: #4A6741;
        }

        @media (prefers-reduced-motion: reduce) {
          .venue-panel,
          .venue-orb,
          .venue-pin,
          .venue-panel::after,
          .venue-btn,
          .venue-btn::before,
          .venue-btn svg,
          .venue-chess-dots span {
            animation: none !important;
            transition: none !important;
          }

          .venue-btn:hover,
          .venue-btn:hover svg {
            transform: none !important;
          }
        }
      `}</style>

   <section id="venue" className="venue-shell mt-16 bg-ivory px-6 pb-24 sm:mt-20">
        <div
          className="venue-orb left-[8%] top-[20%] h-28 w-28"
          style={{ background: "rgba(201,162,39,0.14)" }}
          aria-hidden="true"
        />
        <div
          className="venue-orb right-[10%] bottom-[8%] h-24 w-24"
          style={{ background: "rgba(74,103,65,0.10)" }}
          aria-hidden="true"
        />

        <div className="mx-auto max-w-5xl">
          <div className="venue-panel flex flex-col items-start gap-8 rounded-[28px] px-8 py-10 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-5">
              <MapPin size={26} className="venue-pin mt-1 shrink-0 text-walnut" />
              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-walnut">
                  Venue &amp; Dates
                </p>

                <p className="mt-2 font-display text-2xl text-board sm:text-3xl">
                  To Be Announced
                </p>

                <p className="venue-copy mt-2 max-w-md font-body text-sm leading-relaxed">
                  We&apos;re finalising the tournament hall. Register now and
                  we&apos;ll send the venue, schedule, and round timings
                  straight to you the moment they&apos;re locked in.
                </p>

                <div className="venue-chess-dots" aria-hidden="true">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <span key={i} style={{ animationDelay: `${i * 90}ms` }} />
                  ))}
                </div>
              </div>
            </div>

            <a
              href="#register"
              className="venue-btn inline-flex shrink-0 items-center gap-2 rounded-full bg-board px-6 py-3 font-mono text-xs uppercase tracking-widest text-ivory hover:bg-board-light"
            >
              <CalendarClock size={15} />
              Notify Me
            </a>
          </div>
        </div>
      </section>
    </>
  );
}