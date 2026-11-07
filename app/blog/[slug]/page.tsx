import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { ViewTransition } from "react";
import { ReadingProgress, ShareTools } from "@/components/article-tools";
import { PostCard } from "@/components/cards";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { WhatsAppButton } from "@/components/whatsapp";
import { getPost, getPosts } from "@/lib/blog";
import { formatDate } from "@/lib/format";
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

  const others = (await getPosts()).filter((item) => item.slug !== post.slug);
  const related = [...others.filter((item) => item.category === post.category), ...others.filter((item) => item.category !== post.category)].slice(0, 3);
  const isEvent = post.category === "Events";
  const planHref = isEvent ? "/plan/event" : "/plan/tour";

  return (
    <article>
      <ReadingProgress />
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

      <header data-dark-hero className="relative flex min-h-[92svh] items-end overflow-hidden bg-ink text-paper">
        <ViewTransition name={`post-${post.slug}`} share="post-photo" default="none">
          <div className="absolute inset-0">
            <Image src={post.image} alt={post.imageAlt} fill priority sizes="100vw" className="object-cover" />
          </div>
        </ViewTransition>
        <div className="scrim" />
        <div className="page-width relative z-10 pb-12 pt-32 md:pb-16">
          <Link href="/blog" className="group rise mb-6 flex w-fit items-center gap-2.5 text-sm font-medium text-paper">
            <span className="transition-transform duration-500 ease-out group-hover:-translate-x-1" aria-hidden="true">
              ←
            </span>
            All notes
          </Link>
          <p className="chip rise" style={{ "--delay": "60ms" } as React.CSSProperties}>
            {post.category}
          </p>
          <h1
            className="display text-lift rise mt-5 max-w-5xl text-[clamp(2.7rem,6.2vw,5.9rem)]"
            style={{ "--delay": "120ms" } as React.CSSProperties}
          >
            {post.title}
          </h1>
          <p className="rise mt-5 max-w-2xl text-lg leading-8 text-paper/90" style={{ "--delay": "180ms" } as React.CSSProperties}>
            {post.description}
          </p>
        </div>
      </header>

      <div className="page-width grid gap-10 py-14 md:py-20 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
        <aside className="h-fit space-y-6 border-b border-line pb-8 text-sm lg:sticky lg:top-28 lg:border-b-0 lg:border-t lg:pb-0 lg:pt-5">
          <dl className="grid grid-cols-3 gap-4 lg:grid-cols-1">
            <div>
              <dt className="field-label">Published</dt>
              <dd className="mt-1.5">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </dd>
            </div>
            <div>
              <dt className="field-label">Reading</dt>
              <dd className="mt-1.5">{post.minutes} minutes</dd>
            </div>
            <div>
              <dt className="field-label">From</dt>
              <dd className="mt-1.5">The Eventures desk</dd>
            </div>
          </dl>
          <ShareTools title={post.title} />
        </aside>
        <div className="prose-club prose-article">{content}</div>
      </div>

      <div className="page-width pb-16 md:pb-24">
        <Reveal>
          <div className="relative overflow-hidden bg-forest-deep text-paper">
            <div className="grid md:grid-cols-[1fr_38%]">
              <div className="p-7 md:p-12">
                <p className="kicker kicker-light">{isEvent ? "Planning an event" : "Planning a trip"}</p>
                <h2 className="display mt-3 text-4xl md:text-5xl">{isEvent ? "Tell us the date and the people." : "Tell us the shape. We will price the road."}</h2>
                <p className="mt-4 max-w-lg leading-7 text-paper/85">
                  A short brief, emailed to the desk and back to you. A person replies. Nothing is booked from the form.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link href={planHref} className="btn btn-paper btn-go">
                    {isEvent ? "Plan an event" : "Plan a tour"}
                  </Link>
                  <WhatsAppButton message={`Hello Eventures Club. I just read "${post.title}" and have a question.`} className="!border-paper/30" />
                </div>
              </div>
              <div className="relative hidden min-h-64 md:block">
                <Image
                  src={isEvent ? "/images/event-floral-hall.jpg" : "/images/hunza-traveler.jpg"}
                  alt=""
                  fill
                  sizes="38vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <section className="border-t border-line bg-paper-deep/50">
        <div className="page-width py-16 md:py-24">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="kicker">Keep reading</p>
              <h2 className="display mt-3 text-4xl md:text-5xl">More from the journal.</h2>
            </div>
            <Link href="/blog" className="link-go text-copper-deep">
              All the notes
            </Link>
          </Reveal>
          <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
            {related.map((item, index) => (
              <Reveal key={item.slug} delay={index * 80} className="h-full">
                <PostCard post={item} sizes="(min-width: 768px) 30vw, 100vw" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
