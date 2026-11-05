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
    "Eventures Club plans northern Pakistan tours and private events from Lahore. Published routes to Hunza, Swat, Kumrat, Chitral, Naran and the Galiyat, plus a separate desk for gatherings.",
  priceNote:
    "Starting price per person from Lahore, for four people sharing a standard room and one private vehicle. Couples, solo travellers and premium stays are quoted after the brief.",
};

export function absoluteUrl(path = "/") {
  const base = site.url.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
