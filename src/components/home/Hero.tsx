"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Artwork } from "@/lib/data/types";
import { getArtistById } from "@/lib/data/artists";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/motion";

export function Hero({ artworks, introReady = true }: { artworks: Artwork[]; introReady?: boolean }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % artworks.length), 6500);
    return () => clearInterval(id);
  }, [artworks.length]);

  const current = artworks[index];
  const artist = getArtistById(current.artistId);

  return (
    <section className="relative h-[92vh] min-h-[560px] w-full overflow-hidden bg-espresso">
      <AnimatePresence mode="sync">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1.07 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1.4, ease: [0.22, 1, 0.36, 1] },
            scale: { duration: 7, ease: "linear" },
          }}
          className="absolute inset-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={current.images[0]}
            alt={`${current.title} by ${artist?.name ?? "unknown artist"}`}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-espresso-veil" />
          <div className="absolute inset-0 bg-gradient-copper-veil" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 pb-10 text-center">
        <motion.div
          key={`caption-${current.id}`}
          initial={{ opacity: 0, y: 20 }}
          animate={introReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-5 text-xs font-sans uppercase tracking-[0.35em] text-cream/80">
            Original Works, Authenticated &amp; Insured
          </p>
          <h1 className="font-serif text-5xl sm:text-7xl text-cream max-w-4xl text-balance-pretty leading-[1.05]">
            Art That Finds Its Room
          </h1>
          <p className="mt-5 text-cream/80 text-sm sm:text-base">
            {current.title}, {current.year} — {artist?.name}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <Button href="/discover" variant="copper" size="lg">
                Discover the Collection
              </Button>
            </Magnetic>
            <Button href={`/artwork/${current.slug}`} variant="outline-light" size="lg">
              View This Piece
            </Button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 gap-2.5">
        {artworks.map((a, i) => (
          <button
            key={a.id}
            aria-label={`Show ${a.title}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ease-premium ${
              i === index ? "w-9 bg-cream" : "w-1.5 bg-cream/40 hover:bg-cream/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
