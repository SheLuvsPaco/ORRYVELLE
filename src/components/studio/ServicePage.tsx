import Link from "next/link";
import { ArrowUpRight, Bot, Check, CornerUpRight, Palette, Plug } from "lucide-react";
import type { Service } from "@/lib/studio/content";
import { href, inSentence, t, type Locale } from "@/lib/studio/i18n";
import { projectsForService } from "@/lib/studio/projects";
import { solutionPath, solutionsFor } from "@/lib/studio/solutions";
import { Browser, Phone } from "./Mockups";
import EnquirySection from "./EnquirySection";
import FAQSection from "./FAQSection";
import RelatedInsights from "./RelatedInsights";
import WhyUs from "./WhyUs";
import { ProcessCards } from "./Process";
import { BentoCard, type BentoLayout } from "./ServicesBento";
import { Glass, Pill, Tile, Toggle } from "./Fragments";
import { translateTree } from "./tr";
import { ButtonLink, Chip, Corners, SectionIntro } from "./ui";
import { WorkRail } from "./Work";
import "./styles/service-page.css";

/** Card rhythm for the six offerings: wide + narrow, three across, one full-width. */
const offerLayout: BentoLayout[] = ["side", "top", "bottom", "bottom", "bottom", "wide"];

const text = {
  en: {
    seeWork: "See the work",
    explore: (name: string) => `Explore ${name.toLowerCase()}`,
    servicesLabel: (name: string) => `${name} services`,
    studiesChip: "Selected studies",
    studiesTitle: (name: string): [string, string] => [`${name},`, "shown in detail."],
    viewAll: "View all work",
    studiesLabel: (name: string) => `${name} studies`,
    offerChip: "What we offer",
    whyChip: "Why choose us",
    engagementsChip: "Engagements",
    engagementsTitle: ["Shaped around", "your goals."] as [string, string],
    engagementsText:
      "Every project is scoped individually, so there’s no price list. These are the usual ways we work. Your written proposal confirms exactly what’s included, the timeline and the price before anything starts.",
    included: ["What’s", "included"] as [string, string],
    guides: ["Guides before", "you decide"] as [string, string],
    faq: (name: string): [string, string] => ["Questions about", name.toLowerCase()],
  },
  bg: {
    seeWork: "Вижте проектите",
    explore: (name: string) => `Разгледайте ${inSentence(name)}`,
    servicesLabel: (name: string) => `Услуги: ${name}`,
    studiesChip: "Избрани проекти",
    studiesTitle: (name: string): [string, string] => [`${name},`, "показани в детайли."],
    viewAll: "Всички проекти",
    studiesLabel: (name: string) => `Проекти: ${name}`,
    offerChip: "Какво предлагаме",
    whyChip: "Защо да изберете нас",
    engagementsChip: "Формати на работа",
    engagementsTitle: ["Съобразено", "с вашите цели."] as [string, string],
    engagementsText:
      "Всеки проект се оценява поотделно, затова няма ценоразпис. Това са обичайните начини, по които работим. Писмената ви оферта потвърждава точно какво е включено, сроковете и цената, преди да започне каквато и да е работа.",
    included: ["Какво", "е включено"] as [string, string],
    guides: ["Статии, преди", "да решите"] as [string, string],
    faq: (name: string): [string, string] => ["Въпроси за", inSentence(name)],
  },
};

/** Small annotations floating over the hero visual, in the same language as the bento fragments. */
function HeroNotes({ slug }: { slug: Service["slug"] }) {
  return <>{translateTree(Notes({ slug }))}</>;
}

function Notes({ slug }: { slug: Service["slug"] }) {
  if (slug === "custom-software")
    return (
      <>
        <Glass className="hero-note is-a">
          <span className="hero-note-stack">
            <small>Role</small>
            <b>Admin</b>
          </span>
          <Toggle on />
        </Glass>
        <Glass className="hero-note is-b">
          <code>GET /v1/accounts</code>
          <Pill tone="ok">200 OK</Pill>
        </Glass>
        <Tile icon={Plug} className="hero-note-tile" />
      </>
    );
  if (slug === "enterprise-solutions")
    return (
      <>
        <Glass className="hero-note is-a">
          <i className="fr-dot is-live" />
          <span className="hero-note-stack">
            <small>Agent</small>
            <b>Live · chat &amp; voice</b>
          </span>
        </Glass>
        <Glass className="hero-note is-b">
          <CornerUpRight size="1.1em" />
          <span className="hero-note-stack">
            <small>Handoff</small>
            <b>Escalated to staff</b>
          </span>
        </Glass>
        <Tile icon={Bot} className="hero-note-tile" />
      </>
    );
  return (
    <>
      <Glass className="hero-note is-a fr-type">
        <b>Aa</b>
        <small>Site typography</small>
      </Glass>
      <Glass className="hero-note is-b">
        <span className="hero-note-stack">
          <small>Grid</small>
          <b>12 columns</b>
        </span>
      </Glass>
      <Glass className="fr-swatches hero-note is-c">
        <i style={{ background: "#1c1b18" }} />
        <i style={{ background: "#cfc6b6" }} />
        <i style={{ background: "#d9825b" }} />
      </Glass>
      <Tile icon={Palette} className="hero-note-tile" />
    </>
  );
}

