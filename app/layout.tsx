import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Spark64 — Youth Chess Talent Hunt | Powered by Raven Rows",
  description:
    "Spark64 is a youth chess talent hunt across eight age categories, U6 to U20. Two days of championship chess, certified arbiters, and trophies for every category champion. Registrations open now.",
  keywords: [
    "Spark64",
    "youth chess tournament",
    "chess talent hunt",
    "Raven Rows",
    "kids chess championship",
  ],
  openGraph: {
    title: "Spark64 — Youth Chess Talent Hunt",
    description:
      "Eight age categories. One board. A new generation of chess talent steps up to compete. Registrations open now.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${plexSans.variable} ${plexMono.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
