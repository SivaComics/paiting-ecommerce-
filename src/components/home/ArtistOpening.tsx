"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, MotionValue, useMotionTemplate, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useMountedReducedMotion } from "@/components/ui/motion";
import { ARTIST_NAME } from "@/lib/site";
import { getPaintingImages } from "@/lib/data/painting-images";
import { AboutArtistButton } from "@/components/artist-panel/ArtistPanel";

/**
 * The page opens on art, not biography.
 *
 * Stage 1 — on load, the commentary's own diagram draws itself in copper:
 *   "The small triangle introduces direction. The circle retains.
 *    The square contains. The empty field connects."
 * Stage 2 — as the visitor scrolls, the square turns and falls away, the
 *   triangle rises, and his painting (No. 06, a large ringed circle) appears
 *   inside the drawn circle — which sits exactly over the painting's own ring —
 *   then opens out until the whole painting stands in its copper frame.
 *
 * Copy sources:
 * - "Reality expressed through remarkably few elements." — "Two Approaches of
 *   Art – HS", The Path Through Simplicity (close paraphrase)
 * - "The circle retains." — HS commentary, exact
 */

const FEATURED_SLUG = "painting-06";
const FEATURED_LABEL = "Painting No. 06";

// Geometry of painting No. 06, measured from the photograph: the ring is
// centred 51.5% across and 35% down; its flame strokes reach about 42% of the
// painting's width from the centre, so the drawn circle sits just outside that. The overlay SVG uses a 100 × (100 / aspect) coordinate
// space, so 1 unit = 1% of the width.
const RING = { cx: 51.5, cyPct: 0.35, r: 43.5 };

