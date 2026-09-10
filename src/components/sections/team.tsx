import { Container } from "@/components/ui/container";
import { SectionTop } from "@/components/ui/section-top";
import { TeamMemberCard } from "@/components/ui/team-member-card";
import { team } from "@/lib/content";

/** Team (§7) */
export function Team() {
  return (
    <section className="bg-surface-mid py-24">
      <Container className="flex flex-col gap-14">
        <SectionTop
          tag="Our team"
          title="Meet The Experts."
          body="Passionate about cars, precision, and exceptional service. Meet the people who make it happen."
          action={{ label: "Learn More", href: "/about-us" }}
        />

        <div className="grid gap-6 tablet:grid-cols-2">
          {team.map((member) => (
            <TeamMemberCard key={member.name} member={member} />
          ))}
        </div>
      </Container>
    </section>
  );
}
