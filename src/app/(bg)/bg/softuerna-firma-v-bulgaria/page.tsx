import { SolutionRoute, locationMetadata } from "@/components/studio/templates/ServiceRoutes";
import { solutionBySlug } from "@/lib/studio/solutions";

export const metadata = locationMetadata("bg");

export default function Page() {
  return <SolutionRoute solution={solutionBySlug("software-development-bulgaria", "bg")!} />;
}
