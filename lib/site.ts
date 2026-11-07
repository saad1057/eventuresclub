export const site = {
  name: "Eventures Club",
  shortName: "Eventures",
  email: "hello@eventuresclub.com",
  city: "Lahore",
  region: "Punjab",
  country: "Pakistan",
  countryCode: "PK",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://eventuresclub.com",
  description:
    "Eventures Club plans events and northern Pakistan tours from Lahore and Islamabad: weddings, birthdays, corporate, custom, and government office events, plus published routes to Naran, Swat, Azad Kashmir, and Hunza with Skardu.",
  offices: [
    { name: "Head office", address: "26 Tip Canal Garden, Lahore" },
    { name: "Branch office", address: "812, I-8/3, Islamabad" },
  ],
  pickups: ["Lahore", "Islamabad"],
  priceNote:
    "Where a couple rate is shown, the first figure is per person in a sharing room and the second is the couple charge for a separate room. Pickup is Lahore or Islamabad. Routes without a couple rate are starting prices per person from Lahore for four people sharing a standard room.",
};

export function absoluteUrl(path = "/") {
  const base = site.url.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

const whatsappNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/\D/g, "");

/**
 * A wa.me link with the note already written. Returns null in production until
 * NEXT_PUBLIC_WHATSAPP_NUMBER is set, so no dead button ever ships. In development
 * it opens WhatsApp's contact picker so the design can still be tried.
 */
export function whatsappLink(message: string) {
  const text = encodeURIComponent(message);
  if (whatsappNumber) return `https://wa.me/${whatsappNumber}?text=${text}`;
  return process.env.NODE_ENV === "development" ? `https://wa.me/?text=${text}` : null;
}
