"use client";

import { useEffect, useRef, useState } from "react";

interface HeroScrollProgress<T extends HTMLElement> {
  containerRef: React.RefObject<T | null>;
  progress: number;
}

/**
 * Tracks 0-1 scroll progress through a tall "scroll track" element — how far
 * its top has passed above the viewport, relative to its own scrollable
 * range (its height minus one viewport). Shared by ScrollVideoHero (to scrub
 * the video) and HeroNarrativeOverlay (to drive the movement cross-fades),
 * so there's exactly one scroll listener for both, not one each.
 */
export function useHeroScrollProgress<T extends HTMLElement>(): HeroScrollProgress<T> {
  const containerRef = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let ticking = false;

    function update() {
      const rect = container!.getBoundingClientRect();
      const scrollableHeight = container!.offsetHeight - window.innerHeight;
      const next = scrollableHeight > 0 ? Math.min(Math.max(-rect.top / scrollableHeight, 0), 1) : 1;
      setProgress(next);
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { containerRef, progress };
}

/** Scrolls the page so `container`'s internal progress reaches `target` (0-1). */
export function scrollContainerToProgress(container: HTMLElement, target: number) {
  const scrollableHeight = container.offsetHeight - window.innerHeight;
  const clamped = Math.min(Math.max(target, 0), 1);
  const top = container.offsetTop + clamped * scrollableHeight;
  window.scrollTo({ top, behavior: "smooth" });
}
