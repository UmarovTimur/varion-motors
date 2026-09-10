import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

/** Google rating group: the "5 Stars" row over "From +4000 reviews" (14px). */
export function GoogleRating({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex flex-col items-end justify-end gap-2.5", className)}
    >
      <div className="flex flex-row items-center gap-3">
        <span
          aria-hidden
          className="flex size-5 items-center justify-center rounded-full bg-paper text-[13px] font-bold text-ink"
        >
          G
        </span>
        <span className="text-body font-medium">5,0</span>
        <span className="flex gap-0.5" aria-hidden>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="size-3.5 fill-current" />
          ))}
        </span>
      </div>
      <p className="text-body-xs text-ink-muted">
        <span className="sr-only">Google rating 5 out of 5. </span>
        From +4000 reviews
      </p>
    </div>
  );
}
