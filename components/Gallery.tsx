"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Image as ImageIcon, ChevronRight } from "lucide-react";

type PhotoItem = {
  type: "photo";
  src: string;
  thumb?: string;
  title: string;
};

type VideoItem = {
  type: "video";
  src: string;
  poster: string;
  title: string;
  duration?: string;
};

type GalleryItem = PhotoItem | VideoItem;
type TabType = "photos" | "videos";

const PHOTOS: GalleryItem[] = [
  {
    type: "photo",
    src: "/gallery/trophies.jpg",
    thumb: "/gallery/trophies.jpg",
    title: "Trophies and awards",
  },
  {
    type: "photo",
    src: "/gallery/photo-1.jpg",
    thumb: "/gallery/photo-1.jpg",
    title: "Tournament hall overview",
  },
  {
    type: "photo",
    src: "/gallery/photo-2.jpg",
    thumb: "/gallery/photo-2.jpg",
    title: "Main playing area",
  },
  {
    type: "photo",
    src: "/gallery/photo-3.jpg",
    thumb: "/gallery/photo-3.jpg",
    title: "Players in action",
  },
  {
    type: "photo",
    src: "/gallery/photo-4.jpg",
    thumb: "/gallery/photo-4.jpg",
    title: "Round atmosphere",
  },
];

const VIDEOS: GalleryItem[] = [
  {
    type: "video",
    src: "/gallery/video-1.mp4",
    poster: "/gallery/video-1-poster.jpg",
    title: "Tournament walkthrough",
    duration: "0:20",
  },
  {
    type: "video",
    src: "/gallery/video-2.mp4",
    poster: "/gallery/video-2-poster.jpg",
    title: "Players and pairings",
    duration: "0:32",
  },
];

