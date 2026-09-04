"use client";

import { useState } from "react";
import { Play } from "lucide-react";

export function VideoEmbed({ posterImage, artistName }: { posterImage: string; artistName: string }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="relative aspect-video bg-espresso">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={posterImage}
        alt={`Studio still from ${artistName}'s interview`}
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <button
        type="button"
        onClick={() => setRevealed(true)}
        aria-label={`Play studio interview with ${artistName}`}
        className="absolute inset-0 flex items-center justify-center group"
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-cream/90 group-hover:bg-copper transition-colors duration-300 ease-premium">
          <Play size={22} strokeWidth={1.5} className="text-espresso group-hover:text-cream ml-0.5" />
        </span>
      </button>
      {revealed && (
        <div className="absolute inset-0 flex items-center justify-center bg-espresso/80 px-8 text-center">
          <p className="text-cream text-sm">
            The studio interview with {artistName} is being produced — check back soon.
          </p>
        </div>
      )}
    </div>
  );
}
