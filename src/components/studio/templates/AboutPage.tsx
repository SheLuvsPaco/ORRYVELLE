import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUp } from "lucide-react";
import { generalFaqsIn, processStepsIn, servicesIn, valuesIn } from "@/lib/studio/content";
import { href, t, type Locale } from "@/lib/studio/i18n";
import { setRequestLocale } from "@/lib/studio/localize";
import { projectBySlug, projectsIn } from "@/lib/studio/projects";
import { absoluteUrl, breadcrumbSchema, graph, organizationRef, pageMetadata } from "@/lib/studio/seo";
import EnquirySection from "../EnquirySection";
import FAQSection from "../FAQSection";
import JsonLd from "../JsonLd";
import { Browser } from "../Mockups";
import OrryvelleMark from "../OrryvelleMark";
import { ProcessCards } from "../Process";
import { ClientLogos, Testimonials } from "../Proof";
import { DisciplineStrip } from "../Sections";
import { ButtonLink, Chip, Corners, IconTile, SectionIntro } from "../ui";
import { WorkRail } from "../Work";
import "./about.css";

const pad = (value: number) => String(value).padStart(2, "0");

const text = {
  en: {
    title: "About Us: Software, AI & Web Studio in Bulgaria",
    description:
      "Orryvelle is a design and engineering studio in Bulgaria building custom software, AI automation and premium websites for clients worldwide.",
    crumb: "About",
    disciplinesGlass: "Disciplines, one studio",
    chip: "About us",
    hello: "Hi, we’re",
    intro:
      "A design and engineering studio for businesses that expect more from their software, their systems, and their website. We keep teams small and senior, so the people you meet are the people who do the work.",
    cta: "Book a free call",
    valuesChip: "Our values",
    valuesTitle: ["Principles that shape", "every project."] as [string, string],
    valuesText:
      "How we work matters as much as what we deliver. These principles guide every decision, from the first workshop to the final handover.",
    figuresChip: "How we work, in numbers",
    figuresTitle: ["Small by design.", "Clear by default."] as [string, string],
    figuresText: "A few plain facts about how the studio is set up, and what the first conversation looks like.",
    figures: [
      { label: "Disciplines", text: ["Custom software, enterprise solutions, and websites,", "each a complete service in its own right."] },
      { label: "Stages, every engagement", text: ["Discovery, build, and handover, so you always know", "what is happening and what comes next."] },
      { label: "Free intro call", unit: "min", text: ["A first conversation to understand your goals and", "whether we’re the right fit."] },
    ],
    workChip: "Latest work",
    workTitle: ["Software, systems", "and websites."] as [string, string],
    workConcepts: "Concept studies that show how we think about a brief, and what the finished interface looks like.",
    workText: "Studies that show how we think about a brief, and what the finished interface looks like.",
    viewAll: "View all work",
  },
  bg: {
    title: "За нас: студио за софтуер, AI и уебсайтове в България",
    description:
      "Orryvelle е студио за дизайн и разработка в България, което изработва софтуер по поръчка, AI автоматизация и премиум уебсайтове за клиенти по целия свят.",
    crumb: "За нас",
    disciplinesGlass: "Направления, едно студио",
    chip: "За нас",
    hello: "Здравейте, ние сме",
    intro:
      "Студио за дизайн и разработка за бизнеси, които очакват повече от софтуера, системите и уебсайта си. Държим екипите малки и опитни, така че хората, с които се срещате, са хората, които вършат работата.",
    cta: "Запазете безплатен разговор",
    valuesChip: "Нашите ценности",
    valuesTitle: ["Принципите зад", "всеки проект."] as [string, string],
    valuesText:
      "Начинът, по който работим, е толкова важен, колкото и това, което предаваме. Тези принципи водят всяко решение, от първата среща до финалното предаване.",
    figuresChip: "Как работим, в числа",
    figuresTitle: ["Малки по избор.", "Ясни по подразбиране."] as [string, string],
    figuresText: "Няколко прости факта за това как е организирано студиото и как изглежда първият разговор.",
    figures: [
      { label: "Направления", text: ["Софтуер по поръчка, AI и автоматизация, и уебсайтове,", "всяко от тях цялостна услуга само по себе си."] },
      { label: "Етапа във всеки проект", text: ["Анализ, изработка и предаване, така че винаги знаете", "какво се случва и какво следва."] },
      { label: "Безплатен първи разговор", unit: "мин", text: ["Първи разговор, в който разбираме целите ви и", "дали сме подходящият партньор."] },
    ],
    workChip: "Последни проекти",
    workTitle: ["Софтуер, системи", "и уебсайтове."] as [string, string],
    workConcepts: "Концептуални проекти, които показват как мислим за едно задание и как изглежда готовият интерфейс.",
    workText: "Проекти, които показват как мислим за едно задание и как изглежда готовият интерфейс.",
    viewAll: "Всички проекти",
  },
};

