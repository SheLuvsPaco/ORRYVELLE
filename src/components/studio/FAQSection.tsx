import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/studio/content";
import { t as dictionary, type Locale } from "@/lib/studio/i18n";
import { Chip, Corners } from "./ui";
import "./styles/faq-section.css";

/** Questions in a framed panel with crosshair corners. Native <details>, so it works without JavaScript. */
export default function FAQSection({
  faqs,
  title,
  locale = "en",
}: {
  faqs: { question: string; answer: string }[];
  title?: [string, string];
  locale?: Locale;
}) {
  const copy = dictionary(locale);
  const heading = title ?? copy.faq.title;
  return (
    <section className="section section-panel faq-section" id="questions">
      <div className="container">
        <div className="faq-panel" data-reveal>
          <Corners />
          <div className="faq-inner">
            <div className="faq-head">
              <Chip>{copy.faq.chip}</Chip>
              <h2>
                {heading[0]} <span className="tone">{heading[1]}</span>
              </h2>
            </div>
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <details key={faq.question}>
                  <summary>
                    <span className="faq-index" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="faq-question">{faq.question}</span>
                    <span className="faq-toggle" aria-hidden="true">
                      <i />
                      <i />
                    </span>
                  </summary>
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
            <div className="faq-foot">
              <p>
                <b>{copy.faq.footTitle}</b> {copy.faq.footText}
              </p>
              <div className="faq-foot-links">
                <Link href={copy.contact} className="text-link">
                  {copy.bookCall} <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
                <a href={`mailto:${site.email}`} className="text-link">
                  {site.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
