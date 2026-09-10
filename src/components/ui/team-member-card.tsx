import Image from "next/image";
import type { TeamMember } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Team Member Card — ported from the Framer component `Team Card`.
 *
 * Photo on top with its bottom corners rounded, name and role in dark text on
 * the card's own #FAFAFA below it — not an overlay caption on the photo.
 */
export function TeamMemberCard({
  member,
  className,
}: {
  member: TeamMember;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "flex flex-1 flex-col justify-end overflow-clip rounded-md bg-background-mid",
        className,
      )}
    >
      <div className="relative aspect-[406/244] w-full flex-1 overflow-clip rounded-b-md">
        <Image
          src={member.image}
          alt={member.name}
          fill
          sizes="(min-width: 810px) 50vw, 100vw"
          className="object-cover object-center"
        />
      </div>
      <div className="flex flex-col items-start justify-center overflow-clip p-4">
        <p className="text-body">{member.name}</p>
        <p className="text-body text-ink-muted">{member.role}</p>
      </div>
    </article>
  );
}
