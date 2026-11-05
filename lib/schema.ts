import { getEvent, getEvents } from "@/lib/events";
import { getTour, getTours } from "@/lib/tours";
import { absoluteUrl, site } from "@/lib/site";

export function organizationSchema() {
  return {
    "@type": "TravelAgency",
    "@id": absoluteUrl("/#organization"),
    name: site.name,
    url: site.url,
    email: site.email,
    image: absoluteUrl("/brand/og-default.jpg"),
    logo: absoluteUrl("/brand/icon.svg"),
    description: site.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: "26 Tip Canal Garden",
      addressLocality: site.city,
      addressRegion: site.region,
      addressCountry: site.countryCode,
    },
    location: site.offices.map((office) => ({
      "@type": "Place",
      name: office.name,
      address: office.address,
    })),
    areaServed: [
      { "@type": "City", name: "Lahore" },
      { "@type": "City", name: "Islamabad" },
      { "@type": "AdministrativeArea", name: "Northern Pakistan" },
    ],
    priceRange: "PKR 16,000–125,000",
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function tourSchema(slug: string) {
  const tour = getTour(slug);
  if (!tour) return null;
  return {
    "@type": "TouristTrip",
    name: tour.title,
    description: tour.summary,
    url: absoluteUrl(`/tours/${tour.slug}`),
    image: absoluteUrl(tour.image),
    touristType: "Leisure travellers from Lahore",
    provider: { "@id": absoluteUrl("/#organization") },
    itinerary: {
      "@type": "ItemList",
      itemListElement: tour.itinerary.map((day, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: day.title,
        description: day.body,
      })),
    },
    offers: {
      "@type": "Offer",
      price: tour.priceFrom,
      priceCurrency: "PKR",
      availability: "https://schema.org/InStock",
      url: absoluteUrl(`/tours/${tour.slug}`),
      description: site.priceNote,
    },
  };
}

export function eventServiceSchema(slug: string) {
  const event = getEvent(slug);
  if (!event) return null;
  return {
    "@type": "Service",
    name: event.title,
    serviceType: event.title,
    description: event.summary,
    url: absoluteUrl(`/events/${event.slug}`),
    image: absoluteUrl(event.image),
    provider: { "@id": absoluteUrl("/#organization") },
    areaServed: { "@type": "City", name: "Lahore" },
  };
}

export function articleSchema(post: {
  title: string;
  description: string;
  slug: string;
  date: string;
  image: string;
}) {
  return {
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    image: absoluteUrl(post.image),
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    author: { "@id": absoluteUrl("/#organization") },
    publisher: { "@id": absoluteUrl("/#organization") },
  };
}

export function graphSchema(nodes: unknown[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationSchema(), ...nodes.filter(Boolean)],
  };
}

export function catalogOffers() {
  return getTours().map((tour) => ({
    "@type": "Offer",
    name: tour.title,
    price: tour.priceFrom,
    priceCurrency: "PKR",
    url: absoluteUrl(`/tours/${tour.slug}`),
  }));
}

export function eventCatalog() {
  return getEvents().map((event) => ({
    "@type": "Service",
    name: event.title,
    url: absoluteUrl(`/events/${event.slug}`),
  }));
}
