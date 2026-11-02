import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { serviceBySlug } from "@/lib/studio/content";
import { href, type Locale } from "@/lib/studio/i18n";
import { insightsIn } from "@/lib/studio/insights";
import type { ServiceSlug } from "@/lib/studio/site";
import { Chip } from "./ui";
import "./styles/related-insights.css";

const text = {
  en: { chip: "Insights", title: ["Related", "guides"] as [string, string], all: "All insights" },
  bg: { chip: "Статии", title: ["Свързани", "статии"] as [string, string], all: "Всички статии" },
};

/**
 * Links to Insights guides: same-discipline guides first, then the newest others. Ties
 * service pages, case studies and articles together for readers and crawlers.
 */
export default function RelatedInsights({
  service,
  exclude,
  title,
  limit = 3,
  locale = "en",
}: {
  service?: ServiceSlug;
  exclude?: string;
  title?: [string, string];
  limit?: number;
  locale?: Locale;
}) {
  const copy = text[locale];
  const heading = title ?? copy.title;
  const pool = insightsIn(locale).filter((insight) => insight.slug !== exclude);
  const picks = [
    ...pool.filter((insight) => insight.service === service),
    ...pool.filter((insight) => insight.service !== service),
  ].slice(0, limit);
  if (!picks.length) return null;
  return (
    <section className="section section-tight related-insights" aria-labelledby="related-insights">
      <div className="container">
        <div className="related-insights-head">
          <div>
            <Chip>{copy.chip}</Chip>
            <h2 id="related-insights">
              {heading[0]} <span className="tone">{heading[1]}</span>
            </h2>
          </div>
          <Link href={href(locale, "/insights")} className="text-link">
            {copy.all} <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>
        <ul className="related-insights-list">
          {picks.map((insight) => (
            <li key={insight.slug}>
              <Link href={href(locale, `/insights/${insight.slug}`)}>
                <small>{serviceBySlug(insight.service, locale)?.name}</small>
                <b>{insight.title}</b>
                <span>{insight.description}</span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
