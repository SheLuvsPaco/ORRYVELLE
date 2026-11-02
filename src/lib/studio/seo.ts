import type { Metadata } from "next";
import { processStepsIn, serviceBySlug, site, type Service } from "./content";
import { feedPath } from "./feed";
import { englishPath, href, localeOf, t, type Locale } from "./i18n";
import type { Insight } from "./insights";
import type { Project } from "./projects";
import { solutionPath, type Solution } from "./solutions";

/**
 * Search and answer-engine plumbing: per-page metadata and schema.org structured data.
 * Everything here describes what the page visibly says; never add claims (ratings, prices,
 * awards) that the page itself doesn't show.
 */

export const absoluteUrl = (path: string) => `${site.url}${path === "/" ? "" : path}`;
const absolute = absoluteUrl;

/** Reference to the organization node defined once in the root layout. */
export const organizationRef = { "@id": `${site.url}/#organization` };

export const homeTitle: Record<Locale, string> = {
  en: "AI Automation, Custom Software & Website Design | Orryvelle",
  bg: "Софтуер по поръчка, AI автоматизация и уебсайтове | Orryvelle",
};

/**
 * Indexable, with no limits on snippet length or preview size: large image previews are what
 * Discover and AI result cards use, and the default caps them.
 */
export const siteRobots: NonNullable<Metadata["robots"]> = {
  index: true,
  follow: true,
  "max-image-preview": "large",
  "max-snippet": -1,
  "max-video-preview": -1,
};

/** Open Graph locale codes; the English copy uses British spelling. */
export const ogLocale: Record<Locale, string> = { en: "en_GB", bg: "bg_BG" };

/**
 * Search Console and Bing Webmaster Tools ownership tags, set from Vercel environment
 * variables. Leave them empty when the domain is verified by DNS instead.
 */
const googleVerification = process.env["GOOGLE_SITE_VERIFICATION"];
const bingVerification = process.env["BING_SITE_VERIFICATION"];
export const siteVerification: NonNullable<Metadata["verification"]> = {
  ...(googleVerification ? { google: googleVerification } : {}),
  ...(bingVerification ? { other: { "msvalidate.01": bingVerification } } : {}),
};

/** Title, description, canonical URL and share card for one page. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title?: string;
  description: string;
  path: string;
}): Metadata {
  const locale = localeOf(path);
  const shareTitle = title ? `${title} | ${site.name}` : homeTitle[locale];
  // Google shows about 60 characters and already prints the site name above each result, so a
  // long title drops the brand suffix rather than having its keywords cut off.
  const pageTitle = title && shareTitle.length > 62 ? { absolute: title } : title;
  // Every page exists in both languages, so each points at its twin (hreflang); English is the default.
  const en = englishPath(path);
  return {
    ...(pageTitle ? { title: pageTitle } : {}),
    description,
    alternates: {
      canonical: path,
      languages: { en, bg: href("bg", en), "x-default": en },
      types: { "application/rss+xml": [{ url: feedPath(locale), title: t(locale).insightsFeed }] },
    },
    openGraph: {
      title: shareTitle,
      description,
      url: path,
      siteName: site.name,
      type: "website",
      locale: ogLocale[locale],
      alternateLocale: ogLocale[locale === "bg" ? "en" : "bg"],
    },
  };
}

const ORG_ID = organizationRef["@id"];
const SITE_ID = `${site.url}/#website`;

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.name,
    legalName: site.company.name.en,
    ...(site.company.eik ? { identifier: { "@type": "PropertyValue", propertyID: "EIK", value: site.company.eik } } : {}),
    url: site.url,
    logo: absolute("/icon-512.png"),
    email: site.email,
    description: site.description,
    slogan: "The engine for businesses that refuse to stall.",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.company.address.street.en,
      addressLocality: site.company.address.city.en,
      postalCode: site.company.address.postcode,
      addressCountry: site.base.countryCode,
    },
    areaServed: "Worldwide",
    knowsAbout: [
      "Custom software development",
      "Client portals",
      "Internal tools",
      "AI agents",
      "AI voice receptionists",
      "Business process automation",
      "n8n",
      "CRM integration",
      "Website design",
      "Next.js",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: site.email,
      url: absolute("/contact"),
      availableLanguage: ["English", "Bulgarian"],
    },
    ...(site.profiles.length ? { sameAs: site.profiles } : {}),
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    name: site.name,
    url: site.url,
    description: site.description,
    publisher: { "@id": ORG_ID },
    inLanguage: ["en", "bg"],
  };
}

/** Breadcrumb trail; `items` use English paths and names already in the page's language. */
export function breadcrumbSchema(items: { name: string; path: string }[], locale: Locale = "en") {
  const home = { name: t(locale).solution.home, path: "/" };
  return {
    "@type": "BreadcrumbList",
    itemListElement: [home, ...items].map((item) => ({ ...item, path: href(locale, item.path) })).map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function serviceSchema(service: Service, locale: Locale = "en") {
  const url = absolute(href(locale, `/services/${service.slug}`));
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name: service.name,
    serviceType: service.name,
    description: service.answer,
    url,
    provider: { "@id": ORG_ID },
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: locale === "bg" ? `Услуги: ${service.name}` : `${service.name} services`,
      itemListElement: service.offer.map((offer) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: offer.title.join(" "), description: offer.body },
      })),
    },
  };
}

