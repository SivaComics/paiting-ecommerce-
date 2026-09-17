"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * A fine brushed-copper line across the very top of the page that fills from
 * left to right as the visitor scrolls. It sits above the header and stays in
 * place when the header slides away. Driven by a motion value (a transform,
 * no React re-renders), lightly sprung so it glides rather than ticks.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4, restDelta: 0.001 });

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px]">
      <motion.div className="h-full origin-left" style={{ scaleX, background: "var(--copper-brushed)" }} />
    </div>
  );
}
