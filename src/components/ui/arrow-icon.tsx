import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Arrow Icon — the 46x46 square that sits inside a Button.
 *
 * The hover move is a two-arrow strip inside an 18px window. At rest the strip
 * is shifted left by 28px (18 arrow + 10 gap) so the SECOND arrow is the one on
 * screen; on hover it slides back to 0, which sends that arrow out to the right
 * while the first one arrives from the left.
 */
const sizes = {
  md: { box: "size-[46px]", win: "w-[18px]", shift: "-translate-x-[28px]", icon: "size-[18px]" },
  sm: { box: "size-9 rounded-[10px]", win: "w-[14px]", shift: "-translate-x-[24px]", icon: "size-[14px]" },
};

export function ArrowIcon({
  tone,
  animate = true,
  size = "md",
  className,
}: {
  tone: "dark" | "light";
  animate?: boolean;
  size?: keyof typeof sizes;
  className?: string;
}) {
  const s = sizes[size];
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden rounded-icon",
        tone === "dark"
          ? "bg-ink text-paper shadow-[inset_-10px_-10px_20px_0_rgb(255_255_255/0.25)]"
          : "bg-paper text-ink",
        s.box,
        className,
      )}
    >
      <span className={cn("overflow-hidden", s.win)}>
        <span
          className={cn(
            "flex w-max gap-2.5",
            s.shift,
            animate &&
              "transition-transform duration-(--dur-base) ease-out group-hover:translate-x-0",
          )}
        >
          <ArrowRight
            className={cn("shrink-0", s.icon)}
            strokeWidth={2}
            aria-hidden
          />
          <ArrowRight
            className={cn("shrink-0", s.icon)}
            strokeWidth={2}
            aria-hidden
          />
        </span>
      </span>
    </span>
  );
}
