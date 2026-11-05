import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-24 pt-36">
      <p className="kicker">404</p>
      <h1 className="display mt-3 text-5xl">That page is not on the road.</h1>
      <p className="mt-4 text-ink-soft">The tours, the events, and the two planners are still here.</p>
      <div className="mt-8 flex gap-3">
        <Link href="/tours" className="btn btn-solid">
          Tours
        </Link>
        <Link href="/" className="btn btn-ghost">
          Home
        </Link>
      </div>
    </div>
  );
}
