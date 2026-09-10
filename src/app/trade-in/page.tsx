import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = { title: "Value Your Current Car" };

export default function Page() {
  return <PageHeader tag="Trade-in" title="Value Your Current Car" body="Send us the registration and mileage and we will return a firm valuation within one business day, held for seven days." />;
}
