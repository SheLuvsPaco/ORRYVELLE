import { Marked } from "marked";
import { bgInsights } from "@/content/bg/insights";
import { t, type Locale } from "./i18n";
import { overlay } from "./localize";
import type { ServiceSlug } from "./site";
import aiReceptionist from "@/content/insights/ai-receptionist-vs-answering-service";
import automationPlatforms from "@/content/insights/n8n-vs-zapier-vs-make";
import customVsOffTheShelf from "@/content/insights/custom-software-vs-off-the-shelf";
import websitePlatforms from "@/content/insights/custom-website-vs-wordpress-webflow-shopify";
import aiRecommendations from "@/content/insights/get-recommended-by-chatgpt";
import shopifyCost from "@/content/insights/shopify-store-cost";

/**
 * Insights: buyer guides written to be quoted by search and AI assistants. Each article opens
 * with a short answer, cites its sources and ends in FAQs. Figures must come from the listed
 * sources; Orryvelle's own prices never appear (see business policies).
 */
export type Insight = {
  slug: string;
  /** The question as people ask it; used as the H1 and share title. */
  title: string;
  /** Shorter title tag for search results (≤60 characters before the brand). */
  seoTitle: string;
  /** Meta description and card summary (≤160 characters). */
  description: string;
  service: ServiceSlug;
  /** ISO dates. Change `updated` whenever the content meaningfully changes. */
  published: string;
  updated: string;
  /** 40–60 words that answer the title on their own; the passage AI assistants lift. */
  answer: string;
  takeaways: string[];
  /** Markdown. Use `##` for sections (they form the table of contents) and `###` within them. */
  body: string;
  faqs: { question: string; answer: string }[];
  sources: { title: string; url: string }[];
  /** Two-tone heading for the share image. */
  titleParts: [string, string];
};

export const insights: Insight[] = [
  aiReceptionist,
  automationPlatforms,
  customVsOffTheShelf,
  websitePlatforms,
  aiRecommendations,
  shopifyCost,
].sort((a, b) => b.published.localeCompare(a.published) || a.title.localeCompare(b.title));

/* Bulgarian articles are overlays of the English ones (src/content/bg/insights); sources are shared. */
const insightsBg = insights.map((insight) => overlay(insight, bgInsights[insight.slug]));

export const insightsIn = (locale: Locale) => (locale === "bg" ? insightsBg : insights);
export const insightBySlug = (slug: string, locale: Locale = "en") =>
  insightsIn(locale).find((insight) => insight.slug === slug);

export const readingMinutes = (insight: Insight) =>
  Math.max(1, Math.round((insight.body + insight.answer).split(/\s+/).length / 220));

export const formatDate = (iso: string, locale: Locale = "en") =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString(t(locale).dateLocale, { day: "numeric", month: "long", year: "numeric" });

/** Heading anchors; keeps Cyrillic letters so Bulgarian sections get readable ids. */
const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z#0-9]+;/g, "-")
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-|-$/g, "");

/** Section headings (##) for the table of contents. */
export const headings = (insight: Insight) => markdownHeadings(insight.body);

/** The ## headings of any Markdown body, with the ids the renderer gives them. */
export function markdownHeadings(body: string) {
  return [...body.matchAll(/^## (.+)$/gm)].map((match) => {
    const text = match[1]!.replace(/[*_`]/g, "");
    return { id: slugify(text), text };
  });
}

const markdown = new Marked({ gfm: true });
markdown.use({
  renderer: {
    heading({ tokens, depth }) {
      const html = this.parser.parseInline(tokens);
      return `<h${depth} id="${slugify(html)}">${html}</h${depth}>\n`;
    },
  },
});

/** Article body as HTML: tables scroll on small screens, external links open in a new tab. */
export const renderBody = (insight: Insight) => renderMarkdown(insight.body);

/** Any Markdown body (articles, legal pages) as HTML, rendered on the server. */
export function renderMarkdown(body: string) {
  return (markdown.parse(body) as string)
    .replace(/<table>/g, '<div class="table-scroll"><table>')
    .replace(/<\/table>/g, "</table></div>")
    .replace(/<a href="(https?:\/\/)/g, '<a target="_blank" rel="noopener" href="$1');
}
