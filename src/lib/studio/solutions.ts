import { bgSolutions } from "@/content/bg/solutions";
import { href, type Locale } from "./i18n";
import { overlay } from "./localize";
import type { IconName, ServiceSlug } from "./site";
import { enterpriseSolutions } from "@/content/solutions/enterprise";
import { softwareSolutions } from "@/content/solutions/software";
import { websiteSolutions } from "@/content/solutions/websites";
import { industrySolutions } from "@/content/solutions/industries";
import { bulgaria } from "@/content/solutions/bulgaria";

/**
 * Focused landing pages beneath the three disciplines: one service, industry or location each,
 * matched to what buyers search. Every page must carry real substance (genuine work in `proof`,
 * specific copy); never generate near-identical variants, which Google treats as scaled content.
 * Copy follows the business policies: no prices, real projects only, no em dashes.
 */
export type Solution = {
  slug: string;
  /** Set on the Bulgarian copies; the slug stays English (it's the id), the URL is translated. */
  locale?: Locale;
  kind: "service" | "industry" | "location";
  /** Parent discipline: breadcrumbs, related guides, enquiry form default. */
  service: ServiceSlug;
  /** Short label for links and breadcrumbs. */
  name: string;
  seo: { title: string; description: string };
  /** The searched-for phrase, shown as the plain line inside the H1. */
  heading: string;
  headline: [string, string];
  lead: string;
  /** One sentence on what this is: structured data and llms.txt. */
  answer: string;
  /** Industry pages: who it's for (schema.org audience). */
  audience?: string;
  pains: { title: string; body: string }[];
  features: { icon: IconName; title: string; body: string }[];
  steps: { title: string; body: string }[];
  /** Real projects only, each with what it shows. */
  proof: { slug: string; note: string }[];
  faqs: { question: string; answer: string }[];
};

export const solutions: Solution[] = [
  ...enterpriseSolutions,
  ...softwareSolutions,
  ...websiteSolutions,
  ...industrySolutions,
  bulgaria,
];

/* Bulgarian text is overlaid on each page (src/content/bg/solutions); proof and icons are shared. */
const solutionsBg = solutions.map((solution) => ({
  ...overlay(solution, bgSolutions[solution.slug]),
  locale: "bg" as Locale,
}));

export const solutionsIn = (locale: Locale) => (locale === "bg" ? solutionsBg : solutions);

export const solutionPath = (solution: Solution) =>
  href(
    solution.locale ?? "en",
    solution.kind === "service"
      ? `/services/${solution.service}/${solution.slug}`
      : solution.kind === "industry"
        ? `/industries/${solution.slug}`
        : `/${solution.slug}`,
  );

export const solutionBySlug = (slug: string, locale: Locale = "en") =>
  solutionsIn(locale).find((solution) => solution.slug === slug);
export const solutionsFor = (service: ServiceSlug, locale: Locale = "en") =>
  solutionsIn(locale).filter((solution) => solution.kind === "service" && solution.service === service);
export const industriesIn = (locale: Locale) => solutionsIn(locale).filter((solution) => solution.kind === "industry");
export const industries = industriesIn("en");
