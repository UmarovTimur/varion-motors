import { Container } from "@/components/ui/container";
import { SectionTop } from "@/components/ui/section-top";
import { TeamMemberCard } from "@/components/ui/team-member-card";
import { team } from "@/lib/content";

/**
 * Team (§7). Desktop is one row: the two cards on the left (835 of the 1416px
 * frame, 24px gap) and the header column on the right (501). The cards are
 * portrait photos at the same 3:4 ratio, so they no longer carry Framer's
 * 324 / 424px stagger — fixed heights would squash the photos back to landscape.
 */
export function Team() {
  return (
    <section id="team" className="bg-background">
      <Container className="flex flex-col gap-12 tablet:gap-16 desktop:flex-row desktop:items-center desktop:gap-20">
        {/* Left */}
        <div className="flex flex-col gap-6 tablet:flex-row tablet:items-center desktop:flex-[835]">
          {team.map((member) => (
            <TeamMemberCard key={member.name} member={member} />
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
