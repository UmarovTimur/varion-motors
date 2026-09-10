import { Media } from "@/components/ui/media";
import { cn, typo } from "@/lib/utils";

/**
 * Service tile — Framer "Block 01"…"Block 05" in the Services section.
 *
 * Column, content pushed to the bottom, 20px padding, radius 16, image behind a
 * "Dark Overlay" gradient. The title is Body XL (20px / 1em / 500) in white and
 * spans the full width, so it reads bottom-left.
 *
 * With no `image` the tile is the black one (Framer's Block 03), which carries
 * the brand-logo strip; the strip itself is not ported yet.
 *
 * (Framer gives Block 01 a 12px radius and hangs a near-invisible 8%-black
 * shadow on Blocks 02-04 only; both look like slips in the source file, so all
 * five tiles use the same 16px radius here.)
 */
export function ServiceBlock({
  title,
  image,
  className,
}: {
  title: string;
  image?: string;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group relative isolate flex flex-col justify-end gap-2.5 overflow-hidden rounded-card p-5",
        !image && "bg-black",
        className,
      )}
    >
      {image && (
        <>
          <Media
            src={image}
            alt={title}
            sizes="(min-width: 810px) 50vw, 100vw"
            className="-z-1 transition-transform duration-500 group-hover:scale-105"
          />
          <div aria-hidden className="absolute inset-0 -z-1 overlay-linear" />
        </>
      )}
      <h3 className="relative w-full text-body-xl leading-none font-medium text-text-white">
        {typo(title)}
      </h3>
    </article>
  );
}
