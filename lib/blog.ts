import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  minutes: number;
  image: string;
  imageAlt: string;
};

const directory = path.join(process.cwd(), "content/blog");

function asString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

// gray-matter turns an unquoted YAML date into a Date object.
function asDate(value: unknown) {
  return value instanceof Date ? value.toISOString().slice(0, 10) : asString(value);
}

function countWords(content: string) {
  return content.trim().split(/\s+/).length;
}

export async function getPosts(): Promise<PostMeta[]> {
  const files = (await readdir(directory)).filter((file) => file.endsWith(".mdx"));
  const posts = await Promise.all(
    files.map(async (file) => {
      const raw = await readFile(path.join(directory, file), "utf8");
      const { data, content } = matter(raw);
      return {
        slug: asString(data.slug, file.replace(/\.mdx$/, "")),
        title: asString(data.title),
        description: asString(data.description),
        date: asDate(data.date),
        category: asString(data.category, "Planning"),
        minutes: Math.max(1, Math.round(countWords(content) / 220)),
        image: asString(data.image, "/images/passu.jpg"),
        imageAlt: asString(data.imageAlt),
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
  return { ...meta, content, words: countWords(content) };
}
