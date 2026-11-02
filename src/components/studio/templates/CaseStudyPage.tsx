import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { serviceBySlug } from "@/lib/studio/content";
import { href, inSentence, t, type Locale } from "@/lib/studio/i18n";
import { setRequestLocale } from "@/lib/studio/localize";
import { projectBySlug, projectsIn, visualOnly, type Project } from "@/lib/studio/projects";
import { breadcrumbSchema, graph, pageMetadata, projectSchema } from "@/lib/studio/seo";
import type { ServiceSlug } from "@/lib/studio/site";
import { Collage } from "../Collage";
import EnquirySection from "../EnquirySection";
import JsonLd from "../JsonLd";
import RelatedInsights from "../RelatedInsights";
import { ScrollShowcase } from "../Showcase";
import { ButtonLink, Corners } from "../ui";
import { ProjectTags } from "../Work";
import "./case-study.css";

const text = {
  en: {
    kind: { "custom-software": "Custom Software", "enterprise-solutions": "AI & Automation", websites: "Website" } as Record<ServiceSlug, string>,
    label: (kind: string, client: boolean) => `${kind} ${client ? "Case Study" : "Concept Study"}`,
    work: "Work",
    client: "Client",
    sector: "Sector",
    service: "Service",
    timeline: "Timeline",
    platforms: "Platforms",
    conceptNote:
      "This is a concept study: an illustrative brief showing how we would approach this kind of project. It is not client work.",
    brief: "01 · The brief",
    overview: ["Project", "overview"],
    approachKicker: "02 · The approach",
    approach: ["Our", "approach"],
    similar: "Planning something similar?",
    explore: (name: string) => `Explore ${name}`,
    includes: "What the build includes",
    onPhone: "On the phone",
    preview: "Interactive preview",
    looks: ["Here’s how", "it looks."],
    enquiryChip: "Start your project",
    enquiryTitle: ["Let’s build", "yours next."] as [string, string],
    more: "More work",
    previous: "Previous study",
    next: "Next study",
  },
  bg: {
    kind: { "custom-software": "Софтуер по поръчка", "enterprise-solutions": "AI и автоматизация", websites: "Уебсайт" } as Record<ServiceSlug, string>,
    label: (kind: string, client: boolean) => `${client ? "проект" : "концепция"} за ${inSentence(kind)}`,
    work: "Проекти",
    client: "Клиент",
    sector: "Сектор",
    service: "Услуга",
    timeline: "Срок",
    platforms: "Платформи",
    conceptNote:
      "Това е концептуален проект: илюстративно задание, което показва как бихме подходили към такъв проект. Не е клиентска работа.",
    brief: "01 · Заданието",
    overview: ["Преглед", "на проекта"],
    approachKicker: "02 · Подходът",
    approach: ["Нашият", "подход"],
    similar: "Планирате нещо подобно?",
    explore: (name: string) => `Разгледайте ${inSentence(name)}`,
    includes: "Какво включва изработката",
    onPhone: "На телефона",
    preview: "Интерактивен преглед",
    looks: ["Ето как", "изглежда."],
    enquiryChip: "Започнете проект",
    enquiryTitle: ["Да изградим", "вашия проект."] as [string, string],
    more: "Още проекти",
    previous: "Предишен проект",
    next: "Следващ проект",
  },
};

export function caseStudyMetadata(slug: string, locale: Locale): Metadata {
  const project = projectBySlug(slug, locale);
  if (!project) return {};
  const copy = text[locale];
  return pageMetadata({
    title: `${project.title}: ${copy.label(copy.kind[project.service], project.status === "client")}`,
    description: project.seoDescription ?? project.summary,
    path: href(locale, `/work/${project.slug}`),
  });
}

