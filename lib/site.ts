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
    "Eventures Club plans northern Pakistan tours and events from Lahore and Islamabad. Published routes include Naran, Swat, Azad Kashmir, and Hunza with Skardu, plus weddings, birthdays, corporate, custom, and government office events.",
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
