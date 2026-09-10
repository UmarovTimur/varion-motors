import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function Page() {
  return <PageHeader tag="Legal" title="Privacy Policy" body="How we collect, use and protect the personal data you share with us." />;
}
