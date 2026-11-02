import InsightsPage, { insightsMetadata } from "@/components/studio/templates/InsightsPage";

export const metadata = insightsMetadata("en");

export default function Page() {
  return <InsightsPage locale="en" />;
}
