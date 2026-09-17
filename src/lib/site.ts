/**
 * Site-wide identity and placeholders — the one place to change the site's
 * name, the artist's name, and the contact address.
 *
 * Anything still marked [TBC: …] is waiting on the client. Search the repo
 * for "[TBC:" to find every remaining placeholder.
 */

// TBC: final site name to be confirmed with the client.
export const SITE_NAME = "Auréline";

// Full name as given in the yathraemagazine.com article (the client documents
// call him "Mr. Balu").
export const ARTIST_NAME = "K. Balasubramanian";

export const CONTACT_EMAIL = "[TBC: client email]";

// Header and footer navigation. The other routes (/discover, /artists,
// /philosophy, /dashboard, /sign-in, /sign-up) are kept in code but
// deliberately not linked from anywhere on the site.
export const NAV_LINKS = [
  { href: "/#work", label: "Work" },
  { href: "/#paintings", label: "Paintings" },
  { href: "/#contact", label: "Contact" },
];

/** Visible placeholder text for details the source documents don't contain. */
export const TBC = {
  title: "[TBC: title]",
  medium: "[TBC: medium]",
  dimensions: "[TBC: dimensions]",
  year: "[TBC: year]",
  price: "[TBC: price]",
  bio: "[TBC: bio]",
  commissions: "[TBC: commissions details]",
} as const;

/** Shown to visitors wherever a price would appear until prices are confirmed. */
export const PRICE_ON_REQUEST = "Price on request";

export function mailtoEnquiry(subject: string, body?: string): string {
  const params = new URLSearchParams({ subject });
  if (body) params.set("body", body);
  // URLSearchParams encodes spaces as "+", which mail clients show literally.
  return `mailto:${encodeURI(CONTACT_EMAIL)}?${params.toString().replace(/\+/g, "%20")}`;
}
