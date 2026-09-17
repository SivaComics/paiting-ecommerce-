"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { motion } from "framer-motion";
import { Artwork } from "@/lib/data/types";
import { useLenis } from "@/lib/lenis";
import { RevealOnScroll, useMountedReducedMotion } from "@/components/ui/motion";
import { SITE_NAME } from "@/lib/site";

const MOBILE_QUERY = "(max-width: 767px)";

// Shared bounding box (viewBox y: 32–68, centered at 50,50) so the circle,
// triangle, and inverted triangle all morph within the same visual footprint.
const CIRCLE_PATH = "M50,32 A18,18 0 1,1 50,68 A18,18 0 1,1 50,32 Z";
const TRIANGLE_PATH = "M50,32 L67,62 L33,62 Z";

// Fixed (not random) so server and client render identically — Math.random()
// here would cause a hydration mismatch.
const DRIFT_PARTICLES = [
  { left: "22%", top: "28%", size: 3, duration: 9, delay: 0 },
  { left: "78%", top: "24%", size: 2, duration: 11, delay: 1.2 },
  { left: "68%", top: "62%", size: 2.5, duration: 8, delay: 0.6 },
  { left: "30%", top: "70%", size: 2, duration: 10, delay: 2 },
  { left: "50%", top: "18%", size: 2, duration: 12, delay: 0.9 },
  { left: "15%", top: "52%", size: 3, duration: 9.5, delay: 1.6 },
  { left: "85%", top: "45%", size: 2, duration: 10.5, delay: 0.3 },
];


export function GalleryIntro({ artwork, artistName }: { artwork: Artwork; artistName?: string }) {
  // Mount-gated: matches the server render on first paint, then swaps after
  // mount if the OS actually prefers reduced motion. Reading it synchronously
  // would make a reduced-motion client's first render diverge from the
  // server-rendered HTML and force React to discard and rebuild the tree.
  const reduced = useMountedReducedMotion();

  if (reduced) {
    return <StaticGalleryIntro artwork={artwork} artistName={artistName} />;
  }

  return <AnimatedGalleryIntro artwork={artwork} artistName={artistName} />;
}

