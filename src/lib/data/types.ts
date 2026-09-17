export type Medium = "Painting" | "Sculpture" | "Photography" | "Works on Paper";

export type Availability = "available" | "on-hold" | "sold";

export interface Dimensions {
  height: number;
  width: number;
  depth?: number;
  unit: "in" | "cm";
}

export interface FramingOption {
  id: string;
  label: string;
  description: string;
  priceDelta: number;
}

export interface ProvenanceEntry {
  year: string;
  event: string;
}

export interface Artwork {
  id: string;
  slug: string;
  /** Final title, or the [TBC: title] placeholder until the client confirms it. */
  title: string;
  /** Catalogue label shown until real titles arrive, e.g. "Painting No. 01". */
  reference: string;
  artistId: string;
  /** null until confirmed by the client. */
  year: number | null;
  medium: Medium;
  /** e.g. "Acrylic on canvas". null until confirmed by the client. */
  materials: string | null;
  /** null until confirmed by the client. */
  dimensions: Dimensions | null;
  edition?: string;
  /** null until confirmed by the client; shown as "Price on request". */
  price: number | null;
  currency: "USD";
  images: string[];
  /** Width / height of the displayed image, used for layout. */
  imageAspect: number;
  collectionIds: string[];
  colorPalette: string[];
  region: string;
  availability: Availability;
  /** Descriptive text drawn from the client documents; empty when none applies to this work. */
  description: string;
  /** Plain description of what is visible in the painting — no claimed meaning or intent. */
  observation?: string;
  /** One of the artist's own published statements, shown with an honest caption of what it is about. */
  artistQuote?: { key: import("./artist-words").ArtistQuoteKey; about: string };
  provenance: ProvenanceEntry[];
  exhibitionHistory: ProvenanceEntry[];
  framingOptions: FramingOption[];
  featured?: boolean;
}

export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
}

export interface PressMention {
  outlet: string;
  quote: string;
  year: string;
  url?: string;
}

export interface Artist {
  id: string;
  slug: string;
  name: string;
  region: string;
  tagline: string;
  bio: string[];
  portraitImage: string;
  studioPhotos: string[];
  videoEmbedUrl?: string;
  timeline: TimelineEntry[];
  pressMentions: PressMention[];
  verified: boolean;
  galleryRepresented: boolean;
}

export interface Collection {
  id: string;
  slug: string;
  title: string;
  curatorialBlurb: string;
  coverImage: string;
  artworkIds: string[];
}

export interface PressLogo {
  name: string;
}

export interface CertificateOfAuthenticity {
  id: string;
  issuedTo: string;
  issuedDate: string;
  authenticationPartner: string;
}

export interface Order {
  id: string;
  artworkId: string;
  purchaseDate: string;
  pricePaid: number;
  status: "processing" | "in-transit" | "delivered";
  certificate: CertificateOfAuthenticity;
}

export interface FollowedArtist {
  artistId: string;
  priceAlertsEnabled: boolean;
}
