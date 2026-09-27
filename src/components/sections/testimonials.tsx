import { Container } from "@/components/ui/container";
import { GoogleRating } from "@/components/ui/google-rating";
import { SectionTop } from "@/components/ui/section-top";
import { TestimonialCarousel } from "@/components/ui/testimonial-carousel";
import { testimonials } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Testimonials (§6).
 *
 * Desktop row is 548px tall and bottom-aligned: the carousel takes 619 of the
 * 1416px frame, the right group 773 — two dark stat tiles of unequal height
 * (60% and 80% of the row, which is what gives the staircase) and the Google
 * rating in the last 139px.
 */
function MetricTile({
  metric,
  label,
  className,
}: {
  metric: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-1 flex-col justify-between gap-6 rounded-card bg-ink-soft p-6",
        className,
      )}
    >
      <span className="text-metric text-grey-dark">{metric}</span>
      <span className="text-body text-ink-muted">{label}</span>
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="bg-background">
      <Container className="flex flex-col gap-8 tablet:gap-16 desktop:gap-20">
        <SectionTop
          tag="Testimonials"
          title="Great Numbers, Happy Owners."
          body="Real experiences from customers who found their perfect car and trusted us completely."
          action={{ label: "Browse Inventory", href: "/inventory" }}
        />

        {/* Container */}
        <div className="flex flex-col gap-6 desktop:h-[548px] desktop:flex-row desktop:items-end">
          <TestimonialCarousel
            items={testimonials}
            className="desktop:h-full desktop:flex-[619]"
          />

          {/* Right */}
          <div className="flex flex-row items-end gap-6 desktop:h-full desktop:flex-[773]">
            <MetricTile
              metric="20+"
              label="Years of Experience"
              className="h-[240px] desktop:h-[60%]"
            />
            <MetricTile
              metric="800+"
              label="Happy Owners"
              className="h-[320px] desktop:h-[80%]"
            />
            <GoogleRating className="w-[139px] shrink-0" />
          </div>
        </div>
      </Container>
    </section>
  );
}
