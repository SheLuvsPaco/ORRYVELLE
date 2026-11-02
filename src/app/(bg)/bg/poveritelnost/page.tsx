import LegalPage, { legalMetadata } from "@/components/studio/templates/LegalPage";

export const metadata = legalMetadata("privacy", "bg");

export default function Page() {
  return <LegalPage slug="privacy" locale="bg" />;
}
