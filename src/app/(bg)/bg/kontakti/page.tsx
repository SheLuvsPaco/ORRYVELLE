import ContactPage, { contactMetadata } from "@/components/studio/templates/ContactPage";

export const metadata = contactMetadata("bg");

export default function Page() {
  return <ContactPage locale="bg" />;
}
