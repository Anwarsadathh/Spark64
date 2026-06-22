"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, ChevronRight } from "lucide-react";

const BG = "#2D3E28";
const BG_MID = "#364B30";
const SQ_DARK = "#4A6741";
const SQ_LIGHT = "#E8E0CC";
const BRASS = "#C9A227";
const BRASS_L = "#E2C158";
const IVORY = "#F4EEDF";

const PARTICLE_COUNT = 32;
const PARTICLE_COLORS = [
  "rgba(201,162,39,0.80)",
  "rgba(226,193,88,0.55)",
  "rgba(156,126,31,0.65)",
  "rgba(232,224,204,0.30)",
  "rgba(74,103,65,0.85)",
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.11, duration: 0.65, ease: "easeOut" as const },
  }),
};

function ChessKing() {
  return (
    <svg viewBox="0 0 96 96" fill="none" className="hero-piece" aria-hidden="true">
      <defs>
        <linearGradient id="kg1" x1="20" y1="0" x2="76" y2="96" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E2C158" />
          <stop offset="50%" stopColor="#C9A227" />
          <stop offset="100%" stopColor="#7A5E0E" />
        </linearGradient>
        <linearGradient id="kg2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0.38)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <filter id="ks">
          <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="rgba(0,0,0,0.55)" />
          <feDropShadow dx="0" dy="0" stdDeviation="18" floodColor="rgba(201,162,39,0.38)" />
        </filter>
      </defs>
      <g filter="url(#ks)">
        <rect x="43" y="4" width="10" height="26" rx="2" fill="url(#kg1)" />
        <rect x="33" y="10" width="30" height="10" rx="2" fill="url(#kg1)" />
        <path d="M36 30 C36 26 60 26 60 30 L64 52 H32 Z" fill="url(#kg1)" />
        <path d="M30 52 C24 52 20 56 20 62 L18 76 H78 L76 62 C76 56 72 52 66 52 Z" fill="url(#kg1)" />
        <rect x="14" y="76" width="68" height="10" rx="4" fill="url(#kg1)" />
        <path d="M36 30 C36 26 56 26 58 30 L61 48 H35 Z" fill="url(#kg2)" opacity="0.5" />
      </g>
    </svg>
  );
}

function MiniBoard({ size, cols }: { size: number; cols: [string, string] }) {
  const n = 4, sq = size / n;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      {Array.from({ length: n * n }, (_, i) => {
        const r = Math.floor(i / n), c = i % n;
        return <rect key={i} x={c * sq} y={r * sq} width={sq} height={sq} fill={cols[(r + c) % 2]} />;
      })}
    </svg>
  );
}

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
  { num: "8", label: "Categories", sub: "U6 → U20" },
  { num: "2", label: "Days", sub: "Full rounds" },
  { num: "100", label: "Seats / category", sub: "Limited entries" },
  { num: "∞", label: "Moves", sub: "Limitless play" },
];

