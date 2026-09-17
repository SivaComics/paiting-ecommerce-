"use client";

import { ReactNode, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  MotionValue,
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { clsx } from "clsx";
import { useMountedReducedMotion } from "@/components/ui/motion";
import { ARTIST_NAME } from "@/lib/site";
import { getPaintingImages } from "@/lib/data/painting-images";
import { AboutArtistButton } from "@/components/artist-panel/ArtistPanel";

/**
 * The page opens on art, and explains itself as it goes.
 *
 * Before scrolling: the commentary's diagram — square, circle, small
 * triangle, point — is drawn in copper and labelled, with painting No. 06
 * faintly visible inside the circle, so the first screen already reads as
 * "the geometry inside a painting".
 *
 * On scroll, each movement of the drawing is paired with the commentary's own
 * sentence for that element, shown on the left as it happens:
 *   1. the square turns away          — "The square contains."
 *   2. the triangle rises             — "The small triangle introduces direction."
 *   3. the painting fills the circle  — "The circle retains."
 *   4. the painting opens out         — "The empty field connects."
 *   5. the whole painting, framed     — Painting No. 06 · View the paintings
 *
 * Copy sources:
 * - "Reality expressed through remarkably few elements." — "Two Approaches of
 *   Art – HS", The Path Through Simplicity (close paraphrase)
 * - The four element sentences — HS commentary, Energy section, exact
 * - Labels, the scroll hint, "Few elements. One painting." and
 *   "Painting No. 06" — written for the site
 */

const FEATURED_SLUG = "painting-06";
const FEATURED_LABEL = "Painting No. 06";

// Geometry of painting No. 06, measured from the photograph: the ring is
// centred 51.5% across and 35% down; its flame strokes reach about 42% of the
// painting's width from the centre, so the drawn circle sits just outside that.
// The overlay uses a 100 × (100 / aspect) space, so 1 unit = 1% of the width.
const RING = { cx: 51.5, cyPct: 0.35, r: 43.5 };

const EASE = [0.22, 1, 0.36, 1] as const;

type StepKey = "intro" | "square" | "triangle" | "circle" | "field" | "painting";

// Where each step sits in the scroll through the opening (0 → 1).
const STEPS: { key: StepKey; from: number; to: number }[] = [
  { key: "intro", from: 0, to: 0.14 },
  { key: "square", from: 0.14, to: 0.34 },
  { key: "triangle", from: 0.34, to: 0.52 },
  { key: "circle", from: 0.52, to: 0.7 },
  { key: "field", from: 0.7, to: 0.86 },
  { key: "painting", from: 0.86, to: 1 },
];

export function ArtistOpening() {
  const reduced = useMountedReducedMotion();
  const painting = getPaintingImages(FEATURED_SLUG)[0];

  if (reduced) return <StaticOpening src={painting.src} aspect={painting.aspect} />;
  return <AnimatedOpening src={painting.src} aspect={painting.aspect} />;
}

function AnimatedOpening({ src, aspect }: { src: string; aspect: number }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.35, restDelta: 0.0005 });

  const [activeStep, setActiveStep] = useState<StepKey>("intro");
  useMotionValueEvent(p, "change", (v) => {
    const step = STEPS.find((s) => v >= s.from && v < s.to) ?? STEPS[STEPS.length - 1];
    setActiveStep((current) => (current === step.key ? current : step.key));
  });

  const cueOpacity = useTransform(p, [0, 0.06], [1, 0]);
  const labelsOpacity = useTransform(p, [0.05, 0.15], [1, 0]);

  // 1. The square turns and falls away.
  const squareRotate = useTransform(p, [0.14, 0.42], [0, 45]);
  const squareScale = useTransform(p, [0.14, 0.42], [1, 0.72]);
  const squareOpacity = useTransform(p, [0.28, 0.42], [1, 0]);
  // 2. The triangle rises towards the circle.
  const triangleY = useTransform(p, [0.34, 0.52], [0, -34]);
  const triangleOpacity = useTransform(p, [0.46, 0.54], [1, 0]);
  // 3. The painting, faint from the start, fills its ring; the point goes out.
  const paintingOpacity = useTransform(p, [0, 0.52, 0.64], [0.2, 0.2, 1]);
  const binduScale = useTransform(p, [0.52, 0.62], [1, 0]);
  // 4. The painting opens out past its ring.
  // circle() radius % is relative to sqrt(w² + h²) / √2, so convert the ring's
  // width-based radius; ~96% clears the far corners.
  const ringRadiusPct = RING.r / Math.sqrt((1 + 1 / aspect ** 2) / 2);
  const ringOpacity = useTransform(p, [0.7, 0.8], [1, 0]);
  const clipRadius = useTransform(p, [0.7, 0.88], [ringRadiusPct, 96]);
  const clipPath = useMotionTemplate`circle(${clipRadius}% at ${RING.cx}% ${RING.cyPct * 100}%)`;
  const paintingScale = useTransform(p, [0.7, 0.88], [0.96, 1]);
  // 5. The copper frame arrives.
  const frameOpacity = useTransform(p, [0.84, 0.94], [0, 1]);

  const geometry = diagramGeometry(aspect);

  // Pulled up under the fixed header (81px / 97px), with the same space added
  // inside, so the first screen is centred in what the visitor can actually see.
  return (
    <section
      ref={sectionRef}
      aria-labelledby="opening-heading"
      className="relative -mt-[81px] h-[320svh] sm:-mt-[97px]"
    >
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <CopperLight />

        <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-5 px-6 pb-6 pt-[calc(81px+1rem)] sm:pt-[calc(97px+1rem)] md:grid-cols-12 md:gap-10">
          {/* Words, in step with the drawing */}
          <div className="relative order-1 md:col-span-5">
            <div className="relative min-h-[12.5rem] text-center md:min-h-[22rem] md:text-left">
              <StepText p={p} step={STEPS[0]} first>
                <p className="text-[11px] font-sans uppercase tracking-[0.3em] text-copper-deep">Original Paintings</p>
                <h1
                  id="opening-heading"
                  className="mt-3 font-serif text-[2rem] font-light leading-[1.08] text-espresso sm:text-5xl md:mt-6 lg:text-[3.4rem]"
                >
                  Reality expressed through remarkably few <span className="italic text-copper-metal">elements.</span>
                </h1>
                <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-espresso-soft md:mx-0 md:mt-6 md:max-w-sm md:text-[15px]">
                  Square, circle, triangle, point. Scroll to see them become a painting.
                </p>
                <AboutArtistButton className="group mx-auto mt-4 inline-flex items-center gap-3 text-[11px] font-sans uppercase tracking-[0.26em] text-espresso-soft hover:text-copper-deep transition-colors duration-500 ease-premium md:mx-0 md:mt-8">
                  <span
                    className="copper-rule block w-8 transition-all duration-500 ease-premium group-hover:w-12"
                    aria-hidden="true"
                  />
                  Paintings by {ARTIST_NAME}
                </AboutArtistButton>
              </StepText>

              <StepText p={p} step={STEPS[1]}>
                <ElementLine index="01" name="Square">
                  The square <span className="italic text-copper-metal">contains.</span>
                </ElementLine>
              </StepText>

              <StepText p={p} step={STEPS[2]}>
                <ElementLine index="02" name="Triangle">
                  The small triangle introduces <span className="italic text-copper-metal">direction.</span>
                </ElementLine>
              </StepText>

              <StepText p={p} step={STEPS[3]}>
                <ElementLine index="03" name="Circle">
                  The circle <span className="italic text-copper-metal">retains.</span>
                </ElementLine>
              </StepText>

              <StepText p={p} step={STEPS[4]}>
                <ElementLine index="04" name="Space">
                  The empty field <span className="italic text-copper-metal">connects.</span>
                </ElementLine>
              </StepText>

              <StepText p={p} step={STEPS[5]} last>
                <p className="text-[11px] font-sans uppercase tracking-[0.3em] text-copper-deep">{FEATURED_LABEL}</p>
                <p className="mt-3 font-serif text-[2rem] font-light leading-[1.1] text-espresso sm:text-5xl md:mt-6 lg:text-[3.4rem]">
                  Few elements. <span className="italic text-copper-metal">One painting.</span>
                </p>
                <Link
                  href="#paintings"
                  className="group mx-auto mt-5 inline-flex items-center gap-3 text-[11px] font-sans uppercase tracking-[0.26em] text-espresso hover:text-copper-deep transition-colors duration-500 ease-premium md:mx-0 md:mt-8"
                >
                  View the paintings
                  <ArrowRight
                    size={14}
                    strokeWidth={1.5}
                    className="transition-transform duration-500 ease-premium group-hover:translate-x-1"
                  />
                </Link>
              </StepText>
            </div>

            <StepIndicator active={activeStep} className="mt-4 justify-center md:mt-10 md:justify-start" />
          </div>

          {/* Diagram → painting */}
          <div className="order-2 flex justify-center md:col-span-7">
            <div
              className="relative"
              style={{ width: `min(62vw, calc((100svh - 20rem) * ${aspect}), 420px)`, aspectRatio: String(aspect) }}
            >
              <motion.div
                aria-hidden="true"
                className="absolute -inset-[4px] shadow-premium-lg"
                style={{
                  opacity: frameOpacity,
                  backgroundImage: "var(--copper-grain), var(--copper-brushed)",
                  backgroundSize: "160px 160px, 100% 100%",
                  backgroundBlendMode: "soft-light, normal",
                }}
              />
              <motion.div className="absolute inset-0" style={{ opacity: paintingOpacity, clipPath, scale: paintingScale }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`${FEATURED_LABEL} by ${ARTIST_NAME}`}
                  className="block h-full w-full object-cover"
                  fetchPriority="high"
                />
              </motion.div>

              <Diagram
                geometry={geometry}
                squareRotate={squareRotate}
                squareScale={squareScale}
                squareOpacity={squareOpacity}
                ringOpacity={ringOpacity}
                triangleY={triangleY}
                triangleOpacity={triangleOpacity}
                binduScale={binduScale}
              />

              <DiagramLabels geometry={geometry} scrollOpacity={labelsOpacity} />
            </div>
          </div>
        </div>

        <motion.a
          href="#work"
          style={{ opacity: cueOpacity }}
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[10px] font-sans uppercase tracking-[0.35em] text-espresso-soft sm:flex"
        >
          Scroll
          <span className="scroll-cue" aria-hidden="true" />
        </motion.a>
      </div>
    </section>
  );
}

