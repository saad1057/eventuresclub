import type { Metadata } from "next";
import { Suspense } from "react";
import { JsonLd } from "@/components/json-ld";
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
    <div className="mx-auto max-w-[88rem] px-5 pb-20 pt-28 md:px-10 md:pt-36">
      <JsonLd
        data={graphSchema([
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Plan a tour", path: "/plan/tour" },
          ]),
        ])}
      />
      <p className="kicker">Custom tour</p>
      <h1 className="display mt-3 max-w-3xl text-5xl md:text-7xl">Tell us the shape. We will price the road.</h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-soft">
        Three short steps. The column on the right is the brief as it stands. When you send it, that same list is emailed to us and to you. A person replies. Nothing is booked from the form.
      </p>
      <div className="mt-12">
        <Suspense fallback={<p className="text-ink-soft">Opening the planner.</p>}>
          <TourPlanner />
        </Suspense>
      </div>
    </div>
  );
}
