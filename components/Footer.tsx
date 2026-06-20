import { Mail, Phone, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <>
      <style>{`
        .ft-section {
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(circle at 18% 18%, rgba(212,175,55,0.12), transparent 26%),
            radial-gradient(circle at 82% 24%, rgba(54,88,68,0.24), transparent 26%),
            linear-gradient(180deg, #102016 0%, #121a14 100%);
        }

        .ft-section::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(45deg, rgba(247,241,227,0.02) 25%, transparent 25%),
            linear-gradient(-45deg, rgba(247,241,227,0.02) 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, rgba(247,241,227,0.02) 75%),
            linear-gradient(-45deg, transparent 75%, rgba(247,241,227,0.02) 75%);
          background-size: 64px 64px;
          background-position: 0 0, 0 32px, 32px -32px, -32px 0;
          opacity: .28;
          pointer-events: none;
        }

        .ft-top {
          border-bottom: 1px solid rgba(247,241,227,0.14);
        }

        .ft-logo {
          letter-spacing: 0.08em;
        }

        .ft-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          padding: .35rem .75rem;
          border: 1px solid rgba(247,241,227,0.12);
          background: rgba(247,241,227,0.04);
          font-family: var(--font-plex-mono), monospace;
          font-size: 9px;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: rgba(247,241,227,0.56);
        }

        .ft-links a {
          position: relative;
        }

        .ft-links a::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -0.35rem;
          width: 0;
          height: 1px;
          background: linear-gradient(90deg, #D4AF37, transparent);
          transition: width 220ms ease;
          opacity: .9;
        }

        .ft-links a:hover::after {
          width: 100%;
        }

        .ft-contact a {
          transition: color 180ms ease, transform 180ms ease;
        }

        .ft-contact a:hover {
          color: #F7F1E3;
          transform: translateY(-1px);
        }

        .ft-mini {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 4px;
        }

        .ft-mini span {
          height: 6px;
          border-radius: 999px;
        }
      `}</style>

      <footer className="ft-section px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="ft-top flex flex-col gap-10 border-ivory/10 pb-10 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-3">
              <p className="ft-logo font-display text-2xl font-semibold text-ivory">
                SPARK<span className="checker-fill">64</span>
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ivory/45">
                Youth Chess Talent Hunt
              </p>
              <span className="ft-badge">
                Powered by Raven Rows
              </span>
              <div className="mt-4 ft-mini" aria-hidden="true">
                {Array.from({ length: 4 }).map((_, i) => (
                  <span
                    key={i}
                    style={{ background: i % 2 === 0 ? "#D4AF37" : "#F7F1E3" }}
                  />
                ))}
              </div>
            </div>

            <nav className="ft-links flex flex-wrap gap-6 text-sm sm:gap-8">
              <a
                href="#about"
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-ivory/60 hover:text-ivory"
              >
                About
              </a>
              <a
                href="#categories"
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-ivory/60 hover:text-ivory"
              >
                Categories
              </a>
              <a
                href="#prizes"
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-ivory/60 hover:text-ivory"
              >
                Prizes
              </a>
              <a
                href="#venue"
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-ivory/60 hover:text-ivory"
              >
                Venue
              </a>
              <a
                href="#register"
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-ivory/60 hover:text-ivory"
              >
                Register
              </a>
            </nav>

            <div className="ft-contact flex flex-col gap-2">
              <a
                href="mailto:hello@spark64.in"
                className="flex items-center gap-2 font-mono text-[11px] text-ivory/60"
              >
                <Mail size={14} /> hello@spark64.in
              </a>
              <a
                href="tel:+910000000000"
                className="flex items-center gap-2 font-mono text-[11px] text-ivory/60"
              >
                <Phone size={14} /> +91 00000 00000
              </a>
              <a
                href="#"
                className="flex items-center gap-2 font-mono text-[11px] text-ivory/60"
              >
                <Instagram size={14} /> @spark64chess
              </a>
            </div>
          </div>

          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-ivory/30">
            © 2026 Spark64 Youth Chess Talent Hunt. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}