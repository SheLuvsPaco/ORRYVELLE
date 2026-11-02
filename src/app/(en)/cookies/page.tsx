import LegalPage, { legalMetadata } from "@/components/studio/templates/LegalPage";

export const metadata = legalMetadata("cookies", "en");

export default function Page() {
  return <LegalPage slug="cookies" locale="en" />;
}
