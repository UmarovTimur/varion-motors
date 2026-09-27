import { Button, type ButtonVariant } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { cn, typo } from "@/lib/utils";

/**
 * Section Top — Framer's repeated section header: "Title & Tag" plus a "Wrap"
 * holding the body copy and the button (Wrap gap 24, header gap 16).
 *
 * Three arrangements appear across the site:
 *  - `split`  — Title & Tag left, Wrap right-aligned with the button above the
 *               copy (Featured Vehicles, Testimonials).
 *  - `stack`  — one left-aligned column, copy then button; used where the
 *               header sits beside the section content (Team, Blog, FAQ,
 *               Services).
 *  - `center` — the same column, centred (Call To Action).
 *  - `aside`  — Services: a row on tablet, then on desktop a full-height column
 *               with the copy and button pushed to the bottom.
 */
export function SectionTop({
  tag,
  title,
  body,
  action,
  tone = "dark",
  variant = "split",
  className,
}: {
  tag?: string;
  title: string;
  body?: string;
  /** `lead` makes the button open the lead dialog (see ui/lead-dialog). */
  action?: {
    label: string;
    href: string;
    variant?: ButtonVariant;
    lead?: boolean;
  };
  tone?: "dark" | "light";
  variant?: "split" | "stack" | "center" | "aside";
  className?: string;
}) {
  const center = variant === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        variant === "split" &&
          "gap-8 desktop:flex-row desktop:items-end desktop:justify-between desktop:gap-20",
        variant === "aside" &&
          "gap-8 tablet:flex-row tablet:items-end tablet:justify-between tablet:gap-8 desktop:flex-col desktop:items-start desktop:justify-between desktop:gap-8",
        center && "items-center text-center",
        className,
      )}
    >
      {/* Title & Tag */}
      <div
        className={cn(
          "flex flex-col gap-4",
          variant === "split" && "desktop:flex-1",
          variant === "aside" && "tablet:flex-1 desktop:flex-none",
          center && "items-center",
        )}
      >
        {tag ? (
          <Tag className={tone === "light" ? "text-white/75" : undefined}>
            {tag}
          </Tag>
        ) : null}
        <h2
          className={cn(
            "max-w-[480px] text-balance text-h2",
            tone === "light" ? "text-white" : "text-ink",
          )}
        >
          {typo(title)}
        </h2>
      </div>

      {body || action ? (
        /* Wrap */
        <div
          className={cn(
            "flex flex-col items-start gap-6",
            variant === "split" &&
              "desktop:flex-1 desktop:flex-col-reverse desktop:items-end",
            variant === "aside" &&
              "tablet:flex-1 tablet:items-end desktop:items-start",
            center && "items-center",
          )}
        >
          {body ? (
            <p
              className={cn(
                "max-w-[480px] text-body",
                variant === "split" && "desktop:text-right",
                tone === "light" ? "text-white" : "text-ink-muted",
              )}
            >
              {body}
            </p>
          ) : null}
          {action ? (
            <Button
              href={action.href}
              variant={action.variant ?? "secondary"}
              data-lead={action.lead ? "" : undefined}
            >
              {action.label}
            </Button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
