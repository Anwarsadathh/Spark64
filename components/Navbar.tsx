"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Categories", href: "#categories" },
  { label: "Prizes", href: "#prizes" },
  { label: "Venue", href: "#venue" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-board/10 bg-ivory/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* TODO: swap for <Image src="/logo.svg" .../> once the final logo is ready */}
        <a href="#" className="font-display text-xl font-semibold tracking-tight text-board">
          SPARK<span className="text-brass">64</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-xs uppercase tracking-widest text-ink/70 transition hover:text-board"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#register"
            className="rounded-full bg-board px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-ivory transition hover:bg-board-light"
          >
            Register
          </a>
        </nav>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          className="text-board md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-board/10 bg-ivory px-6 pb-6 md:hidden">
          <nav className="flex flex-col gap-4 pt-4">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-mono text-sm uppercase tracking-widest text-ink/70"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#register"
              onClick={() => setOpen(false)}
              className="rounded-full bg-board px-5 py-3 text-center font-mono text-sm uppercase tracking-widest text-ivory"
            >
              Register
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