function AnimatedGalleryIntro({ artwork, artistName }: { artwork: Artwork; artistName?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const svgGroupRef = useRef<SVGGElement>(null);
  const morphShapeRef = useRef<SVGPathElement>(null);
  const morphShapeBgRef = useRef<SVGPathElement>(null);
  const morphShapeHighlightRef = useRef<SVGPathElement>(null);
  const invTriangleRef = useRef<SVGPathElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  const artworkWrapRef = useRef<HTMLDivElement>(null);
  const artworkClipRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const lenis = useLenis();

  const [promptVisible, setPromptVisible] = useState(false);
  // Driven by scroll progress via React state (not a GSAP tween) — a GSAP
  // tween inside the scrubbed timeline would fight the separate one-time
  // mount-entrance tween below for ownership of the same opacity property.
  const [idleVisible, setIdleVisible] = useState(true);

  useEffect(() => {
    if (!lenis) return;
    lenis.on("scroll", ScrollTrigger.update);
    return () => {
      lenis.off("scroll", ScrollTrigger.update);
    };
  }, [lenis]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin);

    const ctx = gsap.context(() => {
      const lineLength = lineRef.current?.getTotalLength() ?? 0;

      gsap.set([morphShapeRef.current, morphShapeBgRef.current, morphShapeHighlightRef.current], {
        opacity: 0,
        scale: 0.7,
        transformOrigin: "50% 50%",
      });
      // Persistent offset so the shadow reads as cast below/right of the metal
      // and the highlight ring sits toward the light source, upper-left.
      gsap.set(morphShapeBgRef.current, { x: 2.5, y: 2.5 });
      gsap.set(morphShapeHighlightRef.current, { x: -1, y: -1 });
      gsap.set(invTriangleRef.current, {
        opacity: 0,
        scale: 0.7,
        transformOrigin: "50% 50%",
      });
      gsap.set(lineRef.current, {
        strokeDasharray: lineLength,
        strokeDashoffset: lineLength,
        opacity: 0,
      });
      gsap.set(artworkClipRef.current, { clipPath: "circle(0% at 50% 50%)" });
      gsap.set(artworkWrapRef.current, { opacity: 0 });
      gsap.set(textRef.current, { opacity: 0, y: 28 });

      // ONE-TIME entrance on mount — not tied to scroll at all. The circle
      // settles in as soon as the page loads, then holds completely still
      // until the visitor actually scrolls, at which point the scrubbed
      // timeline below takes over. (The idle mood copy/painting fade in via
      // Framer Motion below on the idle content — and fade out on
      // scroll via the `idleVisible` state set from ScrollTrigger's onUpdate.)
      gsap.to([morphShapeRef.current, morphShapeBgRef.current, morphShapeHighlightRef.current], {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        delay: 0.2,
        ease: "power2.out",
      });

      gsap.matchMedia().add(
        { isMobile: MOBILE_QUERY, isDesktop: `not ${MOBILE_QUERY}` },
        (context) => {
          const { isMobile } = context.conditions as { isMobile: boolean };
          const scrollDistance = isMobile ? 3000 : 4800;

          const tl = gsap.timeline({
            defaults: { ease: "power2.out" },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: `+=${scrollDistance}`,
              scrub: true,
              pin: stageRef.current,
              anticipatePin: 1,
              onUpdate: (self) => {
                if (self.progress > 0.92) setPromptVisible(true);
                else if (self.progress < 0.85) setPromptVisible(false);
                setIdleVisible(self.progress < 0.02);
              },
            },
          });

          triggerRef.current = tl.scrollTrigger ?? null;

          // Stage A — scrolling begins: the idle mood copy/painting have already
          // handed off to the shape sequence (see `idleVisible`, driven by
          // onUpdate above). The circle itself is already on screen (it
          // appeared on mount) and simply continues into its morph.
          tl.to({}, { duration: 0.5 });

          // Stage B — TRUE SHAPE MORPH: the circle becomes the triangle.
          // One continuous path reshapes itself (MorphSVGPlugin), scrubbed
          // 1:1 to scroll with power2.inOut easing. The faint duplicate
          // layer morphs in lockstep but travels at ~half the displacement,
          // reading as a soft parallax layer behind the main shape.
          tl.to(
            morphShapeRef.current,
            { morphSVG: TRIANGLE_PATH, x: isMobile ? 4 : 7, y: -5, duration: 2, ease: "power2.inOut" },
            "morph1"
          );
          tl.to(
            morphShapeBgRef.current,
            { morphSVG: TRIANGLE_PATH, x: isMobile ? 2 : 3.5, y: -2.5, duration: 2, ease: "power2.inOut" },
            "morph1"
          );
          tl.to(
            morphShapeHighlightRef.current,
            { morphSVG: TRIANGLE_PATH, x: isMobile ? -2 : -3.5, y: -2.5, duration: 2, ease: "power2.inOut" },
            "morph1"
          );

          // brief hold after the morph settles into a triangle
          tl.to({}, { duration: 0.5 });

          // Stage C — the inverted triangle enters from elsewhere (perspective, discovery)
          tl.fromTo(
            invTriangleRef.current,
            { opacity: 0, scale: 0.7, x: isMobile ? 22 : 34, y: 26, rotate: -30 },
            { opacity: 1, scale: 1, x: 0, y: 0, rotate: 0, duration: 1.1, ease: "power2.out" },
            ">"
          );

          // Stage D — the forms interact and combine into one composition
          tl.to(lineRef.current, { opacity: 1, strokeDashoffset: 0, duration: 0.7, ease: "power1.inOut" }, "compose");
          tl.to(
            [morphShapeRef.current, invTriangleRef.current],
            { scale: 1.04, duration: 0.9, ease: "power1.inOut" },
            "compose"
          );

          // Stage E — the composition dissolves into the real artwork. The dark
          // gallery backdrop stays exactly as it is — no background change here —
          // so the headline screen carries the identical gradient with zero seam.
          tl.to(svgGroupRef.current, { opacity: 0, scale: 1.18, duration: 1, ease: "power2.in" }, "reveal");
          tl.to(artworkWrapRef.current, { opacity: 1, duration: 0.4 }, "reveal");
          tl.to(
            artworkClipRef.current,
            { clipPath: "circle(75% at 50% 50%)", duration: 1.5, ease: "power2.out" },
            "reveal"
          );

          // Stage F — headline + supporting copy settle in
          tl.to(textRef.current, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "reveal+=0.9");

          return () => {
            triggerRef.current = null;
          };
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  function handleSkip() {
    // Jump a full viewport past where the pin releases, so the visitor lands
    // inside the real homepage content rather than on the intro's own final
    // (still-pinned) reveal frame.
    const target = (triggerRef.current?.end ?? 0) + window.innerHeight;
    if (lenis) {
      lenis.scrollTo(target, { duration: 1 });
    } else {
      window.scrollTo({ top: target, behavior: "smooth" });
    }
  }

  return (
    <section ref={sectionRef} className="relative bg-cream">
      <div ref={stageRef} className="relative z-50 h-screen w-full overflow-hidden bg-ink">
        {/* Soft warm studio-light glow — this is the ONLY background layer for the
            entire pinned stage (shapes AND headline screen alike), so there is no
            second background to seam against. */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 45%, rgba(180,118,58,0.35) 0%, rgba(122,74,30,0.16) 35%, rgba(10,10,10,0) 65%)",
          }}
          animate={{ opacity: [0.85, 1, 0.85], scale: [1, 1.04, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />

        {/* Ambient drifting particles — slow, independent loops, not tied to scroll */}
        {DRIFT_PARTICLES.map((p, i) => (
          <motion.span
            key={i}
            className="pointer-events-none absolute rounded-full bg-copper-light/50"
            style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
            animate={{ y: [0, -14, 0], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          />
        ))}

        <button
          type="button"
          onClick={handleSkip}
          className="absolute top-6 right-6 z-30 rounded-full bg-ink/30 px-3 py-1.5 text-[11px] font-sans uppercase tracking-[0.2em] text-cream/80 backdrop-blur-sm hover:text-copper-light transition-colors duration-300 ease-premium"
        >
          Skip Intro
        </button>

        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <defs>
            {/* Gold/bronze metal gradient — fixed in world-space (userSpaceOnUse) so the
                light direction stays constant as the shape morphs, rather than restretching
                to fit each new bounding box. */}
            <linearGradient id="metal-gold" gradientUnits="userSpaceOnUse" x1="30" y1="26" x2="70" y2="72">
              <stop offset="0%" stopColor="#5C3818" />
              <stop offset="45%" stopColor="#B4763A" />
              <stop offset="100%" stopColor="#F0C878" />
            </linearGradient>
            <linearGradient id="metal-gold-deep" gradientUnits="userSpaceOnUse" x1="70" y1="26" x2="30" y2="72">
              <stop offset="0%" stopColor="#3d2812" />
              <stop offset="45%" stopColor="#7A4A1E" />
              <stop offset="100%" stopColor="#C79352" />
            </linearGradient>
            {/* Specular highlight — a soft position-based falloff (not a dash pattern,
                which breaks under MorphSVG's point resampling) so the bright light
                stays concentrated toward the upper-left regardless of path structure. */}
            <linearGradient id="specular-highlight" gradientUnits="userSpaceOnUse" x1="28" y1="24" x2="58" y2="54">
              <stop offset="0%" stopColor="#FBE7B8" stopOpacity="0.95" />
              <stop offset="55%" stopColor="#FBE7B8" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#FBE7B8" stopOpacity="0" />
            </linearGradient>
          </defs>

          <g ref={svgGroupRef}>
            <line
              ref={lineRef}
              x1="20"
              y1="50"
              x2="80"
              y2="50"
              stroke="var(--color-copper)"
              strokeWidth={2}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={{ willChange: "transform, opacity" }}
            />

            {/* The circle → triangle medallion: cast shadow + beveled gold body + specular highlight */}
            <g>
              {/* Shadow layer — offset dark duplicate simulating the metal's cast shadow */}
              <path
                ref={morphShapeBgRef}
                d={CIRCLE_PATH}
                fill="none"
                stroke="var(--color-espresso)"
                strokeOpacity="0.4"
                strokeWidth={11}
                strokeLinecap="butt"
                strokeLinejoin="miter"
                vectorEffect="non-scaling-stroke"
                style={{ willChange: "transform" }}
              />
              {/* Base layer — thick beveled cross-section, dark bronze to bright gold */}
              <path
                ref={morphShapeRef}
                d={CIRCLE_PATH}
                fill="none"
                stroke="url(#metal-gold)"
                strokeWidth={18}
                strokeLinecap="butt"
                strokeLinejoin="miter"
                vectorEffect="non-scaling-stroke"
                style={{ willChange: "transform, opacity" }}
              />
              {/* Specular highlight — bright only where the gradient's falloff (defined
                  in world-space above) is near its light source, upper-left */}
              <path
                ref={morphShapeHighlightRef}
                d={CIRCLE_PATH}
                fill="none"
                stroke="url(#specular-highlight)"
                strokeWidth={3}
                strokeLinecap="butt"
                strokeLinejoin="miter"
                vectorEffect="non-scaling-stroke"
                style={{ willChange: "transform, opacity" }}
              />
            </g>

            <path
              ref={invTriangleRef}
              d="M50,68 L33,38 L67,38 Z"
              fill="none"
              stroke="url(#metal-gold-deep)"
              strokeWidth={18}
              strokeLinecap="butt"
              strokeLinejoin="miter"
              vectorEffect="non-scaling-stroke"
              style={{ willChange: "transform, opacity", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.45))" }}
            />
          </g>
        </svg>

        {/* Idle screen — visible only before scrolling begins; sits ABOVE the
            circle with a fixed 56px gap (container spans 0–32vh, matching the
            circle's top edge, with content bottom-aligned + pb-14). Fades out
            as soon as scrolling starts, driven by `idleVisible` (React state,
            set from ScrollTrigger's onUpdate — see above) rather than a GSAP
            tween, so it can't fight the separate one-time mount-entrance tween. */}
        <motion.div
          className="absolute inset-x-0 top-0 z-10 flex h-[32vh] items-end justify-center px-6 pb-14 text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: idleVisible ? 1 : 0, y: idleVisible ? 0 : -10 }}
          transition={{ duration: idleVisible ? 1 : 0.5, delay: idleVisible ? 0.7 : 0, ease: "easeOut" }}
        >
          {/* Decorative font candidate — swap the CSS variable to compare:
              --font-cormorant (Cormorant Garamond, italic) or --font-italiana
              (Italiana, all-caps display serif). See layout.tsx for both. */}
          <p
            className="text-2xl sm:text-3xl text-cream/60"
            style={{ fontFamily: "var(--font-cormorant)", letterSpacing: "0.05em" }}
          >
            Structure Meets Instinct
          </p>
        </motion.div>

        <div ref={artworkWrapRef} className="absolute inset-0 flex items-center justify-center px-6">
          <div
            ref={artworkClipRef}
            className="relative h-[62vh] w-[62vh] max-h-[85vw] max-w-[85vw] overflow-hidden"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={artwork.images[0]}
              alt={`${artwork.title} by ${artistName ?? `a ${SITE_NAME} artist`}`}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div
          ref={textRef}
          className="absolute inset-0 z-10 flex flex-col items-center justify-end px-6 pb-20 text-center"
        >
          <h2 className="font-serif text-4xl sm:text-6xl text-cream text-balance-pretty leading-[1.05]">
            Every Piece Carries a Story
          </h2>
          <p className="mt-4 text-sm sm:text-base font-sans text-cream/70 max-w-md">
            Enter the world behind the collection.
          </p>
        </div>

        <motion.div
          className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: promptVisible ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.p
            className="text-[10px] font-sans uppercase tracking-[0.3em] text-cream/60"
            animate={promptVisible ? { y: [0, 7, 0] } : { y: 0 }}
            transition={{ duration: 1.6, ease: "easeInOut", repeat: promptVisible ? Infinity : 0 }}
          >
            Scroll to Explore
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

function StaticGalleryIntro({ artwork, artistName }: { artwork: Artwork; artistName?: string }) {
  return (
    <section className="relative bg-cream py-24 px-6">
      <RevealOnScroll className="mx-auto flex max-w-2xl flex-col items-center gap-8 text-center">
        <svg viewBox="0 0 100 100" className="h-24 w-24" aria-hidden="true">
          <circle cx="50" cy="50" r="18" fill="none" stroke="var(--color-copper)" strokeWidth="0.6" />
          <path
            d="M50,30 L68,62 L32,62 Z"
            fill="none"
            stroke="var(--color-copper)"
            strokeWidth="0.6"
            strokeLinejoin="round"
          />
          <path
            d="M50,70 L32,38 L68,38 Z"
            fill="none"
            stroke="var(--color-copper-deep)"
            strokeWidth="0.6"
            strokeLinejoin="round"
          />
        </svg>
        <div className="relative h-[50vh] w-full max-w-md overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={artwork.images[0]}
            alt={`${artwork.title} by ${artistName ?? `a ${SITE_NAME} artist`}`}
            className="h-full w-full object-cover"
          />
        </div>
        <h2 className="font-serif text-4xl sm:text-5xl text-espresso text-balance-pretty leading-[1.05]">
          Every Piece Carries a Story
        </h2>
        <p className="text-sm sm:text-base font-sans text-espresso-soft max-w-md">
          Enter the world behind the collection.
        </p>
      </RevealOnScroll>
    </section>
  );
}
