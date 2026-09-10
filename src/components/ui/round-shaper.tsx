import { cn } from "@/lib/utils";

/**
 * Round Shaper — ported from the Framer component `Round Shaper`.
 *
 * The concave fillet that joins an overlay patch to the edge of the container
 * it is cut into. The box clips a transparent circle whose offset, spread
 * box-shadow paints the patch colour; what survives the clip is a square minus
 * a quarter-circle, so the patch reads as carved out of the photo rather than
 * laid on top of it.
 *
 * Two variants are in use, measured on the nodes:
 *   `lg` (Cars Card)  35x35, shadow -20px -20px 0 4px
 *   `sm` (Blog Card)  26x26, shadow -10px -10px 0 0
 *
 * The offset always points up-left; Framer's instances rotate the wrapper to
 * aim it at whichever corner they sit in, so callers place AND rotate it.
 */
const variants = {
  lg: "size-[35px] [--shaper-shadow:-20px_-20px_0_4px]",
  sm: "size-[26px] [--shaper-shadow:-10px_-10px_0_0]",
} as const;

export function RoundShaper({
  variant = "lg",
  className,
}: {
  variant?: keyof typeof variants;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn("absolute overflow-clip", variants[variant], className)}
    >
      <span className="absolute inset-0 rounded-full shadow-[var(--shaper-shadow)_var(--color-surface)]" />
    </span>
  );
}
