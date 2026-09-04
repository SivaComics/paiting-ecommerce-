"use client";

import { useEffect, useState } from "react";
import { clsx } from "clsx";
import { ArrowUp } from "lucide-react";
import { useLenis } from "@/lib/lenis";
import { TOC_SECTIONS } from "./toc-sections";

export function PhilosophyToc() {
  const [activeId, setActiveId] = useState<string>(TOC_SECTIONS[0].id);
  const lenis = useLenis();

  useEffect(() => {
    const sections = TOC_SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function scrollToId(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el, { duration: 1.1, offset: -32 });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <nav aria-label="Table of contents" className="sticky top-32 hidden xl:block">
      <ul className="flex flex-col gap-3 border-l border-hairline pl-5">
        {TOC_SECTIONS.map((section) => {
          const isActive = section.id === activeId;
          return (
            <li key={section.id}>
              <button
                type="button"
                onClick={() => scrollToId(section.id)}
                className={clsx(
                  "text-left text-[11px] font-sans uppercase tracking-[0.15em] transition-colors duration-300 ease-premium",
                  isActive ? "text-copper" : "text-espresso-soft hover:text-copper"
                )}
                aria-current={isActive ? "true" : undefined}
              >
                {section.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Mobile/tablet stand-in for the sticky TOC: a simple back-to-top link. */
export function PhilosophyBackToTop() {
  const lenis = useLenis();

  function handleClick() {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.1 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="xl:hidden inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.2em] text-espresso-soft hover:text-copper transition-colors duration-300 ease-premium"
    >
      <ArrowUp size={14} strokeWidth={1.5} />
      Back to top
    </button>
  );
}
