"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { clsx } from "clsx";
import { CartPopover } from "@/components/layout/CartPopover";
import { NAV_LINKS as navLinks, SITE_NAME } from "@/lib/site";
import { useArtistPanel } from "@/components/artist-panel/ArtistPanel";

// Past this point the header can hide; above it, it's always shown.
const REVEAL_ZONE_PX = 120;
// How far the visitor must scroll back up before the header returns, so a
// small wobble of the wheel or trackpad doesn't make it flicker.
const SCROLL_UP_TO_REVEAL_PX = 60;

export function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const artistPanel = useArtistPanel();

  // Slides and fades away while scrolling down; slides back in when the
  // visitor scrolls up or returns to the top.
  useEffect(() => {
    let lastY = window.scrollY;
    let upDistance = 0;
    let ticking = false;

    function update() {
      const y = window.scrollY;
      const delta = y - lastY;

      if (y < REVEAL_ZONE_PX) {
        upDistance = 0;
        setHidden(false);
      } else if (delta > 0) {
        upDistance = 0;
        setHidden(true);
      } else if (delta < 0) {
        upDistance -= delta;
        if (upDistance > SCROLL_UP_TO_REVEAL_PX) setHidden(false);
      }

      lastY = y;
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHidden = hidden && !open;

  return (
    <>
      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-40 bg-night text-cream",
          // Tailwind v4 translate utilities set the `translate` property, not `transform`.
          "transition-[translate,opacity] duration-700 ease-premium [will-change:translate,opacity]",
          isHidden ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
        )}
      >
        <div className="mx-auto max-w-6xl px-6 h-20 sm:h-24 flex items-center justify-between gap-8">
          <Link href="/" className="font-serif text-3xl font-light tracking-[0.06em] text-copper-metal-bright flex-shrink-0 sm:text-[2.1rem]">
            {SITE_NAME}
          </Link>

          <div className="flex items-center gap-10">
            <nav className="hidden md:flex items-center gap-10" aria-label="Primary">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="group relative text-[12px] font-sans uppercase tracking-[0.26em] text-cream/75 hover:text-copper-highlight transition-colors duration-500 ease-premium py-1"
                >
                  {link.label}
                  <span className="copper-rule-bright absolute left-0 -bottom-0.5 w-0 transition-all duration-500 ease-premium group-hover:w-full" />
                </Link>
              ))}
              <button
                type="button"
                onClick={artistPanel.open}
                className="group relative text-[12px] font-sans uppercase tracking-[0.26em] text-cream/75 hover:text-copper-highlight transition-colors duration-500 ease-premium py-1"
              >
                About
                <span className="copper-rule-bright absolute left-0 -bottom-0.5 w-0 transition-all duration-500 ease-premium group-hover:w-full" />
              </button>
            </nav>

            <div className="flex items-center gap-5">
              <CartPopover />
              <button
                type="button"
                className="md:hidden text-cream/85 hover:text-copper-highlight transition-colors duration-300 ease-premium"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
              >
                {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </div>

        <div className="copper-rule-bright" aria-hidden="true" />

        <div
          className={clsx(
            "md:hidden overflow-hidden transition-[max-height] duration-500 ease-premium bg-night",
            open ? "max-h-64" : "max-h-0"
          )}
        >
          <nav aria-label="Primary mobile" className="px-6 py-6">
            <ul className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-[13px] font-sans uppercase tracking-[0.26em] text-cream/75 hover:text-copper-highlight transition-colors duration-300 ease-premium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    artistPanel.open();
                  }}
                  className="text-[13px] font-sans uppercase tracking-[0.26em] text-cream/75 hover:text-copper-highlight transition-colors duration-300 ease-premium"
                >
                  About
                </button>
              </li>
            </ul>
          </nav>
          {open && <div className="copper-rule-bright" aria-hidden="true" />}
        </div>
      </header>
      {/* Holds the header's space in the page flow, since the header is fixed. */}
      <div className="h-[81px] sm:h-[97px]" aria-hidden="true" />
    </>
  );
}
