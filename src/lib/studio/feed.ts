import { serviceBySlug, site } from "./content";
import { href, type Locale } from "./i18n";
import { insightsIn } from "./insights";

/** RSS feed of the articles in one language, served at the insights index plus /feed.xml. */
export const feedPath = (locale: Locale) => `${href(locale, "/insights")}/feed.xml`;

// Not imported from seo.ts: seo.ts links every page to this feed, so it imports from here.
const absoluteUrl = (path: string) => `${site.url}${path}`;

const copy = {
  en: { title: `${site.name} Insights`, description: "Plain, sourced guides to software, AI automation and websites." },
  bg: { title: `Статии от ${site.name}`, description: "Ясни статии с източници за софтуер, AI автоматизация и уебсайтове." },
};

const escape = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const rfc822 = (iso: string) => new Date(`${iso}T12:00:00Z`).toUTCString();

export function insightsFeed(locale: Locale) {
  const insights = [...insightsIn(locale)].sort((a, b) => b.published.localeCompare(a.published));
  const newest = insights.reduce((latest, insight) => (insight.updated > latest ? insight.updated : latest), "");
  const items = insights.map((insight) => {
    const url = absoluteUrl(href(locale, `/insights/${insight.slug}`));
    return [
      "<item>",
      `<title>${escape(insight.title)}</title>`,
      `<link>${url}</link>`,
      `<guid isPermaLink="true">${url}</guid>`,
      `<pubDate>${rfc822(insight.published)}</pubDate>`,
      `<description>${escape(insight.answer)}</description>`,
      `<category>${escape(serviceBySlug(insight.service, locale)?.name ?? "")}</category>`,
      "</item>",
    ].join("");
  });
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "<channel>",
    `<title>${escape(copy[locale].title)}</title>`,
    `<link>${absoluteUrl(href(locale, "/insights"))}</link>`,
    `<description>${escape(copy[locale].description)}</description>`,
    `<language>${locale === "bg" ? "bg" : "en-gb"}</language>`,
    ...(newest ? [`<lastBuildDate>${rfc822(newest)}</lastBuildDate>`] : []),
    `<atom:link href="${absoluteUrl(feedPath(locale))}" rel="self" type="application/rss+xml"/>`,
    ...items,
    "</channel>",
    "</rss>",
  ].join("\n");
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
