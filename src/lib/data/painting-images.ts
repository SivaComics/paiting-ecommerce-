/**
 * Every painting image path on the site lives here — nothing else in the
 * codebase hard-codes one.
 *
 * Current photos: taken from the yathraemagazine.com article "Renowned
 * Artist K. Balasubramanian", cropped to the painting edges by
 * assets/source-photos/crop_images.py (originals are kept in that folder).
 * TBC: confirm the client is cleared to use these photos, and the credit line.
 *
 * To swap in a better photograph:
 *   1. Put the file in /public/paintings/.
 *   2. Change that painting's `src` below.
 *   3. Set `aspect` to the photo's width ÷ height, so the frame fits it exactly.
 *
 * A painting can have more than one image (details, installation views) —
 * add extra entries to its array; the first one is the main image.
 */

export interface PaintingImage {
  src: string;
  /** Width ÷ height. */
  aspect: number;
}

export const paintingImages: Record<string, PaintingImage[]> = {
  "painting-01": [{ src: "/paintings/balu-painting-01.jpg", aspect: 773 / 1156 }],
  "painting-02": [{ src: "/paintings/balu-painting-02.jpg", aspect: 534 / 741 }],
  "painting-03": [{ src: "/paintings/balu-painting-03.jpg", aspect: 738 / 1234 }],
  "painting-04": [{ src: "/paintings/balu-painting-04.jpg", aspect: 793 / 1117 }],
  "painting-05": [{ src: "/paintings/balu-painting-05.jpg", aspect: 826 / 1110 }],
  "painting-06": [{ src: "/paintings/balu-painting-06.jpg", aspect: 649 / 1142 }],
  "painting-07": [{ src: "/paintings/balu-painting-07.jpg", aspect: 640 / 969 }],
  "painting-08": [{ src: "/paintings/balu-painting-08.jpg", aspect: 633 / 969 }],
};

/** The artist in front of a wall of his framed works (4:5 crop of the magazine photo). */
export const artistPortraitImage: PaintingImage = { src: "/paintings/balu-portrait.jpg", aspect: 4 / 5 };

// Kept for the /artist route, which reads a plain path.
export const artistPortrait = artistPortraitImage.src;

export function getPaintingImages(slug: string): PaintingImage[] {
  const images = paintingImages[slug];
  if (!images?.length) throw new Error(`No image configured for painting "${slug}" in painting-images.ts`);
  return images;
}
