"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Media } from "@/components/ui/media";
import { cn } from "@/lib/utils";

/**
 * Gallery from the Framer detail page: a 500px-tall, 16px-radius carousel with
 * the two 48px arrows sitting on the photo and 8px dots underneath.
 */
export function CarGallery({
  images,
  alt,
  className,
}: {
  images: string[];
  alt: string;
  className?: string;
}) {
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

  const prev = useCallback(() => embla?.scrollPrev(), [embla]);
  const next = useCallback(() => embla?.scrollNext(), [embla]);

  return (
    <div
      className={cn(
        "relative h-[320px] overflow-hidden rounded-card tablet:h-[500px]",
        className,
      )}
    >
      <div ref={emblaRef} className="h-full overflow-hidden">
        <div className="flex h-full">
          {images.map((src, i) => (
            <div
              key={src + i}
              className="relative h-full min-w-0 shrink-0 grow-0 basis-full"
            >
              <Media src={src} alt={alt} priority={i === 0} />
            </div>
          ))}
        </div>
      </div>

      {images.length > 1 ? (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Предыдущее фото"
            className="absolute bottom-4 left-4 grid size-12 place-items-center rounded-icon bg-paper text-ink"
          >
            <ArrowLeft className="size-[18px]" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Следующее фото"
            className="absolute right-4 bottom-4 grid size-12 place-items-center rounded-icon bg-paper text-ink"
          >
            <ArrowRight className="size-[18px]" />
          </button>
          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
            {images.map((src, i) => (
              <span
                key={src + i}
                aria-hidden
                className={cn(
                  "size-2 rounded-full bg-paper transition-opacity duration-(--dur-fast) ease-out",
                  i === selected ? "opacity-100" : "opacity-40",
                )}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
