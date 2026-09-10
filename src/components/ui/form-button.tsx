"use client";

import { AlertCircle, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type FormButtonState =
  "idle" | "loading" | "disabled" | "success" | "error";

/**
 * Form Button (§4 of the Button spec) — the submit control.
 * Fixed 240x56 in the design; pass `className="w-full"` inside a real form.
 */
export function FormButton({
  children,
  state = "idle",
  className,
  ...rest
}: {
  children: React.ReactNode;
  state?: FormButtonState;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<"button">, "className" | "children">) {
  const busy = state === "loading";
  const disabled = busy || state === "disabled";

  return (
    <button
      type="submit"
      disabled={disabled}
      aria-busy={busy}
      className={cn(
        "inline-flex h-[56px] w-[240px] items-center justify-center gap-2 overflow-hidden rounded-btn bg-ink font-display text-body font-medium text-paper",
        "shadow-[inset_-10px_-10px_20px_0_rgb(255_255_255/0.25)]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
        state === "disabled" && "cursor-not-allowed opacity-50",
        className,
      )}
      {...rest}
    >
      {state === "loading" ? (
        <>
          <Loader2 className="size-5 animate-spin" aria-hidden />
          <span className="sr-only">Sending…</span>
        </>
      ) : state === "success" ? (
        <Check className="size-5" aria-hidden />
      ) : state === "error" ? (
        <AlertCircle className="size-5" aria-hidden />
      ) : (
        children
      )}
    </button>
  );
}
