import type { Project } from "@/lib/studio/projects";
import { Laptop, Screen } from "./Mockups";

export default function StageVisual({ project }: { project: Project }) {
  return (
    <Laptop tone="black">
      <div className="stage-screens">
        <div key={project.slug} className="stage-screen-active">
          <Screen project={project} />
        </div>
      </div>
    </Laptop>
  );
}
