import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { href, type Locale } from "@/lib/studio/i18n";
import { setRequestLocale } from "@/lib/studio/localize";
import { absoluteUrl, breadcrumbSchema, graph, pageMetadata, solutionSchema } from "@/lib/studio/seo";
import { industriesIn, solutionPath } from "@/lib/studio/solutions";
import EnquirySection from "../EnquirySection";
import JsonLd from "../JsonLd";
import { Chip, Corners } from "../ui";
import "./industries.css";

const text = {
  en: {
    title: "Industries: Software, AI & Websites for Your Sector",
    description:
      "Custom software, AI receptionists and websites for salons and groomers, home services and trades, event rental, florists and boutique retailers.",
    name: "Industries",
    heading: ["Built for how", "your sector works."],
    intro:
      "Every industry has its own busy moments, its own customers and its own way of booking work. These are the sectors where we’ve already built software, AI and websites that are in real use.",
    listLabel: "Industries we serve",
    note: "Not on the list? Most of our work comes from businesses with a specific problem, whatever the sector.",
    noteLink: "Tell us about yours.",
  },
  bg: {
    title: "Индустрии: софтуер, AI и уебсайтове за вашия сектор",
    description:
      "Софтуер по поръчка, AI асистенти и уебсайтове за салони и груминг, домашни услуги и ремонти, наем за събития, цветарски и бутикови магазини.",
    name: "Индустрии",
    heading: ["Създадено за това как", "работи вашият сектор."],
    intro:
      "Всяка индустрия има своите натоварени моменти, своите клиенти и свой начин да приема поръчки. Това са секторите, в които вече сме изградили софтуер, AI и уебсайтове, които се използват реално.",
    listLabel: "Индустрии, с които работим",
    note: "Не виждате сектора си? Повечето ни проекти идват от бизнеси с конкретен проблем, независимо от сектора.",
    noteLink: "Разкажете ни за вашия.",
  },
};

export const industriesMetadata = (locale: Locale): Metadata =>
  pageMetadata({ title: text[locale].title, description: text[locale].description, path: href(locale, "/industries") });

export default function IndustriesPage({ locale }: { locale: Locale }) {
  setRequestLocale(locale);
  const copy = text[locale];
  const industries = industriesIn(locale);
  return (
    <main id="main-content">
      <JsonLd
        data={graph(
          {
            "@type": "CollectionPage",
            url: absoluteUrl(href(locale, "/industries")),
            name: copy.name,
            inLanguage: locale,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: industries.map((industry, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: solutionSchema(industry),
              })),
            },
          },
          breadcrumbSchema([{ name: copy.name, path: "/industries" }], locale),
        )}
      />
      <section className="section industries-hero">
        <div className="container">
          <div className="industries-hero-copy" data-reveal>
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
      <section className="section section-tight" aria-label={copy.listLabel}>
        <div className="container">
          <ul className="industry-list">
            {industries.map((industry) => (
              <li key={industry.slug}>
                <Link href={solutionPath(industry)} className="industry-card">
                  <span className="industry-card-top">
                    <b>{industry.name}</b>
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </span>
                  <span>{industry.lead}</span>
                  <Corners />
                </Link>
              </li>
            ))}
          </ul>
          <p className="industries-note">
            {copy.note} <Link href={href(locale, "/contact")}>{copy.noteLink}</Link>
          </p>
        </div>
      </section>
      <EnquirySection locale={locale} />
    </main>
  );
}
