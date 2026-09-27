import { Banknote, Car, Shield, Users } from "lucide-react";
import type { TrustPoint } from "@/lib/content";
import { cn, typo } from "@/lib/utils";

const icons = {
  shield: Shield,
  car: Car,
  banknote: Banknote,
  users: Users,
} satisfies Record<TrustPoint["icon"], typeof Shield>;

/**
 * Trust card ("Почему выбирают Varion Motors") — a plain white tile: icon,
 * title, body. No photo, unlike the other Service tiles in this section, so
 * it reads as a fact rather than a mood shot.
 */
export function TrustCard({
  icon,
  title,
  body,
  className,
}: TrustPoint & { className?: string }) {
  const Icon = icons[icon];
  return (
    <article
      className={cn(
        "flex flex-1 flex-col gap-4 rounded-card border border-grey bg-background-light p-5 tablet:gap-6 tablet:p-6",
        className,
      )}
    >
      <Icon className="size-7 text-ink tablet:size-8" strokeWidth={1.5} aria-hidden />
      <div className="flex flex-col gap-2">
        <h3 className="text-h5 text-ink">{typo(title)}</h3>
        <p className="text-body text-ink-muted">{typo(body)}</p>
      </div>
    </article>
  );
}
