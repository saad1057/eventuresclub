import type { Metadata } from "next";
import { Suspense } from "react";
import { EventPlanner } from "@/components/event-planner";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { breadcrumbSchema, graphSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Plan an event",
  description:
    "Plan a wedding, birthday, corporate event, custom event, or government office event with Eventures Club. The form emails every field you enter to the desk and a copy to you.",
  alternates: { canonical: "/plan/event" },
};

export default function PlanEventPage() {
  return (
    <>
      <JsonLd
        data={graphSchema([
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Plan an event", path: "/plan/event" },
          ]),
        ])}
      />
      <PageHero image="/images/event-banquet.jpg" alt="A banquet hall of round tables under chandeliers" kicker="Event brief" title="Describe the hour. We will describe the room." short>
        You will get an email with every answer, and so will we. The next note from the desk is a direction, not an invoice.
      </PageHero>
      <section className="page-width py-14 md:py-20">
        <Suspense fallback={<p className="text-ink-soft">Opening the planner.</p>}>
          <EventPlanner />
        </Suspense>
      </section>
    </>
  );
}
