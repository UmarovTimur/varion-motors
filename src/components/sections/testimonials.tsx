import { Star } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionTop } from "@/components/ui/section-top";
import { TestimonialCarousel } from "@/components/ui/testimonial-carousel";
import { testimonials } from "@/lib/content";

function MetricTile({ metric, label }: { metric: string; label: string }) {
  return (
    <div className="flex flex-col justify-between gap-6 rounded-card bg-ink p-8 text-paper">
      <span className="text-metric font-medium tracking-normal">
        {metric}
      </span>
      <span className="text-body-l text-paper-muted">{label}</span>
    </div>
  );
}

/** Testimonials (§6) */
export function Testimonials() {
  return (
    <section className="bg-surface py-24">
      <Container className="flex flex-col gap-14">
        <SectionTop
          tag="Testimonials"
          title="Great Numbers, Happy Owners."
          body="Real experiences from customers who found their perfect car and trusted us completely."
          action={{ label: "Browse Inventory", href: "/inventory" }}
        />

        <div className="grid gap-6 desktop:grid-cols-[1fr_360px]">
          <TestimonialCarousel items={testimonials} />

          <div className="grid gap-6">
            <MetricTile metric="20+" label="Years of Experience" />
            <MetricTile metric="800+" label="Happy Owners" />
            <div className="flex flex-col gap-2 rounded-card bg-paper p-8">
              <div className="flex items-center gap-3">
                <span className="text-h3 font-semibold">5,0</span>
                <span className="flex gap-0.5" aria-hidden>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </span>
              </div>
              <p className="text-body text-ink-subtle">
                <span className="sr-only">Google rating 5 out of 5. </span>
                From +4000 reviews
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