export const aboutMetadata = (locale: Locale): Metadata =>
  pageMetadata({ title: text[locale].title, description: text[locale].description, path: href(locale, "/about") });

export default function AboutPage({ locale }: { locale: Locale }) {
  setRequestLocale(locale);
  const copy = text[locale];
  const ui = t(locale);
  const projects = projectsIn(locale);
  const allConcepts = projects.every((project) => project.status === "concept");
  const heroWork = projectBySlug("nantucket-events", locale) ?? projects[0]!;
  /* "How we work, in numbers": each figure is counted from the site's own content. */
  const values = [pad(servicesIn(locale).length), pad(processStepsIn(locale).length), "30"];
  return (
    <main id="main-content">
      <JsonLd
        data={graph(
          { "@type": "AboutPage", url: absoluteUrl(href(locale, "/about")), inLanguage: locale, about: organizationRef },
          breadcrumbSchema([{ name: copy.crumb, path: "/about" }], locale),
        )}
      />
      <section className="about-hero">
        <div className="about-glow" aria-hidden="true" />
        <figure className="about-visual is-left" aria-hidden="true">
          <span className="about-photo">
            <Image
              src="/images/studio/workspace-desk-room.jpg"
              alt=""
              fill
              priority
              sizes="(max-width: 1080px) 40vw, 20vw"
            />
          </span>
          <span className="about-tile">
            <OrryvelleMark size={48} />
            <Corners />
          </span>
        </figure>
        <figure className="about-visual is-right" aria-hidden="true">
          <span className="about-photo">
            <Image
              src="/images/studio/workspace-notebook-ruler.jpg"
              alt=""
              fill
              sizes="(max-width: 1080px) 40vw, 18vw"
            />
          </span>
          <span className="about-glass">
            <b>{pad(servicesIn(locale).length)}</b>
            <span>{copy.disciplinesGlass}</span>
            <Corners />
          </span>
        </figure>
        <figure className="about-visual is-low" aria-hidden="true">
          <Browser project={heroWork} />
        </figure>

        <div className="container about-hero-inner" data-reveal>
          <Chip dark>{copy.chip}</Chip>
          <h1>
            {copy.hello}
            <br />
            <span className="about-word">
              Orryvelle.
              <Corners />
            </span>
          </h1>
          <p>{copy.intro}</p>
          <ButtonLink href={ui.contact} variant="light">
            {copy.cta}
          </ButtonLink>
        </div>
        <div className="container about-credentials" data-reveal style={{ "--d": 160 } as React.CSSProperties}>
          <DisciplineStrip dark locale={locale} />
        </div>
      </section>

      <ClientLogos locale={locale} />

      <section className="section about-values">
        <div className="container values">
          <div data-reveal>
            <Chip>{copy.valuesChip}</Chip>
            <h2>
              {copy.valuesTitle[0]}
              <br />
              <span className="tone">{copy.valuesTitle[1]}</span>
            </h2>
            <p>{copy.valuesText}</p>
          </div>
          <div className="value-list" data-reveal style={{ "--d": 120 } as React.CSSProperties}>
            {valuesIn(locale).map((value, index) => (
              <details key={value.title} open={index === 0}>
                <summary>
                  <IconTile name={value.icon} size={20} />
                  <span>{value.title}</span>
                  <span className="value-toggle" aria-hidden="true">
                    <i />
                    <i />
                  </span>
                </summary>
                <div className="value-answer">
                  <p>{value.body}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-split about-figures">
        <div className="container">
          <SectionIntro
            chip={copy.figuresChip}
            title={copy.figuresTitle}
            text={copy.figuresText}
            action={<ButtonLink href={ui.contact}>{ui.bookCall}</ButtonLink>}
          />
          <div className="figure-grid">
            {copy.figures.map((figure, index) => (
              <article key={figure.label} data-reveal style={{ "--d": index * 110 } as React.CSSProperties}>
                <h3>{figure.label}</h3>
                <div className="figure-row">
                  <ArrowUp size={24} strokeWidth={1.25} aria-hidden="true" />
                  <b>
                    {values[index]}
                    {figure.unit ? <small>{figure.unit}</small> : null}
                  </b>
                </div>
                <p>
                  {figure.text[0]} <em>{figure.text[1]}</em>
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ProcessCards id="about-process" locale={locale} />

      <section className="section section-pale">
        <div className="container">
          <SectionIntro
            chip={copy.workChip}
            title={copy.workTitle}
            text={allConcepts ? copy.workConcepts : copy.workText}
            action={
              <ButtonLink href={href(locale, "/work")} variant="outline">
                {copy.viewAll}
              </ButtonLink>
            }
          />
        </div>
        <div className="container rail-container">
          <WorkRail projects={projects} locale={locale} />
        </div>
      </section>

      <Testimonials locale={locale} />
      <EnquirySection dark locale={locale} />
      <FAQSection faqs={generalFaqsIn(locale).slice(0, 5)} locale={locale} />
    </main>
  );
}
