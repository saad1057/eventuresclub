import type { Metadata } from "next";
import { Suspense } from "react";
import { EventPlanner } from "@/components/event-planner";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, graphSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Plan an event",
  description:
    "Plan a wedding, birthday, corporate event, custom event, or government office event with Eventures Club. The form emails every field you enter to the desk and a copy to you.",
  alternates: { canonical: "/plan/event" },
};

export default function PlanEventPage() {
  return (
    <div className="mx-auto max-w-[88rem] px-5 pb-20 pt-28 md:px-10 md:pt-36">
      <JsonLd
        data={graphSchema([
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Plan an event", path: "/plan/event" },
          ]),
        ])}
      />
      <p className="kicker">Event brief</p>
      <h1 className="display mt-3 max-w-3xl text-5xl md:text-7xl">Describe the hour. We will describe the room.</h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-soft">
        This planner is only for gatherings. Tours have their own. You will get an email with every answer, and so will we. The next note from the desk is a direction, not an invoice.
      </p>
      <div className="mt-12">
        <Suspense fallback={<p className="text-ink-soft">Opening the planner.</p>}>
          <EventPlanner />
        </Suspense>
      </div>
    </div>
  );
}
