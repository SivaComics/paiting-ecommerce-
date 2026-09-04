"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Movement {
  key: string;
  name: string;
  min: number;
  max: number;
  eyebrow: string;
  lines: [string, string];
  copy: string;
  cta?: boolean;
  poster: string;
}

const MOVEMENTS: Movement[] = [
  {
    key: "origin",
    name: "Origin",
    min: 0,
    max: 0.2,
    eyebrow: "ORIGIN SERIES — MOVEMENT ONE",
    lines: ["Still", "Whole"],
    copy: "Every artwork begins as a single point of stillness, before it becomes many.",
    poster: "/hero-posters/origin.jpg",
  },
  {
    key: "spark",
    name: "Spark",
    min: 0.2,
    max: 0.4,
    eyebrow: "MOVEMENT TWO",
    lines: ["One", "Point"],
    copy: "A single point finds a direction to move.",
    poster: "/hero-posters/spark.jpg",
  },
  {
    key: "break",
    name: "Break",
    min: 0.4,
    max: 0.55,
    eyebrow: "MOVEMENT THREE",
    lines: ["Balance", "Breaks"],
    copy: "Transformation begins.",
    poster: "/hero-posters/break.jpg",
  },
  {
    key: "descent",
    name: "Descent",
    min: 0.55,
    max: 0.75,
    eyebrow: "MOVEMENT FOUR",
    lines: ["Energy", "Descends"],
    copy: "From origin toward form.",
    poster: "/hero-posters/descent.jpg",
  },
  {
    key: "arrival",
    name: "Arrival",
    min: 0.75,
    max: 1,
    eyebrow: "MOVEMENT FIVE",
    lines: ["It", "Arrives"],
    copy: "This is where art begins.",
    cta: true,
    poster: "/hero-posters/arrival.jpg",
  },
];

function getActiveIndex(progress: number): number {
  for (let i = 0; i < MOVEMENTS.length; i++) {
    const m = MOVEMENTS[i];
    const isLast = i === MOVEMENTS.length - 1;
    if (progress >= m.min && (isLast ? progress <= m.max : progress < m.max)) {
      return i;
    }
  }
  return MOVEMENTS.length - 1;
}

// Always returns exactly 2 "nearby" movement indices — the neighbors of
// activeIndex — sliding the pair inward at either end so there are always
// two chips to show, even for the first/last movement.
function getNeighborIndices(activeIndex: number): [number, number] {
  const last = MOVEMENTS.length - 1;
  if (activeIndex <= 0) return [1, 2];
  if (activeIndex >= last) return [last - 2, last - 1];
  return [activeIndex - 1, activeIndex + 1];
}

// "Slate" isn't one of this site's CSS variables — cream is the closest
// existing neutral that still reads clearly against the dark video, so it
// stands in as the cool counterpart to copper here.
const MOTIFS: Array<{
  shape: "circle" | "triangle";
  color: "copper" | "cream";
  top: string;
  left: string;
  size: number;
  driftRange: number;
}> = [
  { shape: "circle", color: "copper", top: "12%", left: "60%", size: 46, driftRange: 16 },
  { shape: "triangle", color: "cream", top: "20%", left: "84%", size: 32, driftRange: 12 },
  { shape: "circle", color: "cream", top: "48%", left: "72%", size: 22, driftRange: 20 },
  { shape: "triangle", color: "copper", top: "66%", left: "58%", size: 38, driftRange: 14 },
  { shape: "circle", color: "copper", top: "78%", left: "88%", size: 26, driftRange: 18 },
  { shape: "triangle", color: "cream", top: "36%", left: "94%", size: 22, driftRange: 10 },
];

interface HeroNarrativeOverlayProps {
  /** 0-1 scroll progress through the hero's scroll track. */
  progress: number;
  reducedMotion: boolean;
  /** Scrolls the page so the hero's progress reaches this value (0-1). */
  onNavigate: (progress: number) => void;
}

