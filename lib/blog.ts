import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  image: string;
  imageAlt: string;
};

const directory = path.join(process.cwd(), "content/blog");

function asString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

export async function getPosts(): Promise<PostMeta[]> {
  const files = (await readdir(directory)).filter((file) => file.endsWith(".mdx"));
  const posts = await Promise.all(
    files.map(async (file) => {
      const raw = await readFile(path.join(directory, file), "utf8");
      const { data } = matter(raw);
      return {
        slug: asString(data.slug, file.replace(/\.mdx$/, "")),
        title: asString(data.title),
        description: asString(data.description),
        date: asString(data.date),
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
  const words = content.trim().split(/\s+/).length;
  return { ...meta, content, words };
}
