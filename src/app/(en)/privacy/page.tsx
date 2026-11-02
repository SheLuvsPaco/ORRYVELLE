import LegalPage, { legalMetadata } from "@/components/studio/templates/LegalPage";

export const metadata = legalMetadata("privacy", "en");

export default function Page() {
  return <LegalPage slug="privacy" locale="en" />;
}