export function HeroNarrativeOverlay({ progress, reducedMotion, onNavigate }: HeroNarrativeOverlayProps) {
  const activeIndex = getActiveIndex(progress);
  const active = MOVEMENTS[activeIndex];
  const [neighborA, neighborB] = getNeighborIndices(activeIndex);

  function goTo(index: number) {
    const target = MOVEMENTS[index];
    onNavigate((target.min + target.max) / 2);
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      {/* Screen-reader summary of the whole sequence, independent of scroll state */}
      <p className="sr-only">
        This hero animates through five movements as you scroll: Origin, where a single point of
        stillness begins; Spark, where that point finds a direction to move; Break, where balance
        gives way to transformation; Descent, as energy moves from origin toward form; and Arrival,
        where the piece takes shape and you can discover the full collection.
      </p>

      {/* Scrim behind the text column only — not full-bleed over the video */}
      <div
        className="absolute inset-y-0 left-0 w-full sm:w-[55%] lg:w-[45%]"
        style={{
          background: "linear-gradient(90deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.15) 70%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* Floating outline motifs, tied to scroll progress via a subtle vertical drift */}
      {MOTIFS.map((m, i) => {
        const drift = reducedMotion ? 0 : (progress - 0.5) * m.driftRange;
        const stroke = m.color === "copper" ? "var(--color-copper)" : "var(--color-cream)";
        return (
          <svg
            key={i}
            aria-hidden="true"
            width={m.size}
            height={m.size}
            viewBox="0 0 100 100"
            className="absolute opacity-40"
            style={{ top: m.top, left: m.left, transform: `translateY(${drift}px)` }}
          >
            {m.shape === "circle" ? (
              <circle cx="50" cy="50" r="42" fill="none" stroke={stroke} strokeWidth="2" />
            ) : (
              <path d="M50,10 L88,82 L12,82 Z" fill="none" stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
            )}
          </svg>
        );
      })}

      {/* Main text column — left-aligned, vertically centered, left ~40% of viewport */}
      <div className="absolute inset-0 flex items-center overflow-hidden">
        <div className="w-full sm:w-[55%] lg:w-[40%] px-6 sm:px-10 lg:px-16">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={active.key}
              initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reducedMotion ? 0 : -16 }}
              transition={{ duration: reducedMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-start gap-3 sm:gap-4"
            >
              <p className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.25em] text-copper-light">
                {active.eyebrow}
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-cream">
                <span className="block">{active.lines[0]}</span>
                <span className="block">{active.lines[1]}</span>
              </h2>
              <p className="max-w-sm text-sm sm:text-base text-cream/75">{active.copy}</p>
              {active.cta && (
                <div className="pointer-events-auto mt-2 flex flex-wrap items-center gap-4">
                  <Button href="/discover" variant="outline-light" size="md">
                    Discover the Collection
                  </Button>
                  <Link
                    href="/philosophy"
                    className="text-xs font-sans uppercase tracking-[0.2em] text-cream/70 underline underline-offset-4 transition-colors duration-300 ease-premium hover:text-copper-light"
                  >
                    Read the Philosophy
                  </Link>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Badge, bottom-left, visible across all movements — links to the philosophy page */}
      <div className="pointer-events-auto absolute bottom-6 left-6 sm:bottom-8 sm:left-10 lg:left-16">
        <Link
          href="/philosophy"
          className="block text-[9px] leading-relaxed font-sans uppercase tracking-[0.2em] text-cream/50 transition-colors duration-300 ease-premium hover:text-copper-light sm:text-[10px]"
        >
          Cosmology in Miniature
          <br />
          Six Movements, One Origin
        </Link>
      </div>

      {/* Stage-switcher chips + prev/next — desktop only */}
      <div className="pointer-events-auto hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col items-end gap-3">
        {[neighborA, neighborB].map((index) => {
          const m = MOVEMENTS[index];
          return (
            <button
              key={m.key}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Jump to the ${m.name} movement`}
              className="group flex items-center gap-3 border border-cream/15 bg-ink/40 py-2 pl-3 pr-4 backdrop-blur-sm transition-colors duration-300 ease-premium hover:border-copper/60"
            >
              <span className="h-10 w-14 flex-shrink-0 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.poster} alt="" className="h-full w-full object-cover" />
              </span>
              <span className="flex flex-col items-start text-left">
                <span className="font-serif text-sm text-cream">{m.name}</span>
                <span className="text-[9px] font-sans uppercase tracking-wider text-cream/50 transition-colors duration-300 ease-premium group-hover:text-copper-light">
                  View this movement
                </span>
              </span>
            </button>
          );
        })}

        <div className="mt-1 flex items-center gap-2">
          <button
            type="button"
            onClick={() => goTo(Math.max(0, activeIndex - 1))}
            disabled={activeIndex === 0}
            aria-label="Previous movement"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-cream/25 text-cream/70 transition-colors duration-300 ease-premium hover:border-copper hover:text-copper-light disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronLeft size={16} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={() => goTo(Math.min(MOVEMENTS.length - 1, activeIndex + 1))}
            disabled={activeIndex === MOVEMENTS.length - 1}
            aria-label="Next movement"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-cream/25 text-cream/70 transition-colors duration-300 ease-premium hover:border-copper hover:text-copper-light disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronRight size={16} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
