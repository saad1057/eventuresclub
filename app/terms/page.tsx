import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms",
  description: "How Eventures Club prices, plans, and changes a northern tour or an event booked from Lahore.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-20 pt-28 md:px-10 md:pt-36">
      <p className="kicker">Terms</p>
      <h1 className="display mt-3 text-5xl">Prices are a start. The plan is the agreement.</h1>
      <div className="prose-club mt-8">
        <p>
          Figures on the tour pages are starting prices per person from Lahore for four people sharing a standard room and one vehicle. They are not a quote for a couple, a solo traveller, a premium hotel, or a date in peak autumn. The written plan we send after your brief is the price that counts.
        </p>
        <p>
          This website does not take payment. An advance, when one is needed to hold rooms or a vehicle, is requested on an invoice after you approve the plan. Until that approval, nothing is booked in your name.
        </p>
        <p>
          Roads, passes and jeep tracks in the north close. Weather, a local halt, or a landslide can change a day. We replace it with the safest available version and tell you why. We do not drive a closed road to protect an itinerary.
        </p>
        <p>
          Events are scoped in the same way. Guest counts, venues and catering change the cost. A direction is not a contract. The contract is the plan you accept.
        </p>
        <p>
          Photographs of valleys are of those valleys. Photographs of tables and halls are atmosphere, not a claim that Eventures Club produced that particular night.
        </p>
      </div>
    </div>
  );
}
