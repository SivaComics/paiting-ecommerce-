"use client";

import { motion } from "framer-motion";
import { RevealOnScroll, useMountedReducedMotion } from "@/components/ui/motion";
import { SectionLabel } from "./SectionLabel";
import { DrawnRule } from "./scroll-effects";

// One line per element, each drawn from the HS commentary. Colour has no
// section of its own there; its line comes from the Nine Colours passage.
const ELEMENTS: { name: string; line: string }[] = [
  { name: "Circle", line: "The geometry of equilibrium. No direction dominates; every point relates equally." },
  {
    name: "Triangle",
    line: "The first geometry that introduces direction — the minimum geometry capable of sustaining transformation.",
  },
  { name: "Square", line: "The square contains." },
  {
    name: "Space",
    line: "Never empty. The background is not background; it is the relational field the symbols activate.",
  },
  {
    name: "Colour",
    line: "Qualitative differentiation — almost like unity expressing itself through qualitative diversity.",
  },
];

// Nine tones for the Colour motif — "qualitative differentiation" — all from
// the copper palette, so each dot fills in a different shade.
const COLOUR_TONES = [
  "var(--copper-highlight)",
  "var(--copper-light)",
  "var(--copper-mid)",
  "var(--copper-light)",
  "var(--copper-deep)",
  "var(--copper-mid)",
  "var(--copper-mid)",
  "var(--copper-shadow)",
  "var(--copper-highlight)",
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function TheElements() {
  return (
    <section aria-labelledby="elements-heading">
      <DrawnRule />

      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-36">
        <SectionLabel number="03">The Elements</SectionLabel>
        <h2 id="elements-heading" className="mt-8 font-serif text-5xl font-light leading-[1.02] text-espresso sm:text-6xl">
          Reduced to <span className="italic text-copper-metal">relationships</span>
        </h2>

        <ul className="mt-20 grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-5 lg:gap-x-10">
          {ELEMENTS.map((el, i) => (
            <li key={el.name}>
              <RevealOnScroll delay={i * 0.06}>
                <Motif name={el.name} delay={i * 0.18} />
                <DrawnRule origin="left" className="mt-8 w-8" />
                <h3 className="mt-6 font-serif text-3xl font-light text-espresso">{el.name}</h3>
                <p className="mt-3 text-sm leading-[1.8] text-espresso-soft">{el.line}</p>
              </RevealOnScroll>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Each shape draws its outline in copper, then fills with a soft copper wash. */
function Motif({ name, delay }: { name: string; delay: number }) {
  const reduced = useMountedReducedMotion();

  const draw = (fillTo = 0.18) =>
    reduced
      ? { initial: false as const, animate: { pathLength: 1, fillOpacity: fillTo } }
      : {
          initial: { pathLength: 0, fillOpacity: 0 },
          whileInView: { pathLength: 1, fillOpacity: fillTo },
          viewport: { once: true, margin: "-10% 0px" },
          transition: {
            pathLength: { duration: 1.6, delay, ease: EASE },
            fillOpacity: { duration: 1.4, delay: delay + 1.1, ease: EASE },
          },
        };

  const pop = (i: number, tone: string) =>
    reduced
      ? { initial: false as const, animate: { scale: 1, opacity: 1 }, style: { fill: tone } }
      : {
          initial: { scale: 0, opacity: 0 },
          whileInView: { scale: 1, opacity: 1 },
          viewport: { once: true, margin: "-10% 0px" },
          transition: { duration: 0.9, delay: delay + 0.2 + i * 0.12, ease: EASE },
          style: { fill: tone, transformOrigin: "center", transformBox: "fill-box" as const },
        };

  return (
    <svg viewBox="0 0 48 48" width="56" height="56" aria-hidden="true" className="fill-copper stroke-copper" strokeWidth="1">
      {name === "Circle" && <motion.circle cx="24" cy="24" r="17" {...draw()} />}
      {name === "Triangle" && <motion.path d="M24 7 L41 38 L7 38 Z" strokeLinejoin="round" {...draw()} />}
      {name === "Square" && <motion.rect x="9" y="9" width="30" height="30" {...draw()} />}
      {name === "Space" && (
        <>
          <motion.rect x="5" y="5" width="38" height="38" {...draw(0.06)} />
          <motion.circle cx="24" cy="24" r="1.6" className="stroke-none" {...pop(8, "var(--copper-mid)")} />
        </>
      )}
      {name === "Colour" &&
        [12, 24, 36].flatMap((cy, row) =>
          [12, 24, 36].map((cx, col) => {
            const i = row * 3 + col;
            return <motion.circle key={i} cx={cx} cy={cy} r="4" className="stroke-none" {...pop(i, COLOUR_TONES[i])} />;
          })
        )}
    </svg>
  );
}
