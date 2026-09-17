/**
 * The HS commentary ("Artworks – Mr. Balu") discusses six paintings by name.
 * These are the site's descriptions of them, drawn from that commentary and
 * from "Two Approaches of Art – HS".
 *
 * They are NOT shown on the site right now. The photographs on the site are
 * of eight works from a magazine article, and none of them can be matched to
 * these six with certainty. Once the client says which photograph is which
 * painting, set that painting's `description` in artworks.ts to the matching
 * text below (and its `reference`, e.g. "The Nine Colours painting").
 *
 * Source notes (see COPY-SOURCES.md for line-by-line detail):
 * - green, blue and red: the commentary describes these three together;
 *   the blue and red texts also use essay lines about the artist's approach.
 * - Never describe a work as an illustration of Aagamic symbols, as
 *   Navagraha, as Chakras, or as a ritual Yantra.
 */
export const COMMENTARY_REFLECTIONS = {
  "The Nine Colours painting":
    "One white circle above. Nine coloured fields below. They are not Navagraha, and they are not Chakras; they are qualitative differentiation. Almost like unity expressing itself through qualitative diversity, then again returning. That movement resembles many Aagamic diagrams: Bindu, expansion, differentiation, return.",
  "The Yin-Yang painting":
    "The Yin-Yang does not dominate this painting. It occupies only the centre. Duality is not the whole universe; it is only the centre of interaction, and around it everything remains balanced.",
  "The Pancha-bhutha painting":
    "A green composition with five horizontal bands. They are not shown as objects. They are shown as levels, almost as gradients of organization. The Aagamas rarely describe the Pancha-bhuthas merely as physical substances; they are functional states of manifestation.",
  "The green painting":
    "Nothing occupies most of the surface, yet the surface is alive. The background is not background. It behaves like Aakash: not emptiness, but the relational field that the symbols merely activate.",
  "The blue painting":
    "Nothing occupies most of the surface. The structure is grasped almost at once, while its depth unfolds only through prolonged contemplation. The stillness itself becomes dynamic.",
  "The red painting":
    "Most of the surface is left open. Large areas of space are not empty; they actively participate in the composition. The intervals between forms possess equal importance to the forms themselves.",
} as const;
