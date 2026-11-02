import WorkPage, { workMetadata } from "@/components/studio/templates/WorkPage";

export const metadata = workMetadata("en");

export default function Page() {
  return <WorkPage locale="en" />;
}
