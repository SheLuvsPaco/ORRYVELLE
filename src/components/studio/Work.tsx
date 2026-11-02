import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { serviceBySlug } from "@/lib/studio/content";
import { href, type Locale } from "@/lib/studio/i18n";
import { visualOnly, type Project } from "@/lib/studio/projects";
import LazyCollage from "./LazyCollage";
import { RailShell } from "./WorkClient";
import "./styles/work.css";

const text = {
  en: {
    concept: "Concept",
    label: "Selected work",
    rail: {
      conceptNote: "Concept studies illustrate our approach. Client case studies are published with permission.",
      position: (index: number, count: number) => `First visible project ${index} of ${count}`,
      previous: "Previous project",
      next: "Next project",
    },
  },
  bg: {
    concept: "Концепция",
    label: "Избрани проекти",
    rail: {
      conceptNote: "Концептуалните проекти показват подхода ни. Клиентските проекти се публикуват с разрешение.",
      position: (index: number, count: number) => `Първи видим проект ${index} от ${count}`,
      previous: "Предишен проект",
      next: "Следващ проект",
    },
  },
};

export function ProjectTags({
  project,
  discipline = false,
  locale = "en",
}: {
  project: Project;
  discipline?: boolean;
  locale?: Locale;
}) {
  return (
    <span className="tags">
      {project.status === "concept" ? <span className="tag tag-concept">{text[locale].concept}</span> : null}
      <span className="tag">{project.sector}</span>
      {discipline ? <span className="tag">{serviceBySlug(project.service, locale)?.name}</span> : null}
    </span>
  );
}

/** Rail card: tags and arrow, title, then the project's collage cropped by the card. */
export function WorkCard({ project, locale = "en" }: { project: Project; locale?: Locale }) {
  return (
    <Link href={href(locale, `/work/${project.slug}`)} className="work-card">
      <span className="work-card-inner">
        <span className="work-card-head">
          <ProjectTags project={project} locale={locale} />
          <span className="square-arrow" aria-hidden="true">
            <ArrowUpRight size={18} />
          </span>
        </span>
        <b className="work-card-title">{project.title}</b>
        <span className="work-card-media">
          <LazyCollage project={visualOnly(project)} width={500} mobileVw={76} />
        </span>
      </span>
    </Link>
  );
}

export function WorkRail({
  projects,
  label,
  locale = "en",
}: {
  projects: Project[];
  label?: string;
  locale?: Locale;
}) {
  const copy = text[locale];
  const position = projects.map((_, index) => copy.rail.position(index + 1, projects.length));
  return (
    <RailShell
      label={label ?? copy.label}
      count={projects.length}
      hasConcepts={projects.some((project) => project.status === "concept")}
      labels={{ conceptNote: copy.rail.conceptNote, previous: copy.rail.previous, next: copy.rail.next, position }}
    >
      {projects.map((project) => (
        <li key={project.slug}>
          <WorkCard project={project} locale={locale} />
        </li>
      ))}
    </RailShell>
  );
}
