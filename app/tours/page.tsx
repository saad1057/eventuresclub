import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { TourCatalog } from "@/components/tour-catalog";
import { breadcrumbSchema, graphSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import { getTours } from "@/lib/tours";

export const metadata: Metadata = {
  title: "Northern Pakistan tours from Lahore",
  description:
    "Published northern routes with pickup in Lahore or Islamabad: Naran, Swat, Azad Kashmir, Hunza and Skardu, plus Nathiagali, Kumrat and Chitral. Sharing and couple rates are shown where they are fixed.",
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
        These are fixed shapes you can read before you write to us. Naran, Swat, Azad Kashmir, and Hunza with Skardu show a per-person sharing rate and a couple rate for a separate room. Pickup is Lahore or Islamabad. The other routes are starting prices for four people sharing a standard room, and a different hotel or a private date is a new quote.
      </p>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-ink-soft">{site.priceNote}</p>
      <div className="mt-12">
        <TourCatalog tours={tours} />
      </div>
    </div>
  );
}