/** One step of words: fades and lifts in as its part of the scroll begins, out as it ends. */
function StepText({
  p,
  step,
  first = false,
  last = false,
  children,
}: {
  p: MotionValue<number>;
  step: { from: number; to: number };
  first?: boolean;
  last?: boolean;
  children: ReactNode;
}) {
  const fade = 0.035;
  const inputs = [step.from - fade, step.from + fade, step.to - fade, step.to + fade];
  const opacity = useTransform(p, inputs, [first ? 1 : 0, 1, 1, last ? 1 : 0]);
  const y = useTransform(p, inputs, [first ? 0 : 24, 0, 0, last ? 0 : -24]);
  // Stacked layers: only the one on screen may take clicks.
  const pointerEvents = useTransform(p, (v) => (v >= step.from && (last || v < step.to) ? "auto" : "none"));

  return (
    <motion.div style={{ opacity, y, pointerEvents }} className="absolute inset-0 flex flex-col justify-center">
      {children}
    </motion.div>
  );
}

function ElementLine({ index, name, children }: { index: string; name: string; children: ReactNode }) {
  return (
    <>
      <p className="flex items-center justify-center gap-4 md:justify-start">
        <span className="font-serif text-2xl italic leading-none text-copper-metal">{index}</span>
        <span className="copper-rule block w-8" aria-hidden="true" />
        <span className="text-[11px] font-sans uppercase tracking-[0.28em] text-copper-deep">{name}</span>
      </p>
      <p className="mt-4 font-serif text-[2rem] font-light leading-[1.1] text-espresso sm:text-5xl md:mt-6 lg:text-[3.4rem]">
        {children}
      </p>
      <p className="mt-3 text-[11px] font-sans uppercase tracking-[0.26em] text-espresso-soft md:mt-5">
        Harmonious Science
      </p>
    </>
  );
}