const EASE = [0.22, 1, 0.36, 1] as const;

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

  // Words: the opening line gives way to "The circle retains." as the painting opens.
  const introOpacity = useTransform(p, [0, 0.2], [1, 0]);
  const introY = useTransform(p, [0, 0.2], [0, -28]);
  const outroOpacity = useTransform(p, [0.7, 0.9], [0, 1]);
  const outroY = useTransform(p, [0.7, 0.9], [28, 0]);
  const cueOpacity = useTransform(p, [0, 0.08], [1, 0]);
  // The two text layers are stacked, so only the visible one may take clicks.
  const introPointer = useTransform(p, (v) => (v < 0.15 ? "auto" : "none"));
  const outroPointer = useTransform(p, (v) => (v > 0.75 ? "auto" : "none"));

  // The painting: first seen only inside its own ring, then opening out.
  // circle() radius % is relative to sqrt(w² + h²) / √2, so convert the ring's
  // width-based radius; ~96% clears the far corners.
  const ringRadiusPct = RING.r / Math.sqrt((1 + 1 / aspect ** 2) / 2);
  const paintingOpacity = useTransform(p, [0.1, 0.36], [0, 1]);
  const clipRadius = useTransform(p, [0.4, 0.85], [ringRadiusPct, 96]);
  const clipPath = useMotionTemplate`circle(${clipRadius}% at ${RING.cx}% ${RING.cyPct * 100}%)`;
  const paintingScale = useTransform(p, [0.4, 0.85], [0.96, 1]);
  const frameOpacity = useTransform(p, [0.72, 0.9], [0, 1]);

  // The diagram: the square turns and falls away, the triangle rises, the dot goes out.
  const squareRotate = useTransform(p, [0.08, 0.6], [0, 45]);
  const squareScale = useTransform(p, [0.08, 0.6], [1, 0.72]);
  const squareOpacity = useTransform(p, [0.3, 0.58], [1, 0]);
  const ringOpacity = useTransform(p, [0.46, 0.66], [1, 0]);
  const triangleY = useTransform(p, [0.05, 0.5], [0, -34]);
  const triangleOpacity = useTransform(p, [0.28, 0.5], [1, 0]);
  const binduScale = useTransform(p, [0.06, 0.34], [1, 0]);

  return (
    <section ref={sectionRef} aria-labelledby="opening-heading" className="relative h-[210svh]">
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <CopperLight />

        <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-6 px-6 pb-6 pt-4 md:grid-cols-12 md:gap-10">
          {/* Words */}
          <div className="relative order-1 min-h-[9.5rem] text-center md:col-span-5 md:min-h-[18rem] md:text-left">
            <motion.div
              style={{ opacity: introOpacity, y: introY, pointerEvents: introPointer }}
              className="absolute inset-0 flex flex-col justify-center"
            >
              <p className="text-[11px] font-sans uppercase tracking-[0.3em] text-copper-deep">Original Paintings</p>
              <h1
                id="opening-heading"
                className="mt-4 font-serif text-[2.1rem] font-light leading-[1.08] text-espresso sm:text-5xl md:mt-6 lg:text-[3.6rem]"
              >
                Reality expressed through remarkably few <span className="italic text-copper-metal">elements.</span>
              </h1>
              <AboutArtistButton className="group mx-auto mt-5 inline-flex items-center gap-3 text-[11px] font-sans uppercase tracking-[0.26em] text-espresso-soft hover:text-copper-deep transition-colors duration-500 ease-premium md:mx-0 md:mt-8">
                <span
                  className="copper-rule block w-8 transition-all duration-500 ease-premium group-hover:w-12"
                  aria-hidden="true"
                />
                Paintings by {ARTIST_NAME}
              </AboutArtistButton>
            </motion.div>

            <motion.div
              style={{ opacity: outroOpacity, y: outroY, pointerEvents: outroPointer }}
              className="absolute inset-0 flex flex-col justify-center"
            >
              <p className="text-[11px] font-sans uppercase tracking-[0.3em] text-copper-deep">{FEATURED_LABEL}</p>
              <p className="mt-4 font-serif text-[2.4rem] font-light italic leading-[1.05] text-espresso sm:text-5xl md:mt-6 lg:text-[3.8rem]">
                The circle <span className="text-copper-metal">retains.</span>
              </p>
              <p className="mt-3 text-[11px] font-sans uppercase tracking-[0.26em] text-espresso-soft">
                Harmonious Science
              </p>
              <Link
                href="#paintings"
                className="group mx-auto mt-6 inline-flex items-center gap-3 text-[11px] font-sans uppercase tracking-[0.26em] text-espresso hover:text-copper-deep transition-colors duration-500 ease-premium md:mx-0 md:mt-8"
              >
                View the paintings
                <ArrowRight
                  size={14}
                  strokeWidth={1.5}
                  className="transition-transform duration-500 ease-premium group-hover:translate-x-1"
                />
              </Link>
            </motion.div>
          </div>

          {/* Diagram → painting */}
          <div className="order-2 flex justify-center md:col-span-7">
            <div
              className="relative"
              style={{ width: `min(74vw, calc((100svh - 17rem) * ${aspect}), 420px)`, aspectRatio: String(aspect) }}
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
                aspect={aspect}
                squareRotate={squareRotate}
                squareScale={squareScale}
                squareOpacity={squareOpacity}
                ringOpacity={ringOpacity}
                triangleY={triangleY}
                triangleOpacity={triangleOpacity}
                binduScale={binduScale}
              />
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

function Diagram({
  aspect,
  squareRotate,
  squareScale,
  squareOpacity,
  ringOpacity,
  triangleY,
  triangleOpacity,
  binduScale,
}: {
  aspect: number;
  squareRotate: MotionValue<number>;
  squareScale: MotionValue<number>;
  squareOpacity: MotionValue<number>;
  ringOpacity: MotionValue<number>;
  triangleY: MotionValue<number>;
  triangleOpacity: MotionValue<number>;
  binduScale: MotionValue<number>;
}) {
  const height = 100 / aspect;
  const cy = height * RING.cyPct;
  const side = RING.r * 2 + 8;
  const triTop = Math.min(height - 16, cy + RING.r + 26);

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
      {/* Bindu */}
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
            className="mt-6 font-serif text-4xl font-light leading-[1.08] text-espresso sm:text-5xl lg:text-[3.6rem]"
          >
            Reality expressed through remarkably few <span className="italic text-copper-metal">elements.</span>
          </h1>
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
