import type { Metadata } from "next";
import { serviceBySlug } from "@/lib/studio/content";
import { englishPath, href, t, type Locale } from "@/lib/studio/i18n";
import { setRequestLocale } from "@/lib/studio/localize";
import { breadcrumbSchema, faqSchema, graph, pageMetadata, serviceSchema, solutionSchema } from "@/lib/studio/seo";
import { industriesIn, solutionBySlug, solutionPath, solutionsIn, type Solution } from "@/lib/studio/solutions";
import JsonLd from "../JsonLd";
import ServicePage from "../ServicePage";
import SolutionPage from "../SolutionPage";

/*
 * Route bodies for the discipline, sub-service, industry and location pages, shared by the
 * English routes and their Bulgarian mirrors. Ids are the English slugs.
 */

export function serviceMetadata(slug: string, locale: Locale): Metadata {
  const service = serviceBySlug(slug, locale);
  if (!service) return {};
  return pageMetadata({ title: service.seo.title, description: service.seo.description, path: href(locale, `/services/${service.slug}`) });
}

export function ServiceRoute({ slug, locale }: { slug: string; locale: Locale }) {
  setRequestLocale(locale);
  const service = serviceBySlug(slug, locale)!;
  return (
    <>
      <JsonLd
        data={graph(
          serviceSchema(service, locale),
          faqSchema(service.faqs),
          breadcrumbSchema([{ name: service.name, path: `/services/${service.slug}` }], locale),
        )}
      />
      <ServicePage service={service} locale={locale} />
    </>
  );
}

export const findSubService = (slug: string, sub: string, locale: Locale) =>
  solutionsIn(locale).find((solution) => solution.kind === "service" && solution.service === slug && solution.slug === sub);
export const findIndustry = (slug: string, locale: Locale) =>
  industriesIn(locale).find((industry) => industry.slug === slug);

const solutionMetadata = (solution: Solution | undefined): Metadata =>
  solution ? pageMetadata({ title: solution.seo.title, description: solution.seo.description, path: solutionPath(solution) }) : {};

export const subServiceMetadata = (slug: string, sub: string, locale: Locale) => solutionMetadata(findSubService(slug, sub, locale));
export const industryMetadata = (slug: string, locale: Locale) => solutionMetadata(findIndustry(slug, locale));
export const locationMetadata = (locale: Locale) => solutionMetadata(solutionBySlug("software-development-bulgaria", locale));

/** A focused page: sub-service, industry or the Bulgaria page, with its structured data. */
export function SolutionRoute({ solution }: { solution: Solution }) {
  const locale = solution.locale ?? "en";
  setRequestLocale(locale);
  const service = serviceBySlug(solution.service, locale)!;
  const parents =
    solution.kind === "service"
      ? [{ name: service.name, path: `/services/${service.slug}` }]
      : solution.kind === "industry"
        ? [{ name: t(locale).solution.industries, path: "/industries" }]
        : [];
  return (
    <>
      <JsonLd
        data={graph(
          solutionSchema(solution),
          faqSchema(solution.faqs),
          breadcrumbSchema([...parents, { name: solution.name, path: englishPath(solutionPath(solution)) }], locale),
        )}
      />
      <SolutionPage solution={solution} />
    </>
  );
}
