"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { artworks } from "@/lib/data/artworks";
import { artists } from "@/lib/data/artists";
import { collections } from "@/lib/data/collections";
import { Medium } from "@/lib/data/types";
import { ArtworkCard } from "@/components/artwork/ArtworkCard";
import { getSizeCategory, isNewArrival, priceBands, sizeCategories, SizeCategory } from "@/lib/filters";
import { clsx } from "clsx";
import { RevealOnScroll } from "@/components/ui/motion";

const mediums: Medium[] = ["Painting", "Sculpture", "Photography", "Works on Paper"];
const regions = Array.from(new Set(artworks.map((a) => a.region))).sort();
const palette = Array.from(new Set(artworks.flatMap((a) => a.colorPalette))).slice(0, 12);
const validMediums = new Set<string>(mediums);

interface Filters {
  mediums: Set<Medium>;
  sizes: Set<SizeCategory>;
  regions: Set<string>;
  priceBandIndex: number | null;
  colors: Set<string>;
  onlyAvailable: boolean;
  newArrivalsOnly: boolean;
  collectionId: string | null;
  query: string;
}

function filtersFromParams(searchParams: URLSearchParams): Filters {
  const medium = searchParams.get("medium");
  return {
    mediums: medium && validMediums.has(medium) ? new Set([medium as Medium]) : new Set(),
    sizes: new Set(),
    regions: new Set(),
    priceBandIndex: null,
    colors: new Set(),
    onlyAvailable: false,
    newArrivalsOnly: searchParams.get("newArrivals") === "1",
    collectionId: searchParams.get("collection"),
    query: searchParams.get("q") ?? "",
  };
}

function emptyFilters(collectionId: string | null): Filters {
  return {
    mediums: new Set(),
    sizes: new Set(),
    regions: new Set(),
    priceBandIndex: null,
    colors: new Set(),
    onlyAvailable: false,
    newArrivalsOnly: false,
    collectionId,
    query: "",
  };
}

function toggleInSet<T>(set: Set<T>, value: T): Set<T> {
  const next = new Set(set);
  if (next.has(value)) next.delete(value);
  else next.add(value);
  return next;
}

export function DiscoverExplorer() {
  const searchParams = useSearchParams();
  // Remount the inner explorer whenever the URL's filter-relevant query
  // changes (e.g. clicking a different nav/category link while already on
  // this page), so its filter state re-initializes cleanly from the URL.
  return <DiscoverExplorerInner key={searchParams.toString()} searchParams={searchParams} />;
}

