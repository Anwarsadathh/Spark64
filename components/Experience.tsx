"use client";

import { useEffect, useRef, useState } from "react";
import {
  ShieldCheck,
  Users,
  UtensilsCrossed,
  FileCheck2,
  Award,
  Clock3,
  ChevronRight,
} from "lucide-react";

const ITEMS = [
  {
    icon: ShieldCheck,
    title: "Certified arbiters",
    copy: "Every round is monitored with official discipline and fair result handling.",
    meta: "Official play",
  },
  {
    icon: Users,
    title: "Parent seating",
    copy: "Families stay close to the action in a calmer, comfortable viewing setup.",
    meta: "Family friendly",
  },
  {
    icon: UtensilsCrossed,
    title: "Refreshments",
    copy: "Water and food support planned across both tournament days.",
    meta: "2-day support",
  },
  {
    icon: FileCheck2,
    title: "Certificates",
    copy: "Every participant leaves with recognition for stepping into real competition.",
    meta: "For every player",
  },
  {
    icon: Award,
    title: "Medals & trophies",
    copy: "Top performers are rewarded across every age category from U6 to U20.",
    meta: "Category honours",
  },
  {
    icon: Clock3,
    title: "Structured rounds",
    copy: "The event follows a clear tournament rhythm from reporting to prize closure.",
    meta: "Clear schedule",
  },
];

function KnightBadge() {
  return (
    <svg
      viewBox="0 0 72 72"
      className="exp-knight"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="exp-gold" x1="12" y1="8" x2="56" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E2C158" />
          <stop offset="55%" stopColor="#C9A227" />
          <stop offset="100%" stopColor="#8D6A14" />
        </linearGradient>
      </defs>
      <path
        d="M24 57H52C54 57 55.5 55.3 55 53.3L52.2 42.4C51.3 38.8 49.1 35.7 45.9 33.7L38.5 29.1L43 21.1C45 17.5 43.3 12.9 39.4 11.5L28.2 7.8L18 14.5L24.7 20.2L18.8 31.5C16.9 35.3 15.9 39.4 16.1 43.7L16.3 49.8C16.4 54 19.4 57 24 57Z"
        fill="url(#exp-gold)"
      />
      <path d="M21 57H57" stroke="#F4EEDF" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="31" cy="18" r="1.8" fill="#173024" />
    </svg>
  );
}

function ChessRail() {
  return (
    <div className="exp-rail" aria-hidden="true">
      {Array.from({ length: 18 }).map((_, i) => (
        <span
          key={i}
          style={{ background: i % 2 === 0 ? "#4A6741" : "#E8E0CC" }}
        />
      ))}
    </div>
  );
}

