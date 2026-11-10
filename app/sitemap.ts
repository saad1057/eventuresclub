import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/blog";
import { getEvents } from "@/lib/events";
import { absoluteUrl } from "@/lib/site";
import { getTours } from "@/lib/tours";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const staticPaths = ["", "/tours", "/events", "/plan/tour", "/plan/event", "/about", "/blog", "/contact", "/privacy", "/terms"];
  return [
    ...staticPaths.map((path) => ({
      url: absoluteUrl(path || "/"),
      lastModified: "2026-11-05",
    })),
    ...getTours().map((tour) => ({
      url: absoluteUrl(`/tours/${tour.slug}`),
      lastModified: "2026-11-05",
    })),
    ...getEvents().map((event) => ({
      url: absoluteUrl(`/events/${event.slug}`),
      lastModified: "2026-11-05",
    })),
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: post.updated,
    })),
  ];
}
