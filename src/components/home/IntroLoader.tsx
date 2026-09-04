"use client";

import { useEffect, useState } from "react";
import { animate, motion, useReducedMotion } from "framer-motion";

const SESSION_KEY = "aureline-intro-shown";
const FILL_DURATION = 1.3;
const EASE_IN_OUT_CUBIC: [number, number, number, number] = [0.65, 0, 0.35, 1];

type Phase = "checking" | "loading" | "exiting" | "done";

function BrandMark() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="18" stroke="var(--color-copper)" strokeWidth="1" />
      <circle cx="20" cy="20" r="2.5" fill="var(--color-copper)" />
    </svg>
  );
}

export function IntroLoader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<Phase>("checking");
  const [count, setCount] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    let alreadyShown = false;
    try {
      alreadyShown = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      alreadyShown = false;
    }

    if (alreadyShown) {
      setPhase("done");
      onComplete();
      return;
    }

    setPhase("loading");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (phase !== "loading") return;

    document.body.style.overflow = "hidden";

    const controls = animate(0, 100, {
      duration: reduced ? 0.01 : FILL_DURATION,
      ease: EASE_IN_OUT_CUBIC,
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => setPhase("exiting"),
    });

    return () => controls.stop();
  }, [phase, reduced]);

  useEffect(() => {
    if (phase === "done") {
      document.body.style.overflow = "";
    }
  }, [phase]);

  function handleExitComplete() {
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // ignore storage failures (private browsing, etc.)
    }
    document.body.style.overflow = "";
    setPhase("done");
    onComplete();
  }

  if (phase === "checking" || phase === "done") return null;

  const exiting = phase === "exiting";

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink rounded-b-3xl overflow-hidden"
      initial={{ y: 0 }}
      animate={{ y: exiting ? "-100%" : 0 }}
      transition={
        reduced
          ? { duration: 0.01 }
          : { type: "spring", stiffness: 130, damping: 20, mass: 1 }
      }
      onAnimationComplete={() => {
        if (exiting) handleExitComplete();
      }}
    >
      <motion.div
        className="flex flex-col items-center px-6 text-center"
        animate={{ opacity: exiting ? 0 : 1, y: exiting ? -12 : 0 }}
        transition={{ duration: reduced ? 0.01 : 0.4, ease: "easeOut" }}
      >
        <BrandMark />
        <p className="mt-5 font-serif text-3xl sm:text-4xl tracking-wide text-cream">Auréline</p>
        <p className="mt-3 text-xs font-sans uppercase tracking-[0.3em] text-cream/60">
          Original works, authenticated &amp; insured.
        </p>
      </motion.div>

      <div className="absolute bottom-10 left-1/2 w-56 -translate-x-1/2 sm:w-72">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-cream/50">Loading</span>
          <span className="text-[10px] font-sans tabular-nums tracking-[0.2em] text-cream/70">
            {String(count).padStart(3, "0")}
          </span>
        </div>
        <div className="h-px w-full bg-cream/15">
          <motion.div
            className="h-px bg-copper origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: reduced ? 0.01 : FILL_DURATION, ease: EASE_IN_OUT_CUBIC }}
          />
        </div>
      </div>
    </motion.div>
  );
}
