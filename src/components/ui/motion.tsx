"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";
import { PointerEvent, ReactNode, useEffect, useRef, useState } from "react";

/**
 * Same as framer-motion's useReducedMotion(), except it always reports
 * `false` on the server and on the client's first render (matching the
 * server), then updates after mount. Reading the real value synchronously
 * would make a reduced-motion client's first render diverge from the
 * server-rendered HTML — fine for a plain style *value*, but components
 * that branch their whole DOM structure on this (skipping a wrapper
 * entirely) would force React to discard and rebuild the tree on hydration.
 */
export function useMountedReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    function onChange(e: MediaQueryListEvent) {
      setReduced(e.matches);
    }
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useMountedReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RevealOnScroll({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useMountedReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const reduced = useMountedReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  if (reduced) return <>{children}</>;

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function onPointerLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={className ?? "inline-block"}
      style={{ x: springX, y: springY }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {children}
    </motion.div>
  );
}

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduced = useMountedReducedMotion();

  if (reduced) return <>{children}</>;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export function ZoomOnHover({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      style={{ overflow: "hidden" }}
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <motion.div
        variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
