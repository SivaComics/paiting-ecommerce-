"use client";

import { motion } from "framer-motion";
import { useMountedReducedMotion } from "@/components/ui/motion";

export function DrawnShape({
  shape,
  className,
}: {
  shape: "circle" | "triangle";
  className?: string;
}) {
  const reduced = useMountedReducedMotion();

  const pathProps = reduced
    ? { initial: { pathLength: 1 }, animate: { pathLength: 1 } }
    : {
        initial: { pathLength: 0 },
        whileInView: { pathLength: 1 },
        viewport: { once: true, margin: "-10% 0px" },
        transition: { duration: 1.8, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      {shape === "circle" ? (
        <motion.circle
          cx="100"
          cy="100"
          r="82"
          fill="none"
          stroke="var(--color-copper)"
          strokeWidth="1.5"
          {...pathProps}
        />
      ) : (
        <motion.path
          d="M100,18 L182,172 L18,172 Z"
          fill="none"
          stroke="var(--color-copper)"
          strokeWidth="1.5"
          strokeLinejoin="round"
          {...pathProps}
        />
      )}
    </svg>
  );
}