/** Five small shapes that light up in copper to show where the visitor is in the story. */
function StepIndicator({ active, className }: { active: StepKey; className?: string }) {
  const order: StepKey[] = ["square", "triangle", "circle", "field", "painting"];
  const activeIndex = order.indexOf(active);

  return (
    <div aria-hidden="true" className={clsx("flex items-center gap-4", className)}>
      {order.map((key, i) => {
        const on = i === activeIndex;
        const done = activeIndex > i;
        const stroke = on ? "var(--copper-mid)" : done ? "var(--copper-light)" : "var(--color-hairline)";
        const fill = on ? "color-mix(in srgb, var(--copper-mid) 22%, transparent)" : "none";
        return (
          <svg
            key={key}
            viewBox="0 0 20 20"
            className={clsx("h-4 w-4", on && "scale-125")}
            style={{ stroke, fill, strokeWidth: 1.2, transition: "stroke 0.5s, fill 0.5s, transform 0.5s" }}
          >
            {key === "square" && <rect x="3" y="3" width="14" height="14" />}
            {key === "triangle" && <path d="M10 3 L17 16 L3 16 Z" strokeLinejoin="round" />}
            {key === "circle" && <circle cx="10" cy="10" r="7" />}
            {key === "field" && (
              <>
                <rect x="2" y="2" width="16" height="16" style={{ fill: "none" }} />
                <circle cx="10" cy="10" r="1.2" style={{ fill: stroke, stroke: "none" }} />
              </>
            )}
            {key === "painting" && (
              <>
                <rect x="5" y="2" width="10" height="16" />
                <circle cx="10" cy="7.5" r="3" style={{ fill: "none" }} />
              </>
            )}
          </svg>
        );
      })}
    </div>
  );
}

