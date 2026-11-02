import Link from "next/link";
import { t as dictionary, href, serviceLinksIn, type Locale } from "@/lib/studio/i18n";
import EnquiryForm from "./EnquiryForm";
import HeroAtmosphere from "./HeroAtmosphere";
import RotatingBadge from "./RotatingBadge";
import { ButtonLink, Corners } from "./ui";
import "./styles/home-hero.css";

const heroCopy = {
  en: {
    status: "Available for new projects",
    title: "The engine for businesses that refuse to stall.",
    lines: [["The", "engine", "for"], "businesses that", "refuse to stall."] as const,
    lead: "Missed calls, hours lost to admin, a website that doesn\u2019t sell. Each one costs you customers. Orryvelle finds what\u2019s holding your business back and builds the fix: custom software, AI agents and premium websites.",
    work: "View our work",
    credentialsLabel: "Three disciplines, one studio",
    discipline: "Discipline",
    form: "Tell us about your project",
  },
  bg: {
    status: "Приемаме нови проекти",
    title: "Двигателят за бизнеси, които не спират.",
    lines: [["", "Двигателят", "за"], "бизнеси, които", "не спират."] as const,
    lead: "Пропуснати обаждания, изгубени часове в администрация, сайт, който не продава. Всяко от тях ви струва клиенти. Orryvelle открива какво спира бизнеса ви и изгражда решението: софтуер по поръчка, AI агенти и премиум уебсайтове.",
    work: "Вижте проектите",
    credentialsLabel: "Три направления, едно студио",
    discipline: "Направление",
    form: "Разкажете ни за проекта си",
  },
};

/** Owner: hero agent. Landing-page hero (see docs/research/showcase-brief.md). */
export default function HomeHero({ locale = "en" }: { locale?: Locale }) {
  const copy = heroCopy[locale];
  const ui = dictionary(locale);
  const [[before, word, after], middle, accent] = copy.lines;
  return (
    <section className="hero" data-header-dark>
      <HeroAtmosphere />
      <div className="container hero-grid">
        <div className="hero-copy">
          <Link href={ui.contact} className="status-chip">
            <span className="status-label">
              <span className="status-dot" aria-hidden="true" />
              {copy.status}
            </span>
            <span className="status-action">{ui.announcementCta}</span>
          </Link>
          <h1 className="hero-title">
            <span className="sr-only">{copy.title}</span>
            <span aria-hidden="true" className="hero-line">
              {before ? <span>{before}</span> : null}
              <span className="hero-word">
                <span>{word}</span>
                <Corners />
              </span>
              <span>{after}</span>
            </span>
            <span aria-hidden="true" className="hero-line">
              {middle}
            </span>
            <span aria-hidden="true" className="hero-line hero-accent">
              {accent}
            </span>
          </h1>
          <p className="hero-lead">{copy.lead}</p>
          <div className="hero-actions">
            <ButtonLink href={ui.contact} variant="light">
              {ui.bookCall}
            </ButtonLink>
            <ButtonLink href={href(locale, "/work")} variant="ghost" className="hero-btn-ghost">
              {copy.work}
            </ButtonLink>
          </div>
          <ul className="hero-credentials" aria-label={copy.credentialsLabel}>
            {serviceLinksIn(locale).map((service) => (
              <li key={service.slug}>
                <Link href={href(locale, `/services/${service.slug}`)}>
                  <small>
                    {copy.discipline} {service.number}
                  </small>
                  <b>
                    {service.title[0]} <span className="tone">{service.title[1]}</span>
                  </b>
                  <Corners />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div
          className="hero-form"
          data-float-hide
        >
          <RotatingBadge className="hero-badge" text={ui.badge} />
          <EnquiryForm tone="card" heading={copy.form} locale={locale} />
        </div>
      </div>
    </section>
  );
}
