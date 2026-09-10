import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import { RoundShaper } from "@/components/ui/round-shaper";
import { formatDate, type Post } from "@/lib/content";

/**
 * Blog Card — ported from the Framer component `Blog Card`.
 *
 * Full-bleed photo under a dark gradient, copy pinned to the bottom, and the
 * arrow notch carved out of the TOP-RIGHT corner (the mirror of Cars Card,
 * which carves the bottom-right).
 */
export function BlogCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative isolate flex aspect-[435/384] flex-col justify-end overflow-clip rounded-md bg-background-mid p-6"
    >
      <Image
        src={post.image}
        alt={post.title}
        fill
        sizes="(min-width: 810px) 50vw, 100vw"
        className="z-(--z-decor) object-cover object-center"
      />
      <div
        aria-hidden
        className="absolute inset-0 z-(--z-decor) overlay-linear"
      />

      {/* Texts */}
      <div className="relative z-(--z-content) flex flex-col items-start gap-1 overflow-clip">
        <time dateTime={post.date} className="text-body text-paper-muted">
          {formatDate(post.date)}
        </time>
        <p className="text-body text-paper">{post.title}</p>
      </div>

      {/* Round Corner — patch in the top-right, rounded only where it meets
       * the photo, with the two 26px fillets turned 90deg. */}
      <span className="absolute top-0 right-0 z-(--z-content) size-[56px] rounded-bl-md bg-surface">
        <RoundShaper variant="sm" className="top-0 left-[-25px] rotate-90" />
        <RoundShaper
          variant="sm"
          className="top-[55px] left-[30px] rotate-90"
        />
        <ArrowIcon tone="dark" className="absolute top-1 right-1 size-12" />
      </span>
    </Link>
  );
}
