import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { servicesIn, type FragmentName, type IconName } from "@/lib/studio/content";
import { inSentence, href as localHref, type Locale } from "@/lib/studio/i18n";
import Fragment from "./Fragments";
import { ButtonLink, Icon, SectionIntro } from "./ui";
import "./styles/services-bento.css";

export type BentoLayout = "side" | "top" | "bottom" | "wide";

/**
 * One card of the services bento: copy on one side, an illustrative UI
 * fragment bleeding off the card edge on the other.
 */
export function BentoCard({
  layout,
  eyebrow,
  icon,
  title,
  body,
  fragment,
  href,
  linkLabel,
  points,
  heading: Heading = "h3",
  className = "",
  delay = 0,
}: {
  layout: BentoLayout;
  eyebrow: string;
  icon: IconName;
  title: [string, string];
  body: string;
  fragment: FragmentName;
  href?: string;
  linkLabel?: string;
  points?: string[];
  heading?: "h3" | "h2";
  className?: string;
  delay?: number;
}) {
  return (
    <article
      className={`bento-card is-${layout} ${className}`}
      data-reveal
      data-spotlight
      style={{ "--d": delay } as React.CSSProperties}
    >
      <div className="bento-copy">
        <span className="bento-icon">
          <Icon name={icon} size={52} strokeWidth={1} />
        </span>
        <div className="bento-text">
          <span className="bento-eyebrow">
            <i aria-hidden="true" />
            {eyebrow}
          </span>
          <Heading>
            {title[0]} <span className="tone">{title[1]}</span>
          </Heading>
          <p>{body}</p>
          {points?.length ? (
            <ul className="bento-points">
              {points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          ) : null}
          {href ? (
            <Link href={href} className="text-link">
              {linkLabel} <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          ) : null}
        </div>
      </div>
      <div className="bento-media" aria-hidden="true">
        <Fragment name={fragment} />
      </div>
    </article>
  );
}

const text = {
  en: {
    chip: "What we build",
    title: ["Three disciplines.", "One standard."] as [string, string],
    text: "Choose the problem you want solved. Each discipline is a complete service, scoped, designed and delivered by one team, and they combine when you need more than one.",
    action: "Book a free call",
    discipline: "Discipline",
    explore: (name: string) => `Explore ${name}`,
    offer: (name: string) => `The full ${name} offer`,
  },
  bg: {
    chip: "Какво изграждаме",
    title: ["Три направления.", "Един стандарт."] as [string, string],
    text: "Изберете проблема, който искате да решим. Всяко направление е цялостна услуга с ясен обхват, проектирана и изпълнена от един екип, а когато ви трябва повече от едно, ги комбинираме.",
    action: "Запазете безплатен разговор",
    discipline: "Направление",
    explore: (name: string) => `Разгледайте ${name}`,
    offer: (name: string) => `Всичко, което включва ${name}`,
  },
};

/** Homepage services: the three disciplines, each beside one key offering. */
export default function ServicesBento({ locale = "en" }: { locale?: Locale }) {
  const copy = text[locale];
  return (
    <section className="section section-dark services-bento" id="services">
      <div className="container">
        <SectionIntro
          dark
          chip={copy.chip}
          title={copy.title}
          text={copy.text}
          action={
            <ButtonLink href={localHref(locale, "/contact")} variant="light">
              {copy.action}
            </ButtonLink>
          }
        />
        <div className="bento">
          {servicesIn(locale).map((service, index) => {
            const offer = service.offer[service.featured]!;
            const href = localHref(locale, `/services/${service.slug}`);
            const discipline = (
              <BentoCard
                key={service.slug}
                layout="side"
                className="is-discipline"
                eyebrow={`${service.number} / ${copy.discipline}`}
                icon={service.icon}
                title={service.title}
                body={service.description}
                points={service.highlights}
                fragment={service.fragment}
                href={href}
                linkLabel={copy.explore(locale === "bg" ? inSentence(service.name) : service.name)}
              />
            );
            const feature = (
              <BentoCard
                key={`${service.slug}-offer`}
                layout="top"
                eyebrow={`${service.number} / ${service.name}`}
                icon={offer.icon}
                title={offer.title}
                body={offer.body}
                fragment={offer.fragment}
                href={`${href}#offer`}
                linkLabel={copy.offer(locale === "bg" ? inSentence(service.name) : service.name)}
                delay={110}
              />
            );
            return index % 2 === 1 ? [feature, discipline] : [discipline, feature];
          })}
        </div>
      </div>
    </section>
  );
}
