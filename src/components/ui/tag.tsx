import { cn } from "@/lib/utils";

/** Section eyebrow using the TAG text style (§14). */
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
        "inline-flex items-center gap-2 text-tag tracking-[0.08em] uppercase",
        "text-ink-subtle",
        className,
      )}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}
