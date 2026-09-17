"use client";

import { clsx } from "clsx";
import { Artwork } from "@/lib/data/types";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/Button";
import { ARTIST_NAME, mailtoEnquiry } from "@/lib/site";

/**
 * "Acquire" adds the painting to the bag; "Enquire" opens an email with the
 * painting named in the subject. There is no online payment.
 */
export function AcquireActions({ artwork, className }: { artwork: Artwork; className?: string }) {
  const { items, addItem } = useCart();
  const inBag = items.some((i) => i.artworkId === artwork.id);
  const isSold = artwork.availability === "sold";

  const enquireHref = mailtoEnquiry(
    `Enquiry: ${artwork.title} (${artwork.reference}) — ${ARTIST_NAME}`,
    `I would like to know more about ${artwork.title} (${artwork.reference}).`
  );

  return (
    <div className={clsx("flex flex-col gap-3 sm:flex-row sm:items-center", className)}>
      <Button
        type="button"
        size="md"
        disabled={isSold || inBag}
        onClick={() => addItem(artwork.id)}
        aria-live="polite"
      >
        {isSold ? "Sold" : inBag ? "In your bag" : "Acquire"}
      </Button>
      <a
        href={enquireHref}
        className="copper-outline inline-flex items-center justify-center px-7 py-3.5 text-[12px] uppercase tracking-[0.22em] font-medium text-espresso hover:bg-copper/5 hover:text-copper-deep transition-colors duration-500 ease-premium"
      >
        Enquire
      </a>
    </div>
  );
}
