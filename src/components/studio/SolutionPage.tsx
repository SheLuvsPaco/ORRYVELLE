import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { serviceBySlug } from "@/lib/studio/content";
import { projectBySlug, visualOnly } from "@/lib/studio/projects";
import { t as dictionary, href, inSentence } from "@/lib/studio/i18n";
import { solutionPath, solutionsFor, type Solution } from "@/lib/studio/solutions";
import { Collage } from "./Collage";
import EnquirySection from "./EnquirySection";
import FAQSection from "./FAQSection";
import LazyCollage from "./LazyCollage";
import RelatedInsights from "./RelatedInsights";
import { ButtonLink, Chip, Corners, IconTile, SectionIntro } from "./ui";
import "./styles/solution-page.css";

/** Landing page for one service, industry or location (content in src/content/solutions). */
export default function SolutionPage({ solution }: { solution: Solution }) {
  const locale = solution.locale ?? "en";
  const copy = dictionary(locale);
  const ui = copy.solution;
  const service = serviceBySlug(solution.service, locale)!;
  const serviceHref = href(locale, `/services/${service.slug}`);
  const name = (value: string) => (locale === "bg" ? inSentence(value) : value.toLowerCase());
  const proof = solution.proof
    .map((item) => ({ ...item, project: projectBySlug(item.slug, locale) }))
    .filter((item) => item.project);
  const lead = proof[0]!.project!;
  const siblings =
    solution.kind === "service" ? solutionsFor(solution.service, locale).filter((s) => s.slug !== solution.slug) : [];
  const crumbs =
    solution.kind === "service"
      ? [{ name: service.name, href: serviceHref }]
      : solution.kind === "industry"
        ? [{ name: ui.industries, href: href(locale, "/industries") }]
        : [];

  return (
    <main id="main-content" className="solution-page">
      <section className="solution-hero">
        <div className="container solution-hero-grid">
          <div className="solution-hero-copy" data-reveal>
            <nav className="solution-crumbs" aria-label={copy.breadcrumb}>
              <Link href={copy.home}>{ui.home}</Link>
              {crumbs.map((crumb) => (
                <span key={crumb.href}>
                  <i aria-hidden="true">/</i>
                  <Link href={crumb.href}>{crumb.name}</Link>
                </span>
              ))}
              <i aria-hidden="true">/</i>
              <span aria-current="page">{solution.name}</span>
            </nav>
            <h1>
              <span className="h1-kicker">{solution.heading}</span>
              {solution.headline[0]}
              <br />
              <span className="tone">{solution.headline[1]}</span>
            </h1>
            <p className="hero-lead">{solution.lead}</p>
            <div className="hero-actions">
              <ButtonLink href={copy.contact}>{ui.bookFreeCall}</ButtonLink>
              <ButtonLink href="#proof" variant="outline">
                {ui.seeWork}
              </ButtonLink>
            </div>
            <ul className="solution-trust">
              {ui.trust.map((item) => (
                <li key={item}>
                  <Check size={15} aria-hidden="true" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="solution-hero-visual" aria-hidden="true" data-reveal="image">
            <Collage project={lead} variant="square" width={600} mobileVw={92} priority />
          </div>
        </div>
      </section>

      <section className="section section-tight solution-pains">
        <div className="container">
          <SectionIntro chip={ui.painsChip} title={ui.painsTitle} />
          <ul className="solution-pain-list">
            {solution.pains.map((pain, index) => (
              <li key={pain.title} data-reveal style={{ "--d": index * 80 } as React.CSSProperties}>
                <span className="solution-pain-index">{String(index + 1).padStart(2, "0")}</span>
                <h3>{pain.title}</h3>
                <p>{pain.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-dark solution-features">
        <div className="container">
          <SectionIntro dark chip={ui.featuresChip} title={ui.featuresTitle} />
          <ul className="solution-feature-list">
            {solution.features.map((feature) => (
              <li key={feature.title} data-reveal>
                <IconTile name={feature.icon} />
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section solution-steps">
        <div className="container">
          <SectionIntro chip={ui.stepsChip} title={ui.stepsTitle} />
          <ol className="solution-step-list">
            {solution.steps.map((step, index) => (
              <li key={step.title} data-reveal style={{ "--d": index * 80 } as React.CSSProperties}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
          <aside className="solution-pricing" data-reveal>
            <Corners />
            <small>{ui.pricingLabel}</small>
            <p>{solution.service === "websites" ? ui.pricingWebsites : ui.pricingOther}</p>
          </aside>
        </div>
      </section>

      <section className="section section-pale solution-proof" id="proof">
        <div className="container">
          <SectionIntro chip={ui.proofChip} title={ui.proofTitle} />
          <ul className={`solution-proof-list is-count-${proof.length}`}>
            {proof.map(({ project, note }) => (
              <li key={project!.slug}>
                <Link href={href(locale, `/work/${project!.slug}`)} className="solution-proof-card">
                  <span className="solution-proof-media">
                    <LazyCollage project={visualOnly(project!)} variant="square" width={420} mobileVw={84} />
                  </span>
                  <span className="solution-proof-copy">
                    <small>{project!.sector}</small>
                    <b>{project!.title}</b>
                    <span>{note}</span>
                    <em>
                      {ui.seeCase} <ArrowUpRight size={15} aria-hidden="true" />
                    </em>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FAQSection faqs={solution.faqs} title={[ui.faqTitle, name(solution.name)]} locale={locale} />

      {siblings.length ? (
        <section className="section section-tight solution-siblings" aria-labelledby="more-services">
          <div className="container">
            <Chip>{service.name}</Chip>
            <h2 id="more-services">
              {ui.moreFrom} <span className="tone">{name(service.name)}</span>
            </h2>
            <ul>
              {siblings.map((sibling) => (
                <li key={sibling.slug}>
                  <Link href={solutionPath(sibling)}>
                    {sibling.name} <ArrowUpRight size={15} aria-hidden="true" />
                  </Link>
                </li>
              ))}
              <li>
                <Link href={serviceHref}>
                  {ui.all} {name(service.name)} <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </div>
        </section>
      ) : null}

      <RelatedInsights service={solution.service} locale={locale} />
      <EnquirySection service={solution.service} locale={locale} />
    </main>
  );
}
