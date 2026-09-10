import { cn } from "@/lib/utils";

/**
 * The diagonal white flash that crosses a control on hover (the `Frame` layer
 * in the Framer components). Shared by Link Item, Button and Contact Link.
 *
 * At rest the bar sits at left:-40px, fully outside the left edge. On hover it
 * travels the width of its container plus both overhangs — 40px on the left and
 * the 18px the bar still needs on the right (40 - 22) — so it clears the right
 * edge instead of stalling inside it.
 *
 * `container-type: inline-size` lives on an absolutely positioned wrapper, NOT
 * on the control itself: inline-size containment stops an element being sized by
 * its own content, which collapsed every button and pill to its padding. The
 * wrapper takes its width FROM the control, so `100cqw` still resolves to the
 * control's width while leaving that width content-derived.
 *
 * The control must carry `relative`, `overflow-hidden` and `group`.
 */
export function Sweep({
  className,
  animate = true,
}: {
  className?: string;
  animate?: boolean;
}) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 z-(--z-decor) [container-type:inline-size]"
    >
      <span
        className={cn(
          "absolute left-[-40px] w-[22px] rotate-[25deg] bg-background-light",
          animate &&
            "transition-transform duration-(--dur-slow) ease-out group-hover:translate-x-[calc(100cqw+58px)]",
          className,
        )}
      />
    </span>
  );
}
