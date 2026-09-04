"use client";

import { useMemo, useState } from "react";
import { Artwork } from "@/lib/data/types";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { HairlineDivider } from "@/components/ui/HairlineDivider";
import { Magnetic } from "@/components/ui/motion";
import { BadgeCheck, Heart, ShieldCheck, Truck } from "lucide-react";
import { clsx } from "clsx";

export function PurchasePanel({ artwork }: { artwork: Artwork }) {
  const [frameId, setFrameId] = useState(artwork.framingOptions[0]?.id);
  const [favorited, setFavorited] = useState(false);
  const [reserved, setReserved] = useState(false);

  const frame = artwork.framingOptions.find((f) => f.id === frameId) ?? artwork.framingOptions[0];
  const total = artwork.price + (frame?.priceDelta ?? 0);
  const monthly = useMemo(() => Math.ceil(total / 12), [total]);
  const isSold = artwork.availability === "sold";

  return (
    <div className="lg:sticky lg:top-28">
      <Badge tone="copper" icon={<BadgeCheck size={13} strokeWidth={1.5} />} className="mb-4">
        Certificate of Authenticity Included
      </Badge>

      <p className="font-serif text-2xl text-espresso">{formatPrice(total)}</p>
      {frame && frame.priceDelta > 0 && (
        <p className="text-xs text-espresso-soft mt-1">
          Includes {frame.label.toLowerCase()} (+{formatPrice(frame.priceDelta)})
        </p>
      )}

      {artwork.availability === "on-hold" && (
        <p className="mt-2 text-xs uppercase tracking-wider text-copper">Currently On Hold</p>
      )}

      <HairlineDivider className="my-6" />

      {artwork.framingOptions.length > 1 && (
        <div className="mb-6">
          <p className="text-xs font-sans uppercase tracking-wider text-espresso mb-3">
            {artwork.medium === "Sculpture" ? "Presentation" : "Framing"}
          </p>
          <div className="space-y-2">
            {artwork.framingOptions.map((f) => (
              <label
                key={f.id}
                className={clsx(
                  "flex items-start gap-3 border p-3 cursor-pointer transition-colors duration-300 ease-premium",
                  frameId === f.id ? "border-copper bg-copper/5" : "border-hairline hover:border-copper/40"
                )}
              >
                <input
                  type="radio"
                  name="framing"
                  checked={frameId === f.id}
                  onChange={() => setFrameId(f.id)}
                  className="mt-1 accent-copper"
                />
                <span>
                  <span className="block text-sm text-espresso">
                    {f.label}
                    {f.priceDelta > 0 && (
                      <span className="text-espresso-soft"> (+{formatPrice(f.priceDelta)})</span>
                    )}
                  </span>
                  <span className="block text-xs text-espresso-soft mt-0.5">{f.description}</span>
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2 text-sm text-espresso-soft mb-6">
        <p className="flex items-start gap-2">
          <Truck size={16} strokeWidth={1.5} className="mt-0.5 flex-shrink-0 text-copper" />
          Insured worldwide shipping, estimated 2–3 weeks to arrival.
        </p>
        <p className="flex items-start gap-2">
          <ShieldCheck size={16} strokeWidth={1.5} className="mt-0.5 flex-shrink-0 text-copper" />
          As low as {formatPrice(monthly)}/mo with 12-month financing.
        </p>
      </div>

      {reserved ? (
        <div className="bg-cream-deep px-4 py-3 text-sm text-espresso">
          Thank you — a collector advisor will be in touch shortly to confirm your reservation.
        </div>
      ) : (
        <Magnetic strength={isSold ? 0 : 0.15} className="block w-full">
          <Button
            type="button"
            size="lg"
            className="w-full"
            disabled={isSold}
            onClick={() => setReserved(true)}
          >
            {isSold ? "This Work Has Sold" : "Reserve This Piece"}
          </Button>
        </Magnetic>
      )}

      <button
        type="button"
        onClick={() => setFavorited((v) => !v)}
        className="mt-3 w-full flex items-center justify-center gap-2 py-3 text-sm uppercase tracking-wider text-espresso-soft hover:text-copper transition-colors duration-300 ease-premium"
      >
        <Heart
          size={16}
          strokeWidth={1.5}
          className={favorited ? "fill-copper text-copper" : ""}
        />
        {favorited ? "Saved to Favorites" : "Save to Favorites"}
      </button>
    </div>
  );
}