export default function Gallery() {
  const [tab, setTab] = useState<TabType>("photos");
  const items = useMemo(() => (tab === "photos" ? PHOTOS : VIDEOS), [tab]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const thumbsRef = useRef<HTMLDivElement | null>(null);

  const activeItem = items[activeIndex] ?? items[0];

  const switchTab = (nextTab: TabType) => {
    setTab(nextTab);
    setActiveIndex(0);
    setPaused(false);
    setImageFailed(false);
  };

  useEffect(() => {
    setImageFailed(false);
  }, [activeIndex, tab]);

  useEffect(() => {
    if (paused || items.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, tab === "photos" ? 3200 : 5200);

    return () => clearInterval(interval);
  }, [items, paused, tab]);

  useEffect(() => {
    const container = thumbsRef.current;
    if (!container) return;

    const activeThumb = container.querySelector(
      `[data-thumb-index="${activeIndex}"]`
    ) as HTMLElement | null;

    if (activeThumb) {
      activeThumb.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeIndex, tab]);

  const handleThumbClick = (index: number) => {
    setActiveIndex(index);
    setPaused(true);
    setImageFailed(false);
  };

  return (
    <>
      <style>{`
        .gallery-section {
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(circle at 14% 18%, rgba(212,175,55,0.08), transparent 24%),
            radial-gradient(circle at 84% 14%, rgba(54,88,68,0.14), transparent 24%),
            linear-gradient(180deg, #f5efe2 0%, #eee4d2 100%);
        }

        .gallery-section::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(45deg, rgba(31,61,46,0.025) 25%, transparent 25%),
            linear-gradient(-45deg, rgba(31,61,46,0.025) 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, rgba(31,61,46,0.025) 75%),
            linear-gradient(-45deg, transparent 75%, rgba(31,61,46,0.025) 75%);
          background-size: 72px 72px;
          background-position: 0 0, 0 36px, 36px -36px, -36px 0;
          opacity: .22;
          pointer-events: none;
        }

        .gallery-shell {
          position: relative;
          z-index: 1;
        }

        .gallery-note {
          color: rgba(22,36,28,0.68);
        }

        .gallery-tabs {
          display: inline-flex;
          gap: .5rem;
          padding: .35rem;
          border-radius: 999px;
          background: rgba(31,61,46,0.06);
          border: 1px solid rgba(31,61,46,0.08);
        }

        .gallery-tab {
          display: inline-flex;
          align-items: center;
          gap: .55rem;
          border-radius: 999px;
          padding: .8rem 1.1rem;
          font-family: var(--font-plex-mono), monospace;
          font-size: 10px;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: rgba(22,36,28,0.58);
          transition: all 220ms ease;
        }

        .gallery-tab.active {
          background: #1f3d2e;
          color: #f7f1e3;
          box-shadow: 0 12px 28px rgba(31,61,46,0.18);
        }

        .gallery-frame {
          margin-top: 3rem;
          border-radius: 30px;
          overflow: hidden;
          border: 1px solid rgba(31,61,46,0.1);
          background: #07100d;
          box-shadow:
            0 24px 60px rgba(15,23,18,0.18),
            inset 0 1px 0 rgba(255,255,255,0.04);
        }

        .gallery-main {
          position: relative;
          aspect-ratio: 16 / 9;
          background: #050b09;
        }

        .gallery-main.is-video {
          background:
            radial-gradient(circle at center, rgba(255,255,255,0.02), transparent 48%),
            #050b09;
        }

        .gallery-main img,
        .gallery-main video {
          width: 100%;
          height: 100%;
          display: block;
          background: #050b09;
        }

        .gallery-main img {
          object-fit: cover;
          object-position: center;
        }

        .gallery-main video {
          object-fit: contain;
        }

        .gallery-main-empty {
          display: flex;
          height: 100%;
          width: 100%;
          align-items: center;
          justify-content: center;
          background:
            radial-gradient(circle at center, rgba(212,175,55,0.08), transparent 35%),
            #050b09;
          color: rgba(247,241,227,0.78);
          text-align: center;
          padding: 2rem;
        }

        .gallery-main-overlay {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 1rem;
          padding: 1.15rem 1.15rem 1rem;
          background: linear-gradient(180deg, transparent 0%, rgba(8,10,10,0.82) 100%);
          pointer-events: none;
        }

        .gallery-main-overlay.is-video {
          padding-bottom: 4.9rem;
        }

        .gallery-main-copy {
          max-width: min(560px, 82%);
        }

        .gallery-main-title {
          color: #f7f1e3;
          line-height: 1.02;
          text-shadow: 0 8px 18px rgba(0,0,0,0.24);
        }

        .gallery-main-meta {
          margin-top: .4rem;
          color: rgba(247,241,227,0.64);
        }

        .gallery-type-badge {
          display: inline-flex;
          align-items: center;
          gap: .45rem;
          border-radius: 999px;
          padding: .5rem .8rem;
          background: rgba(247,241,227,0.08);
          border: 1px solid rgba(247,241,227,0.12);
          color: #f7f1e3;
          font-family: var(--font-plex-mono), monospace;
          font-size: 10px;
          letter-spacing: .16em;
          text-transform: uppercase;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .gallery-thumbs {
          display: flex;
          gap: .85rem;
          overflow-x: auto;
          padding: 1rem;
          background: #07100d;
          scrollbar-width: thin;
        }

        .gallery-thumbs::-webkit-scrollbar {
          height: 8px;
        }

        .gallery-thumbs::-webkit-scrollbar-thumb {
          background: rgba(247,241,227,0.18);
          border-radius: 999px;
        }

        .gallery-thumb {
          position: relative;
          flex: 0 0 108px;
          height: 86px;
          overflow: hidden;
          border-radius: 16px;
          border: 1px solid rgba(247,241,227,0.08);
          background: #181f1b;
          transition: transform 200ms ease, border-color 200ms ease, box-shadow 200ms ease;
        }

        .gallery-thumb.active {
          border-color: #22c55e;
          box-shadow: 0 0 0 2px rgba(34,197,94,0.18);
        }

        .gallery-thumb:hover {
          transform: translateY(-2px);
          border-color: rgba(212,175,55,0.35);
        }

        .gallery-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .gallery-thumb-duration {
          position: absolute;
          right: .45rem;
          bottom: .45rem;
          border-radius: 999px;
          padding: .2rem .45rem;
          background: rgba(0,0,0,0.62);
          color: #f7f1e3;
          font-family: var(--font-plex-mono), monospace;
          font-size: 10px;
          letter-spacing: .06em;
        }

        .gallery-tip {
          margin-top: 1rem;
          display: inline-flex;
          align-items: center;
          gap: .55rem;
          color: rgba(22,36,28,0.58);
          font-family: var(--font-plex-mono), monospace;
          font-size: 10px;
          letter-spacing: .18em;
          text-transform: uppercase;
          flex-wrap: wrap;
        }

        .gallery-toggle {
          margin-top: .9rem;
          display: inline-flex;
          align-items: center;
          gap: .65rem;
          border-radius: 999px;
          padding: .8rem 1rem;
          border: 1px solid rgba(31,61,46,0.1);
          background: rgba(255,255,255,0.5);
          color: #1f3d2e;
          font-family: var(--font-plex-mono), monospace;
          font-size: 10px;
          letter-spacing: .16em;
          text-transform: uppercase;
          transition: transform 220ms ease, border-color 220ms ease;
        }

        .gallery-toggle:hover {
          transform: translateY(-1px);
          border-color: rgba(212,175,55,0.35);
        }

        @media (max-width: 768px) {
          .gallery-section {
            padding-left: 1rem;
            padding-right: 1rem;
          }

          .gallery-frame {
            margin-top: 2rem;
            border-radius: 22px;
          }

          .gallery-main {
            aspect-ratio: 4 / 5;
          }

          .gallery-main-overlay {
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-end;
            gap: .7rem;
            padding: 1rem .95rem .95rem;
          }

          .gallery-main-overlay.is-video {
            padding-bottom: 5.2rem;
          }

          .gallery-main-copy {
            max-width: 100%;
          }

          .gallery-main-title {
            font-size: 1.85rem;
          }

          .gallery-type-badge {
            font-size: 9px;
            letter-spacing: .14em;
            padding: .45rem .7rem;
          }

          .gallery-thumbs {
            gap: .7rem;
            padding: .85rem;
          }

          .gallery-thumb {
            flex: 0 0 92px;
            height: 76px;
            border-radius: 14px;
          }

          .gallery-tip {
            display: inline-flex;
            font-size: 9px;
            line-height: 1.6;
          }

          .gallery-toggle {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .gallery-main {
            aspect-ratio: 1 / 1.18;
          }

          .gallery-main-title {
            font-size: 1.6rem;
          }

          .gallery-main-overlay.is-video {
            padding-bottom: 5.5rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .gallery-thumb:hover,
          .gallery-toggle:hover {
            transform: none !important;
          }
        }
      `}</style>

      <section id="gallery" className="gallery-section px-6 py-24">
        <div className="gallery-shell mx-auto max-w-6xl">
          <div className="lg:grid lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="rule-mono">
              <h2 className="font-display text-4xl font-semibold leading-[1.05] text-board sm:text-5xl">
                Moments from
                <br />
                last year&apos;s hall.
              </h2>
              <p className="gallery-note mt-5 max-w-2xl font-body text-base leading-relaxed sm:text-lg">
                A premium archive of previous-year photos and videos — from
                trophies and tournament halls to live match moments.
              </p>
            </div>

            <div className="mt-6 lg:mt-0">
              <div className="gallery-tabs">
                <button
                  type="button"
                  onClick={() => switchTab("photos")}
                  className={`gallery-tab ${tab === "photos" ? "active" : ""}`}
                >
                  <ImageIcon size={14} />
                  Photos
                </button>

                <button
                  type="button"
                  onClick={() => switchTab("videos")}
                  className={`gallery-tab ${tab === "videos" ? "active" : ""}`}
                >
                  <Play size={14} />
                  Videos
                </button>
              </div>

            
            </div>
          </div>

          <div className="gallery-frame">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${tab}-${activeIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className={`gallery-main ${activeItem?.type === "video" ? "is-video" : ""}`}
              >
                {activeItem?.type === "photo" ? (
                  imageFailed ? (
                    <div className="gallery-main-empty">
                      <div>
                        <p className="font-display text-2xl">Image not found</p>
                        <p className="mt-2 font-body text-sm text-ivory/60">
                          Check the file path inside <code>/public/gallery</code>.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={activeItem.src}
                      alt={activeItem.title}
                      onError={() => setImageFailed(true)}
                    />
                  )
                ) : (
                  <video
                    src={activeItem?.src}
                    poster={activeItem?.poster}
                    controls
                    playsInline
                    preload="metadata"
                    onPlay={() => setPaused(true)}
                  />
                )}

                <div
                  className={`gallery-main-overlay ${
                    activeItem?.type === "video" ? "is-video" : ""
                  }`}
                >
                  <div className="gallery-main-copy">
                    <p className="gallery-main-title font-display text-2xl sm:text-3xl">
                      {activeItem?.title}
                    </p>
                    <p className="gallery-main-meta font-mono text-[10px] uppercase tracking-[0.18em]">
                      Spark64 archive · Previous edition
                    </p>
                  </div>

                  <div className="gallery-type-badge">
                    {activeItem?.type === "photo" ? (
                      <>
                        <ImageIcon size={13} />
                        Photo
                      </>
                    ) : (
                      <>
                        <Play size={13} />
                        Video
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div
              className="gallery-thumbs"
              ref={thumbsRef}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {items.map((item, index) => (
                <button
                  key={`${item.title}-${index}`}
                  type="button"
                  onClick={() => handleThumbClick(index)}
                  className={`gallery-thumb ${activeIndex === index ? "active" : ""}`}
                  aria-label={`Show ${item.title}`}
                  data-thumb-index={index}
                >
                  {item.type === "photo" ? (
                    <img
                      src={item.thumb || item.src}
                      alt={item.title}
                      onError={(e) => {
                        e.currentTarget.style.opacity = "0.35";
                      }}
                    />
                  ) : (
                    <>
                      <img src={item.poster} alt={item.title} />
                      {item.duration ? (
                        <span className="gallery-thumb-duration">{item.duration}</span>
                      ) : null}
                    </>
                  )}
                </button>
              ))}
            </div>
          </div>

          <p className="gallery-tip">
            Swipe thumbnails
            <ChevronRight size={14} />
          </p>
        </div>
      </section>
    </>
  );
}