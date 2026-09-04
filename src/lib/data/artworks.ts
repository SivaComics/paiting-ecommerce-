import { Artwork, FramingOption, Medium } from "./types";
import { artworkImage } from "@/lib/placeholder-art";

const paintingFrames: FramingOption[] = [
  { id: "unframed", label: "Unframed", description: "Delivered ready to frame, carefully rolled or crated.", priceDelta: 0 },
  { id: "float-oak", label: "Floating Oak Frame", description: "Natural oak float frame, hand-finished by our framing partner.", priceDelta: 480 },
  { id: "espresso-wood", label: "Espresso Wood Frame", description: "Deep espresso-stained hardwood, museum-grade UV glazing.", priceDelta: 620 },
];

const paperFrames: FramingOption[] = [
  { id: "unframed", label: "Unframed", description: "Archival-wrapped, ready for your framer.", priceDelta: 0 },
  { id: "linen-mat", label: "Linen Mat, Oak Frame", description: "Acid-free linen mat with a slim oak frame and UV-filtering glass.", priceDelta: 340 },
];

const photoFrames: FramingOption[] = [
  { id: "unframed", label: "Unmounted Print", description: "Archival print only, shipped in a rigid tube or flat crate.", priceDelta: 0 },
  { id: "float-mount", label: "Float-Mounted, Black Frame", description: "Dibond-mounted with a slim matte black aluminum frame.", priceDelta: 410 },
];

const noFrames: FramingOption[] = [
  { id: "as-is", label: "As Shown", description: "Delivered fully finished; no additional framing required.", priceDelta: 0 },
  { id: "plinth", label: "Add Display Plinth", description: "Solid oak plinth, sized to the work, shipped fully assembled.", priceDelta: 890 },
];

interface Seed {
  id: string;
  slug: string;
  title: string;
  artistId: string;
  year: number;
  medium: Medium;
  materials: string;
  dimensions: Artwork["dimensions"];
  edition?: string;
  price: number;
  collectionIds: string[];
  palette: string[];
  region: string;
  availability: Artwork["availability"];
  description: string;
  provenance: Artwork["provenance"];
  exhibitionHistory: Artwork["exhibitionHistory"];
  featured?: boolean;
}

