"use client";

import { useState } from "react";
import { orders } from "@/lib/data/collector";
import { getArtworkById } from "@/lib/data/artworks";
import { getArtistById } from "@/lib/data/artists";
import { formatDate, formatPrice } from "@/lib/format";
import { Badge } from "@/components/ui/Badge";
import { BadgeCheck, X } from "lucide-react";

const statusLabel: Record<string, string> = {
  processing: "Processing",
  "in-transit": "In Transit",
  delivered: "Delivered",
};

export function PurchaseHistoryTab() {
  const [openCertificateId, setOpenCertificateId] = useState<string | null>(null);

  if (orders.length === 0) {
    return <p className="text-espresso-soft py-12 text-center">No purchases yet.</p>;
  }

  const openOrder = orders.find((o) => o.id === openCertificateId);
  const openArtwork = openOrder ? getArtworkById(openOrder.artworkId) : null;
  const openArtist = openArtwork ? getArtistById(openArtwork.artistId) : null;

  return (
    <div>
      <div className="divide-y divide-hairline">
        {orders.map((order) => {
          const artwork = getArtworkById(order.artworkId);
          const artist = artwork ? getArtistById(artwork.artistId) : undefined;
          if (!artwork) return null;
          return (
            <div
              key={order.id}
              className="flex flex-wrap items-center gap-6 py-5 px-2 -mx-2 transition-colors duration-300 ease-premium hover:bg-cream-deep/40"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={artwork.images[0]} alt={artwork.title} className="h-20 w-20 object-cover flex-shrink-0" />
              <div className="flex-1 min-w-[180px]">
                <p className="font-serif text-lg text-espresso">{artwork.title}</p>
                <p className="text-xs text-espresso-soft">{artist?.name}</p>
              </div>
              <div className="text-sm text-espresso-soft w-32">{formatDate(order.purchaseDate)}</div>
              <div className="text-sm text-espresso w-28">{formatPrice(order.pricePaid)}</div>
              <div className="w-32">
                <Badge tone={order.status === "delivered" ? "copper" : "default"}>
                  {statusLabel[order.status]}
                </Badge>
              </div>
              <button
                type="button"
                onClick={() => setOpenCertificateId(order.id)}
                className="text-xs uppercase tracking-wider text-espresso-soft hover:text-copper underline transition-colors duration-300 ease-premium"
              >
                View Certificate
              </button>
            </div>
          );
        })}
      </div>

      {openOrder && openArtwork && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-espresso/40 p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Certificate of Authenticity"
          onClick={() => setOpenCertificateId(null)}
        >
          <div
            className="relative bg-cream max-w-md w-full p-8 border border-hairline"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpenCertificateId(null)}
              aria-label="Close certificate"
              className="absolute top-4 right-4 text-espresso-soft hover:text-copper transition-colors duration-300 ease-premium"
            >
              <X size={18} strokeWidth={1.5} />
            </button>
            <div className="flex items-center gap-2 mb-6">
              <BadgeCheck size={18} strokeWidth={1.5} className="text-copper" />
              <p className="text-xs uppercase tracking-wider text-copper">Certificate of Authenticity</p>
            </div>
            <p className="font-serif text-xl text-espresso mb-1">{openArtwork.title}</p>
            <p className="text-sm text-espresso-soft mb-6">
              {openArtist?.name}, {openArtwork.year}
            </p>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-espresso-soft">Certificate ID</dt>
                <dd className="text-espresso">{openOrder.certificate.id}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-espresso-soft">Issued To</dt>
                <dd className="text-espresso">{openOrder.certificate.issuedTo}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-espresso-soft">Issued Date</dt>
                <dd className="text-espresso">{formatDate(openOrder.certificate.issuedDate)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-espresso-soft">Authenticated By</dt>
                <dd className="text-espresso text-right">{openOrder.certificate.authenticationPartner}</dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </div>
  );
}
