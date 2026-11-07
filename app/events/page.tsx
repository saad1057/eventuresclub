import type { Metadata } from "next";
import Link from "next/link";
import { EventCard } from "@/components/cards";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { WhatsAppButton } from "@/components/whatsapp";
import { getEvents } from "@/lib/events";
import { breadcrumbSchema, graphSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Events in Lahore and Islamabad",
  description:
    "Eventures Club plans weddings, birthday events, corporate events, custom events, and government office events from Lahore and Islamabad.",
  alternates: { canonical: "/events" },
};

export default function EventsPage() {
  const events = getEvents();
  return (
    <>
      <JsonLd
        data={graphSchema([
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Events", path: "/events" },
          ]),
        ])}
      />
      <PageHero
        image="/images/event-aisle.jpg"
        alt="A red aisle through a flowered venue"
        kicker="Events"
        title="A gathering is not a tour with flowers."
      >
        Corporate work, weddings, birthdays, custom events and government office programmes, each planned on its own form.
      </PageHero>
      <section className="page-width py-14 md:py-20">
        <Reveal className="grid gap-5 md:grid-cols-[1fr_1fr] md:items-end">
          <h2 className="display text-4xl md:text-6xl">The work starts when you tell us the date, the people, and what the hour is for.</h2>
          <p className="max-w-xl leading-7 text-ink-soft">
            Pictures here set a mood. They are not a portfolio of nights we are pretending to have produced.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {events.map((event, index) => (
            <Reveal key={event.slug} delay={(index % 2) * 90} className="grid">
              <EventCard event={event} large className="md:min-h-[33rem]" sizes="(min-width: 768px) 50vw, 100vw" />
            </Reveal>
          ))}
        </div>
      </section>
      <section className="bg-forest-deep text-paper">
        <div className="page-width flex flex-wrap items-center justify-between gap-8 py-14 md:py-20">
          <h2 className="display max-w-2xl text-4xl md:text-5xl">Have a date in mind?</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/plan/event" className="btn btn-paper btn-go">
              Plan an event
            </Link>
            <WhatsAppButton message="Hello Eventures Club. I would like to plan an event." className="!border-paper/30" />
          </div>
        </div>
      </section>
    </>
  );
}