function ExperienceRow({
  item,
  index,
  visible,
}: {
  item: (typeof ITEMS)[number];
  index: number;
  visible: boolean;
}) {
  const Icon = item.icon;

  return (
    <article
      className={`exp-row ${visible ? "exp-row-visible" : ""}`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="exp-row-grid">
        <div className="exp-row-left">
          <div className="exp-icon">
            <Icon size={18} strokeWidth={1.8} />
          </div>

          <div>
            <p className="exp-meta">{item.meta}</p>
            <h3 className="exp-title">{item.title}</h3>
          </div>
        </div>

        <p className="exp-copy">{item.copy}</p>

        <div className="exp-arrow">
          <ChevronRight size={18} />
        </div>
      </div>
    </article>
  );
}

export default function Experience() {
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
  @keyframes expReveal {
    from {
      opacity: 0;
      clip-path: inset(0 0 100% 0 round 24px);
      transform: translateY(14px);
    }
    to {
      opacity: 1;
      clip-path: inset(0 0 0 0 round 24px);
      transform: translateY(0);
    }
  }

  @keyframes expGlow {
    0%, 100% {
      opacity: 0.35;
      transform: scale(1);
    }
    50% {
      opacity: 0.6;
      transform: scale(1.06);
    }
  }

  @keyframes expFloat {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-6px);
    }
  }

  @keyframes expLineMove {
    from {
      transform: translateX(-15%);
    }
    to {
      transform: translateX(15%);
    }
  }

  .exp-section {
    position: relative;
    overflow: hidden;
    background:
      radial-gradient(circle at 14% 20%, rgba(201,162,39,0.10), transparent 28%),
      radial-gradient(circle at 84% 18%, rgba(74,103,65,0.22), transparent 25%),
      linear-gradient(160deg, #173024 0%, #122318 100%);
  }

  .exp-section::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(45deg, rgba(244,238,223,0.03) 25%, transparent 25%),
      linear-gradient(-45deg, rgba(244,238,223,0.03) 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, rgba(244,238,223,0.03) 75%),
      linear-gradient(-45deg, transparent 75%, rgba(244,238,223,0.03) 75%);
    background-size: 64px 64px;
    background-position: 0 0, 0 32px, 32px -32px, -32px 0;
    opacity: 0.35;
    pointer-events: none;
  }

  .exp-orb {
    position: absolute;
    border-radius: 999px;
    filter: blur(72px);
    pointer-events: none;
    animation: expGlow 7s ease-in-out infinite;
  }

  .exp-wrap {
    position: relative;
    z-index: 1;
  }

  .exp-layout {
    display: grid;
    gap: 2rem;
  }

  @media (min-width: 1024px) {
    .exp-layout {
      grid-template-columns: 0.78fr 1.22fr;
      align-items: start;
    }
  }

  .exp-intro {
    position: relative;
  }

  @media (min-width: 1024px) {
    .exp-intro {
      position: sticky;
      top: 96px;
    }
  }

  .exp-panel {
    border: 1px solid rgba(244,238,223,0.12);
    background: linear-gradient(180deg, rgba(244,238,223,0.09), rgba(244,238,223,0.05));
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.05),
      0 18px 50px rgba(0,0,0,0.22);
    backdrop-filter: blur(10px);
  }

  .exp-knight {
    width: 76px;
    height: 76px;
    animation: expFloat 4.5s ease-in-out infinite;
    filter:
      drop-shadow(0 12px 26px rgba(0,0,0,0.36))
      drop-shadow(0 0 20px rgba(201,162,39,0.22));
  }

  .exp-rail {
    display: grid;
    grid-template-columns: repeat(18, 1fr);
    overflow: hidden;
    border-radius: 999px;
    border: 1px solid rgba(244,238,223,0.10);
    background: rgba(244,238,223,0.04);
  }

  .exp-rail span {
    height: 10px;
  }

  .exp-mini-stats {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    border: 1px solid rgba(244,238,223,0.08);
    border-radius: 18px;
    overflow: hidden;
    background: rgba(244,238,223,0.04);
  }

  .exp-mini-stats > div {
    padding: 0.9rem 1rem;
    border-right: 1px solid rgba(244,238,223,0.08);
  }

  .exp-mini-stats > div:last-child {
    border-right: none;
  }

  .exp-mini-num {
    font-family: var(--font-fraunces), serif;
    font-size: 1.5rem;
    line-height: 1;
    color: #E2C158;
  }

  .exp-mini-label {
    margin-top: 0.3rem;
    font-family: var(--font-plex-mono), monospace;
    font-size: 9px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(244,238,223,0.42);
  }

  .exp-rows {
    display: grid;
    gap: 0.9rem;
  }

  .exp-row {
    opacity: 0;
  }

  .exp-row-visible {
    animation: expReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  .exp-row-grid {
    position: relative;
    display: grid;
    gap: 1rem;
    align-items: center;
    border-radius: 22px;
    border: 1px solid rgba(244,238,223,0.14);
    background: linear-gradient(180deg, rgba(244,238,223,0.10), rgba(244,238,223,0.06));
    padding: 1rem 1.1rem;
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.05),
      0 14px 34px rgba(0,0,0,0.18);
    overflow: hidden;
    transition:
      transform 260ms ease,
      border-color 260ms ease,
      box-shadow 260ms ease,
      background 260ms ease;
    isolation: isolate;
  }

  .exp-row-grid::before {
    content: "";
    position: absolute;
    inset: auto auto 0 0;
    width: 96px;
    height: 1px;
    background: linear-gradient(90deg, #C9A227, transparent);
    animation: expLineMove 3.6s ease-in-out infinite alternate;
    opacity: 0.8;
  }

  .exp-row-grid::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      rgba(18,35,24,0.12) 0%,
      rgba(18,35,24,0.05) 34%,
      rgba(18,35,24,0.00) 100%
    );
    pointer-events: none;
    z-index: 0;
  }

  .exp-row-grid:hover {
    transform: translateY(-3px);
    border-color: rgba(201,162,39,0.24);
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.07),
      0 18px 42px rgba(0,0,0,0.24);
    background: linear-gradient(180deg, rgba(244,238,223,0.11), rgba(244,238,223,0.07));
  }

  @media (min-width: 768px) {
    .exp-row-grid {
      grid-template-columns: 1.1fr 1fr auto;
      padding: 1.05rem 1.15rem;
    }
  }

  .exp-row-left {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 0.9rem;
    min-width: 0;
  }

  .exp-icon {
    width: 42px;
    height: 42px;
    border-radius: 14px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: #E2C158;
    border: 1px solid rgba(201,162,39,0.16);
    background: linear-gradient(135deg, rgba(201,162,39,0.18), rgba(201,162,39,0.06));
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.05);
  }

  .exp-meta {
    position: relative;
    z-index: 1;
    font-family: var(--font-plex-mono), monospace;
    font-size: 9px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(244,238,223,0.48);
  }

  .exp-title {
    position: relative;
    z-index: 1;
    margin-top: 0.2rem;
    font-family: var(--font-fraunces), serif;
    font-size: 1.15rem;
    line-height: 1.15;
    color: rgba(244,238,223,0.97);
  }

  .exp-copy {
    position: relative;
    z-index: 1;
    font-family: var(--font-plex-sans), sans-serif;
    font-size: 0.96rem;
    line-height: 1.7;
    color: rgba(244,238,223,0.84);
    max-width: 34ch;
  }

  .exp-arrow {
    position: relative;
    z-index: 1;
    color: rgba(244,238,223,0.34);
    transition: transform 220ms ease, color 220ms ease;
  }

  .exp-row-grid:hover .exp-arrow {
    transform: translateX(4px);
    color: #E2C158;
  }

  @media (max-width: 767px) {
    .exp-mini-stats {
      grid-template-columns: 1fr;
    }

    .exp-mini-stats > div {
      border-right: none;
      border-bottom: 1px solid rgba(244,238,223,0.08);
    }

    .exp-mini-stats > div:last-child {
      border-bottom: none;
    }

    .exp-arrow {
      display: none;
    }

    .exp-copy {
      max-width: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .exp-orb,
    .exp-knight,
    .exp-row-grid::before {
      animation: none !important;
    }

    .exp-row,
    .exp-row-visible {
      opacity: 1 !important;
      animation: none !important;
      clip-path: none !important;
      transform: none !important;
    }

    .exp-row-grid:hover,
    .exp-row-grid:hover .exp-arrow {
      transform: none !important;
    }
  }
`}</style>

      <section ref={sectionRef} className="exp-section px-6 py-20">
        <div
          className="exp-orb left-[-70px] top-[20px] h-[220px] w-[220px]"
          style={{ background: "rgba(201,162,39,0.12)" }}
          aria-hidden="true"
        />
        <div
          className="exp-orb right-[-60px] bottom-[10px] h-[210px] w-[210px]"
          style={{ background: "rgba(74,103,65,0.28)" }}
          aria-hidden="true"
        />

        <div className="exp-wrap mx-auto max-w-6xl">
          <div className="exp-layout">
            <div className="exp-intro">
              <div className="exp-panel rounded-[28px] p-6 sm:p-7">
                <div className="rule-mono">
                  <h2 className="font-display text-4xl font-semibold leading-[1.05] text-ivory sm:text-5xl">
                    Inside the
                    <br />
                    playing hall.
                  </h2>
                </div>

              <p
  className="mt-4 max-w-sm font-body text-sm leading-relaxed"
  style={{ color: "rgba(244,238,223,0.86)" }}
>
  A more polished tournament environment for players, families,
  and every game that matters.
</p>

                <div className="mt-6 max-w-[290px]">
                  <ChessRail />
                </div>

                <div className="mt-6 flex items-center justify-between gap-4">
                  <KnightBadge />

                  <div className="text-right">
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-ivory/35">
                      Event feel
                    </p>
                    <p className="mt-1 font-display text-lg text-brass">
                      Premium. Focused. Memorable.
                    </p>
                  </div>
                </div>

                <div className="exp-mini-stats mt-7">
                  <div>
                    <div className="exp-mini-num">2</div>
                    <div className="exp-mini-label">Days</div>
                  </div>
                  <div>
                    <div className="exp-mini-num">8</div>
                    <div className="exp-mini-label">Categories</div>
                  </div>
                  <div>
                    <div className="exp-mini-num">U6–U20</div>
                    <div className="exp-mini-label">Entry range</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="exp-rows">
              {ITEMS.map((item, index) => (
                <ExperienceRow
                  key={item.title}
                  item={item}
                  index={index}
                  visible={visible}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}