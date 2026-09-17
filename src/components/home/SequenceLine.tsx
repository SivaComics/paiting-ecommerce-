"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { useMountedReducedMotion } from "@/components/ui/motion";

// From the HS commentary's "Energy" passage, in its order and spelling.
const STEPS = ["Potential", "Direction", "Circulation", "Transformation", "Stabilization", "Retention", "Unity"];

// Set as two deliberate lines, so a rule never dangles at the end of a row.
const ROWS = [STEPS.slice(0, 4), STEPS.slice(4)];

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The sequence set as quiet lines of type: each word a little brighter than
 * the last, joined by short copper rules, arriving at "Unity" in copper. The
 * words settle in one after another, slowly, the first time they come into view.
 */
export function SequenceLine() {
  const reduced = useMountedReducedMotion();

  function reveal(order: number) {
    if (reduced) return { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } };
    return {
      initial: { opacity: 0, y: 10 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-15% 0px" },
      transition: { duration: 1.2, delay: order * 0.28, ease: EASE },
    };
  }

  return (
    <>
      <p className="sr-only">{STEPS.join(", ")}.</p>

      <div aria-hidden="true" className="flex flex-col items-center gap-6 sm:gap-8">
        {ROWS.map((row, r) => (
          <div key={r} className="flex flex-wrap items-center justify-center gap-x-5 gap-y-4 sm:gap-x-7">
            {row.map((step, j) => {
              const index = STEPS.indexOf(step);
              const last = index === STEPS.length - 1;
              // 38% → 92% brightness across the six steps before Unity.
              const brightness = 38 + Math.round((index / (STEPS.length - 2)) * 54);

              return (
                <Fragment key={step}>
                  {j > 0 && (
                    <motion.span className="copper-rule-bright block w-5 opacity-70 sm:w-8" {...reveal(index - 0.5)} />
                  )}
                  <motion.span {...reveal(index)}>
                    {last ? (
                      <span className="font-serif text-5xl font-light italic text-copper-metal-bright sm:text-6xl">
                        {step}
                      </span>
                    ) : (
                      <span
                        className="font-serif text-2xl font-light sm:text-[2rem]"
                        style={{ color: `color-mix(in srgb, var(--color-cream) ${brightness}%, transparent)` }}
                      >
                        {step}
                      </span>
                    )}
                  </motion.span>
                </Fragment>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}
