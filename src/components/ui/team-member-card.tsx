import Image from "next/image";
import type { TeamMember } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Team Member Card — a profile row rather than Framer's photo tile.
 *
 * A 3:4 portrait photo sits beside the name/role/bio text instead of on top of it.
 * The tile-with-tall-portrait layout this replaced forced every card to the
 * same photo-driven height, which broke as soon as one member (Akmal) got a
 * full first-person bio and the other didn't — either the text got clipped
 * behind a "read more" toggle, or the two cards stopped matching. A profile
 * row has no such constraint: the photo is a fixed size (large enough to
 * actually read as a portrait, not a tiny avatar), the text column beside it
 * is free to run as long as it needs to, and a member with no bio just
 * renders a shorter row next to a taller one — normal for a plain list, not
 * for a grid of equal-height tiles.
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
        "flex items-start gap-5 rounded-card border border-grey bg-background-light p-5 tablet:gap-6 tablet:p-6",
        className,
      )}
    >
      <div className="relative aspect-[3/4] w-28 shrink-0 overflow-clip rounded-md tablet:w-36">
        <Image
          src={member.image}
          alt={member.name}
          fill
          sizes="(min-width: 810px) 144px, 112px"
          className="object-cover object-top"
        />
      </div>
      <div className="flex flex-1 flex-col items-start gap-1">
        <p className="text-body text-ink">{member.name}</p>
        <p className="text-body-xs text-ink-muted">{member.role}</p>
        {member.bio && (
          <p className="mt-2 text-body-xs text-ink-muted">{member.bio}</p>
        )}
      </div>
    </article>
  );
}
