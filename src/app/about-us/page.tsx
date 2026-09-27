import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = { title: "С кем вы работаете" };

export default function Page() {
  return (
    <PageHeader
      tag="О команде"
      title="С кем вы работаете"
      body="Varion Motors — команда, которая подбирает и привозит автомобили из Кореи и Китая под ключ. Каждую сделку ведём лично: от выбора машины и проверки до растаможки и передачи ключей. Связь напрямую с нами в Telegram — без колл-центра и посредников."
    />
  );
}
