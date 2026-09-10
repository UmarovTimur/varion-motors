import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = { title: "Talk To Our Sales Team" };

export default function Page() {
  return <PageHeader tag="Contact" title="Talk To Our Sales Team" body="Book a private test drive, request a valuation, or ask us to source a specific specification." />;
}
