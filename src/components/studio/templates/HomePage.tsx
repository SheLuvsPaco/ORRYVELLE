import type { Metadata } from "next";
import { generalFaqsIn } from "@/lib/studio/content";
import { href, type Locale } from "@/lib/studio/i18n";
import { setRequestLocale } from "@/lib/studio/localize";
import { projectBySlug, projectsIn, visualOnly } from "@/lib/studio/projects";
import { faqSchema, graph, howToSchema, pageMetadata } from "@/lib/studio/seo";
import EnquirySection from "../EnquirySection";
import FAQSection from "../FAQSection";
import HomeHero from "../HomeHero";
import IntegrationsHub from "../IntegrationsHub";
import JsonLd from "../JsonLd";
import { ProcessCards } from "../Process";
import { ClientLogos, Testimonials } from "../Proof";
import ServicesBento from "../ServicesBento";
import { DisciplineStage } from "../Showcase";
import StudioIntro from "../StudioIntro";
import StackMarquee from "../TechnologyCarousel";
import { ButtonLink, SectionIntro } from "../ui";
import WhyUs from "../WhyUs";
import { WorkRail } from "../Work";

const text = {
  en: {
    description:
      "Orryvelle builds AI receptionists, business automation, custom software and websites for small and growing businesses. Book a free 30-minute call.",
    workChip: "Selected work",
    workTitle: ["Built with intent.", "Presented in detail."] as [string, string],
    workText:
      "Projects we’ve designed and built, from an operations platform and an iPhone app to AI voice agents and websites. Each one shows the problem, the approach and the finished product.",
    viewAll: "View all work",
    why: [
      {
        icon: "craft" as const,
        title: "Senior craft, end to end",
        body: "The people who scope your project are the people who design and build it. Decisions are made with the full picture in view.",
      },
      {
        icon: "security" as const,
        title: "Engineered, not assembled",
        body: "Clean architecture, typed code, and considered performance, so what we build stays fast, secure, and easy to extend.",
      },
      {
        icon: "clarity" as const,
        title: "Accountable delivery",
        body: "Written scope, milestone reviews, and honest trade-offs. You always know what is being built, and why.",
      },
    ],
  },
  bg: {
    description:
      "Orryvelle изработва AI асистенти, бизнес автоматизация, софтуер по поръчка и уебсайтове за малки и растящи бизнеси. Запазете безплатен 30-минутен разговор.",
    workChip: "Избрани проекти",
    workTitle: ["Изградено с цел.", "Показано в детайли."] as [string, string],
    workText:
      "Проекти, които сме проектирали и изградили: от оперативна платформа и iPhone приложение до гласови AI агенти и уебсайтове. Всеки показва проблема, подхода и готовия продукт.",
    viewAll: "Всички проекти",
    why: [
      {
        icon: "craft" as const,
        title: "Опитен екип от началото до края",
        body: "Хората, които определят обхвата на проекта ви, са същите, които го проектират и изграждат. Решенията се взимат с пълната картина пред очите.",
      },
      {
        icon: "security" as const,
        title: "Изградено, не сглобено",
        body: "Чиста архитектура, типизиран код и премислена бързина, за да остане това, което изграждаме, бързо, сигурно и лесно за развитие.",
      },
      {
        icon: "clarity" as const,
        title: "Отговорно изпълнение",
        body: "Писмен обхват, прегледи на всеки етап и честни компромиси. Винаги знаете какво се изгражда и защо.",
      },
    ],
  },
};

export const homeMetadata = (locale: Locale): Metadata =>
  pageMetadata({ description: text[locale].description, path: href(locale, "/") });

/*
 * Section order follows the reference buyer journey (docs/research/showcase-brief.md):
 * hero → proof of craft → who we are → work → process → reviews → enquiry →
 * services → integrations → why us → FAQ. Components are owned per the brief.
 */
export default function HomePage({ locale }: { locale: Locale }) {
  setRequestLocale(locale);
  const copy = text[locale];
  const faqs = generalFaqsIn(locale);
  return (
    <main id="main-content">
      <JsonLd data={graph(faqSchema(faqs), howToSchema(locale))} />
      <HomeHero locale={locale} />
      <DisciplineStage
        projects={["nantucket-events", "sales-pipeline-system", "pet-grooming"].map((slug) =>
          visualOnly(projectBySlug(slug, locale)!),
        )}
        locale={locale}
      />
      <StackMarquee locale={locale} />
      <ClientLogos locale={locale} />
      <StudioIntro locale={locale} />

      <section className="section section-pale" id="work">
        <div className="container">
          <SectionIntro
            chip={copy.workChip}
            title={copy.workTitle}
            text={copy.workText}
            action={
              <ButtonLink href={href(locale, "/work")} variant="outline">
                {copy.viewAll}
              </ButtonLink>
            }
          />
        </div>
        <div className="container rail-container">
          <WorkRail projects={projectsIn(locale)} locale={locale} />
        </div>
      </section>

      <ProcessCards locale={locale} />
      <Testimonials locale={locale} />
      <EnquirySection locale={locale} />
      <ServicesBento locale={locale} />
      <IntegrationsHub locale={locale} />
      <WhyUs items={copy.why} locale={locale} />
      <FAQSection faqs={faqs} locale={locale} />
    </main>
  );
}
