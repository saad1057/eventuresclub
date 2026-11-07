import Image from "next/image";

/** The header lockup: mark, wordmark and "CLUB". Colour comes from the parent. */
export function Logo({ size = "md" }: { size?: "md" | "lg" }) {
  const large = size === "lg";
  return (
    <span className={`flex items-center ${large ? "gap-4" : "gap-3"}`}>
      <Image
        src="/brand/icon.svg"
        alt=""
        width={large ? 60 : 36}
        height={large ? 60 : 36}
        className={large ? "h-[3.75rem] w-[3.75rem]" : "h-9 w-9"}
      />
      <span className={`display leading-none ${large ? "text-[2.9rem]" : "text-[1.65rem]"}`}>eventures</span>
      <span className={`mt-1 tracking-[0.22em] ${large ? "text-xs" : "hidden text-[0.62rem] sm:inline"}`}>CLUB</span>
    </span>
  );
}
