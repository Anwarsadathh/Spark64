"use client";

import { useEffect, useRef } from "react";

/*
  Palette — consistent with Hero:
  BG          : ivory (#F4EEDF) — light section after dark hero
  Accent      : brass (#C9A227)
  Board green : #4A6741
  Ink         : #16241C
*/

const STATS = [
  { num: "8",   suffix: "",  label: "Age categories",     sub: "U6 through U20"         },
  { num: "2",   suffix: "",  label: "Tournament days",    sub: "Full rounds both days"   },
  { num: "100", suffix: "+", label: "Players expected",   sub: "Across all categories"   },
  { num: "1",   suffix: "st",label: "Tournament of its kind", sub: "In the region"       },
];

/* ── Animated counter hook ── */
function useCountUp(target: number, duration = 1200, start = false) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!start) return;
    const el = ref.current;
    if (!el) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = String(Math.round(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return ref;
}

/* ── Single animated stat card ── */
function StatCard({
  num, suffix, label, sub, animate,
}: {
  num: string; suffix: string; label: string; sub: string; animate: boolean;
}) {
  const isNumeric = !isNaN(Number(num));
  const countRef  = useCountUp(Number(num), 1000, animate && isNumeric);

  return (
    <div
      className="about-stat-card group relative flex flex-col gap-2 overflow-hidden
                 rounded-2xl border px-6 py-7 transition-all duration-300
                 hover:-translate-y-1"
      style={{
        borderColor: "rgba(74,103,65,0.14)",
        background:  "rgba(244,238,223,0.6)",
      }}
    >
      {/* top-left brass accent line */}
      <span
        className="absolute left-0 top-0 h-[2px] w-12 rounded-full transition-all duration-500 group-hover:w-full"
        style={{ background: "linear-gradient(90deg,#C9A227,#E2C158)" }}
        aria-hidden="true"
      />

      <p
        className="font-display font-black leading-none tracking-tight"
        style={{ fontSize: "clamp(40px,6vw,56px)", color: "#1F3D2E" }}
      >
        {isNumeric ? (
          <>
            <span ref={countRef}>0</span>
            {suffix && <span style={{ color: "#C9A227" }}>{suffix}</span>}
          </>
        ) : (
          <span>{num}{suffix}</span>
        )}
      </p>

      <p className="font-display text-lg font-medium" style={{ color: "#16241C" }}>
        {label}
      </p>
      <p className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: "rgba(22,36,28,0.45)" }}>
        {sub}
      </p>
    </div>
  );
}

