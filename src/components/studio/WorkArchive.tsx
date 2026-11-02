import Link from "next/link";
import { servicesIn } from "@/lib/studio/content";
import { href, type Locale } from "@/lib/studio/i18n";
import type { Project } from "@/lib/studio/projects";
import { Collage } from "./Collage";
import { ButtonLink } from "./ui";
import { ProjectTags } from "./Work";
import { WorkFilter, type FilterEntry, type FilterLabels } from "./WorkClient";
import "./styles/work-archive.css";

const text = {
  en: {
    readStudy: "Read the study",
    seeProject: "See the project",
    discipline: "Discipline",
    sector: "Sector",
    filter: { group: "Filter the studies", all: "All", showingAll: "Showing all {total} projects", showing: "Showing {count} of {total} · {label}" },
  },
  bg: {
    readStudy: "Прочетете проекта",
    seeProject: "Вижте проекта",
    discipline: "Направление",
    sector: "Сектор",
    filter: { group: "Филтрирайте проектите", all: "Всички", showingAll: "Показани са всички {total} проекта", showing: "Показани {count} от {total} · {label}" },
  },
} satisfies Record<Locale, { filter: FilterLabels } & Record<string, unknown>>;

/** One framed row of the work index: collage left, story right. */
export function WorkRow({ project, index, locale = "en" }: { project: Project; index: number; locale?: Locale }) {
  const copy = text[locale];
  const link = href(locale, `/work/${project.slug}`);
  return (
    <article className="work-row" aria-labelledby={`study-${project.slug}`}>
      <Link href={link} className="work-row-media" tabIndex={-1} aria-hidden="true">
        <Collage project={project} width={500} />
      </Link>
      <div className="work-row-copy">
        <div className="work-row-top">
          <ProjectTags project={project} discipline locale={locale} />
          <span className="work-row-index" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <h2 id={`study-${project.slug}`}>
          {project.titleParts[0]} <span className="tone">{project.titleParts[1]}</span>
        </h2>
        <p>{project.summary}</p>
        <p>{project.lede}</p>
        <div className="work-row-foot">
          <ButtonLink href={link} className="btn-dark">
            {project.status === "concept" ? copy.readStudy : copy.seeProject}
          </ButtonLink>
          <span className="work-row-meta">{project.timeline ?? project.platforms}</span>
        </div>
      </div>
    </article>
  );
}

/** Filter ids from the sector name (Cyrillic kept). */
const slugify = (value: string) => value.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-");

export function WorkArchive({ projects, locale = "en" }: { projects: Project[]; locale?: Locale }) {
  const copy = text[locale];
  const disciplines = servicesIn(locale)
    .map((service) => ({
      id: service.slug,
      label: service.name,
      count: projects.filter((project) => project.service === service.slug).length,
    }))
    .filter((option) => option.count > 0);
  const sectors = Array.from(new Set(projects.map((project) => project.sector))).map((sector) => ({
    id: slugify(sector),
    label: sector,
    count: projects.filter((project) => project.sector === sector).length,
  }));
  const entries: FilterEntry[] = projects.map((project, index) => ({
    id: project.slug,
    tags: [project.service, slugify(project.sector)],
    node: <WorkRow project={project} index={index} locale={locale} />,
  }));
  return (
    <WorkFilter
      total={projects.length}
      groups={[
        { label: copy.discipline, options: disciplines },
        { label: copy.sector, options: sectors },
      ]}
      entries={entries}
      labels={copy.filter}
    />
  );
}
