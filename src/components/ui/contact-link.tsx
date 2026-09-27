import { MapPin, Mail, Phone } from "lucide-react";
import { Sweep } from "@/components/ui/sweep";
import { cn } from "@/lib/utils";

const icons = { Location: MapPin, Mail, Phone } as const;

/**
 * Contact Link (§7) — 52x52 icon link, radius 16.
 * Primary sits on black, Secondary on #D9D9D9; both take the same diagonal
 * sweep on hover at 10% opacity.
 */
export function ContactLink({
  icon,
  href,
  ariaLabel,
  variant = "primary",
  className,
}: {
  icon: keyof typeof icons;
  href: string;
  ariaLabel: string;
  variant?: "primary" | "secondary";
  className?: string;
}) {
  const Icon = icons[icon];

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={ariaLabel}
      className={cn(
        "group relative isolate grid size-[52px] shrink-0 place-items-center overflow-hidden rounded-btn",
        variant === "primary" ? "bg-ink" : "bg-grey",
        className,
      )}
    >
      <Sweep className="top-[-21px] h-[97px] opacity-10" />
      <Icon
        className="relative z-(--z-content) size-[18px] text-background"
        aria-hidden
      />
    </a>
  );
}