/* ── Chess board illustration ── */
function BoardIllustration() {
  const squares = Array.from({ length: 64 }, (_, i) => {
    const r = Math.floor(i / 8);
    const c = i % 8;
    return { r, c, dark: (r + c) % 2 === 0 };
  });

  /* A few "highlight" squares to suggest a game in progress */
  const highlights: Record<string, string> = {
    "3-3": "#C9A227",
    "3-4": "rgba(201,162,39,0.35)",
    "4-3": "rgba(201,162,39,0.20)",
    "5-5": "rgba(201,162,39,0.25)",
    "1-6": "rgba(201,162,39,0.18)",
  };

  return (
    <div className="about-board-wrap relative">
      {/* outer shadow ring */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{ boxShadow: "0 32px 80px -16px rgba(31,61,46,0.30), 0 0 0 1px rgba(74,103,65,0.18)" }}
        aria-hidden="true"
      />

      {/* coordinate labels — files */}
      <div className="mb-1 flex pl-6">
        {["a","b","c","d","e","f","g","h"].map((f) => (
          <span key={f} className="flex-1 text-center font-mono text-[8px] uppercase tracking-widest"
            style={{ color: "rgba(22,36,28,0.3)" }}>{f}</span>
        ))}
      </div>

      <div className="flex">
        {/* rank labels */}
        <div className="flex flex-col justify-around pr-1">
          {[8,7,6,5,4,3,2,1].map((n) => (
            <span key={n} className="font-mono text-[8px] leading-none" style={{ color: "rgba(22,36,28,0.3)" }}>{n}</span>
          ))}
        </div>

        {/* board */}
        <div
          className="grid flex-1 overflow-hidden rounded-xl"
          style={{ gridTemplateColumns: "repeat(8,1fr)", aspectRatio: "1/1" }}
        >
          {squares.map(({ r, c, dark }) => {
            const key = `${r}-${c}`;
            const hl  = highlights[key];
            return (
              <div
                key={key}
                className="relative transition-all duration-200 hover:brightness-105"
                style={{ background: dark ? "#4A6741" : "#E8E0CC" }}
              >
                {hl && (
                  <span
                    className="absolute inset-[15%] rounded-full"
                    style={{ background: hl }}
                    aria-hidden="true"
                  />
                )}
                {/* king piece on e4 highlight */}
                {key === "3-3" && (
                  <svg
                    viewBox="0 0 24 24"
                    className="absolute inset-[8%]"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 2v5M9.5 4.5h5M9 7c0-1 6-1 6 0l1.5 6H7.5L9 7zM7 13c-2 0-3 1.5-3 3l-.5 4h17l-.5-4c0-1.5-1-3-3-3z"
                      stroke="#F4EEDF"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* "Move" annotation */}
      <div
        className="absolute -right-4 top-1/2 -translate-y-1/2 rounded-xl border px-3 py-2 shadow-lg"
        style={{
          background:   "#F4EEDF",
          borderColor:  "rgba(74,103,65,0.16)",
          boxShadow:    "0 8px 24px rgba(31,61,46,0.12)",
        }}
        aria-hidden="true"
      >
        <p className="font-mono text-[9px] uppercase tracking-widest" style={{ color: "rgba(22,36,28,0.4)" }}>
          Last move
        </p>
        <p className="font-display text-sm font-semibold" style={{ color: "#1F3D2E" }}>
          d4 → d4
        </p>
      </div>
    </div>
  );
}

export default function About() {
  const sectionRef  = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);
  const [animate, setAnimate] = [
    useRef(false),
    () => { if (!hasAnimated.current) { hasAnimated.current = true; } },
  ];
  /* We track visibility to trigger count-up */
  const [visible, setVisible] = require("react").useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes s64-about-fadeUp {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .about-visible .about-animate {
          animation: s64-about-fadeUp 0.7s ease both;
        }
        .about-visible .about-animate:nth-child(1) { animation-delay:0.05s; }
        .about-visible .about-animate:nth-child(2) { animation-delay:0.15s; }
        .about-visible .about-animate:nth-child(3) { animation-delay:0.25s; }
        .about-visible .about-animate:nth-child(4) { animation-delay:0.35s; }
        .about-visible .about-board  { animation: s64-about-fadeUp 0.9s 0.1s ease both; }
        .about-stat-card::before {
          content:"";
          position:absolute;
          inset:0;
          background: linear-gradient(135deg, rgba(201,162,39,0.05) 0%, transparent 60%);
          border-radius: inherit;
          opacity:0;
          transition: opacity 0.3s;
        }
        .about-stat-card:hover::before { opacity:1; }
        .about-board-wrap {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .about-visible .about-board-wrap {
          opacity: 1;
          transform: translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .about-visible .about-animate,
          .about-visible .about-board-wrap { animation:none!important; transition:none!important; opacity:1!important; transform:none!important; }
        }
      `}</style>

      <section
        ref={sectionRef}
        id="about"
        className={`bg-ivory px-6 py-24 ${visible ? "about-visible" : ""}`}
      >
        <div className="mx-auto max-w-6xl">

          {/* ── Top: heading + copy ── */}
          <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-20 md:items-center">

            {/* Left: heading */}
            <div>
              <div className="about-animate rule-mono">
                <h2
                  className="font-display font-semibold leading-[1.05]"
                  style={{ fontSize: "clamp(36px,5vw,56px)", color: "#1F3D2E" }}
                >
                  64 squares<br />
                  decide<br />
                  <em className="not-italic" style={{ color: "#C9A227" }}>everything.</em>
                </h2>
              </div>

              {/* decorative file labels */}
              <div className="about-animate mt-8 flex gap-1.5" aria-hidden="true">
                {["a","b","c","d","e","f","g","h"].map((f, i) => (
                  <span
                    key={f}
                    className="flex h-6 w-6 items-center justify-center rounded font-mono text-[9px] font-medium uppercase"
                    style={{
                      background:   i % 2 === 0 ? "#4A6741" : "#E8E0CC",
                      color:        i % 2 === 0 ? "#E8E0CC" : "#4A6741",
                      transition:   `opacity ${0.1 + i * 0.05}s`,
                    }}
                  >{f}</span>
                ))}
              </div>
            </div>

            {/* Right: body copy */}
            <div className="flex flex-col gap-5">
              <p className="about-animate text-balance font-body text-lg leading-relaxed" style={{ color: "rgba(22,36,28,0.78)" }}>
                Spark64 brings young chess minds together for two days of focused
                competition, fair play, and the thrill of a real tournament hall —
                built to spotlight rising talent across every age group, from
                first movers to seasoned strategists.
              </p>
              <p className="about-animate text-balance font-body text-lg leading-relaxed" style={{ color: "rgba(22,36,28,0.78)" }}>
                Every round is arbiter-supervised and rated for sportsmanship as
                much as for skill. Whether your child made their first move last
                month or has been reading openings for years, there&apos;s a
                board waiting for them.
              </p>

              {/* Inline quote */}
              <blockquote
                className="about-animate mt-2 border-l-2 pl-5 font-display text-base italic"
                style={{ borderColor: "#C9A227", color: "rgba(22,36,28,0.55)" }}
              >
                "Chess gives children a language that transcends age, school,
                and background — and Spark64 gives them the stage."
              </blockquote>
            </div>
          </div>

          {/* ── Middle: board illustration + stats ── */}
          <div className="mt-20 grid gap-12 md:grid-cols-[1fr_1fr] md:gap-16 md:items-start">

            {/* Board */}
            <div className="about-board-wrap px-2">
              <BoardIllustration />
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((s, i) => (
                <StatCard key={s.label} {...s} animate={visible} />
              ))}

              {/* Feature list */}
              <div
                className="col-span-2 mt-2 rounded-2xl border px-6 py-5"
                style={{
                  borderColor: "rgba(74,103,65,0.12)",
                  background:  "rgba(74,103,65,0.04)",
                }}
              >
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "#C9A227" }}>
                  What every player gets
                </p>
                <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
                  {[
                    "Certified arbiter supervision",
                    "Participation certificate",
                    "Real tournament clock play",
                    "Category medal or trophy",
                    "Sportsmanship rating",
                    "Family seating & refreshments",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 font-body text-sm" style={{ color: "rgba(22,36,28,0.72)" }}>
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "#C9A227" }} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}