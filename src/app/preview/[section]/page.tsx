import { Hero } from "@/components/sections/hero";
import { FeaturedVehicles } from "@/components/sections/featured-vehicles";
import { Services } from "@/components/sections/services";
import { Testimonials } from "@/components/sections/testimonials";
import { Team } from "@/components/sections/team";
import { Blog } from "@/components/sections/blog";
import { CallToAction } from "@/components/sections/call-to-action";
import { Faq } from "@/components/sections/faq";
import { Steps } from "@/components/sections/steps";

const map: Record<string, () => React.ReactElement | Promise<React.ReactElement>> = {
  hero: Hero,
  featured: FeaturedVehicles,
  services: Services,
  testimonials: Testimonials,
  team: Team,
  blog: Blog,
  cta: CallToAction,
  faq: Faq,
  steps: Steps,
};

export default async function Page({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const C = map[section];
  return C ? <C /> : <div>unknown</div>;
}
