import type { Metadata } from "next";
import Link from "next/link";
import { href, t, type Locale } from "@/lib/studio/i18n";
import { formatDate, markdownHeadings, renderMarkdown } from "@/lib/studio/insights";
import { legalDoc, type LegalSlug } from "@/lib/studio/legal";
import { setRequestLocale } from "@/lib/studio/localize";
import { breadcrumbSchema, graph, pageMetadata } from "@/lib/studio/seo";
import CookieSettingsButton from "../CookieSettingsButton";
import JsonLd from "../JsonLd";
import "./article.css";
import "./legal.css";

const text = {
  en: { updated: "Last updated", onPage: "On this page", other: { privacy: "Cookie policy", cookies: "Privacy policy" } },
  bg: { updated: "Последна промяна", onPage: "На тази страница", other: { privacy: "Политика за бисквитките", cookies: "Политика за поверителност" } },
};

const otherSlug = (slug: LegalSlug): LegalSlug => (slug === "privacy" ? "cookies" : "privacy");

export function legalMetadata(slug: LegalSlug, locale: Locale): Metadata {
  const doc = legalDoc(slug, locale);
  return pageMetadata({ title: doc.title, description: doc.description, path: href(locale, `/${slug}`) });
}

/** Privacy and cookie policies: the article layout without the sales blocks. */
export default function LegalPage({ slug, locale }: { slug: LegalSlug; locale: Locale }) {
  setRequestLocale(locale);
  const doc = legalDoc(slug, locale);
  const copy = text[locale];
  const ui = t(locale);
  const toc = markdownHeadings(doc.body);

  return (
    <main id="main-content" className="insight-page legal-page">
      <JsonLd data={graph(breadcrumbSchema([{ name: doc.title, path: `/${slug}` }], locale))} />
      <article>
        <header className="container insight-head">
          <h1>{doc.title}</h1>
          <p className="insight-lede">{doc.description}</p>
          <p className="insight-meta">
            <span>
              {copy.updated} <time dateTime={doc.updated}>{formatDate(doc.updated, locale)}</time>
            </span>
            <i aria-hidden="true" />
            <Link href={href(locale, `/${otherSlug(slug)}`)}>{copy.other[slug]}</Link>
          </p>
          {slug === "cookies" ? (
            <div className="legal-actions">
              <CookieSettingsButton className="btn btn-primary">{ui.footer.cookieSettings}</CookieSettingsButton>
            </div>
          ) : null}
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
            </ol>
          </aside>
          <div className="insight-main prose" dangerouslySetInnerHTML={{ __html: renderMarkdown(doc.body) }} />
        </div>
      </article>
    </main>
  );
}
