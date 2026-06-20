"use client";

import { useEffect, useRef, useState } from "react";

const CATEGORIES = [
  { file: "a", age: "U6",  label: "Beginners",    desc: "Ages 6 & under",  moves: "First steps on the board" },
  { file: "b", age: "U8",  label: "Explorers",    desc: "Ages 8 & under",  moves: "Learning the game" },
  { file: "c", age: "U10", label: "Challengers",  desc: "Ages 10 & under", moves: "Building strategy" },
  { file: "d", age: "U12", label: "Tacticians",   desc: "Ages 12 & under", moves: "Opening theory begins" },
  { file: "e", age: "U14", label: "Strategists",  desc: "Ages 14 & under", moves: "Mid-game mastery" },
  { file: "f", age: "U16", label: "Competitors",  desc: "Ages 16 & under", moves: "Tournament veterans" },
  { file: "g", age: "U18", label: "Contenders",   desc: "Ages 18 & under", moves: "Elite-level play" },
  { file: "h", age: "U20", label: "Champions",    desc: "Ages 20 & under", moves: "The strongest board" },
];

/* Mini chess piece SVGs for each tier */
function PiecePawn() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" aria-hidden="true">
      <circle cx="12" cy="6" r="3.5" fill="currentColor" opacity="0.9"/>
      <path d="M9 9.5c0 2 1 3.5 3 4.5s3-2.5 3-4.5" fill="currentColor" opacity="0.7"/>
      <path d="M8 18h8l-1-4H9L8 18z" fill="currentColor"/>
      <rect x="6.5" y="18" width="11" height="2" rx="1" fill="currentColor"/>
    </svg>
  );
}
function PieceKnight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" aria-hidden="true">
      <path d="M9 20h6v-1.5H9V20z" fill="currentColor"/>
      <path d="M7.5 18.5h9v-1H7.5v1z" fill="currentColor"/>
      <path d="M8 17.5c0-4 1-6 3-8 .5-.5 2-1.5 2-3a2.5 2.5 0 00-5 0c0 1 .5 1.5 1 2L7 11l-.5 3 1 1v2.5H8z" fill="currentColor" opacity="0.85"/>
      <path d="M13 9.5c.5-.5 3-2 3-4.5a2 2 0 00-2-2c-.8 0-1.5.4-2 1" fill="currentColor" opacity="0.7"/>
    </svg>
  );
}
function PieceRook() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" aria-hidden="true">
      <rect x="7" y="3" width="2.5" height="4" rx="0.5" fill="currentColor"/>
      <rect x="10.75" y="3" width="2.5" height="4" rx="0.5" fill="currentColor"/>
      <rect x="14.5" y="3" width="2.5" height="4" rx="0.5" fill="currentColor"/>
      <path d="M7 7h10v8H7z" fill="currentColor" opacity="0.85"/>
      <rect x="6" y="15" width="12" height="2" rx="0.5" fill="currentColor"/>
      <rect x="5" y="17" width="14" height="2" rx="1" fill="currentColor"/>
    </svg>
  );
}
function PieceKing() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" aria-hidden="true">
      <rect x="11" y="2" width="2" height="5" rx="0.5" fill="currentColor"/>
      <rect x="9" y="4" width="6" height="2" rx="0.5" fill="currentColor"/>
      <path d="M8 7c0-.5 8-.5 8 0l1.5 8H6.5L8 7z" fill="currentColor" opacity="0.85"/>
      <rect x="5.5" y="15" width="13" height="2.5" rx="0.5" fill="currentColor"/>
      <rect x="4.5" y="17.5" width="15" height="2.5" rx="1" fill="currentColor"/>
    </svg>
  );
}

/* Assign piece by category tier */
const PIECE_COMPONENTS = [PiecePawn, PiecePawn, PieceKnight, PieceKnight, PieceRook, PieceRook, PieceKing, PieceKing];

/* Olive/cream palette — consistent with Hero & About */
const SQ_DARK  = "#4A6741";
const SQ_LIGHT = "#E8E0CC";
const BRASS    = "#C9A227";
const BRASS_L  = "#E2C158";

