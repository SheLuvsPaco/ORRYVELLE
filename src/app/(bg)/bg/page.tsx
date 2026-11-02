import HomePage, { homeMetadata } from "@/components/studio/templates/HomePage";

export const metadata = homeMetadata("bg");

export default function Page() {
  return <HomePage locale="bg" />;
}
