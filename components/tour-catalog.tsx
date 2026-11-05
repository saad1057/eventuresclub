"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { durationLabel, formatPkr } from "@/lib/format";
import type { Tour } from "@/lib/tours";

const filters = ["All", "Galiyat", "Khyber Pakhtunkhwa", "Gilgit-Baltistan", "Azad Kashmir"] as const;

export function TourCatalog({ tours }: { tours: Tour[] }) {
  const [region, setRegion] = useState<(typeof filters)[number]>("All");
  const visible = region === "All" ? tours : tours.filter((tour) => tour.region === region);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            className="choice text-sm"
            aria-pressed={region === item}
            onClick={() => setRegion(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="mt-10 divide-y divide-line border-y border-line">
        {visible.map((tour) => (
          <article key={tour.slug} className="group grid gap-6 py-8 md:grid-cols-[280px_1fr] md:items-center">
            <div className="relative aspect-[4/3] overflow-hidden bg-paper-deep">
              <Image
                src={tour.image}
                alt={tour.imageAlt}
                fill
                sizes="(min-width: 768px) 280px, 100vw"
                className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
              />
            </div>
            <div>
              <p className="kicker">
                {durationLabel(tour.days, tour.nights)} · {tour.region}
              </p>
              <h2 className="display mt-3 text-4xl md:text-5xl">
                <Link href={`/tours/${tour.slug}`}>{tour.title}</Link>
              </h2>
              <p className="mt-4 max-w-2xl text-ink-soft">{tour.summary}</p>
              <div className="mt-5 flex flex-wrap items-center gap-6">
                <p className="text-sm">
                  {tour.couplePrice ? (
                    <>
                      {formatPkr(tour.priceFrom)} sharing
                      <span className="mt-1 block text-ink-soft">{formatPkr(tour.couplePrice)} couple, separate room</span>
                    </>
                  ) : (
                    <>
                      From <span className="text-base">{formatPkr(tour.priceFrom)}</span>
                    </>
                  )}
                </p>
                <Link href={`/tours/${tour.slug}`} className="link-quiet text-sm">
                  Read the days
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
