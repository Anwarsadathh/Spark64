"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

/*
  Color palette — extracted from uploaded board image:
  Dark squares : #4A6741  (muted olive-green)
  Light squares: #E8E0CC  (warm cream)
  Background   : #2D3E28  (deep forest, not near-black)
  Mid-tone bg  : #364B30  (slightly lighter forest for gradients)
*/

const BG         = "#2D3E28";
const BG_MID     = "#364B30";
const SQ_DARK    = "#4A6741";
const SQ_LIGHT   = "#E8E0CC";
const BRASS      = "#C9A227";
const BRASS_L    = "#E2C158";
const IVORY      = "#F4EEDF";

const PARTICLE_COUNT = 28;
const PARTICLE_COLORS = [
  "rgba(201,162,39,0.75)",
  "rgba(226,193,88,0.55)",
  "rgba(156,126,31,0.65)",
  "rgba(232,224,204,0.35)",
  "rgba(74,103,65,0.9)",
];

/* ─── 3D Chess King ─── */
function ChessKing() {
  return (
    <svg
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="hero-piece"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="kg1" x1="20" y1="0" x2="76" y2="96" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#E2C158" />
          <stop offset="50%"  stopColor="#C9A227" />
          <stop offset="100%" stopColor="#7A5E0E" />
        </linearGradient>
        <linearGradient id="kg2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.35)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <filter id="ks">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="rgba(0,0,0,0.5)" />
        </filter>
      </defs>
      <g filter="url(#ks)">
        <rect x="43" y="4"  width="10" height="26" rx="2" fill="url(#kg1)" />
        <rect x="33" y="10" width="30" height="10" rx="2" fill="url(#kg1)" />
        <path d="M36 30 C36 26 60 26 60 30 L64 52 H32 Z"                    fill="url(#kg1)" />
        <path d="M30 52 C24 52 20 56 20 62 L18 76 H78 L76 62 C76 56 72 52 66 52 Z" fill="url(#kg1)" />
        <rect x="14" y="76" width="68" height="10" rx="4"                   fill="url(#kg1)" />
        <path d="M36 30 C36 26 56 26 58 30 L61 48 H35 Z"  fill="url(#kg2)" opacity="0.5" />
      </g>
    </svg>
  );
}

/* ─── Mini corner chessboard ─── */
function MiniBoard({ size, cols }: { size: number; cols: [string, string] }) {
  const n = 4;
  const sq = size / n;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      {Array.from({ length: n * n }, (_, i) => {
        const r = Math.floor(i / n);
        const c = i % n;
        return (
          <rect
            key={i}
            x={c * sq} y={r * sq}
            width={sq}  height={sq}
            fill={cols[(r + c) % 2]}
          />
        );
      })}
    </svg>
  );
}

