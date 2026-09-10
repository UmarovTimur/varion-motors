import Link from "next/link";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Logo (§2) — the wordmark in the header.
 *
 * Set as text rather than `public/logo.svg`: that file is the Framer template's
 * "CAR DEALERSHIP" lettering. Swap back to an <Image> once a Varion Motors
 * wordmark exists.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={site.name}
      className={cn(
        "block font-display text-body-l leading-none font-medium tracking-[0.02em] whitespace-nowrap text-ink",
        className,
      )}
    >
      {site.name}
    </Link>
  );
}
