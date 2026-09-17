"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ShoppingBag, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { getArtworkById } from "@/lib/data/artworks";
import { formatArtworkPrice, formatPrice } from "@/lib/format";
import { ARTIST_NAME, PRICE_ON_REQUEST, mailtoEnquiry } from "@/lib/site";

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

  // A total only makes sense once every work in the bag has a confirmed
  // price; until then the bag shows "Price on request" instead.
  const allPriced = cartArtworks.length > 0 && cartArtworks.every(({ artwork }) => artwork.price !== null);
  const total = allPriced ? cartArtworks.reduce((sum, { artwork }) => sum + (artwork.price ?? 0), 0) : null;

  const enquiryHref = mailtoEnquiry(
    `Acquisition enquiry — ${ARTIST_NAME}`,
    `I would like to acquire:\n${cartArtworks
      .map(({ artwork }) => `- ${artwork.title} (${artwork.reference})`)
      .join("\n")}`
  );

  return (
    <div className="relative inline-flex items-center" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={`Bag, ${count} item${count === 1 ? "" : "s"}`}
        aria-expanded={open}
        className="relative inline-flex items-center text-cream/85 hover:text-copper-highlight transition-colors duration-300 ease-premium"
      >
        <ShoppingBag size={20} strokeWidth={1.5} />
        {count > 0 && (
          <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-copper text-[10px] font-sans text-night">
            {count}
          </span>
        )}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Your bag"
          className="copper-outline absolute right-0 top-full mt-3 w-80 max-w-[calc(100vw-3rem)] bg-cream shadow-lg z-50"
        >
          <div className="flex items-center justify-between px-5 py-4">
            <p className="font-serif text-lg text-espresso">Your Bag</p>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close bag">
              <X
                size={16}
                strokeWidth={1.5}
                className="text-espresso-soft hover:text-copper-deep transition-colors duration-300 ease-premium"
              />
            </button>
          </div>
          <div className="copper-rule" aria-hidden="true" />

          {cartArtworks.length === 0 ? (
            <p className="px-5 py-8 text-sm text-espresso-soft text-center">Your bag is empty.</p>
          ) : (
            <>
              <ul className="max-h-80 overflow-y-auto divide-y divide-hairline">
                {cartArtworks.map(({ item, artwork }) => (
                  <li key={item.artworkId} className="flex items-center gap-3 px-5 py-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={artwork.images[0]} alt="" className="h-12 w-12 object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-espresso truncate">{artwork.title}</p>
                      <p className="text-xs text-espresso-soft truncate">{artwork.reference}</p>
                      <p className="text-xs text-espresso-soft">{formatArtworkPrice(artwork)}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.artworkId)}
                      aria-label={`Remove ${artwork.reference} from bag`}
                      className="text-espresso-soft hover:text-copper-deep transition-colors duration-300 ease-premium"
                    >
                      <X size={14} strokeWidth={1.5} />
                    </button>
                  </li>
                ))}
              </ul>

              <div className="copper-rule" aria-hidden="true" />
              <div className="px-5 py-4 space-y-4">
                <div className="flex items-baseline justify-between text-sm">
                  <span className="text-espresso-soft">Total</span>
                  <span className="text-espresso">{total === null ? PRICE_ON_REQUEST : formatPrice(total)}</span>
                </div>
                <a
                  href={enquiryHref}
                  className="copper-outline block px-4 py-3 text-center text-xs uppercase tracking-[0.18em] text-espresso hover:bg-copper/5 hover:text-copper-deep transition-colors duration-500 ease-premium"
                >
                  Enquire to acquire
                </a>
              </div>
            </>
          )}

          <div className="copper-rule" aria-hidden="true" />
          <div className="px-5 py-4">
            <Link
              href="/#paintings"
              onClick={() => setOpen(false)}
              className="block text-center text-xs uppercase tracking-[0.18em] text-espresso-soft hover:text-copper-deep transition-colors duration-300 ease-premium"
            >
              View the paintings
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
