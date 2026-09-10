import { Container } from "@/components/ui/container";
import { SectionTop } from "@/components/ui/section-top";
import { ServiceBlock } from "@/components/ui/service-block";
import { services } from "@/lib/content";

/** Services (§5) */
export function Services() {
  const [first, second, ...rest] = services;

  return (
    <section className="bg-surface-mid py-24">
      <Container className="flex flex-col gap-14">
        <SectionTop
          tag="Services"
          title="We're Way More Than a Dealership"
          body="Premium vehicles deserve premium service — and that's exactly what you'll get."
          action={{ label: "Browse Inventory", href: "/inventory" }}
        />

        <div className="grid gap-6 desktop:grid-cols-2">
          {/* Left */}
          <div className="grid gap-6">
            <ServiceBlock {...first} className="min-h-[300px]" />
            <ServiceBlock {...second} className="min-h-[300px]" />
          </div>

          {/* Right */}
          <div className="grid gap-6 tablet:grid-cols-2 desktop:grid-cols-2">
            {rest.map((service, i) => (
              <ServiceBlock
                key={service.title}
                {...service}
                className={
                  i === rest.length - 1 && rest.length % 2 === 1
                    ? "min-h-[280px] tablet:col-span-2"
                    : "min-h-[280px]"
                }
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
