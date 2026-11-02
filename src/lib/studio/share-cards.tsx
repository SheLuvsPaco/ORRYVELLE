import { serviceBySlug } from "./content";
import type { Locale } from "./i18n";
import { insightBySlug } from "./insights";
import { shareImage } from "./og";
import { projectBySlug } from "./projects";
import { industriesIn, solutionBySlug, solutionsIn } from "./solutions";

/**
 * Share cards for every page in both languages; the opengraph-image routes in app/(en) and
 * app/(bg) only pick one. Cards are rendered at build time.
 */

type Card = { alt: string; kicker: string; title: [string, string] };

/** Per-page cards describe what they show: the kicker line and the headline. */
const card = (kicker: string, title: [string, string]): Card => ({ alt: `${kicker}: ${title.join(" ")}`, kicker, title });

const fixed: Record<"home" | "about" | "contact" | "industries" | "insights" | "work" | "privacy" | "cookies", Record<Locale, Card>> = {
  home: {
    en: { alt: "Orryvelle: the engine for businesses that refuse to stall.", kicker: "Design & engineering studio", title: ["The engine for businesses", "that refuse to stall."] },
    bg: { alt: "Orryvelle: двигателят за бизнеси, които не спират.", kicker: "Студио за дизайн и разработка", title: ["Двигателят за бизнеси,", "които не спират."] },
  },
  about: {
    en: { alt: "About Orryvelle", kicker: "About the studio", title: ["Hi, we’re", "Orryvelle."] },
    bg: { alt: "За Orryvelle", kicker: "За студиото", title: ["Здравейте, ние сме", "Orryvelle."] },
  },
  contact: {
    en: { alt: "Contact Orryvelle: book a free consultation", kicker: "Free 30-minute consultation", title: ["Let’s build", "something exceptional."] },
    bg: { alt: "Свържете се с Orryvelle: безплатна консултация", kicker: "Безплатна 30-минутна консултация", title: ["Да изградим", "нещо изключително."] },
  },
  industries: {
    en: { alt: "Orryvelle industries", kicker: "Industries", title: ["Built for how", "your sector works."] },
    bg: { alt: "Индустрии, с които работи Orryvelle", kicker: "Индустрии", title: ["Създадено за това как", "работи вашият сектор."] },
  },
  insights: {
    en: { alt: "Orryvelle Insights: answers before you buy", kicker: "Insights", title: ["Answers before", "you buy."] },
    bg: { alt: "Статии от Orryvelle: отговори, преди да купите", kicker: "Статии", title: ["Отговори, преди", "да купите."] },
  },
  work: {
    en: { alt: "Orryvelle work: selected projects", kicker: "Work", title: ["Selected work.", "Considered in detail."] },
    bg: { alt: "Проекти на Orryvelle", kicker: "Проекти", title: ["Избрани проекти.", "Премислени в детайли."] },
  },
  privacy: {
    en: { alt: "Orryvelle privacy policy", kicker: "Privacy policy", title: ["Your data,", "plainly explained."] },
    bg: { alt: "Политика за поверителност на Orryvelle", kicker: "Политика за поверителност", title: ["Вашите данни,", "обяснени ясно."] },
  },
  cookies: {
    en: { alt: "Orryvelle cookie policy", kicker: "Cookie policy", title: ["Every cookie,", "and your choice."] },
    bg: { alt: "Политика за бисквитките на Orryvelle", kicker: "Политика за бисквитките", title: ["Всяка бисквитка", "и вашият избор."] },
  },
};

const words = {
  en: { industries: "Industries", insights: "Insights", caseStudy: "Case study", concept: "Concept study", location: "Orryvelle: software development company in Bulgaria", locationKicker: "Software development in Bulgaria" },
  bg: { industries: "Индустрии", insights: "Статии", caseStudy: "Проект", concept: "Концептуален проект", location: "Orryvelle: софтуерна фирма в България", locationKicker: "Разработка на софтуер в България" },
};

export const fixedCard = (page: keyof typeof fixed, locale: Locale) => fixed[page][locale];

export function serviceCard(slug: string, locale: Locale): Card {
  const service = serviceBySlug(slug, locale)!;
  return card(`${service.number} / ${service.name}`, service.headline);
}

export function subServiceCard(slug: string, sub: string, locale: Locale): Card {
  const solution = solutionsIn(locale).find((item) => item.kind === "service" && item.service === slug && item.slug === sub)!;
  return card(solution.name, solution.headline);
}

export function industryCard(slug: string, locale: Locale): Card {
  const industry = industriesIn(locale).find((item) => item.slug === slug)!;
  return card(`${words[locale].industries} · ${industry.name}`, industry.headline);
}

export function insightCard(slug: string, locale: Locale): Card {
  const insight = insightBySlug(slug, locale)!;
  return card(`${words[locale].insights} · ${serviceBySlug(insight.service, locale)?.name}`, insight.titleParts);
}

export function projectCard(slug: string, locale: Locale): Card {
  const project = projectBySlug(slug, locale)!;
  const kind = project.status === "client" ? words[locale].caseStudy : words[locale].concept;
  return card(`${kind} · ${project.sector}`, project.titleParts);
}

export function locationCard(locale: Locale): Card {
  return { alt: words[locale].location, kicker: words[locale].locationKicker, title: solutionBySlug("software-development-bulgaria", locale)!.headline };
}

export const renderCard = (card: Card, locale: Locale, size?: { width: number; height: number }) =>
  shareImage({ kicker: card.kicker, title: card.title, locale, ...(size ? { size } : {}) });
