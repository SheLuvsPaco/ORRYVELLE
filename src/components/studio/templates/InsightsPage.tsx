import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { serviceBySlug } from "@/lib/studio/content";
import { href, type Locale } from "@/lib/studio/i18n";
import { formatDate, insightsIn, readingMinutes } from "@/lib/studio/insights";
import { setRequestLocale } from "@/lib/studio/localize";
import { absoluteUrl, articleSchema, breadcrumbSchema, graph, pageMetadata } from "@/lib/studio/seo";
import JsonLd from "../JsonLd";
import { Chip, Corners } from "../ui";
import "./insights.css";

const text = {
  en: {
    title: "Guides to AI Automation, Software & Websites",
    description:
      "Plain, sourced guides to the questions businesses ask before buying software, AI automation or a new website, with real costs and honest comparisons.",
    name: "Insights",
    heading: ["Answers before", "you buy."],
    intro:
      "Plain, sourced guides to the decisions behind software, AI automation and websites: what to build, what to buy, and what it really takes. Every guide starts with the short answer.",
    all: "All insights",
    short: "The short answer",
    read: (minutes: number) => `${minutes} min read`,
  },
  bg: {
    title: "Статии за AI автоматизация, софтуер и уебсайтове",
    description:
      "Ясни статии с източници по въпросите, които бизнесите задават, преди да купят софтуер, AI автоматизация или нов уебсайт, с реални разходи и честни сравнения.",
    name: "Статии",
    heading: ["Отговори, преди", "да купите."],
    intro:
      "Ясни статии с източници за решенията зад софтуера, AI автоматизацията и уебсайтовете: какво да изградите, какво да купите и какво реално е нужно. Всяка статия започва с краткия отговор.",
    all: "Всички статии",
    short: "Краткият отговор",
    read: (minutes: number) => `${minutes} мин четене`,
  },
};

export const insightsMetadata = (locale: Locale): Metadata =>
  pageMetadata({ title: text[locale].title, description: text[locale].description, path: href(locale, "/insights") });

export default function InsightsPage({ locale }: { locale: Locale }) {
  setRequestLocale(locale);
  const copy = text[locale];
  const insights = insightsIn(locale);
  return (
    <main id="main-content">
      <JsonLd
        data={graph(
          {
            "@type": "CollectionPage",
            url: absoluteUrl(href(locale, "/insights")),
            name: copy.name,
            inLanguage: locale,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: insights.map((insight, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: articleSchema(insight, locale),
              })),
            },
          },
          breadcrumbSchema([{ name: copy.name, path: "/insights" }], locale),
        )}
      />
      <section className="section insights-hero">
        <div className="container">
          <div className="insights-hero-copy" data-reveal>
            <Chip>{copy.name}</Chip>
            <h1>
              {copy.heading[0]}
              <br />
              <span className="tone">{copy.heading[1]}</span>
            </h1>
            <p>{copy.intro}</p>
          </div>
        </div>
      </section>
      <section className="section section-tight insights-index" aria-label={copy.all}>
        <div className="container">
          <ul className="insight-list">
            {insights.map((insight, index) => (
              <li key={insight.slug}>
                <Link href={href(locale, `/insights/${insight.slug}`)} className="insight-card">
                  <span className="insight-card-top">
                    <span className="tag">{serviceBySlug(insight.service, locale)?.name}</span>
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </span>
                  <h2>{insight.title}</h2>
                  <p>{insight.description}</p>
                  {index === 0 ? (
                    <span className="insight-card-answer">
                      <small>{copy.short}</small>
                      {insight.answer}
                    </span>
                  ) : null}
                  <span className="insight-card-meta">
                    <time dateTime={insight.updated}>{formatDate(insight.updated, locale)}</time>
                    <i aria-hidden="true" />
                    {copy.read(readingMinutes(insight))}
                  </span>
                  <Corners />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
