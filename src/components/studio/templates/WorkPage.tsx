import type { Metadata } from "next";
import { servicesIn } from "@/lib/studio/content";
import { href, t, type Locale } from "@/lib/studio/i18n";
import { setRequestLocale } from "@/lib/studio/localize";
import { projectBySlug, projectsIn } from "@/lib/studio/projects";
import { absoluteUrl, breadcrumbSchema, graph, pageMetadata, projectSchema } from "@/lib/studio/seo";
import EnquirySection from "../EnquirySection";
import JsonLd from "../JsonLd";
import { Phone, Screen } from "../Mockups";
import { ButtonLink, Chip, Corners } from "../ui";
import { WorkArchive } from "../WorkArchive";
import "./work.css";

const pad = (value: number) => String(value).padStart(2, "0");

const text = {
  en: {
    title: "Case Studies: Software, AI Automation & Websites",
    description:
      "Real projects: an event-rental operations platform, an iPhone app for property services, AI voice receptionists, n8n automations and custom websites.",
    name: "Work",
    chip: "Our work",
    heading: ["Selected work.", "Considered in detail."],
    intro:
      "Projects we’ve designed and built: software, automations and websites. Each study shows the problem, how we approached it and the finished product.",
    browse: "Browse the studies",
    conceptNote: "Concept studies illustrate our approach. Client case studies are published with permission.",
    projects: "Projects, shown in full",
    disciplines: "Disciplines",
  },
  bg: {
    title: "Проекти: софтуер, AI автоматизация и уебсайтове",
    description:
      "Реални проекти: платформа за фирма за събития, iPhone приложение за услуги по имоти, AI гласови асистенти, n8n автоматизации и уебсайтове по поръчка.",
    name: "Проекти",
    chip: "Нашата работа",
    heading: ["Избрани проекти.", "Премислени в детайли."],
    intro:
      "Проекти, които сме проектирали и изградили: софтуер, автоматизации и уебсайтове. Всеки проект показва проблема, подхода ни и готовия продукт.",
    browse: "Разгледайте проектите",
    conceptNote: "Концептуалните проекти показват подхода ни. Клиентските проекти се публикуват с разрешение.",
    projects: "Проекта, показани изцяло",
    disciplines: "Направления",
  },
};

export const workMetadata = (locale: Locale): Metadata =>
  pageMetadata({ title: text[locale].title, description: text[locale].description, path: href(locale, "/work") });

export default function WorkPage({ locale }: { locale: Locale }) {
  setRequestLocale(locale);
  const copy = text[locale];
  const ui = t(locale);
  const projects = projectsIn(locale);
  const site = projectBySlug("pet-grooming", locale)!;
  const app = projectBySlug("nantucket-events", locale)!;
  const mobile = projectBySlug("five-star-priorities", locale)!;
  const disciplines = new Set(projects.map((project) => project.service)).size;

  return (
    <main id="main-content">
      <JsonLd
        data={graph(
          {
            "@type": "CollectionPage",
            url: absoluteUrl(href(locale, "/work")),
            name: copy.name,
            inLanguage: locale,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: projects
                .filter((project) => project.status === "client")
                .map((project, index) => ({ "@type": "ListItem", position: index + 1, item: projectSchema(project, locale) })),
            },
          },
          breadcrumbSchema([{ name: copy.name, path: "/work" }], locale),
        )}
      />
      <section className="work-hero">
        <div className="container">
          <div className="work-hero-rim">
            <div className="work-hero-card">
              <span className="work-hero-light" aria-hidden="true" />
              <div className="work-hero-copy" data-reveal>
                <Chip dark>{copy.chip}</Chip>
                <h1>
                  {copy.heading[0]}
                  <br />
                  <span className="tone">{copy.heading[1]}</span>
                </h1>
                <p>{copy.intro}</p>
                <div className="work-hero-actions">
                  <ButtonLink href={ui.contact} variant="light">
                    {ui.bookCall}
                  </ButtonLink>
                  <a href="#studies" className="text-link work-hero-link">
                    {copy.browse}
                  </a>
                </div>
                <p className="concept-note">{copy.conceptNote}</p>
              </div>
              <div
                className="work-hero-visual"
                aria-hidden="true"
                data-reveal="image"
                style={{ "--d": 120 } as React.CSSProperties}
              >
                <div className="wh-tablet is-back">
                  <Screen project={site} k={0.6} km={0.8} />
                </div>
                <div className="wh-tablet is-front">
                  <Screen project={app} k={0.4} km={0.5} />
                </div>
                <div className="wh-phone">
                  <Phone project={mobile} k={0.5} />
                </div>
                <div className="wh-stat is-top">
                  <b>{pad(projects.length)}</b>
                  <span>{copy.projects}</span>
                  <Corners />
                </div>
                <div className="wh-stat is-bottom">
                  <b>{pad(disciplines)}</b>
                  <span>
                    {copy.disciplines}
                    <small>{servicesIn(locale).map((service) => service.name).join(" · ")}</small>
                  </span>
                  <Corners />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section section-tight work-index">
        <div className="container">
          <WorkArchive projects={projects} locale={locale} />
        </div>
      </section>
      <EnquirySection dark locale={locale} />
    </main>
  );
}
