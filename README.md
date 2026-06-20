# Spark64 — Youth Chess Talent Hunt

Landing page for the Spark64 Youth Chess Talent Hunt, powered by Raven Rows.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000

## What's left to plug in

- **Logo** — drop the final logo file into `/public` and swap the text
  wordmark in `components/Navbar.tsx` and `components/Footer.tsx` for an
  `<Image />` tag (marked with `// TODO` comments).
- **Testimonials** — `components/Testimonials.tsx` has three placeholder
  quotes. Replace with real lines from 2–3 families/players from last
  year's edition.
- **Registration link** — `components/RegisterCTA.tsx` and the navbar
  "Register" button currently point at `#`. Point both at your live
  registration form once it's ready.
- **Venue & dates** — `components/Venue.tsx` is wired to say "To Be
  Announced." Update once confirmed.
- **Contact details & socials** — `components/Footer.tsx` has placeholder
  email, phone, and Instagram handle.

## Design notes

- Palette is drawn from an actual tournament board: deep board-green,
  ivory squares, walnut wood, and brass trophy plating — not a generic
  dark+gold theme.
- The eight age categories (U6–U20) are mapped to a chessboard's eight
  files (a–h) in the Categories section — this is the page's one
  intentional signature device, used nowhere else.
- Fonts: Fraunces (display), IBM Plex Sans (body), IBM Plex Mono
  (labels/eyebrows — chosen to echo chess notation).
