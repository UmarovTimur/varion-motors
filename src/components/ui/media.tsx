import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Fills its positioned parent with a photo, cover-cropped.
 * Every call site passes src/alt and relies on the parent for size, which is
 * how the Framer image layers behave.
 */
export function Media({
  src,
  alt,
  className,
  priority,
  sizes = "100vw",
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className={cn("object-cover object-center", className)}
    />
  );
}
