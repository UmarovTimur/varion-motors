import { cn } from "@/lib/utils";

/**
 * Section eyebrow using the TAG text style (§14): 16px / 1.5, medium, uppercase,
 * no extra tracking and no bullet — Framer's Section Tag is the text alone.
 */
export function Tag({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center text-tag uppercase",
        "text-ink-subtle",
        className,
      )}
    >
      {children}
    </span>
  );
}