export default function ServicePage({ service, locale = "en" }: { service: Service; locale?: Locale }) {
  const copy = text[locale];
  const ui = t(locale);
  const work = projectsForService(service.slug, locale);
  const [primary, secondary] = [work[0]!, work[1] ?? work[0]!];
  const featuredIndex = service.engagement.length - 1;
  return (
    <main id="main-content">
      <section className="service-hero">
        <div className="container service-hero-grid">
          <div className="service-hero-copy" data-reveal>
            <Chip>
              {service.number} / {service.name}
            </Chip>
            <h1>
              <span className="h1-kicker">{service.seo.heading}</span>
              {service.headline[0]}
              <br />
              <span className="tone">{service.headline[1]}</span>
            </h1>
            <p className="hero-lead">{service.summary}</p>
            <div className="hero-actions">
              <ButtonLink href={ui.contact}>{ui.bookCall}</ButtonLink>
              <ButtonLink href="#work" variant="outline">
                {copy.seeWork}
              </ButtonLink>
            </div>
            <ul className="service-highlights">
              {service.highlights.map((item) => (
                <li key={item}>
                  <Check size={15} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div
            className="service-visual"
            aria-hidden="true"
            data-reveal="image"
            style={{ "--d": 150 } as React.CSSProperties}
          >
            <div className="service-visual-back frame">
              {/* Rendered ~600px wide on desktop, ~73vw below 900px; the phone ~180px / 22vw. */}
              <Browser project={primary} k={0.55} km={0.77} />
            </div>
            <div className="service-visual-front">
              <Phone project={secondary} k={0.6} vw={22} />
            </div>
            <div className="fr hero-notes">
              <HeroNotes slug={service.slug} />
            </div>
          </div>
        </div>
      </section>

      <nav className="container service-explore" aria-label={copy.servicesLabel(service.name)}>
        <span>{copy.explore(service.name)}</span>
        <ul>
          {solutionsFor(service.slug, locale).map((solution) => (
            <li key={solution.slug}>
              <Link href={solutionPath(solution)}>
                <b>{solution.name}</b>
                <small>{solution.headline.join(" ")}</small>
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <section className="section section-pale" id="work">
        <div className="container">
          <SectionIntro
            chip={copy.studiesChip}
            title={copy.studiesTitle(service.name)}
            text={service.description}
            action={
              <ButtonLink href={href(locale, "/work")} variant="outline">
                {copy.viewAll}
              </ButtonLink>
            }
          />
        </div>
        <div className="container rail-container">
          <WorkRail projects={work} label={copy.studiesLabel(service.name)} locale={locale} />
        </div>
      </section>

      <section className="section section-dark services-bento" id="offer">
        <div className="container">
          <SectionIntro
            dark
            chip={copy.offerChip}
            title={service.offerTitle}
            text={service.offerIntro}
            action={
              <ButtonLink href={ui.contact} variant="light">
                {ui.bookCall}
              </ButtonLink>
            }
          />
          <div className="bento">
            {service.offer.map((item, index) => (
              <BentoCard
                key={item.title.join(" ")}
                layout={offerLayout[index] ?? "bottom"}
                eyebrow={`${String(index + 1).padStart(2, "0")} / ${String(service.offer.length).padStart(2, "0")}`}
                icon={item.icon}
                title={item.title}
                body={item.body}
                fragment={item.fragment}
                delay={(index % 3) * 100}
              />
            ))}
          </div>
        </div>
      </section>

      <WhyUs chip={copy.whyChip} title={service.whyTitle} items={service.why} locale={locale} />

      <section className="section" id="engagements">
        <div className="container">
          <SectionIntro
            center
            chip={copy.engagementsChip}
            title={copy.engagementsTitle}
            text={copy.engagementsText}
          />
          <div className="tiers" data-reveal>
            {service.engagement.map((tier, index) => {
              const featured = index === featuredIndex;
              const words = tier.lead.split(" ");
              const [first, rest] =
                words.length > 1
                  ? [words.slice(0, -1).join(" "), words[words.length - 1]]
                  : [tier.lead, ""];
              return (
                <article
                  key={tier.name}
                  className={`tier ${featured ? "is-featured" : ""}`}
                  data-spotlight
                >
                  <span className="tier-frame">
                    {tier.name}
                    <Corners />
                  </span>
                  <h3>
                    {first} {rest ? <span className="tone">{rest}</span> : null}
                  </h3>
                  <p className="tier-body">{tier.body}</p>
                  <h4>
                    {copy.included[0]} <span className="tone">{copy.included[1]}</span>
                  </h4>
                  <ul>
                    {tier.includes.map((item) => (
                      <li key={item}>
                        <span className="tier-check" aria-hidden="true">
                          <Check size={12} strokeWidth={3} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <ButtonLink
                    href={ui.contact}
                    variant={featured ? "primary" : "light"}
                    className="btn-block"
                  >
                    {ui.bookCall}
                  </ButtonLink>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <ProcessCards id="service-process" locale={locale} />
      <RelatedInsights service={service.slug} title={copy.guides} locale={locale} />
      <FAQSection faqs={service.faqs} title={copy.faq(service.name)} locale={locale} />
      <EnquirySection service={service.slug} locale={locale} />
    </main>
  );
}
