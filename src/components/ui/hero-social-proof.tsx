import { Car } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Hero Social Proof — ported from the Framer component `HeroSocialProof`.
 *
 * A solid white pill, not a glass one: a 70px black square holding the icon,
 * then the metric stacked over its caption. `Large` and `Small` differ only in
 * the pill's radius and its right padding — the icon square is the same size in
 * both, which is what keeps the two variants the same height.
 */
const variants = {
  /* radius 20px is the value measured on the node; it is not one of the three
   * radii tokens.md lists. */
  large: "rounded-[20px] pr-6",
  small: "rounded-md pr-4",
} as const;

export function HeroSocialProof({
  metric,
  label,
  variant = "large",
  className,
}: {
  metric: string;
  label: string;
  variant?: keyof typeof variants;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex w-fit items-center gap-2 overflow-clip bg-background-light p-1 text-ink",
        variants[variant],
        className,
      )}
    >
      <span className="grid size-[70px] shrink-0 place-items-center rounded-md bg-ink">
        <Car className="size-7 text-background" aria-hidden />
      </span>
      <span className="flex flex-col items-start">
        <span className="text-body-xxl">{metric}</span>
        <span className="text-body">{label}</span>
      </span>
    </div>
  );
}
