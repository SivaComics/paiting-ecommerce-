"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useMountedReducedMotion } from "@/components/ui/motion";

// The HS commentary's own reading of how a painting holds together, quoted
// exactly: "The small triangle introduces direction. The circle retains. The
// square contains. The empty field connects." The plate draws those four
// relationships in copper on the warm charcoal ground, once, when it comes
// into view.
//
// The whole plate runs from one trigger on the figure. (Each shape used to
// watch the viewport separately, so the square drew first and the triangle,
// dot and lines only finished after scrolling further down.)
const LINES = [
  "The small triangle introduces direction.",
  "The circle retains.",
  "The square contains.",
  "The empty field connects.",
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function GeometryPlate() {
  const reduced = useMountedReducedMotion();
  const ref = useRef<HTMLElement>(null);
  // Starts once a quarter of the plate is on screen, so it finishes while
  // the plate is still in view rather than waiting for more scrolling.
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const show = reduced || inView;

  function draw(delay: number) {
    return {
      initial: { pathLength: 0, opacity: 0 },
      animate: show ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 },
      transition: reduced
        ? { duration: 0 }
        : { pathLength: { duration: 1.6, delay, ease: EASE }, opacity: { duration: 0.4, delay } },
    };
  }

  function fade(delay: number) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: show ? 1 : 0 },
      transition: reduced ? { duration: 0 } : { duration: 1, delay, ease: EASE },
    };
  }

  return (
    <figure ref={ref} className="section-night relative overflow-hidden p-2">
      {/* Fine inner copper line, like a mount inside the frame. */}
      <div className="copper-outline relative px-8 pt-10 pb-9 sm:px-10">
        <svg viewBox="0 0 400 420" className="mx-auto block w-full max-w-[300px]" aria-hidden="true">
          <defs>
            <linearGradient id="plate-copper" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" style={{ stopColor: "var(--copper-mid)" }} />
              <stop offset="45%" style={{ stopColor: "var(--copper-highlight)" }} />
              <stop offset="100%" style={{ stopColor: "var(--copper-light)" }} />
            </linearGradient>
          </defs>

          {/* The square contains */}
          <motion.rect
            x="90"
            y="40"
            width="220"
            height="220"
            fill="none"
            stroke="url(#plate-copper)"
            strokeWidth="1"
            {...draw(0)}
          />
          {/* The circle retains */}
          <motion.circle
            cx="200"
            cy="150"
            r="74"
            fill="none"
            stroke="url(#plate-copper)"
            strokeWidth="1"
            {...draw(0.3)}
          />
          {/* The small triangle introduces direction — out in the open field */}
          <motion.path
            d="M200 330 L218 362 L182 362 Z"
            fill="none"
            stroke="url(#plate-copper)"
            strokeWidth="1"
            strokeLinejoin="round"
            {...draw(0.6)}
          />
          {/* Bindu */}
          <motion.circle cx="200" cy="150" r="2.6" style={{ fill: "var(--copper-highlight)" }} {...fade(1)} />
        </svg>

        <motion.figcaption className="mt-10 space-y-1.5 text-center" {...fade(0.8)}>
          {LINES.map((line) => (
            <span key={line} className="block font-serif text-lg font-light italic leading-snug text-cream/85">
              {line}
            </span>
          ))}
          <span className="mt-5 flex items-center justify-center gap-3 whitespace-nowrap pt-3 text-[10px] font-sans not-italic uppercase tracking-[0.24em] text-copper-light">
            <span className="copper-rule-bright block w-5 flex-shrink-0" aria-hidden="true" />
            Harmonious Science
            <span className="copper-rule-bright block w-5 flex-shrink-0" aria-hidden="true" />
          </span>
        </motion.figcaption>
      </div>
    </figure>
  );
}
