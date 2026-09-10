"use client";

import { useState } from "react";
import { Copy } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * "Copy VIN" / "Copy Stock" from the Framer detail page: 47px pill on #FAFAFA,
 * 16px radius, 12px padding, 14px label with a small icon.
 */
export function CopyButton({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {
          setCopied(false);
        }
      }}
      className={cn(
        "flex h-[47px] items-center gap-2 rounded-md bg-background-mid px-3 text-body-xs font-medium text-ink",
        className,
      )}
    >
      <Copy className="size-3.5 shrink-0" aria-hidden />
      {copied ? "Скопировано" : label}
    </button>
  );
}
