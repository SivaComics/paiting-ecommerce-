"use client";

import Lenis from "lenis";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const LenisContext = createContext<Lenis | null>(null);

export function LenisProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (reduced) return;

    const instance = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
    });
    setLenis(instance);

    let frameId: number;
    function raf(time: number) {
      instance.raf(time);
      frameId = requestAnimationFrame(raf);
    }
    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      instance.destroy();
      setLenis(null);
    };
  }, [reduced]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

/** The shared, site-wide Lenis instance, or null while unmounted / reduced-motion is on. */
export function useLenis() {
  return useContext(LenisContext);
}
