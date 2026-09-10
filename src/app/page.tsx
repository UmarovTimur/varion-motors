import { Hero } from "@/components/sections/hero";
import { FeaturedVehicles } from "@/components/sections/featured-vehicles";
import { Services } from "@/components/sections/services";
import { Testimonials } from "@/components/sections/testimonials";
import { Team } from "@/components/sections/team";
import { Blog } from "@/components/sections/blog";
import { CallToAction } from "@/components/sections/call-to-action";
import { Faq } from "@/components/sections/faq";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedVehicles />
      <Services />
      <Testimonials />
      <Team />
      <Blog />
      <CallToAction />
      <Faq />
    </>
  );
}
