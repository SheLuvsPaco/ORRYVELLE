import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { servicesIn, site } from "@/lib/studio/content";
import { t as dictionary, href, type Locale } from "@/lib/studio/i18n";
import { solutionBySlug, solutionPath } from "@/lib/studio/solutions";
import { ButtonLink, Corners } from "./ui";
import CookieSettingsButton from "./CookieSettingsButton";

type Column = { title: string; links: { label: string; href: string }[] };

/** Footer link columns, the same in both languages; Solutions features the pages buyers look for. */
function columns(locale: Locale): Column[] {
  const copy = dictionary(locale);
  const featured = ["ai-receptionist", "n8n-automation", "custom-crm-development", "shopify-development", "software-development-bulgaria"]
    .map((slug) => solutionBySlug(slug, locale)!)
    .map((solution) => ({ label: solution.name, href: solutionPath(solution) }));
  return [
    {
      title: copy.servicesLabel,
      links: servicesIn(locale).map((service) => ({ label: service.name, href: href(locale, `/services/${service.slug}`) })),
    },
    { title: copy.footer.solutions, links: [...featured, { label: copy.footer.industries, href: href(locale, "/industries") }] },
    { title: copy.studioLabel, links: copy.links },
    {
      title: copy.footer.contactLabel,
      links: [
        { label: copy.bookCall, href: copy.contact },
        { label: copy.footer.sendBrief, href: copy.enquiry },
      ],
    },
  ];
}

/** Site ending: two-tone call to action, link columns, meta row, and a giant wordmark in a crosshair frame. */
export default function SiteFooter({ locale = "en" }: { locale?: Locale }) {
  const copy = dictionary(locale);
  return (
    <footer className="site-footer" data-float-hide>
      <div className="container">
        <div className="footer-top">
          <div className="footer-cta">
            <h2>
              {copy.footer.title[0]}
              <br />
              <span className="tone">{copy.footer.title[1]}</span>
            </h2>
            <p>{copy.footer.text}</p>
            <div className="footer-actions">
              <ButtonLink href={copy.contact}>{copy.bookCall}</ButtonLink>
              <ButtonLink href={copy.enquiry} variant="ghost">
                {copy.footer.sendBrief}
              </ButtonLink>
            </div>
          </div>
          <nav className="footer-columns" aria-label={copy.footer.footerNav}>
            {columns(locale).map((column) => (
              <div key={column.title}>
                <span>{column.title}</span>
                {column.title === copy.footer.contactLabel ? <a href={`mailto:${site.email}`}>{site.email}</a> : null}
                {column.links.map((link) => (
                  <Link key={link.href} href={link.href}>
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </nav>
        </div>
        <div className="footer-meta">
          <span>
            © {new Date().getFullYear()} {site.company.name[locale]}
            {site.company.eik ? `, ${copy.footer.eik} ${site.company.eik}` : ""}. {copy.footer.location}.
          </span>
          <nav className="footer-legal" aria-label={copy.footer.legalNav}>
            <Link href={href(locale, "/privacy")}>{copy.footer.privacy}</Link>
            <Link href={href(locale, "/cookies")}>{copy.footer.cookies}</Link>
            <CookieSettingsButton>{copy.footer.cookieSettings}</CookieSettingsButton>
          </nav>
          <span className="footer-meta-disciplines">
            {copy.footer.disciplines[0]} <i /> {copy.footer.disciplines[1]} <i /> {copy.footer.disciplines[2]}
          </span>
          <a href="#top">
            {copy.footer.backToTop} <ArrowUp size={14} aria-hidden="true" />
          </a>
        </div>
        <div className="footer-wordmark" aria-hidden="true" data-reveal data-spotlight>
          <Corners />
          <svg viewBox="0 0 1000 214" preserveAspectRatio="xMidYMid meet" focusable="false">
            <defs>
              <linearGradient id="footer-wordmark-fill" x1="0" x2="1" y1="0" y2="0.35">
                <stop offset="0" stopColor="#ead7c1" />
                <stop offset="0.48" stopColor="#b99370" />
                <stop offset="1" stopColor="#655446" />
              </linearGradient>
            </defs>
            <text
              x="500"
              y="164"
              textAnchor="middle"
              textLength="964"
              lengthAdjust="spacing"
              fill="url(#footer-wordmark-fill)"
            >
              ORRYVELLE
            </text>
          </svg>
        </div>
      </div>
    </footer>
  );
}
