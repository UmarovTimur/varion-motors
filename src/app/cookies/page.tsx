import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = { title: "Cookie Policy" };

export default function Page() {
  return (
    <PageHeader
      tag="Legal"
      title="Cookie Policy"
      body="The cookies this site sets and how to control them."
    />
  );
}
