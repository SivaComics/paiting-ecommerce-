import { Artist } from "./types";
import { portraitImage, scenePhoto } from "@/lib/placeholder-art";

const raw: Omit<Artist, "portraitImage" | "studioPhotos">[] = [
  {
    id: "artist-01",
    slug: "mireille-aubert",
    name: "Mireille Aubert",
    region: "Lyon, France",
    tagline: "Color-field abstraction rooted in Alpine light",
    bio: [
      "Mireille Aubert trained as a restorer of Baroque altarpieces before turning to her own practice — an apprenticeship in pigment and patience that still shapes every canvas she makes.",
      "Working from a converted silk mill outside Lyon, she builds paintings in dozens of translucent layers, each one drying for days before the next is laid. The result is a depth of color that shifts with the viewer's position in the room.",
      "Her recent series responds to the quality of light she grew up with in the Savoie Alps — thin, silver-blue in winter, thick and golden by August.",
    ],
    timeline: [
      { year: "2011", title: "École des Beaux-Arts, Lyon", description: "Completed conservation studies with a focus on 17th-century oil technique." },
      { year: "2015", title: "First solo exhibition", description: "\"Altitude\" opened at Galerie Verrière, Lyon, and sold out within a week." },
      { year: "2019", title: "Venice residency", description: "Six-month residency exploring the Adriatic's effect on her palette." },
      { year: "2023", title: "Museum acquisition", description: "A major work entered the permanent collection of the Musée d'Art Contemporain de Lyon." },
    ],
    pressMentions: [
      { outlet: "Le Monde", quote: "Aubert paints light the way others paint objects — as something with weight.", year: "2023" },
      { outlet: "Artforum", quote: "A quietly radical return to the discipline of layering.", year: "2022" },
    ],
    verified: true,
    galleryRepresented: true,
  },
  {
    id: "artist-02",
    slug: "kenji-okafor",
    name: "Kenji Okafor",
    region: "Lagos, Nigeria / London, UK",
    tagline: "Sculptural forms cast from salvaged industrial metal",
    bio: [
      "Kenji Okafor spent his early twenties working in scrapyards along the Lagos waterfront, an experience that permanently reoriented his relationship to material.",
      "His sculptures are built from decommissioned machine parts — ship propellers, oil-drum lids, rail fittings — reforged and polished until their industrial origins become almost unrecognizable, replaced by something closer to bone or coral.",
      "He splits his time between a Lagos foundry and a studio in Bermondsey, London, and considers both cities equally home to the work.",
    ],
    timeline: [
      { year: "2013", title: "Yaba College of Technology", description: "Studied industrial design before shifting fully into sculpture." },
      { year: "2017", title: "Lagos Biennial", description: "Debut public installation, later acquired by a private collection in Lagos." },
      { year: "2021", title: "London representation", description: "Began representation with a Bermondsey gallery, expanding reach into European collections." },
      { year: "2024", title: "Public commission", description: "Completed a nine-foot commission for a private garden in Surrey." },
    ],
    pressMentions: [
      { outlet: "Frieze", quote: "Okafor's metal has a pulse.", year: "2024" },
      { outlet: "The Guardian", quote: "Industrial waste made devotional.", year: "2021" },
    ],
    verified: true,
    galleryRepresented: true,
  },
  {
    id: "artist-03",
    slug: "sasha-korolenko",
    name: "Sasha Korolenko",
    region: "Brooklyn, USA",
    tagline: "Nocturnal street photography and long-exposure portraiture",
    bio: [
      "Sasha Korolenko photographs New York after midnight, when the city empties out and its architecture starts to feel like a held breath.",
      "Working exclusively on medium-format film, she favors long exposures that blur passing traffic into ribbons of light while her human subjects — insomniacs, night-shift workers, the occasional stray cat — stay perfectly still.",
      "Her prints are hand-processed in a home darkroom in Bushwick, a practice she has maintained since her first show in 2016.",
    ],
    timeline: [
      { year: "2014", title: "School of Visual Arts", description: "BFA in Photography, thesis project on subway platforms at 3am." },
      { year: "2016", title: "\"After Hours\"", description: "First solo show at a Bushwick project space; entire edition sold within a month." },
      { year: "2020", title: "Documentary feature", description: "Subject of a short documentary on analog night photography." },
      { year: "2023", title: "International licensing", description: "Work licensed for a European transit authority's public art program." },
    ],
    pressMentions: [
      { outlet: "The New Yorker", quote: "Korolenko finds a stillness in the city that most of us sleep through.", year: "2023" },
      { outlet: "Aperture", quote: "The last great analog night-walker.", year: "2020" },
    ],
    verified: true,
    galleryRepresented: false,
  },
  {
    id: "artist-04",
    slug: "noor-al-sayed",
    name: "Noor Al-Sayed",
    region: "Amman, Jordan",
    tagline: "Geometric abstraction drawing on Islamic tessellation",
    bio: [
      "Noor Al-Sayed studied traditional geometric ornamentation for six years under a master craftsman in Fez before adapting those principles to large-scale canvas.",
      "Her paintings begin as hand-drawn compass constructions — the same method used in centuries-old tilework — before being built up in acrylic and gold leaf.",
      "She describes her practice as 'translation rather than invention': a way of carrying an old visual language into a new material context.",
    ],
    timeline: [
      { year: "2012", title: "Fez apprenticeship", description: "Began six-year study of zellige geometry under master craftsman Hassan Benali." },
      { year: "2018", title: "Return to Amman", description: "Opened her first independent studio and began exhibiting internationally." },
      { year: "2021", title: "Sharjah Biennial", description: "Featured work exploring compass geometry at monumental scale." },
      { year: "2024", title: "Gold leaf series", description: "Introduced hand-applied gold leaf, now a signature element of her practice." },
    ],
    pressMentions: [
      { outlet: "Artnet News", quote: "A rare artist equally fluent in devotion and abstraction.", year: "2024" },
    ],
    verified: true,
    galleryRepresented: true,
  },
  {
    id: "artist-05",
    slug: "theo-lindqvist",
    name: "Theo Lindqvist",
    region: "Gothenburg, Sweden",
    tagline: "Minimalist wood and bronze sculpture",
    bio: [
      "Theo Lindqvist works at the intersection of Scandinavian furniture craft and sculptural form, carving from reclaimed oak and elm before casting select pieces in bronze.",
      "His forms are pared back almost to abstraction — a single curve, a negative space — but every piece begins as a study of a specific tree's grain and history.",
      "He maintains a strict one-piece-a-month practice, a discipline he credits with keeping the work honest.",
    ],
    timeline: [
      { year: "2010", title: "HDK-Valand Academy", description: "MFA in sculpture, thesis on negative space in Nordic design." },
      { year: "2016", title: "Bronze casting apprenticeship", description: "Trained at a foundry outside Gothenburg to bring select forms into bronze." },
      { year: "2022", title: "Design Week feature", description: "Solo presentation at Stockholm Design Week drew significant collector interest." },
    ],
    pressMentions: [
      { outlet: "Dezeen", quote: "Lindqvist finds the sentence hidden in a plank of oak.", year: "2022" },
    ],
    verified: false,
    galleryRepresented: false,
  },
  {
    id: "artist-06",
    slug: "amara-osei",
    name: "Amara Osei",
    region: "Accra, Ghana",
    tagline: "Textile-influenced portraiture in oil and thread",
    bio: [
      "Amara Osei layers oil paint with hand-stitched kente-inspired thread work directly on the canvas, collapsing the boundary between painting and textile.",
      "Her portraits — often of women in her extended family — are built from memory and old photographs, with the stitched sections marking moments the paint alone couldn't hold.",
      "She apprenticed briefly with a kente weaver in Bonwire before committing fully to painting, a lineage she keeps visible rather than hidden.",
    ],
    timeline: [
      { year: "2015", title: "Kwame Nkrumah University", description: "BFA in Painting and Sculpture." },
      { year: "2017", title: "Bonwire weaving study", description: "Apprenticed with a master kente weaver, informing her mixed-media technique." },
      { year: "2022", title: "Breakout show", description: "\"Threadbare Portraits\" traveled to three cities and established her market presence." },
    ],
    pressMentions: [
      { outlet: "Hyperallergic", quote: "Osei stitches memory into the canvas, literally.", year: "2022" },
      { outlet: "OkayAfrica", quote: "One of the most distinctive painterly voices working today.", year: "2023" },
    ],
    verified: true,
    galleryRepresented: true,
  },
  {
    id: "artist-07",
    slug: "diego-farrant",
    name: "Diego Farrant",
    region: "Oaxaca, Mexico",
    tagline: "Ceramic and mixed-media sculptural forms",
    bio: [
      "Diego Farrant builds monumental ceramic forms using coil techniques passed down through five generations of Oaxacan potters, then finishes them with unconventional glazes drawn from industrial pigment.",
      "His work sits deliberately between craft tradition and contemporary sculpture — vessels that no longer hold anything, forms that reference the body without depicting it.",
      "He fires everything in a wood-burning kiln built by his grandfather, a process he considers inseparable from the final work.",
    ],
    timeline: [
      { year: "2009", title: "Family workshop", description: "Began formal training in coil ceramics under his grandfather." },
      { year: "2019", title: "First international show", description: "Group exhibition in Mexico City introduced his work to international collectors." },
      { year: "2023", title: "Solo museum presentation", description: "Featured in a group survey of contemporary Oaxacan ceramicists." },
    ],
    pressMentions: [
      { outlet: "Cultured Magazine", quote: "Farrant's vessels refuse to be merely decorative.", year: "2023" },
    ],
    verified: true,
    galleryRepresented: false,
  },
  {
    id: "artist-08",
    slug: "yuki-hamasaki",
    name: "Yuki Hamasaki",
    region: "Kyoto, Japan",
    tagline: "Ink and gold-leaf works on paper, contemporary sumi-e",
    bio: [
      "Yuki Hamasaki trained for a decade in traditional sumi-e ink painting before beginning to introduce gold leaf, resin, and torn paper collage into her practice.",
      "Her large-format works on paper retain the discipline of classical brushwork — a single confident stroke, unforgiving of hesitation — while pushing the format toward abstraction.",
      "She works in a converted machiya townhouse in Kyoto that has belonged to her family for three generations.",
    ],
    timeline: [
      { year: "2008", title: "Traditional apprenticeship", description: "Ten-year study of classical sumi-e under a family-affiliated master." },
      { year: "2019", title: "First contemporary series", description: "Introduced gold leaf and collage, marking a departure from strict tradition." },
      { year: "2024", title: "International gallery representation", description: "Signed with a gallery expanding her presence into Western markets." },
    ],
    pressMentions: [
      { outlet: "Artsy", quote: "Hamasaki treats restraint as a form of maximalism.", year: "2024" },
    ],
    verified: true,
    galleryRepresented: true,
  },
  {
    id: "artist-09",
    slug: "elin-vartanian",
    name: "Elin Vartanian",
    region: "Yerevan, Armenia / Berlin, Germany",
    tagline: "Large-format documentary and architectural photography",
    bio: [
      "Elin Vartanian photographs Soviet-era architecture across the Caucasus and Central Asia, working with a large-format field camera that demands hours of setup for a single frame.",
      "Her images are quiet, symmetrical, and unpeopled — an approach she describes as 'letting the buildings testify without a narrator.'",
      "She splits her year between Yerevan, where she grew up, and Berlin, where her prints are produced and archived.",
    ],
    timeline: [
      { year: "2013", title: "Universität der Künste Berlin", description: "MFA in Photography, thesis on post-Soviet civic architecture." },
      { year: "2018", title: "\"Concrete Testimony\"", description: "First major series, exhibited across four European cities." },
      { year: "2022", title: "Archive acquisition", description: "A European photography foundation acquired a significant body of her negatives." },
    ],
    pressMentions: [
      { outlet: "British Journal of Photography", quote: "Vartanian's buildings hold their silence like witnesses.", year: "2022" },
    ],
    verified: true,
    galleryRepresented: true,
  },
  {
    id: "artist-10",
    slug: "priya-chandrasekaran",
    name: "Priya Chandrasekaran",
    region: "Chennai, India / Toronto, Canada",
    tagline: "Emerging voice in abstract expressionist painting",
    bio: [
      "Priya Chandrasekaran is a self-taught painter whose large canvases translate Carnatic music's rhythmic structures into gestural, layered abstraction.",
      "She paints with music playing loudly in her studio, working in bursts timed to a raga's tempo changes — a practice she developed after years as a classical vocalist before turning to visual art.",
      "Her first solo show, in 2024, sold out within 48 hours and established her as one of the most closely watched emerging painters working today.",
    ],
    timeline: [
      { year: "2016", title: "Classical training", description: "Trained as a Carnatic vocalist for a decade before shifting focus to painting." },
      { year: "2022", title: "Self-taught transition", description: "Began painting seriously while completing an unrelated degree in Toronto." },
      { year: "2024", title: "Debut solo exhibition", description: "\"Raga in Color\" sold out its full run within 48 hours of opening." },
    ],
    pressMentions: [
      { outlet: "Canadian Art", quote: "Chandrasekaran paints the way a raga unfolds — patiently, then all at once.", year: "2024" },
    ],
    verified: true,
    galleryRepresented: false,
  },
];

