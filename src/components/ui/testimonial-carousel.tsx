"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Media } from "@/components/ui/media";
import type { Testimonial } from "@/lib/content";

/** Testimonial carousel with the prev/next controls sitting on the photo (§6). */
export function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true });
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setSelected(embla.selectedScrollSnap());
    onSelect();
    embla.on("select", onSelect);
    return () => {
      embla.off("select", onSelect);
    };
  }, [embla]);

  const scrollPrev = useCallback(() => embla?.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla?.scrollNext(), [embla]);

  return (
    <div className="isolate overflow-hidden rounded-card bg-paper">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {items.map((item) => (
            <figure
              key={item.author}
              className="flex min-w-0 shrink-0 grow-0 basis-full flex-col desktop:flex-row"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-card desktop:aspect-auto desktop:min-h-[420px] desktop:w-[45%] desktop:rounded-t-none desktop:rounded-l-card">
                <Media src={item.image} alt={item.author} />
                <div className="absolute bottom-4 left-4 flex gap-2">
                  <button
                    type="button"
                    onClick={scrollPrev}
                    aria-label="Previous testimonial"
                    className="grid size-11 place-items-center rounded-full bg-paper/90 text-ink backdrop-blur-md transition-colors hover:bg-paper"
                  >
                    <ArrowLeft className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={scrollNext}
                    aria-label="Next testimonial"
                    className="grid size-11 place-items-center rounded-full bg-paper/90 text-ink backdrop-blur-md transition-colors hover:bg-paper"
                  >
                    <ArrowRight className="size-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-between gap-8 p-8 desktop:p-12">
                <blockquote className="text-balance text-quote tracking-[-0.01em]">
                  “{item.quote}”
                </blockquote>
                <figcaption className="text-body-l text-ink-subtle">
                  {item.author} – {item.role}
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-2 pb-6">
        {items.map((item, i) => (
          <button
            key={item.author}
            type="button"
            onClick={() => embla?.scrollTo(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            aria-current={i === selected}
            className={
              i === selected
                ? "h-1.5 w-6 rounded-full bg-ink transition-all"
                : "h-1.5 w-1.5 rounded-full bg-ink/20 transition-all"
            }
          />
        ))}
      </div>
    </div>
  );
}