const seeds: Seed[] = [
  {
    id: "aw-01", slug: "altitude-no-4", title: "Altitude No. 4", artistId: "artist-01", year: 2023,
    medium: "Painting", materials: "Oil on linen", dimensions: { height: 60, width: 48, unit: "in" },
    price: 18400, collectionIds: ["col-abstract-contemporary", "col-editors-picks"],
    palette: ["#7C8FA6", "#B87333", "#EAE3D6"], region: "Europe", availability: "available", featured: true,
    description: "A tall color-field work built from over forty translucent layers, evoking the thin silver light of the Savoie Alps at dawn. Aubert's signature glaze technique gives the surface a shifting depth that changes with the viewer's position in the room.",
    provenance: [{ year: "2023", event: "Acquired directly from the artist's studio, Lyon" }],
    exhibitionHistory: [{ year: "2023", event: "\"Altitude,\" Galerie Verrière, Lyon" }],
  },
  {
    id: "aw-02", slug: "silk-mill-study-ii", title: "Silk Mill Study II", artistId: "artist-01", year: 2022,
    medium: "Painting", materials: "Oil on canvas", dimensions: { height: 40, width: 30, unit: "in" },
    price: 9600, collectionIds: ["col-abstract-contemporary"],
    palette: ["#B87333", "#EAE3D6", "#4A4038"], region: "Europe", availability: "available",
    description: "A smaller, more intimate study made in the artist's converted silk mill studio, exploring warm copper tones against a cool ground.",
    provenance: [{ year: "2022", event: "Acquired directly from the artist" }],
    exhibitionHistory: [],
  },
  {
    id: "aw-03", slug: "adriatic-fog", title: "Adriatic Fog", artistId: "artist-01", year: 2020,
    medium: "Painting", materials: "Oil on linen", dimensions: { height: 52, width: 40, unit: "in" },
    price: 14200, collectionIds: ["col-abstract-contemporary"],
    palette: ["#8A96A6", "#D8D2C4", "#2A2420"], region: "Europe", availability: "sold",
    description: "Made during Aubert's Venice residency, this work translates the diffuse light of the Adriatic winter into a muted, atmospheric field.",
    provenance: [{ year: "2020", event: "Studio acquisition" }, { year: "2021", event: "Private collection, Milan" }],
    exhibitionHistory: [{ year: "2020", event: "Venice residency open studios" }],
  },
  {
    id: "aw-04", slug: "propeller-reliquary", title: "Propeller Reliquary", artistId: "artist-02", year: 2023,
    medium: "Sculpture", materials: "Reforged ship propeller bronze, patinated steel base", dimensions: { height: 42, width: 30, depth: 18, unit: "in" },
    price: 32000, collectionIds: ["col-sculptural-forms", "col-editors-picks"],
    palette: ["#5A5450", "#B0A99B", "#2A2420"], region: "Africa", availability: "available", featured: true,
    description: "Cast from a decommissioned ship propeller salvaged along the Lagos waterfront, reforged into a form that recalls coral growth. The industrial origin is present but transformed, polished until the work reads as something closer to bone.",
    provenance: [{ year: "2023", event: "Foundry release, Lagos" }],
    exhibitionHistory: [{ year: "2023", event: "Group show, Bermondsey gallery, London" }],
  },
  {
    id: "aw-05", slug: "drum-lid-fragment", title: "Drum Lid Fragment", artistId: "artist-02", year: 2022,
    medium: "Sculpture", materials: "Reclaimed oil-drum steel, hand-polished", dimensions: { height: 22, width: 22, depth: 6, unit: "in" },
    price: 8600, collectionIds: ["col-sculptural-forms"],
    palette: ["#8A8478", "#2A2420", "#C9975C"], region: "Africa", availability: "available",
    description: "A wall-mounted study using a single salvaged oil-drum lid, polished until its surface takes on a warm coppery sheen.",
    provenance: [{ year: "2022", event: "Studio acquisition, Lagos" }],
    exhibitionHistory: [],
  },
  {
    id: "aw-06", slug: "rail-fitting-totem", title: "Rail Fitting Totem", artistId: "artist-02", year: 2024,
    medium: "Sculpture", materials: "Salvaged rail fittings, welded and polished steel", dimensions: { height: 68, width: 14, depth: 14, unit: "in" },
    price: 41500, collectionIds: ["col-sculptural-forms"],
    palette: ["#3A3A38", "#B0A99B", "#B87333"], region: "Africa", availability: "on-hold",
    description: "A floor-standing totemic form built from decommissioned rail fittings, welded into a vertical composition that references both industrial machinery and figurative sculpture.",
    provenance: [{ year: "2024", event: "Foundry release, Lagos" }],
    exhibitionHistory: [{ year: "2024", event: "Private viewing, London studio" }],
  },
  {
    id: "aw-07", slug: "insomnia-broadway", title: "Insomnia, Broadway", artistId: "artist-03", year: 2023,
    medium: "Photography", materials: "Archival pigment print, medium-format film", dimensions: { height: 30, width: 40, unit: "in" },
    edition: "Edition 3 of 15", price: 4200, collectionIds: ["col-photography-after-dark", "col-editors-picks"],
    palette: ["#26324A", "#8A8F99", "#0E1116"], region: "North America", availability: "available", featured: true,
    description: "A long-exposure study of an empty Broadway intersection at 3am, traffic dissolved into ribbons of light against still, sleeping architecture.",
    provenance: [{ year: "2023", event: "Printed and released by the artist, Brooklyn" }],
    exhibitionHistory: [{ year: "2023", event: "\"After Hours II,\" Bushwick project space" }],
  },
  {
    id: "aw-08", slug: "night-shift-portrait", title: "Night Shift Portrait", artistId: "artist-03", year: 2021,
    medium: "Photography", materials: "Silver gelatin print, hand-processed", dimensions: { height: 24, width: 20, unit: "in" },
    edition: "Edition 7 of 20", price: 2600, collectionIds: ["col-photography-after-dark"],
    palette: ["#1B1F27", "#7A7E88", "#D6D2C6"], region: "North America", availability: "available",
    description: "A still portrait of a bodega clerk at 4am, lit only by refrigerator glow, hand-processed in the artist's Bushwick darkroom.",
    provenance: [{ year: "2021", event: "Studio release" }],
    exhibitionHistory: [],
  },
  {
    id: "aw-09", slug: "platform-line-6", title: "Platform, Line 6", artistId: "artist-03", year: 2019,
    medium: "Photography", materials: "Archival pigment print", dimensions: { height: 20, width: 24, unit: "in" },
    edition: "Edition 12 of 20", price: 1900, collectionIds: ["col-photography-after-dark"],
    palette: ["#20242E", "#8C8F97", "#0E1116"], region: "North America", availability: "sold",
    description: "From the artist's thesis series on subway platforms after midnight, a study in symmetry and stillness.",
    provenance: [{ year: "2019", event: "Thesis exhibition release" }],
    exhibitionHistory: [{ year: "2019", event: "SVA thesis show, New York" }],
  },
  {
    id: "aw-10", slug: "compass-construction-vii", title: "Compass Construction VII", artistId: "artist-04", year: 2024,
    medium: "Painting", materials: "Acrylic and gold leaf on panel", dimensions: { height: 48, width: 48, unit: "in" },
    price: 26500, collectionIds: ["col-abstract-contemporary", "col-editors-picks"],
    palette: ["#C9975C", "#7A2E2E", "#2A2420"], region: "Middle East", availability: "available", featured: true,
    description: "A monumental compass-drawn geometric composition finished with hand-applied gold leaf, translating centuries-old zellige tilework principles into contemporary abstraction.",
    provenance: [{ year: "2024", event: "Studio release, Amman" }],
    exhibitionHistory: [{ year: "2024", event: "Sharjah Biennial, satellite presentation" }],
  },
  {
    id: "aw-11", slug: "zellige-study-in-red", title: "Zellige Study in Red", artistId: "artist-04", year: 2022,
    medium: "Painting", materials: "Acrylic on panel", dimensions: { height: 30, width: 30, unit: "in" },
    price: 8200, collectionIds: ["col-abstract-contemporary"],
    palette: ["#7A2E2E", "#C9975C", "#EDE6DA"], region: "Middle East", availability: "available",
    description: "A smaller compass-construction study exploring a restrained red-and-copper palette drawn from Fez tilework traditions.",
    provenance: [{ year: "2022", event: "Studio release, Amman" }],
    exhibitionHistory: [],
  },
  {
    id: "aw-12", slug: "grain-study-elm", title: "Grain Study, Elm", artistId: "artist-05", year: 2023,
    medium: "Sculpture", materials: "Reclaimed elm, hand-carved", dimensions: { height: 26, width: 10, depth: 8, unit: "in" },
    price: 6400, collectionIds: ["col-sculptural-forms"],
    palette: ["#8A6D4F", "#D8CBB6", "#3A2F22"], region: "Europe", availability: "available",
    description: "A single continuous curve carved from a reclaimed elm plank, following the tree's own grain rather than imposing an outside form on it.",
    provenance: [{ year: "2023", event: "Studio release, Gothenburg" }],
    exhibitionHistory: [],
  },
  {
    id: "aw-13", slug: "negative-space-no-2", title: "Negative Space No. 2", artistId: "artist-05", year: 2024,
    medium: "Sculpture", materials: "Cast bronze", dimensions: { height: 18, width: 14, depth: 6, unit: "in" },
    price: 11800, collectionIds: ["col-sculptural-forms"],
    palette: ["#6B5B47", "#B0A99B", "#2A2420"], region: "Europe", availability: "available",
    description: "A bronze cast of a form originally carved in oak, where the void at the center carries as much weight as the material around it.",
    provenance: [{ year: "2024", event: "Foundry release, Gothenburg" }],
    exhibitionHistory: [{ year: "2022", event: "Stockholm Design Week" }],
  },
  {
    id: "aw-14", slug: "threadbare-portrait-no-1", title: "Threadbare Portrait No. 1", artistId: "artist-06", year: 2022,
    medium: "Painting", materials: "Oil and hand-stitched thread on canvas", dimensions: { height: 44, width: 34, unit: "in" },
    price: 15600, collectionIds: ["col-abstract-contemporary", "col-editors-picks"],
    palette: ["#B85C3E", "#3E4A3A", "#E8C9A0"], region: "Africa", availability: "available", featured: true,
    description: "A portrait built from memory and old family photographs, with kente-inspired stitched thread marking passages the paint alone couldn't hold.",
    provenance: [{ year: "2022", event: "Studio release, Accra" }],
    exhibitionHistory: [{ year: "2022", event: "\"Threadbare Portraits,\" traveling exhibition" }],
  },
  {
    id: "aw-15", slug: "kente-memory-fragment", title: "Kente Memory Fragment", artistId: "artist-06", year: 2023,
    medium: "Works on Paper", materials: "Ink, oil, and thread on archival paper", dimensions: { height: 26, width: 20, unit: "in" },
    price: 4800, collectionIds: ["col-emerging-voices"],
    palette: ["#3E4A3A", "#B85C3E", "#E8C9A0"], region: "Africa", availability: "available",
    description: "A study on paper combining loose ink portraiture with hand-stitched thread details, a smaller companion to the artist's canvas work.",
    provenance: [{ year: "2023", event: "Studio release, Accra" }],
    exhibitionHistory: [],
  },
  {
    id: "aw-16", slug: "vessel-without-function-iv", title: "Vessel Without Function IV", artistId: "artist-07", year: 2023,
    medium: "Sculpture", materials: "Coil-built ceramic, industrial glaze", dimensions: { height: 34, width: 20, depth: 20, unit: "in" },
    price: 9200, collectionIds: ["col-sculptural-forms", "col-emerging-voices"],
    palette: ["#A85C32", "#4E5D52", "#D9C7A8"], region: "South America", availability: "available",
    description: "A monumental coil-built ceramic form, fired in a wood-burning kiln built by the artist's grandfather, finished with an unconventional industrial-pigment glaze.",
    provenance: [{ year: "2023", event: "Studio release, Oaxaca" }],
    exhibitionHistory: [{ year: "2023", event: "Group survey of contemporary Oaxacan ceramicists" }],
  },
  {
    id: "aw-17", slug: "body-reference-no-9", title: "Body Reference No. 9", artistId: "artist-07", year: 2022,
    medium: "Sculpture", materials: "Coil-built ceramic", dimensions: { height: 22, width: 14, depth: 14, unit: "in" },
    price: 5400, collectionIds: ["col-sculptural-forms"],
    palette: ["#8C6A4A", "#4E5D52", "#D9C7A8"], region: "South America", availability: "sold",
    description: "A smaller vessel form referencing the body without depicting it directly, part of the artist's ongoing exploration of function-less ceramic form.",
    provenance: [{ year: "2022", event: "Studio release, Oaxaca" }],
    exhibitionHistory: [],
  },
  {
    id: "aw-18", slug: "unbound-ink-no-12", title: "Unbound Ink No. 12", artistId: "artist-08", year: 2024,
    medium: "Works on Paper", materials: "Sumi ink, gold leaf, and torn paper collage", dimensions: { height: 54, width: 36, unit: "in" },
    price: 12400, collectionIds: ["col-abstract-contemporary", "col-editors-picks"],
    palette: ["#2A2420", "#C9975C", "#EDE6DA"], region: "Asia", availability: "available", featured: true,
    description: "A large-format ink composition built from a single confident brush gesture, layered with torn paper collage and hand-applied gold leaf.",
    provenance: [{ year: "2024", event: "Studio release, Kyoto" }],
    exhibitionHistory: [],
  },
  {
    id: "aw-19", slug: "machiya-study-iii", title: "Machiya Study III", artistId: "artist-08", year: 2021,
    medium: "Works on Paper", materials: "Sumi ink on paper", dimensions: { height: 30, width: 22, unit: "in" },
    price: 5200, collectionIds: ["col-emerging-voices"],
    palette: ["#2A2420", "#8A8478", "#EDE6DA"], region: "Asia", availability: "available",
    description: "A restrained, classically trained ink study made in the artist's family machiya townhouse, retaining strict traditional brush discipline.",
    provenance: [{ year: "2021", event: "Studio release, Kyoto" }],
    exhibitionHistory: [],
  },
  {
    id: "aw-20", slug: "concrete-testimony-04", title: "Concrete Testimony 04", artistId: "artist-09", year: 2020,
    medium: "Photography", materials: "Large-format archival print", dimensions: { height: 36, width: 44, unit: "in" },
    edition: "Edition 2 of 10", price: 6800, collectionIds: ["col-photography-after-dark"],
    palette: ["#5C5F63", "#8C8478", "#D6D1C6"], region: "Europe", availability: "available",
    description: "A quiet, symmetrical study of a Soviet-era civic building, photographed on a large-format field camera to let the architecture testify without a narrator.",
    provenance: [{ year: "2020", event: "Printed and released by the artist" }],
    exhibitionHistory: [{ year: "2020", event: "\"Concrete Testimony,\" four-city European tour" }],
  },
  {
    id: "aw-21", slug: "yerevan-facade-study", title: "Yerevan Façade Study", artistId: "artist-09", year: 2022,
    medium: "Photography", materials: "Large-format archival print", dimensions: { height: 30, width: 40, unit: "in" },
    edition: "Edition 5 of 10", price: 5400, collectionIds: ["col-photography-after-dark", "col-emerging-voices"],
    palette: ["#6B6E72", "#9C968A", "#D6D1C6"], region: "Europe", availability: "available",
    description: "An unpeopled study of a modernist façade in Yerevan, photographed at dawn to preserve the flat, even light the artist favors.",
    provenance: [{ year: "2022", event: "Printed and released by the artist" }],
    exhibitionHistory: [],
  },
  {
    id: "aw-22", slug: "raga-in-color-i", title: "Raga in Color I", artistId: "artist-10", year: 2024,
    medium: "Painting", materials: "Acrylic and oil on canvas", dimensions: { height: 50, width: 60, unit: "in" },
    price: 7800, collectionIds: ["col-emerging-voices", "col-editors-picks"],
    palette: ["#7A3B5E", "#B87333", "#3E2A4A"], region: "Asia", availability: "available", featured: true,
    description: "A large gestural canvas built in bursts timed to the rhythmic structure of a Carnatic raga, translating musical tempo changes into layered, physical brushwork.",
    provenance: [{ year: "2024", event: "Debut exhibition release, Toronto" }],
    exhibitionHistory: [{ year: "2024", event: "\"Raga in Color,\" debut solo exhibition, sold out in 48 hours" }],
  },
  {
    id: "aw-23", slug: "raga-in-color-v", title: "Raga in Color V", artistId: "artist-10", year: 2024,
    medium: "Painting", materials: "Acrylic on canvas", dimensions: { height: 36, width: 36, unit: "in" },
    price: 4200, collectionIds: ["col-emerging-voices"],
    palette: ["#5C2E4A", "#C9975C", "#2A2420"], region: "Asia", availability: "on-hold",
    description: "A smaller canvas from the artist's sold-out debut series, marking a quieter passage within a single raga's structure.",
    provenance: [{ year: "2024", event: "Debut exhibition release, Toronto" }],
    exhibitionHistory: [{ year: "2024", event: "\"Raga in Color,\" debut solo exhibition" }],
  },
  {
    id: "aw-24", slug: "silk-mill-study-i", title: "Silk Mill Study I", artistId: "artist-01", year: 2021,
    medium: "Painting", materials: "Oil on canvas", dimensions: { height: 24, width: 18, unit: "in" },
    price: 5200, collectionIds: ["col-emerging-voices"],
    palette: ["#7C8FA6", "#EAE3D6", "#4A4038"], region: "Europe", availability: "available",
    description: "An early, small-format study made in the artist's first year at the silk mill studio, showing the first layered-glaze experiments that would define her later work.",
    provenance: [{ year: "2021", event: "Studio release, Lyon" }],
    exhibitionHistory: [],
  },
];

