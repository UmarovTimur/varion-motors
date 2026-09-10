import { Media } from "@/components/ui/media";
import { cn } from "@/lib/utils";

/** Image tile with the "Linear" dark overlay and a bottom-left label (§5). */
export function ServiceBlock({
  title,
  image,
  className,
}: {
  title: string;
  image: string;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group relative isolate overflow-hidden rounded-card",
        className,
      )}
    >
      <Media
        src={image}
        alt={title}
        className="transition-transform duration-500 group-hover:scale-105"
      />
      <div aria-hidden className="absolute inset-0 overlay-linear" />
      <h3 className="absolute bottom-0 left-0 p-6 text-h4 font-semibold text-paper">
        {title}
      </h3>
    </article>
  );
}
