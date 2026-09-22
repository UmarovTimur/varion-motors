import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = { title: "С кем вы работаете" };

export default function Page() {
  return (
    <PageHeader
      tag="О команде"
      title="С кем вы работаете"
      body="[Кто вы, сколько лет в этом и почему занялись именно перевозкой авто.] Представители на местах показаны отдельно, с городом."
    />
  );
}
