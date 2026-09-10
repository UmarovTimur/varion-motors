import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = { title: "Meet The Experts." };

export default function Page() {
  return <PageHeader tag="About us" title="Meet The Experts." body="Passionate about cars, precision, and exceptional service. Meet the people who make it happen." />;
}
