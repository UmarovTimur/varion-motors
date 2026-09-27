import { site } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { SectionTop } from "@/components/ui/section-top";
import { TeamMemberCard } from "@/components/ui/team-member-card";
import { team } from "@/lib/content";

/**
 * Team (§7). Desktop is one row: the member list on the left (835 of the
 * 1416px frame, 24px gap) and the header column on the right (501).
 *
 * The cards used to be tall 3:4 portrait tiles — fine with a one-line role
 * under the photo, but Akmal's card now carries a full first-person bio,
 * and a photo-driven tile can't flex to fit that without either clipping
 * the text or towering over Timur's shorter card. A plain stacked list of
 * profile rows (small round avatar + free-length text) sidesteps the
 * problem entirely and reads fine at every width, so it's now the layout
 * from phone up — no separate mobile treatment needed.
 */
export function Team() {
  return (
    <section id="team" className="bg-background">
      <Container className="flex flex-col gap-8 tablet:gap-16 desktop:flex-row desktop:items-start desktop:gap-20">
        {/* Left */}
        <div className="flex flex-col gap-4 tablet:gap-5 desktop:flex-[835]">
          {team.map((member) => (
            <TeamMemberCard key={member.name} member={member} />
          ))}
        </div>

        <SectionTop
          variant="stack"
          tag="О команде"
          title="С кем вы работаете"
          body="Varion Motors — команда, которая подбирает и привозит автомобили из Кореи и Китая под ключ. Каждую сделку ведём лично: от выбора машины и проверки до растаможки и передачи ключей. Связь напрямую с нами в Telegram — без колл-центра и посредников."
          action={{ label: "Написать в Telegram", href: site.telegram }}
          className="desktop:flex-[501]"
        />
      </Container>
    </section>
  );
}
