"use client";

import { motion } from "framer-motion";
import { useMountedReducedMotion } from "@/components/ui/motion";
import { ARTIST_TIMELINE } from "@/lib/data/artist-words";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * A copper timeline of the artist's milestones, set beside "About the
 * artist". The line draws down as it comes into view and each year settles
 * in after it. Facts: see ARTIST_TIMELINE in artist-words.ts.
 */
export function LifeInPainting() {
  const reduced = useMountedReducedMotion();

  const lineMotion = reduced
    ? { initial: false as const, animate: { scaleY: 1 } }
    : {
        initial: { scaleY: 0 },
        whileInView: { scaleY: 1 },
        viewport: { once: true, margin: "-10% 0px" },
        transition: { duration: 2.4, ease: EASE },
      };

  function entryMotion(i: number) {
    if (reduced) return { initial: false as const, animate: { opacity: 1, x: 0 } };
    return {
      initial: { opacity: 0, x: -8 },
      whileInView: { opacity: 1, x: 0 },
      viewport: { once: true, margin: "-10% 0px" },
      transition: { duration: 0.9, delay: 0.25 + i * 0.16, ease: EASE },
    };
  }

  return (
    <section aria-labelledby="life-in-painting" className="mt-16">
      <p id="life-in-painting" className="text-[11px] font-sans uppercase tracking-[0.28em] text-copper-deep">
        A life in painting
      </p>

      <div className="relative mt-8">
        <motion.span
          aria-hidden="true"
          className="copper-rule absolute left-[5px] top-2 bottom-2 !h-auto w-px origin-top"
          style={{ background: "linear-gradient(180deg, var(--copper-deep), var(--copper-light) 50%, var(--copper-deep))" }}
          {...lineMotion}
        />

        <ol className="space-y-5">
          {ARTIST_TIMELINE.map((entry, i) => (
            <motion.li
              key={`${entry.year}-${entry.title}`}
              className="relative flex items-baseline gap-4 pl-8"
              {...entryMotion(i)}
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-[0.4rem] block h-[11px] w-[11px] rounded-full bg-cream"
                style={{ boxShadow: "inset 0 0 0 1px var(--copper-mid)" }}
              >
                <span className="absolute inset-[3px] rounded-full bg-copper" />
              </span>
              <span className="w-12 flex-shrink-0 font-serif text-xl italic leading-none text-copper-metal">
                {entry.year}
              </span>
              <span className="text-sm leading-snug text-espresso">
                {entry.title}
                <span className="block text-[13px] text-espresso-soft">{entry.detail}</span>
              </span>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
