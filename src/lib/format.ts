import { Dimensions } from "@/lib/data/types";

export function formatPrice(value: number, currency: string = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDimensions(d: Dimensions): string {
  const parts = [d.height, d.width, d.depth].filter((v): v is number => typeof v === "number");
  return `${parts.join(" x ")} ${d.unit}`;
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric" }).format(
    new Date(iso)
  );
}
