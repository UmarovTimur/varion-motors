import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = { title: "Как выглядит наша проверка" };

export default function Page() {
  return (
    <PageHeader
      tag="Проверка"
      title="Как выглядит наша проверка"
      body="Скан аукционного листа с расшифровкой, фото проблемных мест с подписями и наше заключение: берём или не берём и почему. Такой отчёт вы получаете по каждой машине до оплаты."
    />
  );
}
