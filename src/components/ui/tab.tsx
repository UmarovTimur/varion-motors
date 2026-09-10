"use client";

import { cn } from "@/lib/utils";

/**
 * Tab — ported from the Framer component `Tab` (IL7Y2kq0i), the body-type
 * filter on /inventory. The component is CMS-bound, so `getNodeXml` refuses it
 * (see the MCP limits); every value below is measured off the published page:
 *
 *   56px tall, radius 16, padding 16, contents centred.
 *   Active  — Black background, Text White, the same inset highlight the
 *             Secondary button carries (-10px -10px 20px rgb(255 255 255/.25)).
 *   Default — Background Mid (#fafafa), Text Black Muted.
 *
 * The XML never carries transitions; the colour swap uses the project's
 * 200ms / ease-out pair from tokens.md §6.
 */
export function Tab({
  active = false,
  className,
  ...rest
}: { active?: boolean } & Omit<
  React.ComponentPropsWithoutRef<"button">,
  "className"
> & { className?: string }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={cn(
        "flex h-14 w-full items-center justify-center gap-2.5 overflow-clip rounded-btn p-4 text-body whitespace-nowrap",
        "transition-colors duration-(--dur-fast) ease-out",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
        active
          ? "bg-ink text-paper shadow-[inset_-10px_-10px_20px_0_rgb(255_255_255/0.25)]"
          : "bg-background-mid text-ink-muted hover:text-ink",
        className,
      )}
      {...rest}
    />
  );
}
