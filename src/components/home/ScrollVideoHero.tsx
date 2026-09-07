"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useHeroScrollProgress, scrollContainerToProgress } from "@/lib/hero-scroll-progress";
import { useMountedReducedMotion } from "@/components/ui/motion";
import { HeroNarrativeOverlay } from "./HeroNarrativeOverlay";

const HERO_VIDEO_SRC = "/scroll-solar-flare-clean.mp4";
// First frame of the clip — stands in until the video can scrub smoothly.
const HERO_POSTER_SRC = "/hero-posters/origin.jpg";

// Length of the hero's scroll track: five movements x 100vh, so the whole
// clip scrubs in five screens of scrolling.
// Higher number = slower scroll (more scrolling needed to finish the video).
// Lower number = faster scroll.
const HERO_SCROLL_VH = 500;
// prefers-reduced-motion: no pinned scroll track at all — just a normal,
// viewport-height section with the video playing once on its own.
const REDUCED_MOTION_HEIGHT_VH = 100;

// Half a frame at 24fps. Seeks shorter than this land on the frame that's
// already on screen, so they cost decoder work and show nothing.
const SEEK_EPSILON = 1 / 48;

export default function ScrollVideoHero() {
  // Next 16 routes `<link rel="preload">` through ReactDOM rather than the
  // Metadata API; from a client component this hoists into <head>.
  ReactDOM.preload(HERO_VIDEO_SRC, { as: "video", type: "video/mp4" });

  const reducedMotion = useMountedReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const { containerRef, progress } = useHeroScrollProgress<HTMLDivElement>();
  const [canScrub, setCanScrub] = useState(false);

  // Hold the poster until the clip is buffered enough to seek without
  // stalling — readyState 3 (HAVE_FUTURE_DATA) or the canplaythrough event.
  useEffect(() => {
    if (reducedMotion) return;
    const video = videoRef.current;
    if (!video) return;

    const handleReady = () => {
      if (video.readyState >= 3 && Number.isFinite(video.duration) && video.duration > 0) {
        setCanScrub(true);
      }
    };

    video.addEventListener("canplaythrough", handleReady);
    video.addEventListener("loadeddata", handleReady);
    video.load();
    handleReady();

    return () => {
      video.removeEventListener("canplaythrough", handleReady);
      video.removeEventListener("loadeddata", handleReady);
    };
  }, [reducedMotion]);

  // Scrub on every animation frame, reading scroll position straight off the
  // track's rect rather than waiting on a React state round-trip. Lenis is
  // already smoothing the scroll position site-wide, so there's deliberately
  // no second easing pass on the scrub value here — one smoothing layer only.
  useEffect(() => {
    if (reducedMotion || !canScrub) return;
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    let frameId = 0;

    function tick() {
      frameId = requestAnimationFrame(tick);

      const duration = video!.duration;
      if (!Number.isFinite(duration) || duration <= 0) return;

      const scrollableHeight = container!.offsetHeight - window.innerHeight;
      if (scrollableHeight <= 0) return;

      const rect = container!.getBoundingClientRect();
      const scrolled = Math.min(Math.max(-rect.top / scrollableHeight, 0), 1);
      const targetTime = scrolled * duration;

      if (Math.abs(targetTime - video!.currentTime) < SEEK_EPSILON) return;
      video!.currentTime = targetTime;
    }

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [reducedMotion, canScrub, containerRef]);

  const navigateToProgress = useCallback((target: number) => {
    const container = containerRef.current;
    if (!container) return;
    scrollContainerToProgress(container, target);
  }, [containerRef]);

  const trackHeightVh = reducedMotion ? REDUCED_MOTION_HEIGHT_VH : HERO_SCROLL_VH;
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
          src={HERO_VIDEO_SRC}
          poster={HERO_POSTER_SRC}
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
