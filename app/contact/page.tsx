import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, graphSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Write to Eventures Club in Lahore. The note is emailed to the desk with every field you enter, and a copy is emailed back to you.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto grid max-w-[88rem] gap-12 px-5 pb-20 pt-28 md:grid-cols-2 md:px-10 md:pt-36">
      <JsonLd
        data={graphSchema([
          { "@type": "ContactPage", name: "Contact Eventures Club", url: `${site.url}/contact` },
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ])}
      />
      <div>
        <p className="kicker">Contact</p>
        <h1 className="display mt-3 text-5xl md:text-7xl">The desk reads email.</h1>
        <p className="mt-6 max-w-md text-lg leading-8 text-ink-soft">
          For a route, use the tour planner. For a gathering, use the event planner. This note is for everything that is not quite either.
        </p>
        <dl className="mt-10 space-y-4 text-sm">
          <div>
            <dt className="text-ink-soft">Email</dt>
            <dd>
              <a className="link-quiet" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-ink-soft">Where</dt>
            <dd>
              {site.city}, {site.region}, {site.country}
            </dd>
          </div>
        </dl>
      </div>
      <ContactForm />
    </div>
  );
}
