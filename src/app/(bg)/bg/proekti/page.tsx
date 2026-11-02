import WorkPage, { workMetadata } from "@/components/studio/templates/WorkPage";

export const metadata = workMetadata("bg");

export default function Page() {
  return <WorkPage locale="bg" />;
}
