import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { serviceBySlug } from "@/lib/studio/content";
import { href, inSentence, t, type Locale } from "@/lib/studio/i18n";
import { formatDate, headings, insightBySlug, readingMinutes, renderBody, type Insight } from "@/lib/studio/insights";
import { setRequestLocale } from "@/lib/studio/localize";
import { articleSchema, breadcrumbSchema, faqSchema, graph, pageMetadata } from "@/lib/studio/seo";
import FAQSection from "../FAQSection";
import JsonLd from "../JsonLd";
import RelatedInsights from "../RelatedInsights";
import { ButtonLink, Corners } from "../ui";
import "./article.css";

const text = {
  en: {
    insights: "Insights",
    by: "By Orryvelle",
    updated: "Updated",
    read: (minutes: number) => `${minutes} min read`,
    onPage: "On this page",
    questions: "Questions",
    short: "The short answer",
    consult: "Book a free consultation",
    about: (name: string) => `About ${name.toLowerCase()}`,
    sources: "Sources",
    sourcesNote:
      "Figures were checked against these sources when the guide was last updated. Prices change often, so confirm current rates with each provider.",
    faq: ["Questions", "people also ask"] as [string, string],
    more: ["More", "insights"] as [string, string],
  },
  bg: {
    insights: "Статии",
    by: "От Orryvelle",
    updated: "Обновено",
    read: (minutes: number) => `${minutes} мин четене`,
    onPage: "На тази страница",
    questions: "Въпроси",
    short: "Краткият отговор",
    consult: "Запазете безплатна консултация",
    about: (name: string) => `Повече за ${inSentence(name)}`,
    sources: "Източници",
    sourcesNote:
      "Числата са проверени спрямо тези източници при последното обновяване на статията. Цените се променят често, затова потвърдете актуалните тарифи при всеки доставчик.",
    faq: ["Въпроси, които", "хората задават"] as [string, string],
    more: ["Още", "статии"] as [string, string],
  },
};

export function articleMetadata(slug: string, locale: Locale): Metadata {
  const insight = insightBySlug(slug, locale);
  if (!insight) return {};
  const metadata = pageMetadata({
    title: insight.seoTitle,
    description: insight.description,
    path: href(locale, `/insights/${insight.slug}`),
  });
  return {
    ...metadata,
    openGraph: { ...metadata.openGraph, type: "article", publishedTime: insight.published, modifiedTime: insight.updated },
  };
}

export default function ArticlePage({ insight, locale }: { insight: Insight; locale: Locale }) {
  setRequestLocale(locale);
  const copy = text[locale];
  const ui = t(locale);
  const service = serviceBySlug(insight.service, locale)!;
  const toc = headings(insight);

  return (
    <main id="main-content" className="insight-page">
      <JsonLd
        data={graph(
          articleSchema(insight, locale),
          faqSchema(insight.faqs),
          breadcrumbSchema(
            [
              { name: copy.insights, path: "/insights" },
              { name: insight.title, path: `/insights/${insight.slug}` },
            ],
            locale,
          ),
        )}
      />
      <article>
        <header className="container insight-head">
          <nav className="case-crumbs" aria-label={ui.breadcrumb}>
            <Link href={href(locale, "/insights")}>{copy.insights}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{service.name}</span>
          </nav>
          <h1>{insight.title}</h1>
          <p className="insight-lede">{insight.description}</p>
          <p className="insight-meta">
            <span>{copy.by}</span>
            <i aria-hidden="true" />
            <span>
              {copy.updated} <time dateTime={insight.updated}>{formatDate(insight.updated, locale)}</time>
            </span>
            <i aria-hidden="true" />
            <span>{copy.read(readingMinutes(insight))}</span>
          </p>
        </header>

        <div className="container insight-layout">
          <aside className="insight-toc" aria-label={copy.onPage}>
            <span>{copy.onPage}</span>
            <ol>
              {toc.map((heading) => (
                <li key={heading.id}>
                  <a href={`#${heading.id}`}>{heading.text}</a>
                </li>
              ))}
              <li>
                <a href="#questions">{copy.questions}</a>
              </li>
            </ol>
          </aside>

          <div className="insight-main">
            <section className="insight-answer" aria-labelledby="short-answer">
              <h2 id="short-answer">{copy.short}</h2>
              <p>{insight.answer}</p>
              <ul>
                {insight.takeaways.map((takeaway) => (
                  <li key={takeaway}>{takeaway}</li>
                ))}
              </ul>
              <Corners />
            </section>

            <div className="prose" dangerouslySetInnerHTML={{ __html: renderBody(insight) }} />

            <aside className="insight-service">
              <div>
                <small>
                  {service.number} / {service.name}
                </small>
                <p>{service.answer}</p>
              </div>
              <div className="insight-service-actions">
                <ButtonLink href={ui.contact}>{copy.consult}</ButtonLink>
                <Link href={href(locale, `/services/${service.slug}`)} className="text-link">
                  {copy.about(service.name)} <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              </div>
              <Corners />
            </aside>

            <section className="insight-sources" aria-labelledby="sources">
              <h2 id="sources">{copy.sources}</h2>
              <ol>
                {insight.sources.map((source) => (
                  <li key={source.url}>
                    <a href={source.url} target="_blank" rel="noopener">
                      {source.title}
                    </a>
                  </li>
                ))}
              </ol>
              <p>{copy.sourcesNote}</p>
            </section>
          </div>
        </div>
      </article>

      <FAQSection faqs={insight.faqs} title={copy.faq} locale={locale} />

      <RelatedInsights service={insight.service} exclude={insight.slug} title={copy.more} locale={locale} />
    </main>
  );
}
