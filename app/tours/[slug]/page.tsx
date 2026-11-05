import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { TourHero } from "@/components/tour-hero";
import { durationLabel, formatPkr } from "@/lib/format";
import { breadcrumbSchema, graphSchema, tourSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import { getTour, getTours } from "@/lib/tours";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getTours().map((tour) => ({ slug: tour.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTour(slug);
  if (!tour) return {};
  return {
    title: `${tour.title} from Lahore`,
    description: tour.summary,
    alternates: { canonical: `/tours/${tour.slug}` },
    openGraph: {
      title: tour.title,
      description: tour.summary,
      images: [{ url: tour.image, alt: tour.imageAlt }],
    },
  };
}

export default async function TourPage({ params }: Props) {
  const { slug } = await params;
  const tour = getTour(slug);
  if (!tour) notFound();

  return (
    <article>
      <JsonLd
        data={graphSchema([
          tourSchema(tour.slug),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Tours", path: "/tours" },
            { name: tour.title, path: `/tours/${tour.slug}` },
          ]),
        ])}
      />
      <div className="relative">
        <TourHero>
          <Image src={tour.image} alt={tour.imageAlt} fill priority sizes="100vw" className="object-cover" />
        </TourHero>
        <div className="pointer-events-none absolute inset-0 z-10 flex items-end">
          <div className="pointer-events-auto mx-auto w-full max-w-[88rem] px-5 pb-10 text-paper md:px-10 md:pb-14">
            <p className="kicker">
              {tour.region} · {durationLabel(tour.days, tour.nights)}
            </p>
            <h1 className="display mt-3 max-w-4xl text-5xl md:text-7xl">{tour.title}</h1>
            <p className="mt-4 text-lg">From {formatPkr(tour.priceFrom)} per person</p>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-[88rem] gap-12 px-5 py-14 md:grid-cols-[minmax(0,1fr)_280px] md:px-10">
        <div>
          <p className="max-w-2xl text-lg leading-8">{tour.summary}</p>
          <p className="mt-6 max-w-2xl leading-8 text-ink-soft">{tour.lede}</p>
          <h2 className="display mt-12 text-4xl">The road</h2>
          <p className="mt-4 max-w-2xl leading-8 text-ink-soft">{tour.road}</p>
          <h2 className="display mt-12 text-4xl">Day by day</h2>
          <ol className="mt-6 divide-y divide-line border-y border-line">
            {tour.itinerary.map((day) => (
              <li key={day.title} className="py-6">
                <h3 className="text-lg">{day.title}</h3>
                <p className="mt-2 max-w-2xl leading-7 text-ink-soft">{day.body}</p>
              </li>
            ))}
          </ol>
          <h2 className="display mt-12 text-4xl">Before you decide</h2>
          <ul className="mt-4 max-w-2xl list-disc space-y-2 pl-5 text-ink-soft">
            {tour.goodToKnow.map((item) => (
              <li key={item}>{item}</li>
            ))}
            <li>Best season: {tour.season}</li>
            <li>{tour.altitude}</li>
          </ul>
        </div>
        <aside className="h-fit border border-line p-5 md:sticky md:top-28">
          <p className="kicker">From Lahore</p>
          <p className="display mt-3 text-4xl">{formatPkr(tour.priceFrom)}</p>
          <p className="mt-3 text-sm leading-6 text-ink-soft">{site.priceNote}</p>
          <Link
            href={`/plan/tour?destination=${tour.destinationIds[0]}&tour=${tour.slug}`}
            className="btn btn-solid mt-6 w-full"
          >
            Plan this tour
          </Link>
          <h2 className="mt-8 text-sm uppercase tracking-[0.16em]">Included</h2>
          <ul className="mt-3 space-y-2 text-sm leading-6">
            {tour.included.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h2 className="mt-6 text-sm uppercase tracking-[0.16em]">Not included</h2>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-ink-soft">
            {tour.excluded.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      </div>

      <div className="mx-auto grid max-w-[88rem] gap-4 px-5 pb-20 md:grid-cols-3 md:px-10">
        {tour.gallery.map((photo) => (
          <div key={photo.src} className="relative aspect-[4/5] overflow-hidden bg-paper-deep">
            <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 768px) 30vw, 100vw" className="object-cover" />
          </div>
        ))}
      </div>
      <div className="mx-auto max-w-[88rem] px-5 pb-16 md:px-10">
        <h2 className="text-sm uppercase tracking-[0.16em]">Along the way</h2>
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {tour.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
