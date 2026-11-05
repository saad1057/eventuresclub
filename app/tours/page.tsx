import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { TourCatalog } from "@/components/tour-catalog";
import { breadcrumbSchema, graphSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import { getTours } from "@/lib/tours";

export const metadata: Metadata = {
  title: "Northern Pakistan tours from Lahore",
  description:
    "Published northern routes from Lahore: Nathiagali, Naran, Swat, Kumrat, Hunza, Chitral and Skardu, with starting prices per person for a group of four.",
  alternates: { canonical: "/tours" },
};

export default function ToursPage() {
  const tours = getTours();
  return (
    <div className="mx-auto max-w-[88rem] px-5 pb-20 pt-28 md:px-10 md:pt-36">
      <JsonLd
        data={graphSchema([
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Tours", path: "/tours" },
          ]),
        ])}
      />
      <p className="kicker">Tours</p>
      <h1 className="display mt-3 max-w-4xl text-5xl md:text-7xl">Routes with a price, and a road that is allowed to take time.</h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-soft">
        These are fixed shapes you can read before you write to us. Every figure is a starting price per person from Lahore, for four people in a standard room. A private date, a different city, or a quieter hotel is a new quote, not a hidden fee on the day.
      </p>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-ink-soft">{site.priceNote}</p>
      <div className="mt-12">
        <TourCatalog tours={tours} />
      </div>
    </div>
  );
}
