"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { Heart, Menu, Search, X } from "lucide-react";
import { clsx } from "clsx";
import { CartPopover } from "@/components/layout/CartPopover";
import { AccountMenu } from "@/components/layout/AccountMenu";
import { useAuth } from "@/lib/auth-context";

const navLinks = [
  { href: "/discover?newArrivals=1", label: "New Arrivals" },
  { href: "/discover?medium=Painting", label: "Paintings" },
  { href: "/discover?medium=Sculpture", label: "Sculpture" },
  { href: "/discover?medium=Photography", label: "Photography" },
  { href: "/discover#collections", label: "Collections" },
  { href: "/artists", label: "Artists" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const pathname = usePathname();
  // Seeded from the route (known during SSR, so the very first HTML already
  // renders the header as `fixed` on the homepage — no one-frame flash of a
  // sticky, flow-reserving header before the effect below can confirm it via
  // the DOM). The effect still double-checks via the DOM as a fallback.
  const [hasVideoHero, setHasVideoHero] = useState(pathname === "/");
  const [hiddenForVideoHero, setHiddenForVideoHero] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("[data-scroll-video-hero]");
    if (!hero) return;
    setHasVideoHero(true);

    let ticking = false;

    function update() {
      const rect = hero!.getBoundingClientRect();
      const scrollableHeight = hero!.offsetHeight - window.innerHeight;
      const progress = scrollableHeight > 0 ? Math.min(Math.max(-rect.top / scrollableHeight, 0), 1) : 1;
      setHiddenForVideoHero(progress < 0.999);
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

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    router.push(trimmed ? `/discover?q=${encodeURIComponent(trimmed)}#grid` : "/discover");
    setOpen(false);
  }

  return (
    <header
      className={clsx(
        // A page with a ScrollVideoHero needs the header taken out of normal
        // document flow entirely (fixed, overlaying) — otherwise its box still
        // reserves its height even at opacity-0, leaving a blank gap above the
        // video. Every other page keeps the original sticky, in-flow behavior.
        hasVideoHero ? "fixed inset-x-0 top-0" : "sticky top-0",
        "z-40 bg-cream/85 backdrop-blur-md border-b border-hairline",
        "transition-[opacity,transform] duration-500 ease-premium",
        hiddenForVideoHero ? "opacity-0 -translate-y-3 pointer-events-none" : "opacity-100 translate-y-0"
      )}
    >
      <div className="mx-auto max-w-7xl px-6 h-24 flex items-center justify-between gap-8">
        <Link href="/" className="font-serif text-[1.7rem] tracking-wide text-espresso flex-shrink-0">
          Auréline
        </Link>

        <nav className="hidden lg:flex items-center gap-9 flex-shrink-0" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="group relative text-[13px] font-sans uppercase tracking-wider text-espresso-soft hover:text-copper transition-colors duration-300 ease-premium whitespace-nowrap py-1"
            >
              {link.label}
              <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-copper transition-all duration-300 ease-premium group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <form onSubmit={handleSearch} className="hidden lg:flex items-center flex-1 max-w-xs">
          <div className="group relative w-full">
            <Search
              size={15}
              strokeWidth={1.5}
              className="absolute left-0 top-1/2 -translate-y-1/2 text-espresso-soft transition-colors duration-300 ease-premium group-focus-within:text-copper"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for artworks, artists…"
              aria-label="Search for artworks, artists"
              className="w-full bg-transparent border-b border-hairline pl-6 pr-2 py-1.5 text-sm text-espresso placeholder:text-espresso-soft focus:outline-none focus:border-copper transition-colors duration-300 ease-premium"
            />
          </div>
        </form>

        <div className="flex items-center gap-5 flex-shrink-0">
          <Link
            href="/dashboard"
            aria-label="Wishlist"
            className="hidden sm:inline-flex text-espresso-soft hover:text-copper transition-colors duration-300 ease-premium"
          >
            <Heart size={20} strokeWidth={1.5} />
          </Link>
          <CartPopover />
          <AccountMenu />
          <button
            type="button"
            className="lg:hidden text-espresso hover:text-copper transition-colors duration-300 ease-premium"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      <div
        className={clsx(
          "lg:hidden overflow-hidden transition-[max-height] duration-300 ease-out bg-cream border-b border-hairline",
          open ? "max-h-[36rem]" : "max-h-0"
        )}
      >
        <div className="px-6 py-4">
          <form onSubmit={handleSearch} className="relative mb-5">
            <Search
              size={15}
              strokeWidth={1.5}
              className="absolute left-0 top-1/2 -translate-y-1/2 text-espresso-soft"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for artworks, artists…"
              aria-label="Search for artworks, artists"
              className="w-full bg-transparent border-b border-hairline pl-6 pr-2 py-1.5 text-sm text-espresso placeholder:text-espresso-soft focus:outline-none focus:border-copper"
            />
          </form>
          <nav aria-label="Primary mobile">
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-sm font-sans uppercase tracking-wider text-espresso-soft hover:text-copper transition-colors duration-300 ease-premium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-3 mt-1 border-t border-hairline sm:hidden">
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="text-sm font-sans uppercase tracking-wider text-espresso-soft hover:text-copper transition-colors duration-300 ease-premium"
                >
                  Wishlist
                </Link>
              </li>
              {!user && (
                <li>
                  <Link
                    href="/sign-in"
                    onClick={() => setOpen(false)}
                    className="text-sm font-sans uppercase tracking-wider text-copper"
                  >
                    Sign In
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