function diagramGeometry(aspect: number) {
  const height = 100 / aspect;
  const cy = height * RING.cyPct;
  const side = RING.r * 2 + 8;
  const triTop = Math.min(height - 16, cy + RING.r + 26);
  return { height, cy, side, triTop };
}

type Geometry = ReturnType<typeof diagramGeometry>;

function Diagram({
  geometry,
  squareRotate,
  squareScale,
  squareOpacity,
  ringOpacity,
  triangleY,
  triangleOpacity,
  binduScale,
}: {
  geometry: Geometry;
  squareRotate: MotionValue<number>;
  squareScale: MotionValue<number>;
  squareOpacity: MotionValue<number>;
  ringOpacity: MotionValue<number>;
  triangleY: MotionValue<number>;
  triangleOpacity: MotionValue<number>;
  binduScale: MotionValue<number>;
}) {
  const { height, cy, side, triTop } = geometry;

  const draw = (delay: number) => ({
    initial: { pathLength: 0 },
    animate: { pathLength: 1 },
    transition: { duration: 1.8, delay, ease: EASE },
  });

  const box = { transformBox: "fill-box" as const, transformOrigin: "center" };
  // About 1.2px at the drawing's usual size. (Not vector-effect="non-scaling-stroke":
  // that breaks the pathLength maths the line-drawing animation relies on.)
  const STROKE = 0.32;

  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 100 ${height}`}
      className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
    >
      <defs>
        <linearGradient id="opening-diagram-copper" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" style={{ stopColor: "var(--copper-deep)" }} />
          <stop offset="45%" style={{ stopColor: "var(--copper-light)" }} />
          <stop offset="100%" style={{ stopColor: "var(--copper-mid)" }} />
        </linearGradient>
      </defs>

      {/* The square contains */}
      <motion.rect
        x={RING.cx - side / 2}
        y={cy - side / 2}
        width={side}
        height={side}
        fill="none"
        stroke="url(#opening-diagram-copper)"
        strokeWidth={STROKE}
        style={{ ...box, rotate: squareRotate, scale: squareScale, opacity: squareOpacity }}
        {...draw(0.1)}
      />
      {/* The circle retains */}
      <motion.circle
        cx={RING.cx}
        cy={cy}
        r={RING.r}
        fill="none"
        stroke="url(#opening-diagram-copper)"
        strokeWidth={STROKE}
        style={{ opacity: ringOpacity }}
        {...draw(0.45)}
      />
      {/* The small triangle introduces direction */}
      <motion.path
        d={`M${RING.cx} ${triTop} L${RING.cx + 7} ${triTop + 12} L${RING.cx - 7} ${triTop + 12} Z`}
        fill="none"
        stroke="url(#opening-diagram-copper)"
        strokeWidth={STROKE}
        strokeLinejoin="round"
        style={{ ...box, y: triangleY, opacity: triangleOpacity }}
        {...draw(0.85)}
      />
      {/* Point (Bindu) */}
      <motion.circle
        cx={RING.cx}
        cy={cy}
        r="1.1"
        style={{ ...box, fill: "var(--copper-mid)", scale: binduScale }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5, ease: EASE }}
      />
    </svg>
  );
}

/** Drawing-style annotations naming each element, shown before the visitor scrolls. */
function DiagramLabels({ geometry, scrollOpacity }: { geometry: Geometry; scrollOpacity: MotionValue<number> }) {
  const { height, cy, side, triTop } = geometry;
  const pctY = (units: number) => `${(units / height) * 100}%`;
  const label =
    "absolute hidden items-center gap-2 whitespace-nowrap text-[10px] font-sans uppercase tracking-[0.24em] text-copper-deep sm:flex";

  return (
    // Outer layer fades the labels in after the drawing; inner layer fades them out on scroll.
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.8, ease: EASE }}
    >
      <motion.div className="absolute inset-0" style={{ opacity: scrollOpacity }}>
        {/* Square — off its top-left corner */}
        <span
          className={label}
          style={{ right: `${100 - (RING.cx - side / 2) + 3}%`, top: pctY(cy - side / 2), transform: "translateY(-50%)" }}
        >
          Square
          <span className="copper-rule block w-6" />
        </span>
        {/* Circle — off its right edge */}
        <span className={label} style={{ left: `${RING.cx + RING.r + 6}%`, top: pctY(cy), transform: "translateY(-50%)" }}>
          <span className="copper-rule block w-6" />
          Circle
        </span>
        {/* Point — just beside the centre */}
        <span className={label} style={{ left: `${RING.cx + 4}%`, top: pctY(cy), transform: "translateY(-50%)" }}>
          Point
        </span>
        {/* Triangle — off its left side */}
        <span
          className={label}
          style={{ right: `${100 - (RING.cx - 9)}%`, top: pctY(triTop + 7), transform: "translateY(-50%)" }}
        >
          Triangle
          <span className="copper-rule block w-6" />
        </span>
      </motion.div>
    </motion.div>
  );
}

/** Reduced motion: the finished state, no pinning or scroll-linked movement. */
function StaticOpening({ src, aspect }: { src: string; aspect: number }) {
  return (
    <section aria-labelledby="opening-heading" className="relative overflow-hidden">
      <CopperLight />
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-20 md:grid-cols-12">
        <div className="text-center md:col-span-5 md:text-left">
          <p className="text-[11px] font-sans uppercase tracking-[0.3em] text-copper-deep">Original Paintings</p>
          <h1
            id="opening-heading"
            className="mt-6 font-serif text-4xl font-light leading-[1.08] text-espresso sm:text-5xl lg:text-[3.4rem]"
          >
            Reality expressed through remarkably few <span className="italic text-copper-metal">elements.</span>
          </h1>
          <ul className="mt-8 space-y-2 font-serif text-xl font-light italic text-espresso-soft">
            <li>The square contains.</li>
            <li>The small triangle introduces direction.</li>
            <li>The circle retains.</li>
            <li>The empty field connects.</li>
          </ul>
          <AboutArtistButton className="mt-8 text-[11px] font-sans uppercase tracking-[0.26em] text-espresso-soft hover:text-copper-deep">
            Paintings by {ARTIST_NAME}
          </AboutArtistButton>
        </div>
        <div className="flex justify-center md:col-span-7">
          <div className="copper-frame" style={{ width: "min(74vw, 420px)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`${FEATURED_LABEL} by ${ARTIST_NAME}`}
              className="block h-auto w-full"
              style={{ aspectRatio: String(aspect) }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Soft copper light behind the stage (styles in globals.css). */
function CopperLight() {
  return (
    <div aria-hidden="true" className="copper-light">
      <span className="copper-light__glow" />
      <span className="copper-light__band copper-light__band--a" />
      <span className="copper-light__band copper-light__band--b" />
      <span className="copper-light__band copper-light__band--shade" />
      <span className="copper-light__band copper-light__band--c" />
    </div>
  );
}
