"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { clsx } from "clsx";
import { useMountedReducedMotion } from "@/components/ui/motion";

export function ZoomableImage({ images, alt, aspect = 1 }: { images: string[]; alt: string; aspect?: number }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const reduced = useMountedReducedMotion();

  useEffect(() => {
    if (!lightbox) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setLightbox(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [lightbox]);

  return (
    <div>
      <div className="copper-frame group">
        <button
          type="button"
          onClick={() => setLightbox(true)}
          className="relative block w-full overflow-hidden bg-cream-deep cursor-zoom-in"
          style={{ aspectRatio: String(aspect) }}
          aria-label="Open full-screen zoom view"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <motion.img
            key={active}
            src={images[active]}
            alt={alt}
            className="h-full w-full object-cover"
            initial={reduced ? false : { scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
          />
          <span className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-cream/90 px-3 py-1.5 text-xs uppercase tracking-wider text-espresso opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-premium">
            <ZoomIn size={14} strokeWidth={1.5} />
            Zoom
          </span>
        </button>
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex gap-3">
          {images.map((img, i) => (
            <button
              key={img.slice(0, 40) + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              aria-pressed={i === active}
              className={clsx(
                "relative h-16 w-16 overflow-hidden border transition-colors duration-300 ease-premium",
                i === active ? "copper-outline" : "border-hairline hover:border-copper/50"
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt="" aria-hidden="true" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-espresso/95 flex items-center justify-center p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Full-screen artwork view"
          onClick={() => setLightbox(false)}
        >
          <button
            type="button"
            onClick={() => setLightbox(false)}
            aria-label="Close zoom view"
            className="absolute top-6 right-6 text-cream hover:text-copper transition-colors duration-300 ease-premium"
          >
            <X size={28} strokeWidth={1.5} />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[active]}
            alt={alt}
            className="max-h-full max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
