"use client";

import {
  useRef,
  useState,
  type ReactNode,
  type CSSProperties,
  type MouseEvent,
} from "react";

interface Tilt3DProps {
  children: ReactNode;
  max?: number;
  scale?: number;
  glare?: boolean;
  perspective?: number;
  className?: string;
  style?: CSSProperties;
}

export default function Tilt3D({
  children,
  max = 10,
  scale = 1.02,
  glare = true,
  perspective = 1100,
  className = "",
  style = {},
}: Tilt3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("rotateX(0deg) rotateY(0deg) scale(1)");
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, o: 0 });

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (0.5 - py) * max * 2;
    const ry = (px - 0.5) * max * 2;

    setTransform(`rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale(${scale})`);

    if (glare) {
      setGlarePos({ x: px * 100, y: py * 100, o: 0.18 });
    }
  }

  function handleLeave() {
    setTransform("rotateX(0deg) rotateY(0deg) scale(1)");
    setGlarePos((g) => ({ ...g, o: 0 }));
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`tilt-3d-wrap ${className}`}
      style={{ perspective: `${perspective}px`, ...style }}
    >
      <div className="tilt-3d-inner relative transition-transform duration-200 ease-out" style={{ transform }}>
        {children}
        {glare && (
          <div
            aria-hidden="true"
            className="tilt-3d-glare pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{
              opacity: glarePos.o,
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.6), transparent 55%)`,
            }}
          />
        )}
      </div>
    </div>
  );
}