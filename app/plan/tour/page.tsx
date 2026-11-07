import type { Metadata } from "next";
import { Suspense } from "react";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { TourPlanner } from "@/components/tour-planner";
import { breadcrumbSchema, graphSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Plan a northern tour",
  description:
    "Tell Eventures Club where you want to go from Lahore. The form emails every answer to the desk and a copy to you. No payment on the site.",
  alternates: { canonical: "/plan/tour" },
};

export default function PlanTourPage() {
  return (
    <>
      <JsonLd
        data={graphSchema([
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Plan a tour", path: "/plan/tour" },
          ]),
        ])}
      />
      <PageHero image="/images/kandol.jpg" alt="Kandol Lake in Swat" kicker="Custom tour" title="Tell us the shape. We will price the road." short>
        Three short steps. When you send it, the same list is emailed to us and to you. A person replies. Nothing is booked from the form.
      </PageHero>
      <section className="page-width py-14 md:py-20">
        <Suspense fallback={<p className="text-ink-soft">Opening the planner.</p>}>
          <TourPlanner />
        </Suspense>
      </section>
    </>
  );
}