/** A focused service, industry or location page (see solutions.ts). */
export function solutionSchema(solution: Solution) {
  const url = absolute(solutionPath(solution));
  const locale = solution.locale ?? "en";
  const parent = serviceBySlug(solution.service, locale);
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name: solution.name,
    serviceType: solution.name,
    description: solution.answer,
    url,
    provider: { "@id": ORG_ID },
    areaServed: "Worldwide",
    ...(parent ? { isRelatedTo: { "@id": `${absolute(href(locale, `/services/${parent.slug}`))}#service` } } : {}),
    ...(solution.audience ? { audience: { "@type": "BusinessAudience", audienceType: solution.audience } } : {}),
  };
}

/** Real client projects only; concept studies are not presented as work for a client. */
export function projectSchema(project: Project, locale: Locale = "en") {
  const url = absolute(href(locale, `/work/${project.slug}`));
  const image = project.shots?.screen?.slices
    ? `${project.shots.screen.slices.base}-0.webp`
    : (project.shots?.phone?.src ?? project.shots?.screen?.src);
  return {
    "@type": "CreativeWork",
    "@id": `${url}#work`,
    name: project.title,
    description: project.summary,
    url,
    inLanguage: locale,
    genre: project.sector,
    about: serviceBySlug(project.service, locale)?.name,
    creator: { "@id": ORG_ID },
    ...(image ? { image: absolute(image) } : {}),
  };
}

export function howToSchema(locale: Locale = "en") {
  return {
    "@type": "HowTo",
    name: locale === "bg" ? `Как протича проект с ${site.name}` : `How a project with ${site.name} works`,
    inLanguage: locale,
    step: processStepsIn(locale).map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.text,
    })),
  };
}

export function articleSchema(insight: Insight, locale: Locale = "en") {
  const url = absolute(href(locale, `/insights/${insight.slug}`));
  return {
    "@type": "Article",
    "@id": `${url}#article`,
    headline: insight.title,
    description: insight.description,
    abstract: insight.answer,
    url,
    mainEntityOfPage: url,
    image: ["16x9", "4x3", "1x1"].map((ratio) => `${url}/cover/${ratio}.png`),
    // Google reads a date without a timezone in Googlebot's own; the articles are dated at noon UTC.
    datePublished: `${insight.published}T12:00:00+00:00`,
    dateModified: `${insight.updated}T12:00:00+00:00`,
    inLanguage: locale,
    author: { "@type": "Organization", "@id": ORG_ID, name: site.name, url: site.url },
    publisher: { "@type": "Organization", "@id": ORG_ID, name: site.name, url: site.url, logo: absolute("/icon-512.png") },
    about: serviceBySlug(insight.service, locale)?.name,
    citation: insight.sources.map((source) => source.url),
  };
}

/** Wraps nodes in one @graph so every page shares the organization by reference. */
export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
