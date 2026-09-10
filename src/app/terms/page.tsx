import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function Page() {
  return <PageHeader tag="Legal" title="Terms & Conditions" body="The terms that govern the use of this site and the sale of our vehicles." />;
}
