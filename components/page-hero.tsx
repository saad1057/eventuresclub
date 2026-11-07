import Image from "next/image";

/** The photographic opening shared by the catalogue and company pages. */
export function PageHero({
  image,
  alt,
  kicker,
  title,
  children,
  short = false,
}: {
  image: string;
  alt: string;
  kicker: string;
  title: string;
  children?: React.ReactNode;
  short?: boolean;
}) {
  return (
    <section
      data-dark-hero
      className={`relative flex items-end overflow-hidden bg-ink text-paper ${short ? "min-h-[52svh]" : "min-h-[72svh]"}`}
    >
      <Image src={image} alt={alt} fill priority sizes="100vw" className="object-cover" />
      <div className="scrim" />
      <div className="page-width relative z-10 pb-12 pt-32 md:pb-16">
        <p className="chip rise">{kicker}</p>
        <h1
          className="display text-lift rise mt-5 max-w-5xl text-[clamp(2.7rem,6vw,5.6rem)]"
          style={{ "--delay": "80ms" } as React.CSSProperties}
        >
          {title}
        </h1>
        {children ? (
          <div
            className="rise mt-6 max-w-2xl text-lg leading-8 text-paper/90"
            style={{ "--delay": "160ms" } as React.CSSProperties}
          >
            {children}
          </div>
        ) : null}
      </div>
    </section>
  );
}
