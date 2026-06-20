"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";

const BG      = "#2D3E28";
const BG_MID  = "#364B30";
const SQ_DARK = "#4A6741";
const SQ_LIGHT= "#E8E0CC";
const BRASS   = "#C9A227";
const BRASS_L = "#E2C158";
const IVORY   = "#F4EEDF";

const PARTICLE_COUNT  = 32;
const PARTICLE_COLORS = [
  "rgba(201,162,39,0.80)",
  "rgba(226,193,88,0.55)",
  "rgba(156,126,31,0.65)",
  "rgba(232,224,204,0.30)",
  "rgba(74,103,65,0.85)",
];

/* ── 3D Chess King ── */
function ChessKing() {
  return (
    <svg viewBox="0 0 96 96" fill="none" className="hero-piece" aria-hidden="true">
      <defs>
        <linearGradient id="kg1" x1="20" y1="0" x2="76" y2="96" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#E2C158"/>
          <stop offset="50%"  stopColor="#C9A227"/>
          <stop offset="100%" stopColor="#7A5E0E"/>
        </linearGradient>
        <linearGradient id="kg2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.38)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </linearGradient>
        <filter id="ks">
          <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="rgba(0,0,0,0.55)"/>
          <feDropShadow dx="0" dy="0" stdDeviation="16" floodColor="rgba(201,162,39,0.35)"/>
        </filter>
      </defs>
      <g filter="url(#ks)">
        <rect x="43" y="4"  width="10" height="26" rx="2" fill="url(#kg1)"/>
        <rect x="33" y="10" width="30" height="10" rx="2" fill="url(#kg1)"/>
        <path d="M36 30 C36 26 60 26 60 30 L64 52 H32 Z"                         fill="url(#kg1)"/>
        <path d="M30 52 C24 52 20 56 20 62 L18 76 H78 L76 62 C76 56 72 52 66 52 Z" fill="url(#kg1)"/>
        <rect x="14" y="76" width="68" height="10" rx="4" fill="url(#kg1)"/>
        <path d="M36 30 C36 26 56 26 58 30 L61 48 H35 Z" fill="url(#kg2)" opacity="0.5"/>
      </g>
    </svg>
  );
}

/* ── Mini corner board ── */
function MiniBoard({ size, cols }: { size: number; cols: [string, string] }) {
  const n = 4, sq = size / n;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      {Array.from({ length: n * n }, (_, i) => {
        const r = Math.floor(i / n), c = i % n;
        return <rect key={i} x={c*sq} y={r*sq} width={sq} height={sq} fill={cols[(r+c)%2]}/>;
      })}
    </svg>
  );
}

/* ── Animated stat card ── */
function StatCard({ num, label, sub }: { num: string; label: string; sub: string }) {
  return (
    <div className="hero-stat-card">
      <span className="hero-stat-num">{num}</span>
      <span className="hero-stat-label">{label}</span>
      <span className="hero-stat-sub">{sub}</span>
    </div>
  );
}

const STATS = [
  { num: "8",  label: "Categories", sub: "U6 → U20"       },
  { num: "2",  label: "Days",        sub: "Full rounds"    },
  { num: "64", label: "Squares",     sub: "One board"      },
  { num: "∞",  label: "Moves",       sub: "Limitless play" },
];

const BADGES = ["U6 – U20", "Certified Arbiters", "Trophies & Medals", "2026 Edition"];

