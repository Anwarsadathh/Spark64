"use client";

import { useEffect, useState } from "react";
import {
  Menu,
  X,
  Trophy,
  MapPin,
  Layers3,
  Sparkles,
  ChevronRight,
} from "lucide-react";

const LINKS = [
  { label: "About", href: "#about", icon: Sparkles },
  { label: "Categories", href: "#categories", icon: Layers3 },
  { label: "Prizes", href: "#prizes", icon: Trophy },
  { label: "Venue", href: "#venue", icon: MapPin },
];

function DraftMark() {
  return (
    <div className="nv-mark-wrap" aria-hidden="true">
      <svg
        viewBox="0 0 72 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="nv-mark"
      >
        <defs>
          <linearGradient id="nv-gold" x1="10" y1="10" x2="58" y2="60" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F0D77A" />
            <stop offset="55%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#8B6912" />
          </linearGradient>
        </defs>

        <rect
          x="10"
          y="10"
          width="52"
          height="52"
          rx="14"
          stroke="url(#nv-gold)"
          strokeWidth="2.5"
          fill="rgba(255,255,255,0.03)"
        />
        <path
          d="M36 19V31M30.5 24.5H41.5M29.5 34C29.5 32.1 42.5 32.1 42.5 34L44.8 42H27.2L29.5 34ZM25.8 42C22.5 42 20.4 44.1 19.9 47.2L18.8 53H53.2L52.1 47.2C51.6 44.1 49.5 42 46.2 42H25.8Z"
          fill="url(#nv-gold)"
        />
      </svg>
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <style>{`
        @keyframes nvSlideDown {
          from {
            opacity: 0;
            transform: translateY(-18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes nvGlow {
          0%, 100% {
            opacity: .45;
          }
          50% {
            opacity: .8;
          }
        }

        @keyframes nvFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px);
          }
        }

        .nv-header {
          position: sticky;
          top: 0;
          z-index: 60;
          padding: 12px 12px 0;
          animation: nvSlideDown .6s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .nv-shell {
          position: relative;
          margin: 0 auto;
          max-width: 1240px;
          border-radius: 22px;
          border: 1px solid rgba(31,61,46,0.08);
          background:
            linear-gradient(180deg, rgba(247,241,227,0.88), rgba(244,238,223,0.78));
          backdrop-filter: blur(14px);
          box-shadow:
            0 10px 30px rgba(15, 23, 18, 0.06),
            inset 0 1px 0 rgba(255,255,255,0.45);
          transition:
            transform 220ms ease,
            box-shadow 220ms ease,
            border-color 220ms ease,
            background 220ms ease;
          overflow: hidden;
        }

        .nv-shell.scrolled {
          border-color: rgba(31,61,46,0.12);
          box-shadow:
            0 16px 44px rgba(15, 23, 18, 0.1),
            inset 0 1px 0 rgba(255,255,255,0.5);
          background:
            linear-gradient(180deg, rgba(247,241,227,0.94), rgba(244,238,223,0.88));
        }

        .nv-shell::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(45deg, rgba(31,61,46,0.018) 25%, transparent 25%),
            linear-gradient(-45deg, rgba(31,61,46,0.018) 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, rgba(31,61,46,0.018) 75%),
            linear-gradient(-45deg, transparent 75%, rgba(31,61,46,0.018) 75%);
          background-size: 26px 26px;
          background-position: 0 0, 0 13px, 13px -13px, -13px 0;
          opacity: .45;
          pointer-events: none;
        }

        .nv-glow {
          position: absolute;
          top: -40px;
          right: 80px;
          width: 180px;
          height: 120px;
          border-radius: 999px;
          background: radial-gradient(circle, rgba(212,175,55,0.16), transparent 68%);
          filter: blur(28px);
          pointer-events: none;
          animation: nvGlow 6s ease-in-out infinite;
        }

        .nv-inner {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          padding: 14px 16px;
        }

        .nv-brand {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
          text-decoration: none;
        }

        .nv-mark-wrap {
          position: relative;
          flex-shrink: 0;
        }

        .nv-mark-wrap::after {
          content: "";
          position: absolute;
          inset: -8px;
          border-radius: 20px;
          background: radial-gradient(circle, rgba(212,175,55,0.18), transparent 72%);
          filter: blur(10px);
          z-index: -1;
        }

        .nv-mark {
          width: 42px;
          height: 42px;
          animation: nvFloat 4.5s ease-in-out infinite;
          filter:
            drop-shadow(0 10px 18px rgba(212,175,55,0.12))
            drop-shadow(0 4px 10px rgba(15,23,18,0.06));
        }

        .nv-brand-copy {
          min-width: 0;
        }

        .nv-title {
          font-family: var(--font-fraunces), serif;
          font-size: 1.1rem;
          line-height: 1;
          letter-spacing: -0.03em;
          color: #1F3D2E;
          white-space: nowrap;
        }

        .nv-title span {
          color: #C9A227;
        }

        .nv-sub {
          margin-top: 4px;
          font-family: var(--font-plex-mono), monospace;
          font-size: 10px;
          letter-spacing: .16em;
          text-transform: uppercase;
          color: rgba(31,61,46,0.42);
          white-space: nowrap;
        }

        .nv-desktop {
          display: none;
          align-items: center;
          gap: 8px;
        }

        .nv-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border-radius: 999px;
          padding: 10px 14px;
          font-family: var(--font-plex-mono), monospace;
          font-size: 11px;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: rgba(31,61,46,0.68);
          text-decoration: none;
          transition:
            color 220ms ease,
            background 220ms ease,
            transform 220ms ease;
        }

        .nv-link:hover {
          color: #1F3D2E;
          background: rgba(31,61,46,0.05);
          transform: translateY(-1px);
        }

        .nv-link svg {
          opacity: .8;
        }

        .nv-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border-radius: 999px;
          padding: 12px 18px;
          background: linear-gradient(135deg, #E7C96A, #D4AF37);
          color: #102016;
          text-decoration: none;
          font-family: var(--font-plex-mono), monospace;
          font-size: 11px;
          letter-spacing: .16em;
          text-transform: uppercase;
          box-shadow: 0 14px 30px rgba(212,175,55,0.22);
          transition:
            transform 220ms ease,
            box-shadow 220ms ease,
            filter 220ms ease;
        }

        .nv-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 18px 38px rgba(212,175,55,0.28);
          filter: saturate(1.04);
        }

        .nv-mobile-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 46px;
          height: 46px;
          flex-shrink: 0;
          border-radius: 999px;
          border: 1px solid rgba(31,61,46,0.1);
          background: rgba(255,255,255,0.36);
          color: #1F3D2E;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.42);
          transition:
            transform 200ms ease,
            background 200ms ease,
            border-color 200ms ease;
        }

        .nv-mobile-btn:hover {
          transform: translateY(-1px);
          background: rgba(255,255,255,0.52);
          border-color: rgba(31,61,46,0.16);
        }

        .nv-panel-wrap {
          position: fixed;
          inset: 0;
          z-index: 70;
          display: flex;
          justify-content: flex-end;
          pointer-events: none;
        }

        .nv-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(7, 16, 13, 0.42);
          opacity: 0;
          transition: opacity 260ms ease;
        }

        .nv-panel {
          position: relative;
          height: 100%;
          width: min(92vw, 390px);
          transform: translateX(100%);
          transition: transform 320ms cubic-bezier(0.16, 1, 0.3, 1);
          background:
            radial-gradient(circle at top right, rgba(212,175,55,0.08), transparent 28%),
            linear-gradient(180deg, #112218 0%, #0D1A13 100%);
          box-shadow: -18px 0 44px rgba(0,0,0,0.28);
          border-left: 1px solid rgba(247,241,227,0.08);
          pointer-events: auto;
          overflow: hidden;
        }

        .nv-panel::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(45deg, rgba(247,241,227,0.025) 25%, transparent 25%),
            linear-gradient(-45deg, rgba(247,241,227,0.025) 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, rgba(247,241,227,0.025) 75%),
            linear-gradient(-45deg, transparent 75%, rgba(247,241,227,0.025) 75%);
          background-size: 42px 42px;
          background-position: 0 0, 0 21px, 21px -21px, -21px 0;
          opacity: .3;
          pointer-events: none;
        }

        .nv-panel.open {
          transform: translateX(0);
        }

        .nv-backdrop.open {
          opacity: 1;
          pointer-events: auto;
        }

        .nv-panel-inner {
          position: relative;
          z-index: 1;
          display: flex;
          height: 100%;
          flex-direction: column;
          padding: 18px;
        }

        .nv-panel-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding-bottom: 18px;
          border-bottom: 1px solid rgba(247,241,227,0.08);
        }

        .nv-panel-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }

        .nv-panel-title {
          font-family: var(--font-fraunces), serif;
          font-size: 1.2rem;
          color: #F7F1E3;
          line-height: 1;
        }

        .nv-panel-title span {
          color: #D4AF37;
        }

        .nv-panel-sub {
          margin-top: 4px;
          font-family: var(--font-plex-mono), monospace;
          font-size: 10px;
          letter-spacing: .16em;
          text-transform: uppercase;
          color: rgba(247,241,227,0.42);
        }

        .nv-close {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 999px;
          border: 1px solid rgba(247,241,227,0.1);
          background: rgba(247,241,227,0.05);
          color: #F7F1E3;
        }

        .nv-mobile-nav {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding-top: 20px;
        }

        .nv-mobile-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          border-radius: 18px;
          border: 1px solid rgba(247,241,227,0.08);
          background: rgba(247,241,227,0.04);
          padding: 14px 14px;
          color: #F7F1E3;
          text-decoration: none;
          transition:
            transform 220ms ease,
            background 220ms ease,
            border-color 220ms ease;
        }

        .nv-mobile-link:hover {
          transform: translateY(-1px);
          background: rgba(247,241,227,0.06);
          border-color: rgba(212,175,55,0.22);
        }

        .nv-mobile-link-main {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }

        .nv-mobile-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 999px;
          background: rgba(212,175,55,0.12);
          color: #E7C96A;
          flex-shrink: 0;
        }

        .nv-mobile-label {
          font-family: var(--font-plex-mono), monospace;
          font-size: 11px;
          letter-spacing: .16em;
          text-transform: uppercase;
          color: #F7F1E3;
        }

        .nv-panel-bottom {
          margin-top: auto;
          padding-top: 18px;
        }

        .nv-panel-cta {
          display: inline-flex;
          width: 100%;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border-radius: 999px;
          padding: 14px 16px;
          background: linear-gradient(135deg, #E7C96A, #D4AF37);
          color: #102016;
          text-decoration: none;
          font-family: var(--font-plex-mono), monospace;
          font-size: 11px;
          letter-spacing: .16em;
          text-transform: uppercase;
          box-shadow: 0 16px 34px rgba(212,175,55,0.22);
        }

        @media (min-width: 1024px) {
          .nv-desktop {
            display: flex;
          }

          .nv-mobile-btn {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .nv-header {
            padding: 10px 10px 0;
          }

          .nv-shell {
            border-radius: 18px;
          }

          .nv-inner {
            padding: 12px 12px;
          }

          .nv-mark {
            width: 38px;
            height: 38px;
          }

          .nv-title {
            font-size: 1rem;
          }

          .nv-sub {
            font-size: 9px;
            letter-spacing: .14em;
          }

          .nv-mobile-btn {
            width: 44px;
            height: 44px;
          }
        }

        @media (max-width: 480px) {
          .nv-header {
            padding: 8px 8px 0;
          }

          .nv-shell {
            border-radius: 16px;
          }

          .nv-inner {
            padding: 10px 10px;
            gap: 10px;
          }

          .nv-brand {
            gap: 10px;
            min-width: 0;
          }

          .nv-mark {
            width: 34px;
            height: 34px;
          }

          .nv-title {
            font-size: 0.96rem;
          }

          .nv-sub {
            font-size: 8px;
          }

          .nv-mobile-btn {
            width: 42px;
            height: 42px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .nv-header,
          .nv-mark,
          .nv-glow {
            animation: none !important;
          }

          .nv-link:hover,
          .nv-cta:hover,
          .nv-mobile-btn:hover,
          .nv-mobile-link:hover {
            transform: none !important;
          }

          .nv-panel,
          .nv-backdrop {
            transition: none !important;
          }
        }
      `}</style>

      <header className="nv-header">
        <div className={`nv-shell ${scrolled ? "scrolled" : ""}`}>
          <div className="nv-glow" aria-hidden="true" />
          <div className="nv-inner">
            <a href="#" className="nv-brand" onClick={() => setOpen(false)}>
              <DraftMark />
              <div className="nv-brand-copy">
                <p className="nv-title">
                  SPARK<span>64</span>
                </p>
                <p className="nv-sub">Youth Chess Talent Hunt</p>
              </div>
            </a>

            <nav className="nv-desktop" aria-label="Primary navigation">
              {LINKS.map(({ label, href, icon: Icon }) => (
                <a key={href} href={href} className="nv-link">
                  <Icon size={14} strokeWidth={1.8} />
                  {label}
                </a>
              ))}
              <a href="#register" className="nv-cta">
                Register
                <ChevronRight size={15} strokeWidth={2} />
              </a>
            </nav>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="nv-mobile-btn"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <div className="nv-panel-wrap" aria-hidden={!open}>
        <div
          className={`nv-backdrop ${open ? "open" : ""}`}
          onClick={() => setOpen(false)}
        />
        <aside className={`nv-panel ${open ? "open" : ""}`}>
          <div className="nv-panel-inner">
            <div className="nv-panel-top">
              <div className="nv-panel-brand">
                <DraftMark />
                <div>
                  <p className="nv-panel-title">
                    SPARK<span>64</span>
                  </p>
                  <p className="nv-panel-sub">Powered by Raven Rows</p>
                </div>
              </div>

              <button
                type="button"
                className="nv-close"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <nav className="nv-mobile-nav" aria-label="Mobile navigation">
              {LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  className="nv-mobile-link"
                  onClick={() => setOpen(false)}
                >
                  <div className="nv-mobile-link-main">
                    <span className="nv-mobile-icon">
                      <Icon size={17} strokeWidth={1.8} />
                    </span>
                    <span className="nv-mobile-label">{label}</span>
                  </div>
                  <ChevronRight size={16} color="rgba(247,241,227,0.6)" />
                </a>
              ))}
            </nav>

            <div className="nv-panel-bottom">
              <a
                href="#register"
                className="nv-panel-cta"
                onClick={() => setOpen(false)}
              >
                Register your champion
                <ChevronRight size={15} strokeWidth={2} />
              </a>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}