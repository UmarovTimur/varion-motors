import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InventoryHero } from "@/components/sections/inventory-hero";
import { InventoryBrowser } from "@/components/sections/inventory-browser";
import { CallToAction } from "@/components/sections/call-to-action";
import { SHOW_CATALOG } from "@/lib/site";

export const metadata: Metadata = { title: "Каталог автомобилей" };

/** Framer page CXEtGJFlY: Hero → Inventory → Call To Action (see framer/pages/inventory.xml). */
export default function Page() {
  if (!SHOW_CATALOG) notFound();
  return (
    <>
      <InventoryHero />
      <InventoryBrowser />
      <CallToAction />
    </>
  );
}
