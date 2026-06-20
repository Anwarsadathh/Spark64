"use client";

import { useEffect, useRef, useState } from "react";
import { Quote, Star, Crown, Shield } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "My son walked in nervous and walked out asking when the next tournament would be. The atmosphere felt serious, warm, and beautifully organised.",
    name: "Aarav Menon",
    detail: "Parent • U10 Player",
    icon: Star,
  },
  {
    quote:
      "The hall felt premium, the rounds were smooth, and the prize moment felt unforgettable. It really felt like a real championship.",
    name: "Diya Krishnan",
    detail: "U14 Participant",
    icon: Crown,
  },
  {
    quote:
      "A strong platform for young talent. The structure, discipline, and presentation gave the event a level above a normal local tournament.",
    name: "Rahul Varma",
    detail: "Coach & Mentor",
    icon: Shield,
  },
];

function QuoteMark() {
  return (
    <svg
      viewBox="0 0 70 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="ts-quote-mark"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ts-gold" x1="10" y1="10" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E7C96A" />
          <stop offset="55%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#8C6A12" />
        </linearGradient>
      </defs>
      <path
        d="M22 49C15 49 10 44 10 36C10 28 15 22 24 20L27 25C21 27 18 30 18 35H29V49H22Z"
        fill="url(#ts-gold)"
      />
      <path
        d="M47 49C40 49 35 44 35 36C35 28 40 22 49 20L52 25C46 27 43 30 43 35H54V49H47Z"
        fill="url(#ts-gold)"
      />
    </svg>
  );
}

export default function Testimonials() {
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
        @keyframes tsFadeUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes tsGlow {
          0%, 100% {
            opacity: .26;
            transform: scale(1);
          }
          50% {
            opacity: .52;
            transform: scale(1.04);
          }
        }

        @keyframes tsFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }

        @keyframes tsLine {
          from {
            transform: translateX(-12%);
          }
          to {
            transform: translateX(12%);
          }
        }

        .ts-section {
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(circle at 16% 18%, rgba(212,175,55,0.10), transparent 24%),
            radial-gradient(circle at 82% 20%, rgba(54,88,68,0.18), transparent 25%),
            linear-gradient(160deg, #102016 0%, #173024 100%);
        }

        .ts-section::before {
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
          opacity: .28;
          pointer-events: none;
        }

        .ts-orb {
          position: absolute;
          border-radius: 999px;
          filter: blur(78px);
          pointer-events: none;
          animation: tsGlow 8s ease-in-out infinite;
        }

        .ts-visible .ts-head,
        .ts-visible .ts-card {
          animation: tsFadeUp .8s ease both;
        }

        .ts-visible .ts-card:nth-child(1) { animation-delay: .08s; }
        .ts-visible .ts-card:nth-child(2) { animation-delay: .18s; }
        .ts-visible .ts-card:nth-child(3) { animation-delay: .28s; }

        .ts-quote-mark {
          width: 66px;
          height: 66px;
          animation: tsFloat 4.8s ease-in-out infinite;
          filter: drop-shadow(0 10px 24px rgba(212,175,55,0.16));
        }

        .ts-card {
          position: relative;
          overflow: hidden;
          border-radius: 26px;
          border: 1px solid rgba(247,241,227,0.12);
          background:
            linear-gradient(180deg, rgba(247,241,227,0.10), rgba(247,241,227,0.05));
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.05),
            0 18px 44px rgba(0,0,0,0.20);
          transition:
            transform 260ms ease,
            border-color 260ms ease,
            box-shadow 260ms ease;
        }

        .ts-card:hover {
          transform: translateY(-5px);
          border-color: rgba(212,175,55,0.26);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.06),
            0 24px 56px rgba(0,0,0,0.26);
        }

        .ts-card::after {
          content: "";
          position: absolute;
          inset: auto 0 0 0;
          height: 1px;
          background: linear-gradient(90deg, #D4AF37, transparent 70%);
          opacity: .85;
          animation: tsLine 4s ease-in-out infinite alternate;
        }

        .ts-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 14px;
          color: #E7C96A;
          border: 1px solid rgba(212,175,55,0.18);
          background: linear-gradient(135deg, rgba(212,175,55,0.20), rgba(212,175,55,0.07));
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.06);
        }

        .ts-mini-board {
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          gap: 4px;
          max-width: 132px;
        }

        .ts-mini-board span {
          height: 8px;
          border-radius: 999px;
        }

        @media (prefers-reduced-motion: reduce) {
          .ts-orb,
          .ts-quote-mark,
          .ts-card::after,
          .ts-visible .ts-head,
          .ts-visible .ts-card {
            animation: none !important;
          }

          .ts-card:hover {
            transform: none !important;
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        className={`ts-section px-6 py-24 ${visible ? "ts-visible" : ""}`}
      >
        <div
          className="ts-orb left-[-70px] top-[10px] h-[220px] w-[220px]"
          style={{ background: "rgba(212,175,55,0.11)" }}
          aria-hidden="true"
        />
        <div
          className="ts-orb right-[-60px] bottom-[0px] h-[210px] w-[210px]"
          style={{ background: "rgba(54,88,68,0.28)" }}
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="ts-head grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <div className="rule-mono">
                <h2 className="font-display text-4xl font-semibold leading-[1.04] text-[#F7F1E3] sm:text-5xl">
                  From the
                  <br />
                  tournament hall.
                </h2>
              </div>
            </div>

            <div className="flex flex-col items-start gap-5 lg:items-end">
              <QuoteMark />

              <div className="ts-mini-board" aria-hidden="true">
                {Array.from({ length: 8 }).map((_, i) => (
                  <span
                    key={i}
                    style={{ background: i % 2 === 0 ? "#D4AF37" : "#F7F1E3" }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {TESTIMONIALS.map(({ quote, name, detail, icon: Icon }) => (
              <article key={name} className="ts-card p-6 sm:p-7">
                <div className="ts-badge">
                  <Icon size={18} strokeWidth={1.8} />
                </div>

                <div className="mt-5">
                  <Quote size={18} className="text-[#D4AF37]/85" />
                </div>

                <p className="mt-4 font-body text-sm leading-relaxed text-[rgba(247,241,227,0.74)]">
                  {quote}
                </p>

                <div className="mt-6">
                  <p className="font-display text-lg text-[#F7F1E3]">{name}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[rgba(247,241,227,0.44)]">
                    {detail}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}