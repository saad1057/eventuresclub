import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EventCard } from "@/components/cards";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { WhatsAppButton } from "@/components/whatsapp";
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
  const others = getEvents()
    .filter((item) => item.slug !== event.slug)
    .slice(0, 3);

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
      <div data-dark-hero className="relative flex min-h-[78svh] items-end overflow-hidden bg-ink text-paper">
        <Image src={event.image} alt={event.imageAlt} fill priority sizes="100vw" className="object-cover" />
        <div className="scrim" />
        <div className="page-width relative z-10 pb-10 pt-32 md:pb-14">
          <p className="chip rise">Events · {event.nav}</p>
          <h1 className="display text-lift rise mt-5 max-w-4xl text-[clamp(3rem,7vw,6.2rem)]" style={{ "--delay": "80ms" } as React.CSSProperties}>
            {event.title}
          </h1>
        </div>
      </div>
      <div className="page-width grid gap-12 py-14 md:grid-cols-[minmax(0,1fr)_21rem] md:py-20">
        <div>
          <p className="display max-w-3xl text-[1.75rem] leading-[1.25] tracking-[-0.02em]">{event.summary}</p>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-ink-soft">{event.lede}</p>
          {event.sections.map((section, index) => (
            <Reveal key={section.heading}>
              <section className="mt-12 grid gap-3 border-t border-line pt-7 md:grid-cols-[4rem_1fr]">
                <p className="display text-2xl text-copper-deep">{String(index + 1).padStart(2, "0")}</p>
                <div>
                  <h2 className="display text-4xl">{section.heading}</h2>
                  <p className="mt-4 max-w-2xl leading-8 text-ink-soft">{section.body}</p>
                </div>
              </section>
            </Reveal>
          ))}
        </div>
        <aside className="panel h-fit p-6 md:sticky md:top-28">
          <h2 className="field-label">Fits</h2>
          <ul className="mt-3 space-y-2 text-sm leading-6">
            {event.suits.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h2 className="field-label mt-7">We hold</h2>
          <ul className="mt-3 space-y-2 text-sm leading-6">
            {event.handles.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h2 className="field-label mt-7">We will not</h2>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-ink-soft">
            {event.leaves.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <Link href={`/plan/event?type=${event.slug}`} className="btn btn-solid btn-go mt-8 w-full">
            Plan this event
          </Link>
          <WhatsAppButton
            message={`Hello Eventures Club. I would like to talk about ${event.title.toLowerCase()}.`}
            className="mt-2 w-full"
          />
        </aside>
      </div>
      <section className="border-t border-line bg-paper-deep/50">
        <div className="page-width py-14 md:py-20">
          <h2 className="display text-4xl md:text-5xl">Other rooms we plan.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {others.map((item, index) => (
              <Reveal key={item.slug} delay={index * 80} className="grid">
                <EventCard event={item} className="md:min-h-[24rem]" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
