"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { Artwork } from "@/lib/data/types";
import { formatArtworkPrice } from "@/lib/format";
import { AcquireActions } from "@/components/artwork/AcquireActions";

// The previous panel promised framing upgrades, insured shipping, financing
// and a certificate of authenticity. None of that is confirmed for these
// paintings, so the panel now carries only the price and the two actions.
export function PurchasePanel({ artwork }: { artwork: Artwork }) {
  const [favorited, setFavorited] = useState(false);

  return (
    <div className="copper-outline p-6 lg:sticky lg:top-28">
      <p className="font-serif text-2xl text-espresso">{formatArtworkPrice(artwork)}</p>
      {artwork.availability === "on-hold" && (
        <p className="mt-2 text-xs uppercase tracking-wider text-copper-deep">Currently On Hold</p>
      )}

      <hr className="copper-rule my-6" />

      <AcquireActions artwork={artwork} className="sm:flex-col sm:items-stretch" />

      <button
        type="button"
        onClick={() => setFavorited((v) => !v)}
        aria-pressed={favorited}
        className="mt-3 w-full flex items-center justify-center gap-2 py-3 text-sm uppercase tracking-wider text-espresso-soft hover:text-copper-deep transition-colors duration-300 ease-premium"
      >
        <Heart size={16} strokeWidth={1.5} className={favorited ? "fill-copper text-copper" : ""} />
        {favorited ? "Saved" : "Save"}
      </button>
    </div>
  );
}
