import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = { title: "Начнём с расчёта" };

export default function Page() {
  return (
    <PageHeader
      tag="Контакты"
      title="Начнём с расчёта"
      body="Расскажите, какая машина нужна и на какой бюджет. Пришлём варианты с ценой под ключ в течение [XX] часов. Бесплатно и ни к чему не обязывает."
    />
  );
}
