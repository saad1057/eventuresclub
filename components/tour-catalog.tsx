"use client";

import { TourCard } from "@/components/cards";
import { FilterTabs, useSwap } from "@/components/filter-tabs";
import type { Tour } from "@/lib/tours";

const filters = ["All", "Galiyat", "Khyber Pakhtunkhwa", "Gilgit-Baltistan", "Azad Kashmir"] as const;
type Filter = (typeof filters)[number];

export function TourCatalog({ tours }: { tours: Tour[] }) {
  const { picked, shown, leaving, pick } = useSwap<Filter>("All");
  const visible = shown === "All" ? tours : tours.filter((tour) => tour.region === shown);
  const counts = Object.fromEntries(
    filters.map((item) => [item, item === "All" ? tours.length : tours.filter((tour) => tour.region === item).length]),
  ) as Record<Filter, number>;

  return (
    <div>
      <FilterTabs label="Filter routes by region" options={filters} value={picked} onChange={pick} counts={counts} />
      <div className={`swap mt-10 ${leaving ? "is-leaving" : ""}`}>
        <div key={shown} className="stagger-in grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((tour, index) => (
            <div key={tour.slug} style={{ "--i": index } as React.CSSProperties}>
              <TourCard tour={tour} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
