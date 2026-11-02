import LegalPage, { legalMetadata } from "@/components/studio/templates/LegalPage";

export const metadata = legalMetadata("cookies", "bg");

export default function Page() {
  return <LegalPage slug="cookies" locale="bg" />;
}
