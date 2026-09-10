import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = { title: "Terms Built Around You" };

export default function Page() {
  return <PageHeader tag="Financing" title="Terms Built Around You" body="Hire purchase, PCP and balloon structures from a panel of prime and specialist lenders, with pre-approval in under an hour." />;
}