export default function CaseStudyPage({ project, locale }: { project: Project; locale: Locale }) {
  setRequestLocale(locale);
  const copy = text[locale];
  const ui = t(locale);
  const projects = projectsIn(locale);
  const service = serviceBySlug(project.service, locale)!;
  const serviceHref = href(locale, `/services/${service.slug}`);
  const index = projects.findIndex((item) => item.slug === project.slug);
  const previous = projects[(index - 1 + projects.length) % projects.length]!;
  const next = projects[(index + 1) % projects.length]!;

  return (
    <main id="main-content" className="case-study">
      <JsonLd
        data={graph(
          ...(project.status === "client" ? [projectSchema(project, locale)] : []),
          breadcrumbSchema(
            [
              { name: copy.work, path: "/work" },
              { name: project.title, path: `/work/${project.slug}` },
            ],
            locale,
          ),
        )}
      />
      <section className="container case-cover">
        <nav className="case-crumbs" aria-label={ui.breadcrumb}>
          <Link href={href(locale, "/work")}>{copy.work}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{project.title}</span>
        </nav>
        <div className="case-cover-rim" data-reveal="image">
          <div className="case-cover-frame">
            <Collage project={project} variant="wide" width={1300} mobileVw={160} priority />
          </div>
        </div>
      </section>

      <section className="container case-intro">
        <div data-reveal>
          <ProjectTags project={project} discipline locale={locale} />
          <h1>
            {project.titleParts[0]} <span className="tone">{project.titleParts[1]}</span>
          </h1>
        </div>
        <div data-reveal style={{ "--d": 100 } as React.CSSProperties}>
          <p className="case-summary">{project.summary}</p>
          <dl className="case-meta">
            <div>
              <dt>{copy.client}</dt>
              <dd>{project.client}</dd>
            </div>
            <div>
              <dt>{copy.sector}</dt>
              <dd>{project.sector}</dd>
            </div>
            <div>
              <dt>{copy.service}</dt>
              <dd>
                <Link href={serviceHref}>{service.name}</Link>
              </dd>
            </div>
            {project.timeline ? (
              <div>
                <dt>{copy.timeline}</dt>
                <dd>{project.timeline}</dd>
              </div>
            ) : null}
            {project.platforms ? (
              <div>
                <dt>{copy.platforms}</dt>
                <dd>{project.platforms}</dd>
              </div>
            ) : null}
          </dl>
          {project.status === "concept" ? <p className="concept-note">{copy.conceptNote}</p> : null}
        </div>
      </section>

      <section className="container case-body">
        <div className="case-overview" data-reveal>
          <span className="case-kicker">{copy.brief}</span>
          <h2>
            {copy.overview[0]} <span className="tone">{copy.overview[1]}</span>
          </h2>
          <p>{project.overview}</p>
        </div>
        <div className="case-pair" aria-hidden="true">
          <figure data-reveal="image">
            <Collage project={project} variant="pairA" width={760} />
            <figcaption>
              <span>01</span>
              {project.captions[0]}
            </figcaption>
          </figure>
          <figure data-reveal="image" style={{ "--d": 120 } as React.CSSProperties}>
            <Collage project={project} variant="pairB" width={540} />
            <figcaption>
              <span>02</span>
              {project.captions[1]}
            </figcaption>
          </figure>
        </div>
        <div className="case-approach">
          <div data-reveal>
            <span className="case-kicker">{copy.approachKicker}</span>
            <h2>
              {copy.approach[0]} <span className="tone">{copy.approach[1]}</span>
            </h2>
            <p>{project.approach}</p>
            <div className="case-cta">
              <ButtonLink href={ui.contact}>{ui.bookCall}</ButtonLink>
              <span>
                {copy.similar}
                <br />
                <Link href={serviceHref}>{copy.explore(service.name)}</Link>
              </span>
            </div>
          </div>
          <div className="case-deliverables" data-reveal style={{ "--d": 120 } as React.CSSProperties}>
            <Corners />
            <h3>{copy.includes}</h3>
            <ul>
              {project.deliverables.map((item) => (
                <li key={item}>
                  <Check size={15} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="showcase-stage">
        <div className="container">
          <div className="stage-head">
            <span className="stage-kicker">{project.shots && !project.shots.screen ? copy.onPhone : copy.preview}</span>
            <h2>
              {copy.looks[0]}
              <br />
              <span className="tone">{copy.looks[1]}</span>
            </h2>
          </div>
          <ScrollShowcase project={visualOnly(project)} locale={locale} />
        </div>
      </section>

      <RelatedInsights service={project.service} locale={locale} />

      <EnquirySection chip={copy.enquiryChip} title={copy.enquiryTitle} service={project.service} locale={locale} />

      <nav className="container case-pager" aria-label={copy.more}>
        <Link href={href(locale, `/work/${previous.slug}`)} className="pager-card">
          <span className="pager-thumb" aria-hidden="true">
            <Collage project={previous} variant="mini" width={150} mobileVw={30} />
          </span>
          <span className="pager-copy">
            <small>
              <ArrowLeft size={14} aria-hidden="true" /> {copy.previous}
            </small>
            <b>{previous.title}</b>
          </span>
        </Link>
        <Link href={href(locale, `/work/${next.slug}`)} className="pager-card is-next">
          <span className="pager-copy">
            <small>
              {copy.next} <ArrowRight size={14} aria-hidden="true" />
            </small>
            <b>{next.title}</b>
          </span>
          <span className="pager-thumb" aria-hidden="true">
            <Collage project={next} variant="mini" width={150} mobileVw={30} />
          </span>
        </Link>
      </nav>
    </main>
  );
}