function DiscoverExplorerInner({ searchParams }: { searchParams: URLSearchParams }) {
  const [filters, setFilters] = useState<Filters>(() => filtersFromParams(searchParams));
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    const query = filters.query.trim().toLowerCase();
    return artworks.filter((a) => {
      if (filters.collectionId && !a.collectionIds.includes(filters.collectionId)) return false;
      if (filters.mediums.size && !filters.mediums.has(a.medium)) return false;
      if (filters.sizes.size && !filters.sizes.has(getSizeCategory(a))) return false;
      if (filters.regions.size && !filters.regions.has(a.region)) return false;
      if (filters.colors.size && !a.colorPalette.some((c) => filters.colors.has(c))) return false;
      if (filters.onlyAvailable && a.availability !== "available") return false;
      if (filters.newArrivalsOnly && !isNewArrival(a)) return false;
      if (filters.priceBandIndex !== null) {
        const band = priceBands[filters.priceBandIndex];
        if (a.price < band.min || a.price >= band.max) return false;
      }
      if (query) {
        const artist = artists.find((ar) => ar.id === a.artistId);
        const haystack = `${a.title} ${artist?.name ?? ""}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });
  }, [filters]);

  const activeCollection = filters.collectionId
    ? collections.find((c) => c.id === filters.collectionId)
    : null;

  const filterPanel = (
    <div className="space-y-8">
      {activeCollection && (
        <div className="bg-cream-deep p-4">
          <p className="text-xs uppercase tracking-wider text-copper mb-1">Viewing Collection</p>
          <p className="font-serif text-lg text-espresso mb-2">{activeCollection.title}</p>
          <button
            type="button"
            onClick={() => setFilters((f) => ({ ...f, collectionId: null }))}
            className="text-xs text-espresso-soft hover:text-copper underline transition-colors duration-300 ease-premium"
          >
            Clear collection
          </button>
        </div>
      )}

      {filters.query && (
        <div className="bg-cream-deep p-4">
          <p className="text-xs uppercase tracking-wider text-copper mb-1">Search</p>
          <p className="font-serif text-lg text-espresso mb-2">&ldquo;{filters.query}&rdquo;</p>
          <button
            type="button"
            onClick={() => setFilters((f) => ({ ...f, query: "" }))}
            className="text-xs text-espresso-soft hover:text-copper underline transition-colors duration-300 ease-premium"
          >
            Clear search
          </button>
        </div>
      )}

      <FilterCheckbox
        label="New Arrivals"
        checked={filters.newArrivalsOnly}
        onChange={() => setFilters((f) => ({ ...f, newArrivalsOnly: !f.newArrivalsOnly }))}
      />

      <FilterGroup title="Medium">
        {mediums.map((m) => (
          <FilterCheckbox
            key={m}
            label={m}
            checked={filters.mediums.has(m)}
            onChange={() => setFilters((f) => ({ ...f, mediums: toggleInSet(f.mediums, m) }))}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Size">
        {sizeCategories.map((s) => (
          <FilterCheckbox
            key={s}
            label={s}
            checked={filters.sizes.has(s)}
            onChange={() => setFilters((f) => ({ ...f, sizes: toggleInSet(f.sizes, s) }))}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Price">
        {priceBands.map((band, i) => (
          <FilterCheckbox
            key={band.label}
            label={band.label}
            checked={filters.priceBandIndex === i}
            onChange={() =>
              setFilters((f) => ({ ...f, priceBandIndex: f.priceBandIndex === i ? null : i }))
            }
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Region">
        {regions.map((r) => (
          <FilterCheckbox
            key={r}
            label={r}
            checked={filters.regions.has(r)}
            onChange={() => setFilters((f) => ({ ...f, regions: toggleInSet(f.regions, r) }))}
          />
        ))}
      </FilterGroup>

      <div>
        <p className="text-xs font-sans uppercase tracking-wider text-espresso mb-3">Palette</p>
        <div className="flex flex-wrap gap-2">
          {palette.map((c) => (
            <button
              key={c}
              type="button"
              aria-label={`Filter by color ${c}`}
              aria-pressed={filters.colors.has(c)}
              onClick={() => setFilters((f) => ({ ...f, colors: toggleInSet(f.colors, c) }))}
              className={clsx(
                "h-7 w-7 rounded-full border-2 transition-all duration-300 ease-premium hover:scale-110 hover:border-copper/60",
                filters.colors.has(c) ? "border-copper scale-110 shadow-sm" : "border-transparent"
              )}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>

      <FilterCheckbox
        label="Available only"
        checked={filters.onlyAvailable}
        onChange={() => setFilters((f) => ({ ...f, onlyAvailable: !f.onlyAvailable }))}
      />

      <button
        type="button"
        onClick={() => setFilters(emptyFilters(null))}
        className="text-xs uppercase tracking-wider text-espresso-soft hover:text-copper underline transition-colors duration-300 ease-premium"
      >
        Clear all filters
      </button>
    </div>
  );

  return (
    <div id="grid" className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10">
      <button
        type="button"
        onClick={() => setMobileFiltersOpen(true)}
        className="group lg:hidden inline-flex items-center gap-2 self-start border border-hairline px-4 py-2 text-sm uppercase tracking-wider text-espresso hover:border-copper hover:text-copper transition-colors duration-300 ease-premium"
      >
        <SlidersHorizontal
          size={16}
          strokeWidth={1.5}
          className="text-espresso-soft transition-colors duration-300 ease-premium group-hover:text-copper"
        />
        Filters
      </button>

      <aside className="hidden lg:block">{filterPanel}</aside>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-espresso/30"
            onClick={() => setMobileFiltersOpen(false)}
            aria-label="Close filters"
          />
          <div className="relative ml-auto h-full w-full max-w-xs bg-cream p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <p className="font-serif text-lg text-espresso">Filters</p>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                aria-label="Close filters"
                className="text-espresso-soft hover:text-copper transition-colors duration-300 ease-premium"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>
            {filterPanel}
          </div>
        </div>
      )}

      <div>
        <p className="mb-6 text-sm text-espresso-soft">{filtered.length} works</p>
        {filtered.length === 0 ? (
          <p className="text-espresso-soft py-16 text-center">
            No works match these filters yet. Try clearing a few.
          </p>
        ) : (
          <div className="columns-2 md:columns-3 gap-6 [&>*]:mb-8 [&>*]:break-inside-avoid">
            {filtered.map((artwork, i) => (
              <RevealOnScroll key={artwork.id} delay={(i % 6) * 0.04}>
                <ArtworkCard artwork={artwork} />
              </RevealOnScroll>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-sans uppercase tracking-wider text-espresso mb-3">{title}</p>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function FilterCheckbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label
      className={clsx(
        "flex items-center gap-2.5 rounded-sm px-2 py-1 -mx-2 text-sm cursor-pointer transition-colors duration-300 ease-premium",
        checked ? "bg-copper/10 text-copper" : "text-espresso-soft hover:text-espresso"
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 accent-copper"
      />
      {label}
    </label>
  );
}
