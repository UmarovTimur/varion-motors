import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/ui/search-bar";
import { HeroSocialProof } from "@/components/ui/hero-social-proof";

/**
 * Hero (§3).
 * Full-bleed section holding a black container inset 8px on the sides and
 * bottom, 70px from the top so it clears the fixed navbar.
 *
 * Layout below desktop follows §7: the columns stack on phone, the gap steps
 * 32 -> 40 -> 80, and the height drops the fixed 100vh for 100svh so the mobile
 * address bar cannot clip it.
 */
export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="flex h-auto min-h-[100svh] w-full flex-col items-center justify-start gap-2.5 overflow-clip bg-background px-2 pt-[70px] pb-2 tablet:h-screen"
    >
      {/* Container */}
      <div className="relative z-1 flex w-full flex-1 items-center justify-center overflow-clip rounded-md bg-black">
        {/* Background */}
        <Image
          src="/media/hero.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="z-0 object-cover object-center"
        />
        {/* DarkOverlay */}
        <div aria-hidden className="absolute inset-0 z-0 bg-black-50" />

        {/* Content */}
        <div className="relative z-1 flex h-full w-full max-w-[1480px] flex-1 flex-col items-center justify-center gap-8 overflow-clip rounded-md tablet:flex-row tablet:gap-10 desktop:gap-20">
          {/* Left */}
          <div className="flex w-full max-w-[1200px] flex-1 flex-col items-start justify-between gap-8 overflow-clip p-5 tablet:h-full tablet:p-8">
            <h1
              id="hero-title"
              className="w-full max-w-[550px] text-[34px] text-text-white tablet:text-[42px] desktop:text-h1"
            >
              Washington&rsquo;s Premier Luxury Dealership
            </h1>

            {/* TextButton */}
            <div className="flex w-full flex-col items-start justify-end gap-6">
              <p className="w-full max-w-[480px] text-body text-text-white">
                Curated luxury vehicles from the world&rsquo;s most prestigious
                brands since 2010
              </p>
              <Button href="/inventory" variant="primary">
                Browse Inventory
              </Button>
            </div>
          </div>

          {/* Right */}
          <div className="flex w-full flex-1 flex-col items-start justify-between gap-2.5 p-5 tablet:h-full tablet:items-end tablet:p-8">
            <SearchBar className="w-full tablet:w-[206px]" />

            {/* SocialProof */}
            <div className="flex w-full flex-row items-start justify-start gap-3 tablet:flex-col tablet:items-end tablet:justify-start tablet:gap-2.5">
              <HeroSocialProof metric="800+" label="Car Sold" />
              <HeroSocialProof metric="$80M" label="Sales Value" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
