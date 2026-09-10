import { Container } from "@/components/ui/container";
import { SectionTop } from "@/components/ui/section-top";
import { TeamMemberCard } from "@/components/ui/team-member-card";
import { team } from "@/lib/content";

/**
 * Team (§7). Desktop is one row: the two cards on the left (835 of the 1416px
 * frame, 24px gap) and the header column on the right (501), with the cards
 * staggered — 324px and 424px tall.
 */
export function Team() {
  return (
    <section className="bg-background">
      <Container className="flex flex-col gap-12 tablet:gap-16 desktop:flex-row desktop:items-center desktop:gap-20">
        {/* Left */}
        <div className="flex flex-col gap-6 tablet:flex-row tablet:items-center desktop:flex-[835]">
          {team.map((member, i) => (
            <TeamMemberCard
              key={i}
              member={member}
              className={i === 0 ? "tablet:h-[324px]" : "tablet:h-[424px]"}
            />
          ))}
        </div>

        <SectionTop
          variant="stack"
          tag="О команде"
          title="С кем вы работаете"
          body="[Одно-два предложения: кто вы, сколько лет в этом и почему занялись именно перевозкой авто.] Отвечаем в Telegram сами — без колл-центра и менеджеров."
          action={{ label: "Написать в Telegram", href: "/about-us" }}
          className="desktop:flex-[501]"
        />
      </Container>
    </section>
  );
}
