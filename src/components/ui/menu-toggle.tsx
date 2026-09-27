"use client";

import { cn } from "@/lib/utils";

/**
 * Mobile Menu (§5) — 54x54 ink square (black; light in the dark theme), radius 12, holding two 17x1px bars at
 * top:22 / bottom:22. The Close variant folds the same two bars into a cross.
 */
export function MenuToggle({
  open,
  onClick,
  className,
}: {
  open: boolean;
  onClick: () => void;
  className?: string;
}) {
  const bar =
    "absolute left-1/2 h-px w-3 -translate-x-1/2 bg-background transition-all duration-300 tablet:w-[17px]";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={open}
      aria-label={open ? "Close menu" : "Open menu"}
      className={cn(
        "relative size-11 shrink-0 overflow-hidden rounded-icon bg-ink tablet:size-[54px]",
        className,
      )}
    >
      <span
        className={cn(bar, open ? "top-1/2 rotate-45" : "top-[18px] rotate-0 tablet:top-[22px]")}
      />
      <span
        className={cn(
          bar,
          open
            ? "top-1/2 -rotate-45"
            : "top-[calc(100%-18px)] rotate-0 tablet:top-[calc(100%-22px)]",
        )}
      />
    </button>
  );
}
