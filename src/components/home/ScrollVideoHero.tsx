"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useHeroScrollProgress, scrollContainerToProgress } from "@/lib/hero-scroll-progress";
import { useMountedReducedMotion } from "@/components/ui/motion";
import { HeroNarrativeOverlay } from "./HeroNarrativeOverlay";

// Higher number = slower scroll (more scrolling needed to finish the video)
// Lower number = faster scroll
const SCROLL_LENGTH_VH = 2500;
// prefers-reduced-motion: no pinned scroll track at all — just a normal,
// viewport-height section with the video playing once on its own.
const REDUCED_MOTION_HEIGHT_VH = 100;

export default function ScrollVideoHero() {
  const reducedMotion = useMountedReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const { containerRef, progress } = useHeroScrollProgress<HTMLDivElement>();
  const [duration, setDuration] = useState(0);
  const [canScrub, setCanScrub] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoaded = () => {
      setDuration(video.duration);
      setCanScrub(true);
    };

    video.addEventListener("loadedmetadata", handleLoaded);
    if (video.readyState >= 1) handleLoaded();
    return () => video.removeEventListener("loadedmetadata", handleLoaded);
  }, []);

  useEffect(() => {
    if (reducedMotion || !canScrub || !duration) return;
    const video = videoRef.current;
    if (!video) return;

    const targetTime = progress * duration;
    if (Math.abs(video.currentTime - targetTime) > 0.01) {
      video.currentTime = targetTime;
    }
  }, [progress, duration, canScrub, reducedMotion]);

  const navigateToProgress = useCallback((target: number) => {
    const container = containerRef.current;
    if (!container) return;
    scrollContainerToProgress(container, target);
  }, [containerRef]);

  const trackHeightVh = reducedMotion ? REDUCED_MOTION_HEIGHT_VH : SCROLL_LENGTH_VH;
  const overlayProgress = reducedMotion ? 1 : progress;

  return (
    <div
      ref={containerRef}
      data-scroll-video-hero=""
      className="relative"
      style={{ height: `${trackHeightVh}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-ink">
        <video
          ref={videoRef}
          src="/scroll-solar-flare-clean.mp4"
          muted
          playsInline
          preload="auto"
          autoPlay={reducedMotion}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <HeroNarrativeOverlay
          progress={overlayProgress}
          reducedMotion={reducedMotion}
          onNavigate={navigateToProgress}
        />
      </div>
    </div>
  );
}
