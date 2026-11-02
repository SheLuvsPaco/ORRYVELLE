import AboutPage, { aboutMetadata } from "@/components/studio/templates/AboutPage";

export const metadata = aboutMetadata("bg");

export default function Page() {
  return <AboutPage locale="bg" />;
}
