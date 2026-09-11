import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Logo (§2) — the VM mark followed by the wordmark, in the header.
 *
 * The client's logo is a square lockup (mark over "VARION / MOTORS"); at header
 * height its lettering would be a few pixels tall, so only the mark is cut out
 * (`public/media/brand/mark.png`, 289x240, transparent) and the name stays set
 * as text beside it. `public/logo.svg` is the Framer template's "CAR
 * DEALERSHIP" lettering and is not used.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={site.name}
      className={cn("flex items-center gap-2.5 text-ink", className)}
    >
      <Image
        src="/media/brand/mark.png"
        alt=""
        width={289}
        height={240}
        priority
        className="h-9 w-auto"
      />
      {/* From 1200 the five nav pills appear and, until ~1240, leave the
       * wordmark a few px from the first pill; the mark carries it alone there. */}
      <span className="font-display text-body-l leading-none font-medium tracking-[0.02em] whitespace-nowrap desktop:max-[1240px]:hidden">
        {site.name}
      </span>
    </Link>
  );
}
