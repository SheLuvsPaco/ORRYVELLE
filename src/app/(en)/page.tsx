import HomePage, { homeMetadata } from "@/components/studio/templates/HomePage";

export const metadata = homeMetadata("en");

export default function Page() {
  return <HomePage locale="en" />;
}
