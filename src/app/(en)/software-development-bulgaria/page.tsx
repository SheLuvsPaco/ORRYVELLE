import { SolutionRoute, locationMetadata } from "@/components/studio/templates/ServiceRoutes";
import { solutionBySlug } from "@/lib/studio/solutions";

export const metadata = locationMetadata("en");

export default function Page() {
  return <SolutionRoute solution={solutionBySlug("software-development-bulgaria", "en")!} />;
}
