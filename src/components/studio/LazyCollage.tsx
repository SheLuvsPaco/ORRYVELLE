"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Project } from "@/lib/studio/projects";
import type { CollageVariant } from "./Collage";
import "./styles/lazy-collage.css";

const Collage = dynamic(
  () => import("./Collage").then((module) => module.Collage),
  { ssr: false },
);

/**
 * Product collages contain intentionally detailed interface mockups. Mount
 * them shortly before they enter view so they do not inflate the initial HTML
 * or block the opening screen, while keeping an exact-size colour field in
 * their place.
 */
export default function LazyCollage({
  project,
  variant = "square",
  width = 520,
  mobileVw = 92,
  className = "",
}: {
  project: Project;
  variant?: CollageVariant;
  width?: number;
  mobileVw?: number;
  className?: string;
}) {
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
      { rootMargin: "500px 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [visible]);

  const [fieldA, fieldB] = project.collage.field;
  const style = {
    "--field-a": fieldA,
    "--field-b": fieldB,
  } as CSSProperties;

  return (
    <div
      ref={root}
      className={`lazy-collage lazy-collage-${variant} ${className}`}
      style={style}
      aria-hidden="true"
    >
      {visible ? (
        <Collage
          project={project}
          variant={variant}
          width={width}
          mobileVw={mobileVw}
        />
      ) : (
        <span className="lazy-collage-placeholder" />
      )}
    </div>
  );
}
