"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ShoppingBag, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { getArtworkById } from "@/lib/data/artworks";
import { formatPrice } from "@/lib/format";

export function CartPopover() {
  const [open, setOpen] = useState(false);
  const { items, count, removeItem } = useCart();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const cartArtworks = items
    .map((item) => ({ item, artwork: getArtworkById(item.artworkId) }))
    .filter((x): x is { item: (typeof items)[number]; artwork: NonNullable<ReturnType<typeof getArtworkById>> } =>
      Boolean(x.artwork)
    );

  return (
    <div className="relative inline-flex items-center" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}
        aria-expanded={open}
        className="relative inline-flex items-center text-espresso-soft hover:text-copper transition-colors duration-300 ease-premium"
      >
        <ShoppingBag size={20} strokeWidth={1.5} />
        {count > 0 && (
          <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-copper text-[10px] font-sans text-cream">
            {count}
          </span>
        )}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Shopping bag"
          className="absolute right-0 top-full mt-3 w-80 bg-cream border border-hairline shadow-lg z-50"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-hairline">
            <p className="font-serif text-lg text-espresso">Your Bag</p>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close bag">
              <X
                size={16}
                strokeWidth={1.5}
                className="text-espresso-soft hover:text-copper transition-colors duration-300 ease-premium"
              />
            </button>
          </div>

          {cartArtworks.length === 0 ? (
            <p className="px-5 py-8 text-sm text-espresso-soft text-center">Your bag is empty.</p>
          ) : (
            <ul className="max-h-80 overflow-y-auto divide-y divide-hairline">
              {cartArtworks.map(({ item, artwork }) => (
                <li key={item.artworkId} className="flex items-center gap-3 px-5 py-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={artwork.images[0]} alt={artwork.title} className="h-12 w-12 object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-espresso truncate">{artwork.title}</p>
                    <p className="text-xs text-espresso-soft">{formatPrice(artwork.price)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.artworkId)}
                    aria-label={`Remove ${artwork.title} from bag`}
                    className="text-espresso-soft hover:text-copper transition-colors duration-300 ease-premium"
                  >
                    <X size={14} strokeWidth={1.5} />
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="px-5 py-4 border-t border-hairline">
            <Link
              href="/discover"
              onClick={() => setOpen(false)}
              className="block text-center text-xs uppercase tracking-wider text-espresso-soft hover:text-copper transition-colors duration-300 ease-premium"
            >
              Continue Browsing
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