function framingFor(medium: Medium): FramingOption[] {
  switch (medium) {
    case "Painting":
      return paintingFrames;
    case "Works on Paper":
      return paperFrames;
    case "Photography":
      return photoFrames;
    case "Sculpture":
      return noFrames;
  }
}

function styleFor(medium: Medium): "painterly" | "sculptural" | "photographic" {
  if (medium === "Sculpture") return "sculptural";
  if (medium === "Photography") return "photographic";
  return "painterly";
}

export const artworks: Artwork[] = seeds.map((s) => ({
  id: s.id,
  slug: s.slug,
  title: s.title,
  artistId: s.artistId,
  year: s.year,
  medium: s.medium,
  materials: s.materials,
  dimensions: s.dimensions,
  edition: s.edition,
  price: s.price,
  currency: "USD",
  images: [0, 1, 2].map((i) =>
    artworkImage(`${s.id}-${i}`, s.palette, { style: styleFor(s.medium) })
  ),
  collectionIds: s.collectionIds,
  colorPalette: s.palette,
  region: s.region,
  availability: s.availability,
  description: s.description,
  provenance: s.provenance,
  exhibitionHistory: s.exhibitionHistory,
  framingOptions: framingFor(s.medium),
  featured: s.featured,
}));

export function getArtworkById(id: string): Artwork | undefined {
  return artworks.find((a) => a.id === id);
}

export function getArtworkBySlug(slug: string): Artwork | undefined {
  return artworks.find((a) => a.slug === slug);
}

export function getArtworksByArtist(artistId: string): Artwork[] {
  return artworks.filter((a) => a.artistId === artistId);
}

export function getArtworksByCollection(collectionId: string): Artwork[] {
  return artworks.filter((a) => a.collectionIds.includes(collectionId));
}

export function getFeaturedArtworks(): Artwork[] {
  return artworks.filter((a) => a.featured);
}
