import { Suspense } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CollectionsStrip } from "@/components/discover/CollectionsStrip";
import { DiscoverExplorer } from "@/components/discover/DiscoverExplorer";

export const metadata = {
  title: "Discover — Auréline",
  description: "Browse curated collections of original paintings, sculpture, and photography.",
};

export default function DiscoverPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <SectionHeading
        eyebrow="Browse the Collection"
        title="Discover"
        description="Explore by curated collection, or narrow your search by medium, size, price, and palette."
        className="mb-12"
      />
      <div className="mb-16">
        <CollectionsStrip />
      </div>
      <Suspense fallback={null}>
        <DiscoverExplorer />
      </Suspense>
    </div>
  );
}
