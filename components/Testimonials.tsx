"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BRASS   = "#C9A227";
const BRASS_L = "#E2C158";
const SQ_DARK = "#4A6741";
const SQ_LIGHT= "#E8E0CC";

const TESTIMONIALS = [
  {
    quote: "My son walked in nervous and walked out asking when the next tournament would be. The atmosphere felt serious, warm, and beautifully organised.",
    name:   "Aarav Menon",
    detail: "Parent · U10 player",
    emoji:  "🧒",
    tag:    "Parent",
    color:  "rgba(201,162,39,0.12)",
    border: "rgba(201,162,39,0.25)",
  },
  {
    quote: "The hall felt premium, the rounds were smooth, and the prize moment felt unforgettable. It really felt like a real championship.",
    name:   "Diya Krishnan",
    detail: "U14 participant",
    emoji:  "♟️",
    tag:    "Player",
    color:  "rgba(74,103,65,0.18)",
    border: "rgba(74,103,65,0.35)",
  },
  {
    quote: "A strong platform for young talent. The structure, discipline, and presentation gave the event a level above a normal local tournament.",
    name:   "Rahul Varma",
    detail: "Coach & mentor",
    emoji:  "🏆",
    tag:    "Coach",
    color:  "rgba(201,162,39,0.08)",
    border: "rgba(201,162,39,0.18)",
  },
];

