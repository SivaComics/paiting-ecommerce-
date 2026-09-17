/**
 * The artist's own words and biographical facts, taken from one published
 * source. Quotes are copied exactly as published — including the article's
 * own wording ("unition") — with "…" marking only where a sentence is cut.
 * Do not reword them: they are presented on the site as his words.
 */

export const ARTICLE_SOURCE = {
  title: "Renowned Artist K. Balasubramanian",
  publication: "yathraemagazine.com",
  date: "8 December 2023",
  url: "https://www.yathraemagazine.com/renowned-artist-k-balasubramanian/",
} as const;

export const ARTIST_QUOTES = {
  symbolsAndForms:
    "My art reflects a life philosophy of taking things as they come, communicating the emotions through symbols and geometric forms.",
  inspiration:
    "I explored India and other countries across the world. I drew inspiration from their forms, colours and symbols in order to deepen my knowledge.",
  colour: "I use vibrant colours … with a deep passion for art and the sun-drenched landscapes of India.",
  shakti:
    "The concept of Shakti, celebrating life through the unition of Purusha and Prakriti is evidenced in my compositions with downward and upward pointing triangles.",
  atman:
    "…the union of the Atman with the Paramatman is articulated through the upward pointing triangle with the circle of eternity…",
  canvas:
    "Taking life as a great big canvas, I attempt to throw all the paint on it, which gives my own autobiography.",
  communication: "Art has been the medium of communication across boundaries for centuries.",
  precursor: "Art is a precursor of society, right from the creation of the universe.",
} as const;

export type ArtistQuoteKey = keyof typeof ARTIST_QUOTES;

/** Biographical facts, each stated in the article. */
export const ARTIST_BIO = [
  "K. Balasubramanian obtained his post-diploma in painting from the College of Arts and Crafts, Chennai, in 1984. He lives and works in Chennai.",
  "He has exhibited in India and abroad, including a group show of 20 Indian artists at Galerie Selective Art, Paris (2012), Jehangir Art Gallery, Mumbai (2008), Vinyasa Art Gallery, Chennai (2007 and 2008), and Indian Pallet by Contemporary Painters, Charleroi, Belgium (1998).",
  "His honours include the State Lalit Kala Academy Award (1998), the International Airport Authority of India Gold Medal, Thanjavur (1998), and the Yali Foundation Honor for Excellence, Chennai (2000).",
];

/** One-line introduction for the top of the homepage, from the same facts. */
export const ARTIST_INTRO =
  "A painter who lives and works in Chennai, trained at the College of Arts and Crafts, Chennai, and has exhibited in India and abroad — from Chennai and Mumbai to Paris and Belgium.";

/**
 * Milestones for the "A life in painting" timeline, in date order. Each one
 * is stated in the article (years and places exactly as published; the
 * article spells the Chennai venue "Alliance Franchise", corrected here to
 * Alliance Française).
 */
export const ARTIST_TIMELINE: { year: string; title: string; detail: string }[] = [
  { year: "1981", title: "Nuances Group Show", detail: "Alliance Française, Chennai" },
  { year: "1984", title: "Post-diploma in painting", detail: "College of Arts and Crafts, Chennai" },
  {
    year: "1998",
    title: "State Lalit Kala Academy Award",
    detail: "and Indian Pallet by Contemporary Painters, Charleroi, Belgium",
  },
  { year: "2000", title: "Yali Foundation Honor for Excellence", detail: "Chennai" },
  { year: "2008", title: "Group show", detail: "Jehangir Art Gallery, Mumbai" },
  { year: "2010", title: "Group show with Nehprii Amenii (USA)", detail: "Studio Palazzo, Chennai" },
  { year: "2012", title: "Group show of 20 Indian artists", detail: "Galerie Selective Art, Paris" },
];
