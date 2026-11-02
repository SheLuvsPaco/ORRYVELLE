import type { Metadata } from "next";
import { site } from "@/lib/studio/content";
import { href, type Locale } from "@/lib/studio/i18n";
import { setRequestLocale } from "@/lib/studio/localize";
import { absoluteUrl, breadcrumbSchema, graph, organizationRef, pageMetadata } from "@/lib/studio/seo";
import ContactExperience from "../ContactExperience";
import JsonLd from "../JsonLd";
import { Chip } from "../ui";
import "./contact.css";

const text = {
  en: {
    title: "Book a Free 30-Minute Consultation",
    description:
      "Book a free 30-minute call or send a brief about your software, AI automation or website project. We reply with questions and a clear next step.",
    name: "Contact",
    heading: ["Book a free", "30-minute call."],
    intro:
      "Pick a time that suits you. In 30 minutes we’ll look at what’s slowing your business down, tell you honestly whether we can help and outline the next step. No obligation.",
    next: "What happens next",
    steps: [
      { title: "An intro conversation.", text: "Thirty minutes to understand your goals, your timeline, and what success looks like." },
      {
        title: "Discovery & proposal.",
        text: "If we’re a fit, we define the scope together and send a written proposal with deliverables, timeline and price.",
      },
      { title: "We get to work.", text: "Design and build in reviewed milestones, with one team accountable from start to finish." },
    ],
    email: "Prefer email?",
  },
  bg: {
    title: "Запазете безплатна 30-минутна консултация",
    description:
      "Запазете безплатен 30-минутен разговор или ни изпратете запитване за софтуер, AI автоматизация или уебсайт. Отговаряме с въпроси и ясна следваща стъпка.",
    name: "Контакти",
    heading: ["Запазете безплатен", "30-минутен разговор."],
    intro:
      "Изберете удобен за вас час. За 30 минути ще разгледаме какво забавя бизнеса ви, ще ви кажем честно дали можем да помогнем и ще очертаем следващата стъпка. Без ангажимент.",
    next: "Какво следва",
    steps: [
      { title: "Кратък разговор.", text: "Тридесет минути, в които разбираме целите ви, сроковете и как изглежда успехът за вас." },
      {
        title: "Анализ и оферта.",
        text: "Ако си пасваме, определяме обхвата заедно и ви изпращаме писмена оферта с резултатите, сроковете и цената.",
      },
      { title: "Започваме работа.", text: "Дизайн и изработка на етапи, които преглеждате, с един екип, отговорен от началото до края." },
    ],
    email: "Предпочитате имейл?",
  },
};

export const contactMetadata = (locale: Locale): Metadata =>
  pageMetadata({ title: text[locale].title, description: text[locale].description, path: href(locale, "/contact") });

export default function ContactPage({ locale }: { locale: Locale }) {
  setRequestLocale(locale);
  const copy = text[locale];
  return (
    <main id="main-content" className="contact-page">
      <JsonLd
        data={graph(
          { "@type": "ContactPage", url: absoluteUrl(href(locale, "/contact")), inLanguage: locale, about: organizationRef },
          breadcrumbSchema([{ name: copy.name, path: "/contact" }], locale),
        )}
      />
      <div className="container">
        <div className="contact-intro" data-reveal>
          <Chip>{copy.name}</Chip>
          <h1>
            {copy.heading[0]}
            <br />
            <span className="tone">{copy.heading[1]}</span>
          </h1>
          <p>{copy.intro}</p>
        </div>
        <div className="contact-layout">
          <aside className="contact-aside">
            <h2 className="aside-label">{copy.next}</h2>
            <ol>
              {copy.steps.map((step, index) => (
                <li key={step.title}>
                  <span>0{index + 1}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="contact-email">
              <span>{copy.email}</span>
              <a href={`mailto:${site.email}`}>{site.email} ↗</a>
            </div>
          </aside>
          <ContactExperience locale={locale} />
        </div>
      </div>
    </main>
  );
}
