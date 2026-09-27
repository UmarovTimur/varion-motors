import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Logo (§2) — just the VM mark in the header.
 *
 * The client's logo is a square lockup (mark over "VARION / MOTORS"); at header
 * height its lettering would be a few pixels tall, so only the mark is cut out
 * (`public/media/brand/mark.png`, 289x240, transparent) and the wordmark is
 * dropped rather than set as text beside it. `public/logo.svg` is the Framer
 * template's "CAR DEALERSHIP" lettering and is not used. The dark theme swaps
 * in `mark-light.png`, the same cut with the black "M" turned light grey.
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
        className="h-7 w-auto tablet:h-9 dark:hidden"
      />
      <Image
        src="/media/brand/mark-light.png"
        alt=""
        width={289}
        height={240}
        priority
        className="hidden h-7 w-auto tablet:h-9 dark:block"
      />
    </Link>
  );
}