const BADGES = ["U6 – U20", "Certified Arbiters", "Trophies & Medals", "2026 Edition"];

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particleRef = useRef<HTMLDivElement>(null);

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
    ctx.strokeStyle = "rgba(201,162,39,0.45)";
    ctx.lineWidth = 3;
    ctx.strokeRect(1, 1, 558, 558);
  }, []);

  useEffect(() => {
    const container = particleRef.current;
    if (!container) return;
    const particles: HTMLDivElement[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = document.createElement("div");
      const sz = Math.random() * 3 + 1;
      Object.assign(p.style, {
        position: "absolute",
        width: `${sz}px`,
        height: `${sz}px`,
        borderRadius: "50%",
        background: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
        left: `${Math.random() * 100}%`,
        bottom: `${Math.random() * 35}%`,
        animation: `s64-floatUp ${Math.random() * 7 + 5}s ${Math.random() * 9}s linear infinite`,
        pointerEvents: "none",
      });
      container.appendChild(p);
      particles.push(p);
    }
    return () => particles.forEach((p) => p.remove());
  }, []);

  return (
    <>
      <style>{`
        @keyframes s64-floatUp {
          0% { opacity:0; transform:translateY(0) scale(1); }
          15% { opacity:1; }
          85% { opacity:0.35; }
          100% { opacity:0; transform:translateY(-280px) scale(0.35); }
        }
        @keyframes s64-levitate {
          0%,100% { transform:translateY(0) rotate(-1deg); }
          50% { transform:translateY(-13px) rotate(1.5deg); }
        }
        @keyframes s64-rotateSlow {
          from { transform:rotate(0deg); }
          to { transform:rotate(360deg); }
        }
        @keyframes s64-pulseDown {
          0%,100% { opacity:0.45; transform:scaleY(1); }
          50% { opacity:1; transform:scaleY(1.2); }
        }
        @keyframes s64-statGlow {
          0%,100% { box-shadow:0 0 0 0 rgba(201,162,39,0); }
          50% { box-shadow:0 0 22px 2px rgba(201,162,39,0.11); }
        }
        @keyframes s64-shimmer {
          0% { background-position:-200% center; }
          100% { background-position:200% center; }
        }

        .hero-piece {
          width: clamp(46px,7.5vw,68px);
          height: clamp(46px,7.5vw,68px);
          animation: s64-levitate 5s 0.8s ease-in-out infinite;
          filter:
            drop-shadow(0 0 26px rgba(201,162,39,0.72))
            drop-shadow(0 10px 22px rgba(0,0,0,0.52));
          flex-shrink: 0;
        }

        .hero-wordmark-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(8px, 2vw, 16px);
        }

        .hero-cr {
          position: absolute;
          top: 16px;
          right: 16px;
          opacity: 0.13;
          animation: s64-rotateSlow 60s linear infinite;
        }

        .hero-cl {
          position: absolute;
          top: 16px;
          left: 16px;
          opacity: 0.08;
          animation: s64-rotateSlow 80s linear infinite reverse;
        }

        .hero-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
          width: 100%;
          max-width: 500px;
        }

        .hero-stat-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          padding: 14px 6px 12px;
          border-radius: 18px;
          border: 0.5px solid rgba(244,238,223,0.10);
          background: rgba(244,238,223,0.05);
          backdrop-filter: blur(8px);
          position: relative;
          overflow: hidden;
          transition: border-color 0.25s, background 0.25s;
          animation: s64-statGlow 4s ease-in-out infinite;
        }

        .hero-stat-card:nth-child(2) { animation-delay:1s; }
        .hero-stat-card:nth-child(3) { animation-delay:2s; }
        .hero-stat-card:nth-child(4) { animation-delay:3s; }

        .hero-stat-card:hover {
          border-color: rgba(201,162,39,0.40);
          background: rgba(244,238,223,0.09);
        }

        .hero-stat-card::before {
          content:"";
          position:absolute;
          top:0;
          left:0;
          right:0;
          height:1.5px;
          background: linear-gradient(90deg,transparent,${BRASS},${BRASS_L},${BRASS},transparent);
          background-size:200% auto;
          opacity:0;
          transition:opacity 0.3s;
        }

        .hero-stat-card:hover::before {
          opacity:1;
          animation:s64-shimmer 1.5s linear infinite;
        }

        .hero-stat-num {
          font-family: var(--font-fraunces,serif);
          font-size: clamp(24px,5vw,34px);
          font-weight:900;
          line-height:1;
          background: linear-gradient(135deg,${BRASS_L},${BRASS});
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
        }

        .hero-stat-label {
          font-family: var(--font-fraunces,serif);
          font-size: clamp(10px,2vw,13px);
          font-weight:500;
          color:rgba(244,238,223,0.85);
          text-align:center;
          line-height:1.2;
        }

        .hero-stat-sub {
          font-family: var(--font-plex-mono,monospace);
          font-size:9px;
          letter-spacing:0.10em;
          text-transform:uppercase;
          color:rgba(244,238,223,0.35);
          text-align:center;
        }

        .hero-btn-row {
          display:flex;
          flex-direction:row;
          gap:10px;
          width:100%;
          max-width:430px;
          justify-content:center;
        }

        .hero-btn-primary,
        .hero-btn-secondary {
          flex:1;
          display:inline-flex;
          align-items:center;
          justify-content:center;
          gap:7px;
          border-radius:100px;
          padding:13px 16px;
          font-family:var(--font-plex-mono,monospace);
          font-size:10px;
          letter-spacing:0.17em;
          text-transform:uppercase;
          min-height: 48px;
        }

        .hero-btn-primary {
          font-weight:600;
          background:linear-gradient(135deg,${BRASS_L},${BRASS});
          color:${BG};
          box-shadow:0 10px 32px rgba(201,162,39,0.32);
          transition:transform 0.2s, box-shadow 0.2s;
          position:relative;
          overflow:hidden;
        }

        .hero-btn-primary::before {
          content:"";
          position:absolute;
          inset:0;
          background:rgba(255,255,255,0.16);
          transform:translateX(-100%) skewX(-12deg);
          transition:transform 0.4s;
        }

        .hero-btn-primary:hover::before {
          transform:translateX(120%) skewX(-12deg);
        }

        .hero-btn-primary:hover {
          transform:translateY(-2px);
          box-shadow:0 14px 40px rgba(201,162,39,0.44);
        }

        .hero-btn-secondary {
          color:rgba(244,238,223,0.82);
          border:0.5px solid rgba(244,238,223,0.26);
          background:rgba(244,238,223,0.04);
          backdrop-filter:blur(8px);
          transition:border-color 0.2s, background 0.2s, transform 0.2s;
        }

        .hero-btn-secondary:hover {
          border-color:rgba(244,238,223,0.52);
          background:rgba(244,238,223,0.08);
          transform:translateY(-2px);
        }

        .hero-badges {
          display:flex;
          flex-wrap:wrap;
          justify-content:center;
          gap:8px;
          width:100%;
          max-width:500px;
        }

        .hero-badge {
          border-radius:100px;
          padding:7px 16px;
          font-family:var(--font-plex-mono,monospace);
          font-size:10px;
          font-weight:600;
          letter-spacing:0.12em;
          text-transform:uppercase;
          color:rgba(255,255,255,0.92);
          border:1px solid rgba(255,255,255,0.28);
          background:rgba(255,255,255,0.10);
          backdrop-filter:blur(10px);
        }

        .hero-wcd-bar {
          display:inline-flex;
          align-items:center;
          gap:10px;
          border-radius:100px;
          padding:9px 20px;
          font-family:var(--font-plex-mono,monospace);
          font-size:11px;
          font-weight:600;
          letter-spacing:0.16em;
          text-transform:uppercase;
          color:#FFFFFF;
          border:1.5px solid rgba(201,162,39,0.70);
          background:rgba(201,162,39,0.18);
          backdrop-filter:blur(12px);
          box-shadow: 0 0 24px rgba(201,162,39,0.20), inset 0 1px 0 rgba(255,255,255,0.10);
        }

        .hero-wcd-dot {
          width:7px;
          height:7px;
          border-radius:50%;
          background:#E2C158;
          box-shadow: 0 0 8px 2px rgba(226,193,88,0.8);
          animation:s64-statGlow 2s ease-in-out infinite;
          flex-shrink:0;
        }

        .hero-scroll-icon {
          animation: s64-pulseDown 2s ease-in-out infinite;
        }

        .hero-btn-desktop {
          display: inline;
        }

        .hero-btn-mobile {
          display: none;
        }

        @media (max-width: 640px) {
          .hero-wcd-bar {
            padding: 8px 14px;
            font-size: 9px;
            letter-spacing: 0.11em;
            gap: 8px;
            text-align: center;
            line-height: 1.45;
          }

          .hero-wcd-dot {
            width: 6px;
            height: 6px;
          }

          .hero-piece {
            width: 40px;
            height: 40px;
          }

          .hero-wordmark-row {
            gap: 8px;
          }

          .hero-btn-row {
            gap: 8px;
            max-width: 100%;
          }

          .hero-btn-primary,
          .hero-btn-secondary {
            padding: 11px 10px;
            min-height: 44px;
            font-size: 9px;
            letter-spacing: 0.11em;
            gap: 5px;
          }

          .hero-btn-desktop {
            display: none;
          }

          .hero-btn-mobile {
            display: inline;
          }

          .hero-badge {
            padding: 6px 12px;
            font-size: 9px;
            letter-spacing: 0.09em;
          }

          .hero-stats-grid {
            gap: 6px;
          }

          .hero-stat-card {
            padding: 11px 4px 10px;
            border-radius: 15px;
          }

          .hero-stat-num {
            font-size: 22px;
          }

          .hero-stat-label {
            font-size: 10px;
          }

          .hero-stat-sub {
            font-size: 8px;
            letter-spacing: 0.08em;
          }
        }

        @media (max-width: 420px) {
          .hero-wcd-bar {
            padding: 7px 12px;
            font-size: 8px;
            letter-spacing: 0.09em;
          }

          .hero-btn-primary,
          .hero-btn-secondary {
            padding: 10px 8px;
            min-height: 42px;
            font-size: 8px;
            letter-spacing: 0.08em;
            border-radius: 999px;
          }

          .hero-piece {
            width: 36px;
            height: 36px;
          }

          .hero-stat-card {
            padding: 10px 3px 9px;
          }

          .hero-stat-num {
            font-size: 20px;
          }
        }

        @media (prefers-reduced-motion:reduce) {
          .hero-piece,.hero-cr,.hero-cl,.hero-scroll-icon,.hero-stat-card,.hero-wcd-dot {
            animation:none!important;
          }
          .hero-btn-primary::before {
            display:none;
          }
        }
      `}</style>

      <section
        className="relative overflow-hidden bg-board checkerboard-bg"
        style={{ minHeight: "100svh" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, rgba(18,35,24,0.58) 0%, rgba(31,61,46,0.82) 50%, #1F3D2E 100%)`,
          }}
          aria-hidden="true"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-28 -left-24 h-[400px] w-[400px] rounded-full"
          style={{ background: "rgba(201,162,39,0.09)", filter: "blur(100px)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-12 -right-16 h-[340px] w-[340px] rounded-full"
          style={{ background: "rgba(74,103,65,0.28)", filter: "blur(90px)" }}
        />

        <canvas
          ref={canvasRef}
          width={560}
          height={560}
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[-70px] left-1/2"
          style={{
            width: 560,
            height: 560,
            transform: "translateX(-50%) perspective(900px) rotateX(60deg)",
            opacity: 0.18,
          }}
        />

        <div className="hero-cr" aria-hidden="true">
          <MiniBoard size={80} cols={[BRASS, SQ_LIGHT]} />
        </div>
        <div className="hero-cl" aria-hidden="true">
          <MiniBoard size={60} cols={[SQ_DARK, SQ_LIGHT]} />
        </div>

        <div ref={particleRef} aria-hidden="true" className="pointer-events-none absolute inset-0" />

        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-5 pb-16 pt-14 text-center sm:px-8 sm:pb-24 sm:pt-20 md:pt-28">
          {/* Limited seats + World Chess Day */}
         <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
  <span className="hero-wcd-bar">
    <span className="hero-wcd-dot" aria-hidden="true" />
    Limited seats in every category · Tournament Dates · 18th & 19th July 2026
  </span>
</motion.div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="mt-3 font-mono text-[11px] font-semibold uppercase tracking-[0.26em]"
            style={{ color: "#FFFFFF" }}
          >
            Registrations Open · 2026 Edition
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="hero-wordmark-row mt-6"
          >
            <ChessKing />
            <h1
              className="font-display font-black leading-none tracking-[-2px]"
              style={{ fontSize: "clamp(52px,12vw,106px)", color: IVORY }}
            >
              SPARK
              <span className="checker-fill">64</span>
            </h1>
          </motion.div>

        <motion.p
  variants={fadeUp}
  initial="hidden"
  animate="show"
  custom={4}
  className="mt-4 font-display text-2xl italic sm:text-3xl"
  style={{ color: "#FFFFFF" }}
>
  All-India Youth Chess Talent Hunt
</motion.p>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={5}
            className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em]"
            style={{ color: "rgba(255,255,255,0.58)" }}
          >
            Powered by Raven Rows
          </motion.p>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={6}
            className="mx-auto mt-6 max-w-xl text-balance font-body font-medium leading-relaxed"
            style={{ fontSize: "clamp(14px,3.5vw,17px)", color: "rgba(255,255,255,0.90)" }}
          >
            Eight age categories. One board. A new generation of chess talent
            steps up to compete, learn, and earn their place among the champions.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={7}
            className="mt-5 hero-badges"
          >
            {BADGES.map((b) => (
              <span key={b} className="hero-badge">{b}</span>
            ))}
          </motion.div>

          {/* Buttons – desktop + mobile text */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={8}
            className="mt-8 hero-btn-row"
          >
            <a href="#register" className="hero-btn-primary">
              <span className="hero-btn-desktop">Register Your Champion</span>
              <span className="hero-btn-mobile">Register</span>
              <ArrowRight size={13} />
            </a>

            <a href="#categories" className="hero-btn-secondary">
              <span className="hero-btn-desktop">View Categories</span>
              <span className="hero-btn-mobile">Category</span>
              <ChevronRight size={13} />
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={9}
            className="mt-10 hero-stats-grid"
          >
            {STATS.map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.7 }}
            className="mt-12 flex flex-col items-center gap-2"
            style={{ color: `rgba(244,238,223,0.35)` }}
          >
            <span className="font-mono text-[8px] uppercase tracking-[0.25em]">Scroll</span>
            <ChevronDown size={18} className="hero-scroll-icon" />
          </motion.div>
        </div>
      </section>
    </>
  );
}