export default function Categories() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible]   = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes s64-cat-fadeUp {
          from { opacity:0; transform:translateY(28px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes s64-cat-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .cat-visible .cat-heading { animation: s64-cat-fadeUp 0.7s 0.05s ease both; }
        .cat-visible .cat-sub     { animation: s64-cat-fadeUp 0.7s 0.15s ease both; }
        .cat-visible .cat-grid    { animation: s64-cat-fadeUp 0.7s 0.25s ease both; }
        .cat-visible .cat-footer  { animation: s64-cat-fadeUp 0.7s 0.45s ease both; }

        .cat-card {
          position: relative;
          overflow: hidden;
          border-radius: 20px;
          border: 0.5px solid rgba(74,103,65,0.15);
          background: #F4EEDF;
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .cat-card:hover {
          transform: translateY(-4px) scale(1.01);
          box-shadow: 0 20px 48px -12px rgba(31,61,46,0.22);
          border-color: rgba(201,162,39,0.45);
        }
        .cat-card.active {
          border-color: #C9A227;
          box-shadow: 0 0 0 2px rgba(201,162,39,0.18), 0 20px 48px -12px rgba(31,61,46,0.22);
        }
        .cat-card-inner {
          padding: 24px 20px 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          height: 100%;
        }
        .cat-piece-wrap {
          width: 36px;
          height: 36px;
          color: #4A6741;
          transition: color 0.2s, transform 0.2s;
        }
        .cat-card:hover .cat-piece-wrap,
        .cat-card.active .cat-piece-wrap { color: #C9A227; transform: scale(1.15); }

        .cat-file-label {
          font-family: var(--font-plex-mono, monospace);
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(74,103,65,0.55);
          transition: color 0.2s;
        }
        .cat-card:hover .cat-file-label,
        .cat-card.active .cat-file-label { color: #C9A227; }

        .cat-age {
          font-family: var(--font-fraunces, serif);
          font-size: clamp(30px, 6vw, 42px);
          font-weight: 800;
          line-height: 1;
          color: #1F3D2E;
          transition: color 0.2s;
        }
        .cat-card:hover .cat-age,
        .cat-card.active .cat-age { color: #1F3D2E; }

        .cat-tier {
          font-family: var(--font-fraunces, serif);
          font-size: 14px;
          font-weight: 500;
          color: rgba(22,36,28,0.7);
        }
        .cat-desc {
          font-family: var(--font-plex-mono, monospace);
          font-size: 9px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(22,36,28,0.38);
        }
        .cat-moves {
          font-family: var(--font-plex-sans, sans-serif);
          font-size: 11px;
          color: rgba(22,36,28,0.45);
          margin-top: auto;
          padding-top: 8px;
          border-top: 0.5px solid rgba(74,103,65,0.12);
        }

        /* Checker corner decoration on each card */
        .cat-corner {
          position: absolute;
          top: 0; right: 0;
          width: 40px; height: 40px;
          opacity: 0.06;
          display: grid;
          grid-template-columns: repeat(4,1fr);
          border-radius: 0 20px 0 0;
          overflow: hidden;
        }
        .cat-card:hover .cat-corner { opacity: 0.14; }

        /* Register strip */
        .cat-register-strip {
          background: linear-gradient(135deg, #1F3D2E 0%, #2C5440 100%);
          border-radius: 20px;
          padding: 28px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }

        @media (prefers-reduced-motion: reduce) {
          .cat-visible .cat-heading,
          .cat-visible .cat-sub,
          .cat-visible .cat-grid,
          .cat-visible .cat-footer { animation: none !important; opacity: 1 !important; transform: none !important; }
          .cat-card { transition: none !important; }
        }
      `}</style>

      <section
        ref={sectionRef}
        id="categories"
        className={`bg-ivory-dim px-6 py-24 ${visible ? "cat-visible" : ""}`}
        style={{ background: "#EDE6D4" }}
      >
        <div className="mx-auto max-w-6xl">

          {/* ── Header ── */}
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="cat-heading rule-mono">
              <h2
                className="font-display font-semibold leading-[1.05]"
                style={{ fontSize: "clamp(34px,5vw,52px)", color: "#1F3D2E" }}
              >
                Eight files.<br />
                Eight categories.
              </h2>
            </div>
            <p
              className="cat-sub max-w-xs font-body text-base leading-relaxed"
              style={{ color: "rgba(22,36,28,0.58)" }}
            >
              Every player finds their board — from U6 to U20, mapped the way a
              chessboard maps its own files, <em>a</em> through <em>h</em>.
            </p>
          </div>

          {/* ── File coordinate bar ── */}
          <div className="cat-heading mt-8 flex gap-1 overflow-x-auto pb-1 min-w-0" aria-hidden="true" style={{ scrollbarWidth: "none" }}>
            {CATEGORIES.map(({ file, age }) => (
              <div key={file} className="flex flex-1 min-w-[60px] flex-col items-center gap-0.5">
                <div
                  className="w-full rounded-t-sm py-1 text-center font-mono text-[9px] uppercase tracking-widest"
                  style={{
                    background: CATEGORIES.indexOf(CATEGORIES.find(c => c.file === file)!) % 2 === 0 ? SQ_DARK : SQ_LIGHT,
                    color:      CATEGORIES.indexOf(CATEGORIES.find(c => c.file === file)!) % 2 === 0 ? SQ_LIGHT : SQ_DARK,
                  }}
                >
                  {file}
                </div>
                <span className="font-mono text-[8px]" style={{ color: "rgba(22,36,28,0.35)" }}>{age}</span>
              </div>
            ))}
          </div>

          {/* ── Category cards grid ── */}
          <div
            className="cat-grid mt-6 grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
          >
            {CATEGORIES.map((cat, idx) => {
              const PieceIcon = PIECE_COMPONENTS[idx];
              const isActive  = selected === cat.age;
              const isDarkSq  = idx % 2 === 0;

              /* Subtle per-card tint */
              const cardBg = isDarkSq
                ? "rgba(74,103,65,0.06)"
                : "#F4EEDF";

              return (
                <div
                  key={cat.age}
                  className={`cat-card ${isActive ? "active" : ""}`}
                  style={{ background: cardBg, animationDelay: `${0.05 * idx}s` }}
                  onClick={() => setSelected(isActive ? null : cat.age)}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isActive}
                  onKeyDown={(e) => e.key === "Enter" && setSelected(isActive ? null : cat.age)}
                >
                  {/* Checker corner */}
                  <div className="cat-corner">
                    {Array.from({ length: 16 }, (_, i) => (
                      <div
                        key={i}
                        style={{
                          background: (Math.floor(i / 4) + i) % 2 === 0 ? SQ_DARK : SQ_LIGHT,
                        }}
                      />
                    ))}
                  </div>

                  <div className="cat-card-inner">
                    <div className="flex items-start justify-between">
                      <div className="cat-piece-wrap">
                        <PieceIcon />
                      </div>
                      <span className="cat-file-label">File {cat.file}</span>
                    </div>

                    <div>
                      <p className="cat-age">{cat.age}</p>
                      <p className="cat-tier">{cat.label}</p>
                    </div>

                    <p className="cat-desc">{cat.desc}</p>
                    <p className="cat-moves">{cat.moves}</p>

                    {/* Active indicator */}
                    {isActive && (
                      <div
                        className="mt-2 rounded-full px-3 py-1 text-center font-mono text-[9px] uppercase tracking-widest"
                        style={{ background: "rgba(201,162,39,0.12)", color: BRASS }}
                      >
                        Selected ✓
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Selected detail panel ── */}
          {selected && (() => {
            const cat = CATEGORIES.find(c => c.age === selected)!;
            return (
              <div
                className="mt-4 flex items-center gap-4 rounded-2xl border px-6 py-4"
                style={{
                  borderColor: "rgba(201,162,39,0.3)",
                  background:  "rgba(201,162,39,0.06)",
                }}
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: BRASS, color: "#1F3D2E" }}
                >
                  <span className="font-display text-sm font-bold">{cat.file.toUpperCase()}</span>
                </div>
                <div className="flex-1">
                  <p className="font-display text-lg font-semibold" style={{ color: "#1F3D2E" }}>
                    {cat.age} · {cat.label}
                  </p>
                  <p className="font-body text-sm" style={{ color: "rgba(22,36,28,0.6)" }}>
                    {cat.desc} · {cat.moves}
                  </p>
                </div>
                <a
                  href="#register"
                  className="shrink-0 rounded-full px-5 py-2 font-mono text-[10px] uppercase tracking-widest transition hover:opacity-90"
                  style={{ background: BRASS, color: "#1F3D2E" }}
                >
                  Register →
                </a>
              </div>
            );
          })()}

          {/* ── Bottom register strip ── */}
          <div className="cat-footer mt-10 cat-register-strip">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: "rgba(232,224,204,0.5)" }}>
                All eight categories open
              </p>
              <p className="mt-1 font-display text-2xl font-semibold" style={{ color: SQ_LIGHT }}>
                Find your file. Make your move.
              </p>
            </div>
            <a
              href="#register"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-mono text-[10px] uppercase tracking-widest transition hover:-translate-y-0.5 hover:shadow-lg"
              style={{
                background:  `linear-gradient(135deg, ${BRASS_L}, ${BRASS})`,
                color:       "#1F3D2E",
                boxShadow:   "0 8px 28px rgba(201,162,39,0.30)",
              }}
            >
              Register Your Champion
            </a>
          </div>

        </div>
      </section>
    </>
  );
}