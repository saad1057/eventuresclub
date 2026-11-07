import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { TourHero } from "@/components/tour-hero";
import { WhatsAppButton } from "@/components/whatsapp";
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
    title: tour.couplePrice ? `${tour.title} from Lahore or Islamabad` : `${tour.title} from Lahore`,
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
      <div data-dark-hero className="relative">
        <TourHero>
          <Image src={tour.image} alt={tour.imageAlt} fill priority sizes="100vw" className="object-cover" />
        </TourHero>
        <div className="pointer-events-none absolute inset-0 z-10 flex items-end">
          <div className="page-width pointer-events-auto pb-10 text-paper md:pb-14">
            <p className="chip rise">
              {tour.region} · {durationLabel(tour.days, tour.nights)}
            </p>
            <h1 className="display text-lift rise mt-5 max-w-4xl text-[clamp(3rem,7vw,6.2rem)]" style={{ "--delay": "80ms" } as React.CSSProperties}>
              {tour.title}
            </h1>
            <p className="text-lift rise mt-4 text-lg" style={{ "--delay": "150ms" } as React.CSSProperties}>
              {tour.couplePrice
                ? `${formatPkr(tour.priceFrom)} per person, sharing room`
                : `From ${formatPkr(tour.priceFrom)} per person`}
            </p>
          </div>
        </div>
      </div>

      <div className="page-width grid gap-12 py-14 md:grid-cols-[minmax(0,1fr)_21rem] md:py-20">
        <div>
          <p className="display max-w-3xl text-[1.75rem] leading-[1.25] tracking-[-0.02em]">{tour.summary}</p>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-ink-soft">{tour.lede}</p>

          <Reveal>
            <h2 className="display mt-14 text-4xl md:text-5xl">The road</h2>
            <p className="mt-4 max-w-2xl leading-8 text-ink-soft">{tour.road}</p>
          </Reveal>

          <h2 className="display mt-14 text-4xl md:text-5xl">Day by day</h2>
          <ol className="timeline mt-8">
            {tour.itinerary.map((day, index) => (
              <li key={day.title}>
                <span className="timeline-day" aria-hidden="true">
                  {index + 1}
                </span>
                <Reveal>
                  <h3 className="pt-2 text-lg font-medium">{day.title}</h3>
                  <p className="mt-2 max-w-2xl leading-7 text-ink-soft">{day.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>

          <Reveal className="border-t border-line pt-10">
            <h2 className="display text-4xl md:text-5xl">Before you decide</h2>
            <ul className="mt-5 max-w-2xl list-disc space-y-2.5 pl-5 leading-7 text-ink-soft marker:text-copper">
              {tour.goodToKnow.map((item) => (
                <li key={item}>{item}</li>
              ))}
              <li>Best season: {tour.season}</li>
              <li>{tour.altitude}</li>
            </ul>
          </Reveal>
        </div>

        <aside className="panel h-fit p-6 md:sticky md:top-28">
          <p className="field-label">{tour.couplePrice ? "Sharing room" : "From Lahore"}</p>
          <p className="display mt-2 text-[2.6rem]">{formatPkr(tour.priceFrom)}</p>
          {tour.couplePrice ? <p className="mt-1 text-sm text-ink-soft">per person</p> : null}
          {tour.couplePrice ? (
            <>
              <p className="field-label mt-6">Couple, separate room</p>
              <p className="display mt-2 text-[2.6rem]">{formatPkr(tour.couplePrice)}</p>
            </>
          ) : null}
          <p className="mt-4 text-sm leading-6 text-ink-soft">
            {tour.couplePrice
              ? "Pickup from Lahore or Islamabad. The sharing rate is per person. The couple rate is for a separate room."
              : site.priceNote}
          </p>
          <Link
            href={`/plan/tour?destination=${tour.destinationIds[0]}&tour=${tour.slug}`}
            className="btn btn-solid btn-go mt-6 w-full"
          >
            Plan this tour
          </Link>
          <WhatsAppButton message={`Hello Eventures Club. I would like to ask about ${tour.title}.`} className="mt-2 w-full" />
          <h2 className="field-label mt-8">Included</h2>
          <ul className="mt-3 space-y-2 text-sm leading-6">
            {tour.included.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h2 className="field-label mt-6">Not included</h2>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-ink-soft">
            {tour.excluded.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      </div>

      <div className="page-width grid gap-4 pb-14 md:grid-cols-3">
        {tour.gallery.map((photo, index) => (
          <Reveal key={photo.src} delay={index * 80} variant="clip">
            <div className="group relative aspect-[4/5] overflow-hidden bg-paper-deep">
              <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 768px) 30vw, 100vw" className="photo-zoom object-cover" />
            </div>
          </Reveal>
        ))}
      </div>
      <div className="page-width pb-20">
        <h2 className="field-label">Along the way</h2>
        <ul className="mt-4 flex flex-wrap gap-2 text-sm">
          {tour.highlights.map((item) => (
            <li key={item} className="border border-line px-3 py-2">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
