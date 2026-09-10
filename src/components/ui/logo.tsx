import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Logo (§2) — the 154px-wide wordmark SVG. */
export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label={site.name} className={cn("block w-[154px]", className)}>
      <Image
        src="/logo.svg"
        alt={site.name}
        width={2456}
        height={468}
        priority
        unoptimized
        className="h-auto w-full"
      />
    </Link>
  );
}
