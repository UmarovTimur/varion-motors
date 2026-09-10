import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { cn } from "@/lib/utils";

/**
 * Section Top — the repeated header block: Title & Tag on the left,
 * Wrap (body copy + button) on the right.
 */
export function SectionTop({
  tag,
  title,
  body,
  action,
  tone = "dark",
  className,
}: {
  tag?: string;
  title: string;
  body?: string;
  action?: { label: string; href: string; variant?: "primary" | "secondary" };
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-8 desktop:flex-row desktop:items-end desktop:justify-between",
        className,
      )}
    >
      <div className="flex max-w-[560px] flex-col gap-4">
        {tag ? (
          <Tag className={tone === "light" ? "text-paper-muted" : undefined}>
            {tag}
          </Tag>
        ) : null}
        <h2
          className={cn(
            "text-balance text-h2",
            tone === "light" ? "text-paper" : "text-ink",
          )}
        >
          {title}
        </h2>
      </div>

      {body || action ? (
        <div className="flex max-w-[420px] flex-col items-start gap-6">
          {body ? (
            <p
              className={cn(
                "text-body-l",
                tone === "light" ? "text-paper-muted" : "text-ink-muted",
              )}
            >
              {body}
            </p>
          ) : null}
          {action ? (
            <Button href={action.href} variant={action.variant ?? "primary"}>
              {action.label}
            </Button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
