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
export function ArrowIcon({
  tone,
  animate = true,
  className,
}: {
  tone: "dark" | "light";
  animate?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "flex size-[46px] shrink-0 items-center justify-center overflow-hidden rounded-icon",
        tone === "dark"
          ? "bg-ink text-paper shadow-[inset_-10px_-10px_20px_0_rgb(255_255_255/0.25)]"
          : "bg-paper text-ink",
        className,
      )}
    >
      <span className="w-[18px] overflow-hidden">
        <span
          className={cn(
            "flex w-max -translate-x-[28px] gap-2.5",
            animate &&
              "transition-transform duration-(--dur-base) ease-out group-hover:translate-x-0",
          )}
        >
          <ArrowRight className="size-[18px] shrink-0" strokeWidth={2} aria-hidden />
          <ArrowRight className="size-[18px] shrink-0" strokeWidth={2} aria-hidden />
        </span>
      </span>
    </span>
  );
}
