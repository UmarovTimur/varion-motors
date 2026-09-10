import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import { RoundShaper } from "@/components/ui/round-shaper";
import type { Car } from "@/lib/content";

/**
 * Cars Card — ported from the Framer component `Cars Card`.
 *
 * The card itself has no background: it is the 16px-radius photo with a
 * 56px arrow patch carved out of its bottom-right corner, over a 16px text
 * row. The patch is painted in the section background and joined to the photo
 * edges by two Round Shaper fillets, which is what makes it read as a notch.
 */
export function CarsCard({ car }: { car: Car }) {
  return (
    <Link
      href={`/inventory/${car.slug}`}
      className="group flex flex-col overflow-clip"
    >
      {/* Image */}
      <div className="relative aspect-[456/282] w-full overflow-hidden rounded-md">
        <Image
          src={car.image}
          alt={car.name}
          fill
          sizes="(min-width: 1200px) 456px, (min-width: 810px) 50vw, 100vw"
          className="object-cover object-center"
        />

        {/* Arrow — a patch of section background, rounded only where it meets
         * the photo. The two fillets are placed against the patch and turned
         * 180deg, exactly as the Framer instances are. */}
        <span className="absolute right-0 bottom-0 z-(--z-content) flex size-[56px] flex-col items-center justify-center rounded-tl-md bg-surface p-1">
          <RoundShaper
            variant="lg"
            className="top-[-34px] left-[22px] rotate-180"
          />
          <RoundShaper
            variant="lg"
            className="top-[22px] left-[-34px] rotate-180"
          />
          <ArrowIcon tone="dark" className="size-12" />
        </span>
      </div>

      {/* Texts */}
      <div className="flex w-full items-start gap-2.5 overflow-clip p-4">
        <div className="flex flex-1 flex-col items-start gap-1">
          <p className="text-body-xl">{car.name}</p>
          <p className="text-body text-ink-muted">{car.year}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <p className="flex items-center gap-0.5 text-body-xl">
            {car.priceLabel ? (
              <span>{car.priceLabel}</span>
            ) : (
              <>
                <span>$</span>
                <span>{car.price.toLocaleString("en-US")}</span>
              </>
            )}
          </p>
          {car.badge ? (
            <p className="text-body text-ink-muted">{car.badge}</p>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
