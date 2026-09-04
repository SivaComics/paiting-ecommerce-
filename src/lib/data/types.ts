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
  title: string;
  artistId: string;
  year: number;
  medium: Medium;
  materials: string;
  dimensions: Dimensions;
  edition?: string;
  price: number;
  currency: "USD";
  images: string[];
  collectionIds: string[];
  colorPalette: string[];
  region: string;
  availability: Availability;
  description: string;
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
