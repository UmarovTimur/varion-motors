import type { Metadata } from "next";
import { InventoryHero } from "@/components/sections/inventory-hero";
import { InventoryBrowser } from "@/components/sections/inventory-browser";
import { CallToAction } from "@/components/sections/call-to-action";

export const metadata: Metadata = { title: "Машины, которые мы привезли" };

/** Framer page CXEtGJFlY: Hero → Inventory → Call To Action (see framer/pages/inventory.xml). */
export default function Page() {
  return (
    <>
      <InventoryHero />
      <InventoryBrowser />
      <CallToAction />
    </>
  );
}
