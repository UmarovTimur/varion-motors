import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InventoryHero } from "@/components/sections/inventory-hero";
import { InventoryBrowser } from "@/components/sections/inventory-browser";
import { CallToAction } from "@/components/sections/call-to-action";
import { carsAt } from "@/lib/content";
import { getRates } from "@/lib/rates";
import { SHOW_CATALOG } from "@/lib/site";

export const metadata: Metadata = { title: "Каталог автомобилей" };

/** Prices follow the Bank of Russia rate (RATES_REVALIDATE in rates.ts);
 * the page is re-rendered in the background at most this often. */
export const revalidate = 43200;


/** Framer page CXEtGJFlY: Hero → Inventory → Call To Action (see framer/pages/inventory.xml). */
export default async function Page() {
  if (!SHOW_CATALOG) notFound();
  const cars = carsAt(await getRates());
  return (
    <>
      <InventoryHero />
      <InventoryBrowser cars={cars} />
      <CallToAction />
    </>
  );
}