const palettes: Record<string, string[]> = {
  "artist-01": ["#7C8FA6", "#B87333", "#EAE3D6"],
  "artist-02": ["#5A5450", "#B0A99B", "#2A2420"],
  "artist-03": ["#26324A", "#8A8F99", "#0E1116"],
  "artist-04": ["#C9975C", "#7A2E2E", "#2A2420"],
  "artist-05": ["#8A6D4F", "#D8CBB6", "#3A2F22"],
  "artist-06": ["#B85C3E", "#3E4A3A", "#E8C9A0"],
  "artist-07": ["#A85C32", "#4E5D52", "#D9C7A8"],
  "artist-08": ["#2A2420", "#C9975C", "#EDE6DA"],
  "artist-09": ["#5C5F63", "#8C8478", "#D6D1C6"],
  "artist-10": ["#7A3B5E", "#B87333", "#3E2A4A"],
};

export const artists: Artist[] = raw.map((a) => ({
  ...a,
  portraitImage: portraitImage(a.id, palettes[a.id]),
  studioPhotos: [0, 1, 2, 3].map((i) => scenePhoto(`${a.id}-studio-${i}`, palettes[a.id])),
}));

export function getArtistById(id: string): Artist | undefined {
  return artists.find((a) => a.id === id);
}

export function getArtistBySlug(slug: string): Artist | undefined {
  return artists.find((a) => a.slug === slug);
}
