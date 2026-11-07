import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { WhatsAppButton } from "@/components/whatsapp";
import { breadcrumbSchema, graphSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Write to Eventures Club. The head office is in Lahore and the branch is in Islamabad. The note is emailed to the desk with every field you enter, and a copy is emailed back to you.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={graphSchema([
          { "@type": "ContactPage", name: "Contact Eventures Club", url: `${site.url}/contact` },
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ])}
      />
      <PageHero image="/images/pine-road.jpg" alt="A pine-lined mountain road" kicker="Contact" title="Talk to the desk." short>
        For a route, use the{" "}
        <Link href="/plan/tour" className="underline underline-offset-4">
          tour planner
        </Link>
        . For a gathering, use the{" "}
        <Link href="/plan/event" className="underline underline-offset-4">
          event planner
        </Link>
        . This page is for everything that is not quite either.
      </PageHero>
      <section className="page-width grid gap-10 py-14 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:gap-16 md:py-20">
        <div>
          <div className="panel panel-dark p-7">
            <p className="kicker kicker-light">Quickest</p>
            <h2 className="display mt-3 text-4xl">Send a message.</h2>
            <p className="mt-3 max-w-sm leading-7 text-paper/85">WhatsApp opens with a note already written. Change it, then send it.</p>
            <WhatsAppButton message="Hello Eventures Club. I would like to talk to the desk." label="Open WhatsApp" className="mt-6 !border-paper/30" />
          </div>
          <dl className="mt-8 divide-y divide-line border-y border-line">
            <div className="grid grid-cols-[7rem_1fr] gap-4 py-5">
              <dt className="field-label pt-1">Email</dt>
              <dd>
                <a className="link-quiet underline" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </dd>
            </div>
            {site.offices.map((office) => (
              <div key={office.name} className="grid grid-cols-[7rem_1fr] gap-4 py-5">
                <dt className="field-label pt-1">{office.name}</dt>
                <dd>{office.address}</dd>
              </div>
            ))}
            <div className="grid grid-cols-[7rem_1fr] gap-4 py-5">
              <dt className="field-label pt-1">Pickup</dt>
              <dd>{site.pickups.join(" and ")}</dd>
            </div>
          </dl>
        </div>
        <div className="panel p-6 md:p-9">
          <h2 className="display text-4xl">Or write it down.</h2>
          <p className="mb-8 mt-3 leading-7 text-ink-soft">The note is emailed to the desk with every field, and a copy comes back to you.</p>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
