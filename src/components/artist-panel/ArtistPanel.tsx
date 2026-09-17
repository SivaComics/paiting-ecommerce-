"use client";

import { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { clsx } from "clsx";
import { useLenis } from "@/lib/lenis";
import { useMountedReducedMotion } from "@/components/ui/motion";
import { ARTIST_NAME } from "@/lib/site";
import { artistPortraitImage } from "@/lib/data/painting-images";
import { ARTICLE_SOURCE, ARTIST_BIO, ARTIST_QUOTES } from "@/lib/data/artist-words";
import { LifeInPainting } from "@/components/home/LifeInPainting";

/**
 * "About the artist" lives in a panel that slides in on request, so the page
 * itself stays about the paintings. Open it from anywhere with
 * useArtistPanel().open() or <AboutArtistButton />.
 */

interface ArtistPanelValue {
  open: () => void;
  close: () => void;
  isOpen: boolean;
}

const ArtistPanelContext = createContext<ArtistPanelValue | null>(null);

export function useArtistPanel(): ArtistPanelValue {
  const ctx = useContext(ArtistPanelContext);
  if (!ctx) throw new Error("useArtistPanel must be used within ArtistPanelProvider");
  return ctx;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export function ArtistPanelProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const lenis = useLenis();
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const open = useCallback(() => {
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  // Hold the page still behind the panel, and hand focus back on close.
  useEffect(() => {
    if (isOpen) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
      return;
    }
    lenis?.start();
    document.documentElement.style.overflow = "";
    returnFocusRef.current?.focus?.();
  }, [isOpen, lenis]);

  return (
    <ArtistPanelContext.Provider value={{ open, close, isOpen }}>
      {children}
      <ArtistPanelDrawer isOpen={isOpen} onClose={close} />
    </ArtistPanelContext.Provider>
  );
}

function ArtistPanelDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const reduced = useMountedReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    closeRef.current?.focus();
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[70]">
          <motion.button
            type="button"
            aria-label="Close about the artist"
            tabIndex={-1}
            onClick={onClose}
            className="absolute inset-0 h-full w-full cursor-default bg-night/45 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.5, ease: EASE }}
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="artist-panel-title"
            data-lenis-prevent
            className="absolute inset-y-0 right-0 flex w-full max-w-[520px] flex-col overflow-y-auto overscroll-contain bg-cream shadow-premium-lg"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: reduced ? 0 : 0.7, ease: EASE }}
          >
            <div className="copper-rule-bright sticky top-0 z-10" aria-hidden="true" />
            <div className="px-7 pb-16 pt-8 sm:px-10">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-sans uppercase tracking-[0.28em] text-copper-deep">About the artist</p>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="-mr-2 p-2 text-espresso-soft hover:text-copper-deep transition-colors duration-300 ease-premium"
                >
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>

              <div className="mt-8 flex items-end gap-5">
                <div className="copper-frame w-28 flex-shrink-0 sm:w-36">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={artistPortraitImage.src}
                    alt={`${ARTIST_NAME}, the artist`}
                    className="block h-auto w-full object-cover"
                    style={{ aspectRatio: String(artistPortraitImage.aspect) }}
                  />
                </div>
                <div className="min-w-0 pb-1">
                  <h2
                    id="artist-panel-title"
                    className="text-copper-metal font-serif text-[1.65rem] font-light leading-tight sm:text-[1.9rem]"
                  >
                    {ARTIST_NAME}
                  </h2>
                  <p className="mt-2 text-[11px] font-sans uppercase tracking-[0.24em] text-espresso-soft">
                    Painter · Chennai
                  </p>
                </div>
              </div>

              <figure className="mt-10">
                <span className="copper-rule block w-10" aria-hidden="true" />
                <blockquote className="mt-5 font-serif text-2xl font-light italic leading-snug text-espresso">
                  &ldquo;{ARTIST_QUOTES.symbolsAndForms}&rdquo;
                </blockquote>
              </figure>

              <div className="mt-8 space-y-4 text-[15px] leading-[1.85] text-espresso-soft">
                {ARTIST_BIO.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <LifeInPainting />

              <p className="mt-10 text-xs text-espresso-soft">
                Source:{" "}
                <a
                  href={ARTICLE_SOURCE.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-copper/40 underline-offset-4 hover:text-copper-deep hover:decoration-copper transition-colors duration-300 ease-premium"
                >
                  {ARTICLE_SOURCE.publication}, {ARTICLE_SOURCE.date}
                </a>
              </p>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

/** A text button that opens the artist panel; style it for where it sits. */
export function AboutArtistButton({ className, children }: { className?: string; children: ReactNode }) {
  const { open } = useArtistPanel();
  return (
    <button type="button" onClick={open} className={clsx("cursor-pointer", className)}>
      {children}
    </button>
  );
}