/* ── Star rating ── */
function Stars({ n = 5 }: { n?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path
            d="M6 1l1.2 3.6H11L8.1 6.8l1.1 3.5L6 8.1 2.8 10.3l1.1-3.5L1 4.6h3.8z"
            fill={i < n ? BRASS : "rgba(244,238,223,0.12)"}
          />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const sectionRef  = useRef<HTMLElement>(null);
  const [visible,   setVisible]  = useState(false);
  const [active,    setActive]   = useState(0);   // mobile carousel index

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const prev = () => setActive((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setActive((i) => (i + 1) % TESTIMONIALS.length);

  return (
    <>
      <style>{`
        @keyframes ts2-fadeUp {
          from { opacity:0; transform:translateY(22px); }
          to   { opacity:1; transform:translateY(0);    }
        }
        @keyframes ts2-glow {
          0%,100% { opacity:0.20; transform:scale(1);    }
          50%      { opacity:0.38; transform:scale(1.05); }
        }
        @keyframes ts2-cardIn {
          from { opacity:0; transform:scale(0.96) translateY(12px); }
          to   { opacity:1; transform:scale(1)    translateY(0);     }
        }

        .ts2-section {
          position:relative; overflow:hidden;
          background: linear-gradient(160deg,#0e1f0d 0%,#172416 50%,#1a2e18 100%);
        }
        .ts2-section::before {
          content:""; position:absolute; inset:0;
          background-image:
            linear-gradient(45deg,rgba(244,238,223,0.025) 25%,transparent 25%),
            linear-gradient(-45deg,rgba(244,238,223,0.025) 25%,transparent 25%),
            linear-gradient(45deg,transparent 75%,rgba(244,238,223,0.025) 75%),
            linear-gradient(-45deg,transparent 75%,rgba(244,238,223,0.025) 75%);
          background-size:64px 64px;
          background-position:0 0,0 32px,32px -32px,-32px 0;
          pointer-events:none; opacity:0.25;
        }
        .ts2-orb {
          position:absolute; border-radius:50%;
          filter:blur(80px); pointer-events:none;
          animation: ts2-glow 8s ease-in-out infinite;
        }

        /* Header */
        .ts2-visible .ts2-head { animation: ts2-fadeUp 0.7s 0.05s ease both; }
        .ts2-visible .ts2-sub  { animation: ts2-fadeUp 0.7s 0.15s ease both; }

        /* Desktop cards */
        .ts2-visible .ts2-card-0 { animation: ts2-cardIn 0.7s 0.10s ease both; }
        .ts2-visible .ts2-card-1 { animation: ts2-cardIn 0.7s 0.22s ease both; }
        .ts2-visible .ts2-card-2 { animation: ts2-cardIn 0.7s 0.34s ease both; }

        /* Card base */
        .ts2-card {
          position:relative; overflow:hidden;
          border-radius:24px;
          padding:24px 20px 20px;
          border:1px solid rgba(244,238,223,0.09);
          background:rgba(244,238,223,0.05);
          backdrop-filter:blur(8px);
          transition:transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
          display:flex; flex-direction:column; gap:14px;
        }
        .ts2-card:hover {
          transform:translateY(-4px);
          border-color:rgba(201,162,39,0.28);
          box-shadow:0 20px 48px rgba(0,0,0,0.24);
        }
        /* Shimmer top border on hover */
        .ts2-card::before {
          content:"";
          position:absolute; top:0; left:0; right:0; height:1.5px;
          background:linear-gradient(90deg,transparent,${BRASS},${BRASS_L},${BRASS},transparent);
          background-size:200% auto;
          opacity:0;
          transition:opacity 0.3s;
        }
        .ts2-card:hover::before { opacity:1; }

        /* Quote text */
        .ts2-quote {
          font-family:var(--font-plex-sans,sans-serif);
          font-size:14px;
          line-height:1.75;
          color:rgba(244,238,223,0.70);
          font-style:italic;
          flex:1;
        }

        /* Tag pill */
        .ts2-tag {
          display:inline-block;
          font-family:var(--font-plex-mono,monospace);
          font-size:9px;
          letter-spacing:0.16em;
          text-transform:uppercase;
          padding:4px 10px;
          border-radius:100px;
        }

        /* Mobile carousel */
        .ts2-carousel-track {
          display:flex;
          transition:transform 0.4s cubic-bezier(0.25,1,0.5,1);
          will-change:transform;
        }
        .ts2-carousel-slide {
          min-width:100%;
          padding:0 4px;
        }

        /* Dot nav */
        .ts2-dot {
          width:6px; height:6px;
          border-radius:50%;
          transition:all 0.25s;
          background:rgba(244,238,223,0.22);
        }
        .ts2-dot.active {
          width:20px;
          border-radius:4px;
          background:${BRASS};
        }

        /* Arrow buttons */
        .ts2-arrow {
          display:flex; align-items:center; justify-content:center;
          width:38px; height:38px; border-radius:50%;
          border:0.5px solid rgba(244,238,223,0.14);
          background:rgba(244,238,223,0.05);
          color:rgba(244,238,223,0.7);
          transition:background 0.2s, border-color 0.2s, color 0.2s;
          cursor:pointer;
        }
        .ts2-arrow:hover {
          background:rgba(201,162,39,0.12);
          border-color:rgba(201,162,39,0.35);
          color:${BRASS};
        }

        /* Bottom file strip */
        .ts2-file-strip {
          display:flex; gap:6px; align-items:center;
        }
        .ts2-file-sq {
          height:8px; border-radius:2px; flex:1;
        }

        @media (prefers-reduced-motion:reduce) {
          .ts2-visible .ts2-head,.ts2-visible .ts2-sub,
          .ts2-visible .ts2-card-0,.ts2-visible .ts2-card-1,.ts2-visible .ts2-card-2,
          .ts2-orb { animation:none!important; opacity:1!important; transform:none!important; }
          .ts2-card,.ts2-carousel-track { transition:none!important; }
        }
      `}</style>

      <section
        ref={sectionRef}
        className={`ts2-section px-4 py-16 sm:px-6 sm:py-24 ${visible ? "ts2-visible" : ""}`}
      >
        {/* Orbs */}
        <div className="ts2-orb -top-16 -left-16 h-[260px] w-[260px]"
          style={{ background:"rgba(201,162,39,0.10)" }} aria-hidden="true" />
        <div className="ts2-orb -bottom-12 -right-12 h-[240px] w-[240px]"
          style={{ background:"rgba(74,103,65,0.22)" }} aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-6xl">

          {/* ── Header ── */}
          <div className="ts2-head flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="rule-mono">
              <h2
                className="font-display font-semibold leading-[1.05]"
                style={{ fontSize:"clamp(30px,5vw,48px)", color:"#F4EEDF" }}
              >
                From the<br />
                <em className="not-italic" style={{ color:BRASS }}>tournament hall.</em>
              </h2>
            </div>
            <p className="ts2-sub max-w-[260px] font-body text-sm leading-relaxed"
              style={{ color:"rgba(244,238,223,0.45)" }}>
              What families, players, and coaches said after Spark64 2025.
            </p>
          </div>

          {/* ── DESKTOP: 3-col grid (hidden on mobile) ── */}
          <div className="mt-10 hidden gap-4 md:grid md:grid-cols-3">
            {TESTIMONIALS.map(({ quote, name, detail, emoji, tag, color, border }, idx) => (
              <article
                key={name}
                className={`ts2-card ts2-card-${idx}`}
              >
                {/* Top row: emoji avatar + tag + stars */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-2xl text-xl shrink-0"
                      style={{ background:color, border:`1px solid ${border}` }}
                    >
                      {emoji}
                    </div>
                    <div>
                      <p className="font-display text-sm font-semibold" style={{ color:"#F4EEDF" }}>
                        {name}
                      </p>
                      <p className="font-mono text-[9px] uppercase tracking-[0.14em]"
                        style={{ color:"rgba(244,238,223,0.38)" }}>
                        {detail}
                      </p>
                    </div>
                  </div>
                  <span
                    className="ts2-tag shrink-0"
                    style={{ background:color, color:BRASS, border:`0.5px solid ${border}` }}
                  >
                    {tag}
                  </span>
                </div>

                {/* Stars */}
                <Stars />

                {/* Quote */}
                <p className="ts2-quote">&ldquo;{quote}&rdquo;</p>

                {/* Bottom divider */}
                <div className="h-px" style={{ background:`linear-gradient(90deg,${BRASS}33,transparent)` }} />
              </article>
            ))}
          </div>

          {/* ── MOBILE: carousel (visible only on mobile) ── */}
          <div className="mt-8 md:hidden">
            <div className="overflow-hidden rounded-2xl">
              <div
                className="ts2-carousel-track"
                style={{ transform:`translateX(-${active * 100}%)` }}
              >
                {TESTIMONIALS.map(({ quote, name, detail, emoji, tag, color, border }) => (
                  <div key={name} className="ts2-carousel-slide">
                    <article
                      className="ts2-card"
                      style={{ borderRadius:"20px" }}
                    >
                      {/* Avatar + name */}
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-12 w-12 items-center justify-center rounded-2xl text-2xl shrink-0"
                          style={{ background:color, border:`1px solid ${border}` }}
                        >
                          {emoji}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-display text-base font-semibold truncate" style={{ color:"#F4EEDF" }}>
                            {name}
                          </p>
                          <p className="font-mono text-[9px] uppercase tracking-[0.13em]"
                            style={{ color:"rgba(244,238,223,0.38)" }}>
                            {detail}
                          </p>
                        </div>
                        <span
                          className="ts2-tag shrink-0"
                          style={{ background:color, color:BRASS, border:`0.5px solid ${border}` }}
                        >
                          {tag}
                        </span>
                      </div>

                      {/* Stars */}
                      <Stars />

                      {/* Quote — larger on mobile for readability */}
                      <p
                        className="font-body leading-[1.75] italic"
                        style={{ fontSize:"15px", color:"rgba(244,238,223,0.72)" }}
                      >
                        &ldquo;{quote}&rdquo;
                      </p>

                      <div className="h-px" style={{ background:`linear-gradient(90deg,${BRASS}33,transparent)` }} />
                    </article>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="mt-5 flex items-center justify-between px-1">
              {/* Dots */}
              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    className={`ts2-dot ${i === active ? "active" : ""}`}
                    onClick={() => setActive(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              {/* Arrows */}
              <div className="flex items-center gap-2">
                <button className="ts2-arrow" onClick={prev} aria-label="Previous testimonial">
                  <ChevronLeft size={16} />
                </button>
                <button className="ts2-arrow" onClick={next} aria-label="Next testimonial">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Count */}
            <p className="mt-3 text-center font-mono text-[9px] uppercase tracking-[0.18em]"
              style={{ color:"rgba(244,238,223,0.25)" }}>
              {active + 1} of {TESTIMONIALS.length}
            </p>
          </div>

          {/* ── File strip footer ── */}
          <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="ts2-file-strip max-w-[200px] w-full">
              {["a","b","c","d","e","f","g","h"].map((f, i) => (
                <div
                  key={f}
                  className="ts2-file-sq"
                  style={{ background: i % 2 === 0 ? SQ_DARK : SQ_LIGHT, opacity:0.5 }}
                />
              ))}
            </div>
            <p className="font-mono text-[9px] uppercase tracking-[0.18em]"
              style={{ color:"rgba(244,238,223,0.25)" }}>
              Spark64 2025 · Real words from real families
            </p>
          </div>

        </div>
      </section>
    </>
  );
}