"use client";

import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The form controls of the `Filters Bar` on /inventory. Framer builds them with
 * its own form elements, which the XML does not describe, so the geometry below
 * is measured off the published page:
 *
 *   Label     — column, gap 8; caption on the Body style, Text Black.
 *   Control   — 51px tall, radius 12, padding 16, Background Mid (#fafafa),
 *               value and placeholder in Text Black Muted.
 *   Checkbox  — 26px square, radius 6, Background Light; row gap 10, rows 8.
 */

const control =
  "h-[51px] w-full rounded-sm bg-background-mid px-4 text-body text-ink-muted outline-none placeholder:text-ink-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

export function FilterField({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("flex w-full flex-col items-start gap-2", className)}>
      <span className="text-body text-ink">{label}</span>
      {children}
    </label>
  );
}

export function FilterSelect({
  options,
  allLabel = "Все",
  className,
  ...rest
}: {
  options: readonly string[];
  allLabel?: string;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<"select">, "className" | "children">) {
  return (
    /* The chevron is drawn on the wrapper because a native select cannot hold
     * one; `appearance-none` removes the platform arrow it would sit next to. */
    <span className="relative w-full">
      <select
        className={cn(control, "appearance-none pr-11", className)}
        {...rest}
      >
        <option value="">{allLabel}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-ink-muted"
      />
    </span>
  );
}

export function FilterInput({
  className,
  ...rest
}: { className?: string } & Omit<
  React.ComponentPropsWithoutRef<"input">,
  "className"
>) {
  return (
    <input
      className={cn(control, "[appearance:textfield]", className)}
      {...rest}
    />
  );
}

export function FilterCheckbox({
  label,
  className,
  ...rest
}: { label: string; className?: string } & Omit<
  React.ComponentPropsWithoutRef<"input">,
  "className" | "type"
>) {
  return (
    <label
      className={cn(
        "flex w-full cursor-pointer flex-row items-center gap-2.5",
        className,
      )}
    >
      <span className="relative grid size-[26px] shrink-0 place-items-center">
        <input
          type="checkbox"
          className="peer size-[26px] cursor-pointer appearance-none rounded-[6px] bg-background-light transition-colors duration-(--dur-fast) ease-out checked:bg-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          {...rest}
        />
        <Check
          aria-hidden
          strokeWidth={2.5}
          className="pointer-events-none absolute size-3.5 text-paper opacity-0 peer-checked:opacity-100"
        />
      </span>
      <span className="text-body text-ink-muted">{label}</span>
    </label>
  );
}
