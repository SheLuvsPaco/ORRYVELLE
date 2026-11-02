import IndustriesPage, { industriesMetadata } from "@/components/studio/templates/IndustriesPage";

export const metadata = industriesMetadata("en");

export default function Page() {
  return <IndustriesPage locale="en" />;
}