export default function Hero() {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const particleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const sq = 70;
    for (let r = 0; r < 8; r++)
      for (let c = 0; c < 8; c++) {
        ctx.fillStyle = (r + c) % 2 === 0 ? SQ_DARK : SQ_LIGHT;
        ctx.fillRect(c * sq, r * sq, sq, sq);
      }
    ctx.strokeStyle = "rgba(201,162,39,0.45)";
    ctx.lineWidth   = 3;
    ctx.strokeRect(1, 1, 558, 558);
  }, []);

  useEffect(() => {
    const container = particleRef.current;
    if (!container) return;
    const particles: HTMLDivElement[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p    = document.createElement("div");
      const size = Math.random() * 3 + 1;
      Object.assign(p.style, {
        position:     "absolute",
        width:        `${size}px`,
        height:       `${size}px`,
        borderRadius: "50%",
        background:   PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
        left:         `${Math.random() * 100}%`,
        bottom:       `${Math.random() * 35}%`,
        animation:    `s64-floatUp ${Math.random() * 7 + 5}s ${Math.random() * 9}s linear infinite`,
        pointerEvents:"none",
      });
      container.appendChild(p);
      particles.push(p);
    }
    return () => particles.forEach((p) => p.remove());
  }, []);

  return (
    <>
      <style>{`
        /* ── Keyframes ── */
        @keyframes s64-floatUp {
          0%   { opacity:0; transform:translateY(0) scale(1); }
          15%  { opacity:1; }
          85%  { opacity:0.35; }
          100% { opacity:0; transform:translateY(-280px) scale(0.35); }
        }
        @keyframes s64-levitate {
          0%,100% { transform:translateY(0) rotate(-1deg); }
          50%      { transform:translateY(-12px) rotate(1deg); }
        }
        @keyframes s64-fadeUp {
          from { opacity:0; transform:translateY(22px); }
          to   { opacity:1; transform:translateY(0);    }
        }
        @keyframes s64-rotateSlow {
          from { transform:rotate(0deg);   }
          to   { transform:rotate(360deg); }
        }
        @keyframes s64-pulseDown {
          0%,100% { opacity:0.45; transform:scaleY(1);    }
          50%      { opacity:1;   transform:scaleY(1.18); }
        }
        @keyframes s64-statGlow {
          0%,100% { box-shadow: 0 0 0 0 rgba(201,162,39,0); }
          50%      { box-shadow: 0 0 24px 2px rgba(201,162,39,0.12); }
        }
        @keyframes s64-shimmer {
          0%   { background-position:-200% center; }
          100% { background-position: 200% center; }
        }

        /* ── Piece ── */
        .hero-piece {
          width: clamp(72px,12vw,100px);
          height: clamp(72px,12vw,100px);
          animation: s64-fadeUp 0.6s 0.1s ease both,
                     s64-levitate 5s 1s ease-in-out infinite;
          filter:
            drop-shadow(0 0 32px rgba(201,162,39,0.65))
            drop-shadow(0 18px 36px rgba(0,0,0,0.55));
        }

        /* ── Corner watermarks ── */
        .hero-cr {
          position:absolute; top:16px; right:16px;
          opacity:0.13;
          animation: s64-rotateSlow 60s linear infinite;
        }
        .hero-cl {
          position:absolute; top:16px; left:16px;
          opacity:0.08;
          animation: s64-rotateSlow 80s linear infinite reverse;
        }

        /* ── Staggered fade-ups ── */
        .s64-f0 { animation: s64-fadeUp 0.6s 0.00s ease both; }
        .s64-f1 { animation: s64-fadeUp 0.7s 0.18s ease both; }
        .s64-f2 { animation: s64-fadeUp 0.7s 0.28s ease both; }
        .s64-f3 { animation: s64-fadeUp 0.7s 0.40s ease both; }
        .s64-f4 { animation: s64-fadeUp 0.7s 0.48s ease both; }
        .s64-f5 { animation: s64-fadeUp 0.7s 0.54s ease both; }
        .s64-f6 { animation: s64-fadeUp 0.7s 0.64s ease both; }
        .s64-f7 { animation: s64-fadeUp 0.7s 0.74s ease both; }
        .s64-scroll { animation: s64-pulseDown 2s ease-in-out infinite; }

        /* ── Stat cards ── */
        .hero-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
          width: 100%;
          max-width: 480px;
        }
        .hero-stat-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          padding: 14px 8px 12px;
          border-radius: 18px;
          border: 0.5px solid rgba(244,238,223,0.10);
          background: rgba(244,238,223,0.05);
          backdrop-filter: blur(8px);
          position: relative;
          overflow: hidden;
          transition: border-color 0.25s, background 0.25s;
          animation: s64-statGlow 4s ease-in-out infinite;
        }
        .hero-stat-card:hover {
          border-color: rgba(201,162,39,0.38);
          background: rgba(244,238,223,0.08);
        }
        /* Top shimmer line */
        .hero-stat-card::before {
          content:"";
          position:absolute; top:0; left:0; right:0; height:1.5px;
          background: linear-gradient(90deg, transparent, ${BRASS}, ${BRASS_L}, ${BRASS}, transparent);
          background-size: 200% auto;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .hero-stat-card:hover::before { opacity:1; animation: s64-shimmer 1.5s linear infinite; }

        .hero-stat-num {
          font-family: var(--font-fraunces, serif);
          font-size: clamp(26px, 5vw, 34px);
          font-weight: 900;
          line-height: 1;
          background: linear-gradient(135deg, ${BRASS_L}, ${BRASS});
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-stat-label {
          font-family: var(--font-fraunces, serif);
          font-size: clamp(11px, 2vw, 13px);
          font-weight: 500;
          color: rgba(244,238,223,0.82);
          text-align: center;
          line-height: 1.2;
        }
        .hero-stat-sub {
          font-family: var(--font-plex-mono, monospace);
          font-size: 8px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(244,238,223,0.30);
          text-align: center;
        }

        /* ── CTA buttons — always 1 row ── */
        .hero-btn-row {
          display: flex;
          flex-direction: row;          /* side by side on ALL screens */
          gap: 10px;
          width: 100%;
          max-width: 420px;
          justify-content: center;
        }
        .hero-btn-primary {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          border-radius: 100px;
          padding: 13px 16px;
          font-family: var(--font-plex-mono, monospace);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.17em;
          text-transform: uppercase;
          background: linear-gradient(135deg, ${BRASS_L}, ${BRASS});
          color: ${BG};
          box-shadow: 0 10px 32px rgba(201,162,39,0.32);
          transition: transform 0.2s, box-shadow 0.2s;
          position: relative;
          overflow: hidden;
        }
        .hero-btn-primary::before {
          content:"";
          position:absolute; inset:0;
          background:rgba(255,255,255,0.16);
          transform:translateX(-100%) skewX(-12deg);
          transition:transform 0.4s;
        }
        .hero-btn-primary:hover::before { transform:translateX(120%) skewX(-12deg); }
        .hero-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 40px rgba(201,162,39,0.42);
        }

        .hero-btn-secondary {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          border-radius: 100px;
          padding: 13px 16px;
          font-family: var(--font-plex-mono, monospace);
          font-size: 10px;
          letter-spacing: 0.17em;
          text-transform: uppercase;
          color: rgba(244,238,223,0.82);
          border: 0.5px solid rgba(244,238,223,0.24);
          background: rgba(244,238,223,0.04);
          backdrop-filter: blur(8px);
          transition: border-color 0.2s, background 0.2s, transform 0.2s;
        }
        .hero-btn-secondary:hover {
          border-color: rgba(244,238,223,0.50);
          background: rgba(244,238,223,0.08);
          transform: translateY(-2px);
        }

        /* ── Badge chips ── */
        .hero-badges {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 6px;
          width: 100%;
          max-width: 440px;
        }
        .hero-badge {
          border-radius: 100px;
          padding: 4px 12px;
          font-family: var(--font-plex-mono, monospace);
          font-size: 9px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(244,238,223,0.45);
          border: 0.5px solid rgba(244,238,223,0.12);
          background: rgba(244,238,223,0.03);
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-piece, .hero-cr, .hero-cl, .s64-scroll,
          .hero-stat-card, [class^="s64-f"] {
            animation: none !important;
          }
          .hero-btn-primary::before { display:none; }
        }
      `}</style>

      <section
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(160deg, ${BG_MID} 0%, ${BG} 65%)`,
          minHeight: "100svh",
        }}
      >
        {/* Checkerboard texture */}
        <div aria-hidden="true"
          className="pointer-events-none absolute inset-0 checkerboard-bg opacity-35" />

        {/* Glow orbs */}
        <div aria-hidden="true" className="pointer-events-none absolute -top-28 -left-24 h-[400px] w-[400px] rounded-full"
          style={{ background:"rgba(201,162,39,0.11)", filter:"blur(100px)" }}/>
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-12 -right-16 h-[340px] w-[340px] rounded-full"
          style={{ background:"rgba(74,103,65,0.30)", filter:"blur(90px)" }}/>
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/3 h-[240px] w-[240px] -translate-x-1/2 rounded-full"
          style={{ background:"rgba(201,162,39,0.06)", filter:"blur(80px)" }}/>

        {/* 3-D canvas board */}
        <canvas ref={canvasRef} width={560} height={560} aria-hidden="true"
          className="pointer-events-none absolute bottom-[-70px] left-1/2"
          style={{
            width:560, height:560,
            transform:"translateX(-50%) perspective(900px) rotateX(60deg)",
            opacity:0.20,
          }}
        />

        {/* Corner boards */}
        <div className="hero-cr" aria-hidden="true">
          <MiniBoard size={80} cols={[BRASS, SQ_LIGHT]}/>
        </div>
        <div className="hero-cl" aria-hidden="true">
          <MiniBoard size={60} cols={[SQ_DARK, SQ_LIGHT]}/>
        </div>

        {/* Particles */}
        <div ref={particleRef} aria-hidden="true"
          className="pointer-events-none absolute inset-0"/>

        {/* ── Main content ── */}
        <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center
                        px-5 pb-16 pt-12 text-center sm:px-8 sm:pb-24 sm:pt-16">

          {/* Eyebrow */}
          <p className="s64-f0 font-mono text-[9px] uppercase tracking-[0.28em] rounded-full px-4 py-1.5"
            style={{ color:BRASS, border:`0.5px solid rgba(201,162,39,0.30)`, background:`rgba(201,162,39,0.09)` }}>
            Registrations Open · 2026 Edition
          </p>

          {/* King */}
          <div className="mt-6">
            <ChessKing />
          </div>

          {/* Wordmark */}
          <h1 className="s64-f1 mt-4 font-display font-black leading-none tracking-[-2px]"
            style={{ fontSize:"clamp(58px,13vw,106px)", color:IVORY }}>
            SPARK
            <span style={{
              background:`linear-gradient(135deg,${BRASS_L} 0%,${BRASS} 45%,#9C7E1F 100%)`,
              WebkitBackgroundClip:"text",
              WebkitTextFillColor:"transparent",
              backgroundClip:"text",
            }}>64</span>
          </h1>

          <p className="s64-f2 mt-3 font-display text-xl italic sm:text-2xl"
            style={{ color:`rgba(244,238,223,0.76)` }}>
            Youth Chess Talent Hunt
          </p>
          <p className="s64-f2 mt-1 font-mono text-[9px] uppercase tracking-[0.22em]"
            style={{ color:`rgba(244,238,223,0.30)` }}>
            Powered by Raven Rows
          </p>

          {/* Description */}
          <p className="s64-f3 mx-auto mt-5 max-w-[400px] text-balance font-body leading-[1.75]"
            style={{ fontSize:"clamp(13px,3.5vw,15px)", color:`rgba(244,238,223,0.60)` }}>
            Eight age categories. One board. A new generation of chess talent
            steps up to compete, learn, and earn their place among the champions.
          </p>

          {/* Badge chips */}
          <div className="s64-f4 mt-4 hero-badges">
            {BADGES.map((b) => (
              <span key={b} className="hero-badge">{b}</span>
            ))}
          </div>

          {/* ── CTA Buttons — 1 row always ── */}
          <div className="s64-f5 mt-7 hero-btn-row">
            <a href="#register" className="hero-btn-primary">
              Register
              <ArrowRight size={13} className="transition group-hover:translate-x-0.5"/>
            </a>
            <a href="#categories" className="hero-btn-secondary">
              Categories
              <ChevronRight size={13}/>
            </a>
          </div>

          {/* ── Stats grid ── */}
          <div className="s64-f6 mt-10 hero-stats-grid">
            {STATS.map((s) => (
              <StatCard key={s.label} {...s}/>
            ))}
          </div>

          {/* Scroll hint */}
          <div className="s64-f7 mt-10 flex flex-col items-center gap-2">
            <span className="font-mono text-[8px] uppercase tracking-[0.25em]"
              style={{ color:`rgba(244,238,223,0.25)` }}>Scroll</span>
            <div className="s64-scroll w-px h-9"
              style={{ background:`linear-gradient(to bottom,rgba(201,162,39,0.6),transparent)` }}/>
          </div>
        </div>
      </section>
    </>
  );
}