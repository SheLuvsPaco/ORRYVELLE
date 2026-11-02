import ContactPage, { contactMetadata } from "@/components/studio/templates/ContactPage";

export const metadata = contactMetadata("en");

export default function Page() {
  return <ContactPage locale="en" />;
}
