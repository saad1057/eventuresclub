import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { JsonLd } from "@/components/json-ld";
import { getPost, getPosts } from "@/lib/blog";
import { articleSchema, breadcrumbSchema, graphSchema } from "@/lib/schema";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      publishedTime: post.date,
      images: [{ url: post.image, alt: post.imageAlt }],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const { content } = await compileMDX({
    source: post.content,
    components: {
      a: ({ href = "", children }) =>
        href.startsWith("/") ? (
          <Link href={href}>{children}</Link>
        ) : (
          <a href={href}>{children}</a>
        ),
    },
  });

  return (
    <article className="mx-auto max-w-3xl px-5 pb-20 pt-28 md:px-10 md:pt-36">
      <JsonLd
        data={graphSchema([
          articleSchema(post),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Journal", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ])}
      />
      <p className="kicker">Journal · {post.date}</p>
      <h1 className="display mt-3 text-4xl md:text-6xl">{post.title}</h1>
      <p className="mt-5 text-lg leading-8 text-ink-soft">{post.description}</p>
      <div className="relative mt-8 aspect-[16/9] overflow-hidden bg-paper-deep">
        <Image src={post.image} alt={post.imageAlt} fill priority sizes="(min-width: 768px) 720px, 100vw" className="object-cover" />
      </div>
      <div className="prose-club mt-8">{content}</div>
      <p className="mt-12 text-sm text-ink-soft">{post.words} words · Eventures Club, Lahore</p>
    </article>
  );
}