export default function Hero() {
  const canvasRef            = useRef<HTMLCanvasElement>(null);
  const particleContainerRef = useRef<HTMLDivElement>(null);

  /* Draw perspective chessboard using olive/cream palette */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const sq = 70;
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        ctx.fillStyle = (r + c) % 2 === 0 ? SQ_DARK : SQ_LIGHT;
        ctx.fillRect(c * sq, r * sq, sq, sq);
      }
    }
    ctx.strokeStyle = "rgba(201,162,39,0.5)";
    ctx.lineWidth   = 3;
    ctx.strokeRect(1, 1, 558, 558);
  }, []);

  /* Spawn floating particles */
  useEffect(() => {
    const container = particleContainerRef.current;
    if (!container) return;
    const particles: HTMLDivElement[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p    = document.createElement("div");
      const size = Math.random() * 3 + 1;
      Object.assign(p.style, {
        position:    "absolute",
        width:       `${size}px`,
        height:      `${size}px`,
        borderRadius:"50%",
        background:  PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
        left:        `${Math.random() * 100}%`,
        bottom:      `${Math.random() * 30}%`,
        animation:   `s64-floatUp ${Math.random() * 6 + 5}s ${Math.random() * 8}s linear infinite`,
        pointerEvents:"none",
      });
      container.appendChild(p);
      particles.push(p);
    }
    return () => particles.forEach((p) => p.remove());
  }, []);

  const stats  = [
    { num: "8",  label: "Categories" },
    { num: "2",  label: "Days"       },
    { num: "64", label: "Squares"    },
    { num: "∞",  label: "Moves"      },
  ];
  const badges = ["U6 – U20", "Certified Arbiters", "Trophies & Medals", "2026 Edition"];

  return (
    <>
      <style>{`
        @keyframes s64-floatUp {
          0%   { opacity:0; transform:translateY(0) scale(1); }
          15%  { opacity:1; }
          85%  { opacity:0.4; }
          100% { opacity:0; transform:translateY(-260px) scale(0.4); }
        }
        @keyframes s64-levitate {
          0%,100% { transform:translateY(0); }
          50%     { transform:translateY(-10px); }
        }
        @keyframes s64-fadeUp {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes s64-rotateSlow {
          from { transform:rotate(0deg); }
          to   { transform:rotate(360deg); }
        }
        @keyframes s64-pulseDown {
          0%,100% { opacity:0.5; transform:scaleY(1); }
          50%     { opacity:1;   transform:scaleY(1.15); }
        }

        .hero-piece {
          width:96px; height:96px;
          animation: s64-fadeUp 0.6s 0.1s ease both,
                     s64-levitate 4s 1s ease-in-out infinite;
          filter: drop-shadow(0 0 28px rgba(201,162,39,0.6))
                  drop-shadow(0 16px 32px rgba(0,0,0,0.5));
        }
        .hero-cr {
          position:absolute; top:16px; right:16px;
          opacity:0.15;
          animation: s64-rotateSlow 60s linear infinite;
        }
        .hero-cl {
          position:absolute; top:16px; left:16px;
          opacity:0.09;
          animation: s64-rotateSlow 80s linear infinite reverse;
        }
        .s64-f0 { animation: s64-fadeUp 0.6s 0.00s ease both; }
        .s64-f1 { animation: s64-fadeUp 0.7s 0.20s ease both; }
        .s64-f2 { animation: s64-fadeUp 0.7s 0.30s ease both; }
        .s64-f3 { animation: s64-fadeUp 0.7s 0.45s ease both; }
        .s64-f4 { animation: s64-fadeUp 0.7s 0.50s ease both; }
        .s64-f5 { animation: s64-fadeUp 0.7s 0.55s ease both; }
        .s64-f6 { animation: s64-fadeUp 0.7s 0.65s ease both; }
        .s64-f7 { animation: s64-fadeUp 0.7s 0.75s ease both; }
        .s64-scroll { animation: s64-pulseDown 2s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .hero-piece,.hero-cr,.hero-cl,.s64-scroll,[class^="s64-f"] {
            animation: none !important;
          }
        }
      `}</style>

      <section
        className="relative overflow-hidden min-h-[600px]"
        style={{ background: `linear-gradient(160deg, ${BG_MID} 0%, ${BG} 60%)` }}
      >
        {/* Checkerboard texture overlay — matches your globals.css .checkerboard-bg */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 checkerboard-bg opacity-40"
        />

        {/* ── Glow orbs — olive-tinted, not blue-black ── */}
        <div aria-hidden="true" className="pointer-events-none absolute -top-24 -left-20 h-[360px] w-[360px] rounded-full"
          style={{ background: `rgba(201,162,39,0.12)`, filter: "blur(90px)" }} />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-10 -right-14 h-[300px] w-[300px] rounded-full"
          style={{ background: `rgba(74,103,65,0.35)`, filter: "blur(80px)" }} />
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: `rgba(201,162,39,0.07)`, filter: "blur(70px)" }} />

        {/* ── 3-D perspective chessboard canvas ── */}
        <canvas
          ref={canvasRef}
          width={560}
          height={560}
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[-60px] left-1/2"
          style={{
            width: 560, height: 560,
            transform: "translateX(-50%) perspective(900px) rotateX(58deg)",
            opacity: 0.22,
          }}
        />

        {/* ── Corner watermarks ── */}
        <div className="hero-cr" aria-hidden="true">
          <MiniBoard size={80} cols={[BRASS, SQ_LIGHT]} />
        </div>
        <div className="hero-cl" aria-hidden="true">
          <MiniBoard size={60} cols={[SQ_DARK, SQ_LIGHT]} />
        </div>

        {/* ── Particles ── */}
        <div ref={particleContainerRef} aria-hidden="true" className="pointer-events-none absolute inset-0" />

        {/* ── Content ── */}
        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 pb-24 pt-14 text-center">

          {/* Eyebrow */}
          <p className="s64-f0 font-mono text-[10px] uppercase tracking-[0.28em] rounded-full px-[18px] py-[6px]"
            style={{
              color: BRASS,
              border: `0.5px solid rgba(201,162,39,0.32)`,
              background: `rgba(201,162,39,0.10)`,
            }}
          >
            Registrations Open · 2026 Edition
          </p>

          {/* King */}
          <ChessKing />

          {/* Wordmark */}
          <h1
            className="s64-f1 mt-5 font-display font-black leading-none tracking-[-2px]"
            style={{ fontSize: "clamp(64px, 12vw, 100px)", color: IVORY }}
          >
            SPARK
            <span style={{
              background: `linear-gradient(135deg, ${BRASS_L} 0%, ${BRASS} 45%, #9C7E1F 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>64</span>
          </h1>

          <p className="s64-f2 mt-3 font-display text-2xl italic sm:text-3xl"
            style={{ color: `rgba(244,238,223,0.78)` }}>
            Youth Chess Talent Hunt
          </p>
          <p className="s64-f2 mt-1 font-mono text-[10px] uppercase tracking-[0.2em]"
            style={{ color: `rgba(244,238,223,0.32)` }}>
            Powered by Raven Rows
          </p>

          {/* Description */}
          <p className="s64-f3 mx-auto mt-6 max-w-[440px] text-balance font-body text-[15px] leading-[1.75]"
            style={{ color: `rgba(244,238,223,0.62)` }}>
            Eight age categories. One board. A new generation of chess talent steps up to
            compete, learn, and earn their place among the champions.
          </p>

          {/* Badges */}
          <div className="s64-f4 mt-4 flex flex-wrap justify-center gap-2">
            {badges.map((b) => (
              <span key={b}
                className="rounded-full px-3 py-1 font-mono text-[9px] uppercase tracking-[0.15em]"
                style={{
                  color: `rgba(244,238,223,0.48)`,
                  border: `0.5px solid rgba(244,238,223,0.14)`,
                }}
              >{b}</span>
            ))}
          </div>

          {/* CTAs */}
          <div className="s64-f5 mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#register"
              className="group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5
                         font-mono text-[10px] uppercase tracking-[0.2em] transition hover:-translate-y-0.5"
              style={{
                background: `linear-gradient(135deg, ${BRASS_L}, ${BRASS})`,
                color: BG,
                boxShadow: `0 8px 32px rgba(201,162,39,0.30)`,
              }}
            >
              Register Your Champion
              <ArrowRight size={14} className="transition group-hover:translate-x-0.5" />
            </a>
            <a
              href="#categories"
              className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5
                         font-mono text-[10px] uppercase tracking-[0.2em] transition"
              style={{
                color: `rgba(244,238,223,0.82)`,
                border: `0.5px solid rgba(244,238,223,0.24)`,
              }}
            >
              View Categories
            </a>
          </div>

          {/* Stats bar */}
          <div
            className="s64-f6 mt-14 flex w-full max-w-md overflow-hidden rounded-2xl"
            style={{
              border: `0.5px solid rgba(244,238,223,0.10)`,
              background: `rgba(244,238,223,0.04)`,
            }}
          >
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="flex flex-1 flex-col items-center py-4"
                style={{ borderRight: i < stats.length - 1 ? `0.5px solid rgba(244,238,223,0.10)` : "none" }}
              >
                <span className="font-display text-2xl font-semibold" style={{ color: BRASS }}>
                  {s.num}
                </span>
                <span className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.18em]"
                  style={{ color: `rgba(244,238,223,0.36)` }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* Scroll hint */}
          <div className="s64-f7 mt-10 flex flex-col items-center gap-2">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em]"
              style={{ color: `rgba(244,238,223,0.28)` }}>Scroll</span>
            <div className="s64-scroll w-px h-10"
              style={{ background: `linear-gradient(to bottom, rgba(201,162,39,0.6), transparent)` }} />
          </div>
        </div>
      </section>
    </>
  );
}