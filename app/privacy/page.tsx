import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What Eventures Club collects when you send a tour brief, an event brief, or a note, and why.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-20 pt-28 md:px-10 md:pt-36">
      <p className="kicker">Privacy</p>
      <h1 className="display mt-3 text-5xl">What the forms keep.</h1>
      <div className="prose-club mt-8">
        <p>
          When you send a tour brief, an event brief, or a contact note, we receive the fields you typed: your name, email, phone if you gave one, and the details of the trip or gathering. We email that same list to {site.email} and a copy to the address you entered.
        </p>
        <p>
          We use it to reply and, if you go ahead, to plan the journey or the event. We do not sell the list. We do not add you to a newsletter because you asked for a price.
        </p>
        <p>
          If email is not configured on a development copy of the site, the message is stored on that machine so the brief can be checked. The live site sends it, or it tells you it could not.
        </p>
        <p>
          Write to {site.email} if you want the note deleted. We will remove it from the inbox we control. We cannot pull a copy out of your own email.
        </p>
      </div>
    </div>
  );
}
