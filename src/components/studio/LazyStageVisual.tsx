"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/studio/projects";
import "./styles/lazy-stage-visual.css";

const StageVisual = dynamic(() => import("./StageVisual"), { ssr: false });

/** Loads the detailed laptop only as the second section approaches view. */
export default function LazyStageVisual({ project }: { project: Project }) {
  const root = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = root.current;
    if (!element || visible) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { rootMargin: "600px 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <div ref={root} className="lazy-stage-visual">
      {visible ? <StageVisual project={project} /> : <span aria-hidden="true" />}
    </div>
  );
}
