import { FollowedArtist, Order } from "./types";

export const mockCollectorName = "Adrienne Kessler";

export const orders: Order[] = [
  {
    id: "ord-1001",
    artworkId: "aw-09",
    purchaseDate: "2025-11-02",
    pricePaid: 1900,
    status: "delivered",
    certificate: {
      id: "coa-1001",
      issuedTo: mockCollectorName,
      issuedDate: "2025-11-04",
      authenticationPartner: "Provenance Registry Network",
    },
  },
  {
    id: "ord-1002",
    artworkId: "aw-03",
    purchaseDate: "2026-02-18",
    pricePaid: 14200,
    status: "delivered",
    certificate: {
      id: "coa-1002",
      issuedTo: mockCollectorName,
      issuedDate: "2026-02-20",
      authenticationPartner: "International Art Authentication Bureau",
    },
  },
  {
    id: "ord-1003",
    artworkId: "aw-17",
    purchaseDate: "2026-06-30",
    pricePaid: 5400,
    status: "in-transit",
    certificate: {
      id: "coa-1003",
      issuedTo: mockCollectorName,
      issuedDate: "2026-07-01",
      authenticationPartner: "Guild of Independent Appraisers",
    },
  },
];

export const favoriteArtworkIds: string[] = ["aw-01", "aw-10", "aw-18", "aw-22", "aw-13"];

export const followedArtists: FollowedArtist[] = [
  { artistId: "artist-01", priceAlertsEnabled: true },
  { artistId: "artist-04", priceAlertsEnabled: true },
  { artistId: "artist-10", priceAlertsEnabled: false },
];
