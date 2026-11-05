import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, eventServiceSchema, graphSchema } from "@/lib/schema";
import { getEvent, getEvents } from "@/lib/events";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getEvents().map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) return {};
  return {
    title: event.title,
    description: event.summary,
    alternates: { canonical: `/events/${event.slug}` },
    openGraph: { images: [{ url: event.image, alt: event.imageAlt }] },
  };
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) notFound();

  return (
    <article>
      <JsonLd
        data={graphSchema([
          eventServiceSchema(event.slug),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Events", path: "/events" },
            { name: event.title, path: `/events/${event.slug}` },
          ]),
        ])}
      />
      <div className="relative h-[68vh] min-h-[460px] overflow-hidden bg-ink text-paper">
        <Image src={event.image} alt={event.imageAlt} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/15 to-ink/25" />
        <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-[88rem] px-5 pb-10 md:px-10">
          <p className="kicker">Events · {event.nav}</p>
          <h1 className="display mt-3 max-w-4xl text-5xl md:text-7xl">{event.title}</h1>
        </div>
      </div>
      <div className="mx-auto grid max-w-[88rem] gap-12 px-5 py-14 md:grid-cols-[minmax(0,1fr)_280px] md:px-10">
        <div>
          <p className="max-w-2xl text-lg leading-8">{event.summary}</p>
          <p className="mt-6 max-w-2xl leading-8 text-ink-soft">{event.lede}</p>
          {event.sections.map((section) => (
            <section key={section.heading} className="mt-12">
              <h2 className="display text-4xl">{section.heading}</h2>
              <p className="mt-4 max-w-2xl leading-8 text-ink-soft">{section.body}</p>
            </section>
          ))}
        </div>
        <aside className="h-fit border border-line p-5 md:sticky md:top-28">
          <h2 className="text-sm uppercase tracking-[0.16em]">Fits</h2>
          <ul className="mt-3 space-y-2 text-sm leading-6">
            {event.suits.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h2 className="mt-6 text-sm uppercase tracking-[0.16em]">We hold</h2>
          <ul className="mt-3 space-y-2 text-sm leading-6">
            {event.handles.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h2 className="mt-6 text-sm uppercase tracking-[0.16em]">We will not</h2>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-ink-soft">
            {event.leaves.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <Link href={`/plan/event?type=${event.slug}`} className="btn btn-solid mt-8 w-full">
            Plan this event
          </Link>
        </aside>
      </div>
    </article>
  );
}
