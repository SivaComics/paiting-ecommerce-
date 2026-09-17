"use client";

import { Fragment, ReactNode, useRef } from "react";
import { clsx } from "clsx";
import { motion, MotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useMountedReducedMotion } from "@/components/ui/motion";

/**
 * Scroll and "fill" effects for the homepage. Everything here animates only
 * transform, opacity or clip-path (compositor-friendly, no layout work), is
 * lightly sprung so it glides with Lenis's smooth scroll, and falls back to
 * the finished, static state for visitors who prefer reduced motion.
 */

const EASE = [0.22, 1, 0.36, 1] as const;
const SPRING = { stiffness: 120, damping: 28, mass: 0.35, restDelta: 0.001 };

/* ── Text that fills in, word by word, as it scrolls through the viewport ── */

export function ScrollFillText({ text, className, dim = 0.14 }: { text: string; className?: string; dim?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useMountedReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.88", "end 0.5"] });
  const progress = useSpring(scrollYProgress, SPRING);
  const words = text.split(" ");

  return (
    <span ref={ref} className={clsx("block", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <Fragment key={i}>
            <FillWord
              word={word}
              progress={progress}
              range={[i / words.length, (i + 1) / words.length]}
              dim={dim}
              reduced={reduced}
            />{" "}
          </Fragment>
        ))}
      </span>
    </span>
  );
}

function FillWord({
  word,
  progress,
  range,
  dim,
  reduced,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  dim: number;
  reduced: boolean;
}) {
  const opacity = useTransform(progress, range, [dim, 1]);
  return <motion.span style={{ opacity: reduced ? 1 : opacity }}>{word}</motion.span>;
}

/* ── A copper divider that draws itself across when it comes into view ── */

export function DrawnRule({
  bright = false,
  origin = "center",
  className,
}: {
  bright?: boolean;
  origin?: "left" | "center";
  className?: string;
}) {
  const reduced = useMountedReducedMotion();
  return (
    <motion.div
      aria-hidden="true"
      className={clsx(bright ? "copper-rule-bright" : "copper-rule", className)}
      style={{ transformOrigin: origin === "left" ? "0% 50%" : "50% 50%" }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: reduced ? 0 : 1.8, ease: EASE }}
    />
  );
}

/* ── Opening: elements drift at their own pace as the visitor starts scrolling ── */

export function ScrollDrift({
  children,
  className,
  distance,
  fadeTo = 1,
}: {
  children: ReactNode;
  className?: string;
  /** Pixels moved over the first 900px of scroll. Positive moves down (slower than the page). */
  distance: number;
  /** Opacity reached by the end of that scroll. */
  fadeTo?: number;
}) {
  const reduced = useMountedReducedMotion();
  const { scrollY } = useScroll();
  const y = useSpring(useTransform(scrollY, [0, 900], [0, distance]), SPRING);
  const opacity = useTransform(scrollY, [0, 900], [1, fadeTo]);

  return (
    <motion.div className={className} style={reduced ? undefined : { y, opacity }}>
      {children}
    </motion.div>
  );
}
