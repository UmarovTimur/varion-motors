"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Media } from "@/components/ui/media";
import { RoundShaper } from "@/components/ui/round-shaper";
import type { Testimonial } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Testimonial carousel — Framer's `Testimonials` card.
 *
 * The card is a #FAFAFA panel: a 12px-radius photo filling the top ~75% with
 * the two 48px black arrow buttons carved into its top corners (the same patch
 * + Round Shaper trick the Cars Card uses on its bottom-right), and the quote
 * and author in a 20px-padded block underneath.
 */
export function TestimonialCarousel({
  items,
  className,
}: {
  items: Testimonial[];
  className?: string;
}) {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true });
  const [, setSelected] = useState(0);

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
    <div
      className={cn(
        "flex flex-col justify-end overflow-hidden rounded-card bg-background-mid",
        className,
      )}
    >
      <div ref={emblaRef} className="flex-1 overflow-hidden">
        <div className="flex h-full">
          {items.map((item) => (
            <figure
              key={item.author}
              className="flex h-full min-w-0 shrink-0 grow-0 basis-full flex-col justify-end"
            >
              {/* Image */}
              <div className="relative flex-1 overflow-hidden rounded-sm">
                <Media src={item.image} alt={item.author} />

                {/* Round Corner — the two carved patches */}
                <span className="absolute top-0 left-0 z-(--z-content) flex size-[56px] items-center justify-center rounded-br-md bg-background p-1">
                  <RoundShaper variant="lg" className="top-[56px] left-0" />
                  <RoundShaper variant="lg" className="top-0 left-[56px]" />
                </span>
                <span className="absolute top-0 right-0 z-(--z-content) flex size-[56px] items-center justify-center rounded-bl-md bg-background p-1">
                  <RoundShaper
                    variant="lg"
                    className="top-0 right-[56px] rotate-90"
                  />
                  <RoundShaper
                    variant="lg"
                    className="top-[56px] right-0 rotate-90"
                  />
                </span>

                <button
                  type="button"
                  onClick={scrollPrev}
                  aria-label="Previous testimonial"
                  className="absolute top-1 left-1 z-(--z-content) grid size-12 place-items-center rounded-icon bg-black text-text-white"
                >
                  <ArrowLeft className="size-[18px]" />
                </button>
                <button
                  type="button"
                  onClick={scrollNext}
                  aria-label="Next testimonial"
                  className="absolute top-1 right-1 z-(--z-content) grid size-12 place-items-center rounded-icon bg-black text-text-white"
                >
                  <ArrowRight className="size-[18px]" />
                </button>
              </div>

              {/* Texts */}
              <figcaption className="flex flex-col items-start justify-end gap-4 p-5">
                <blockquote className="text-body-xl">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <p className="text-body text-ink-muted">
                  {item.author} - {item.role}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
