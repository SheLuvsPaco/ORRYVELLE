import { CalendarDays, FileText, Mail } from "lucide-react";
import { site, type ServiceSlug } from "@/lib/studio/content";
import { t as dictionary, type Locale } from "@/lib/studio/i18n";
import EnquiryForm from "./EnquiryForm";
import RotatingBadge from "./RotatingBadge";
import { ButtonLink, Chip, Corners } from "./ui";
import "./styles/enquiry-section.css";

/**
 * "Start your project": a framed panel on a dotted field. Copy and an honest
 * reassurance line on the left; the enquiry form in a thick rim on the right,
 * with the rotating badge on its corner. `dark` is used on /work and /about.
 */
export default function EnquirySection({
  dark = false,
  chip,
  title,
  service = "",
  locale = "en",
}: {
  dark?: boolean;
  chip?: string;
  title?: [string, string];
  service?: ServiceSlug | "";
  locale?: Locale;
}) {
  const copy = dictionary(locale);
  const heading = title ?? copy.enquirySection.title;
  return (
    <section
      className={`section section-panel enquiry-section ${dark ? "is-dark" : ""}`}
      id="enquire"
      data-float-hide
    >
      <div className="container">
        <div className={`enquiry-block ${dark ? "is-dark" : ""}`} data-reveal>
          <Corners />
          <div className="enquiry-copy">
            <Chip dark={dark}>{chip ?? copy.enquirySection.chip}</Chip>
            <h2>
              {heading[0]}
              <br />
              <span className="tone">{heading[1]}</span>
            </h2>
            <p>{copy.enquirySection.text}</p>
            <div className="enquiry-actions">
              <ButtonLink href={copy.contact} variant={dark ? "light" : "outline"}>
                {copy.bookCall}
              </ButtonLink>
              <p className="enquiry-assure">
                <span className="assure-stack" aria-hidden="true">
                  <i>
                    <CalendarDays size={15} strokeWidth={1.6} />
                  </i>
                  <i>
                    <FileText size={15} strokeWidth={1.6} />
                  </i>
                  <i>
                    <Mail size={15} strokeWidth={1.6} />
                  </i>
                </span>
                <span>
                  <b>{copy.enquirySection.assureTitle}</b>
                  <small>{copy.enquirySection.assureText}</small>
                </span>
              </p>
            </div>
            <p className="enquiry-alt">
              {copy.enquirySection.preferWrite} <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          </div>
          <div className="enquiry-frame">
            <RotatingBadge className="enquiry-badge" text={copy.badge} />
            <EnquiryForm tone={dark ? "dark" : "card"} defaultService={service} locale={locale} />
          </div>
        </div>
      </div>
    </section>
  );
}
