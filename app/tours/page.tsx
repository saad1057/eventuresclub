import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
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
    <>
      <JsonLd
        data={graphSchema([
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Tours", path: "/tours" },
          ]),
        ])}
      />
      <PageHero
        image="/images/attabad.jpg"
        alt="Attabad Lake in Hunza"
        kicker="Tours"
        title="Routes with a price, and a road that is allowed to take time."
      >
        Fixed shapes you can read before you write to us, with pickup in Lahore or Islamabad.
      </PageHero>
      <section className="page-width py-14 md:py-20">
        <p className="max-w-3xl leading-7 text-ink-soft">
          Naran, Swat, Azad Kashmir, and Hunza with Skardu show a per-person sharing rate and a couple rate for a separate room. The other routes are starting prices for four people sharing a standard room, and a different hotel or a private date is a new quote.
        </p>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-ink-soft">{site.priceNote}</p>
        <div className="mt-10">
          <TourCatalog tours={tours} />
        </div>
      </section>
    </>
  );
}
