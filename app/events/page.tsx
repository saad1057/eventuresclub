import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, graphSchema } from "@/lib/schema";
import { getEvents } from "@/lib/events";

export const metadata: Metadata = {
  title: "Events in Lahore and the north",
  description:
    "Eventures Club plans corporate events, weddings and private gatherings from Lahore. A separate brief from the northern tours, with the same habit of writing the plan down.",
  alternates: { canonical: "/events" },
};

export default function EventsPage() {
  const events = getEvents();
  return (
    <div className="mx-auto max-w-[88rem] px-5 pb-20 pt-28 md:px-10 md:pt-36">
      <JsonLd
        data={graphSchema([
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Events", path: "/events" },
          ]),
        ])}
      />
      <p className="kicker">Events</p>
      <h1 className="display mt-3 max-w-4xl text-5xl md:text-7xl">A gathering is not a tour with flowers.</h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-soft">
        Corporate work, weddings and private rooms are planned on their own form. Pictures here set a mood. They are not a portfolio of nights we are pretending to have produced. The work starts when you tell us the date, the people, and what the hour is for.
      </p>
      <div className="mt-12 grid gap-10">
        {events.map((event) => (
          <Link key={event.slug} href={`/events/${event.slug}`} className="grid gap-6 border-t border-line pt-8 md:grid-cols-[320px_1fr] md:items-center">
            <div className="relative aspect-[4/3] overflow-hidden bg-paper-deep">
              <Image src={event.image} alt={event.imageAlt} fill sizes="(min-width: 768px) 320px, 100vw" className="object-cover" />
            </div>
            <div>
              <p className="kicker">{event.nav}</p>
              <h2 className="display mt-3 text-4xl md:text-5xl">{event.title}</h2>
              <p className="mt-4 max-w-2xl text-ink-soft">{event.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
