import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = { title: "Шесть шагов от заявки до ключей" };

export default function Page() {
  return (
    <PageHeader
      tag="Как мы работаем"
      title="Шесть шагов от заявки до ключей"
      body="Средний срок — [XX] дней. На каждом этапе вы получаете фото и статус в Telegram."
    />
  );
}
