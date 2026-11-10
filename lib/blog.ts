import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export type Faq = { q: string; a: string };
export type Heading = { id: string; text: string };

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated: string;
  category: string;
  minutes: number;
  words: number;
  image: string;
  imageAlt: string;
  keywords: string[];
  takeaways: string[];
  faq: Faq[];
  headings: Heading[];
};

const directory = path.join(process.cwd(), "content/blog");

function asString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

// gray-matter turns an unquoted YAML date into a Date object.
function asDate(value: unknown) {
  return value instanceof Date ? value.toISOString().slice(0, 10) : asString(value);
}

function asStrings(value: unknown) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function asFaq(value: unknown): Faq[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (item && typeof item === "object" && "q" in item && "a" in item) {
      const { q, a } = item as { q: unknown; a: unknown };
      if (typeof q === "string" && typeof a === "string") return [{ q, a }];
    }
    return [];
  });
}

function countWords(content: string) {
  return content.trim().split(/\s+/).length;
}

/** One slug rule, shared by the contents list and the rendered headings so the anchors always match. */
export function headingId(text: string) {
  return text
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function extractHeadings(content: string): Heading[] {
  return content
    .split("\n")
    .filter((line) => line.startsWith("## "))
    .map((line) => line.slice(3).trim())
    .map((text) => ({ id: headingId(text), text }));
}

export async function getPosts(): Promise<PostMeta[]> {
  const files = (await readdir(directory)).filter((file) => file.endsWith(".mdx"));
  const posts = await Promise.all(
    files.map(async (file) => {
      const raw = await readFile(path.join(directory, file), "utf8");
      const { data, content } = matter(raw);
      const words = countWords(content);
      const date = asDate(data.date);
      return {
        slug: asString(data.slug, file.replace(/\.mdx$/, "")),
        title: asString(data.title),
        description: asString(data.description),
        date,
        updated: asDate(data.updated) || date,
        category: asString(data.category, "Planning"),
        minutes: Math.max(1, Math.round(words / 220)),
        words,
        image: asString(data.image, "/images/passu.jpg"),
        imageAlt: asString(data.imageAlt),
        keywords: asStrings(data.keywords),
        takeaways: asStrings(data.takeaways),
        faq: asFaq(data.faq),
        headings: extractHeadings(content),
      } satisfies PostMeta;
    }),
  );
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(slug: string) {
  const posts = await getPosts();
  const meta = posts.find((post) => post.slug === slug);
  if (!meta) return null;
  const raw = await readFile(path.join(directory, `${slug}.mdx`), "utf8");
  const { content } = matter(raw);
  return { ...meta, content };
}
