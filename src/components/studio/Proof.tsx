/**
 * Owner: trust agent. Client logo wall + reviews wall, driven by src/lib/studio/proof.ts.
 * Both render nothing while their data is empty: no invented proof, ever.
 */
import type { Locale } from "@/lib/studio/i18n";
import { clientLogos, testimonials, type ClientLogo, type Testimonial } from "@/lib/studio/proof";
import ReviewsWall from "./ReviewsWall";
import { Chip, Corners, SectionIntro } from "./ui";
import "./styles/proof.css";

const text = {
  en: { clients: "Clients", logos: ["Businesses we’ve", "built for."] as [string, string], chip: "Client reviews", reviews: ["In our clients’", "own words."] as [string, string] },
  bg: { clients: "Клиенти", logos: ["Бизнеси, за които", "сме работили."] as [string, string], chip: "Отзиви от клиенти", reviews: ["С думите", "на нашите клиенти."] as [string, string] },
};

export function ClientLogos({
  logos = clientLogos,
  title,
  locale = "en",
}: {
  logos?: ClientLogo[];
  title?: [string, string];
  locale?: Locale;
}) {
  if (!logos.length) return null;
  const heading = title ?? text[locale].logos;
  return (
    <section className="section client-logos" aria-labelledby="client-logos-title">
      <div className="container">
        <div className="client-logos-head" data-reveal>
          <Chip>{text[locale].clients}</Chip>
          <h2 id="client-logos-title">
            {heading[0]} <span className="tone">{heading[1]}</span>
          </h2>
        </div>
        <div className="logo-wall-frame" data-reveal style={{ "--d": 120 } as React.CSSProperties}>
          <Corners />
          <ul className="logo-wall" data-count={logos.length}>
            {logos.map((client) => {
              const mark = (
                // Logos are client-supplied SVG/PNG files; rendered as-is and toned in CSS.
                // eslint-disable-next-line @next/next/no-img-element
                <img src={client.logo} alt={client.name} loading="lazy" decoding="async" />
              );
              return (
                <li key={client.name}>
                  {client.href ? (
                    <a href={client.href} target="_blank" rel="noreferrer">
                      {mark}
                    </a>
                  ) : (
                    mark
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Testimonials({
  items = testimonials,
  chip,
  title,
  id = "reviews",
  locale = "en",
}: {
  items?: Testimonial[];
  chip?: string;
  title?: [string, string];
  id?: string;
  locale?: Locale;
}) {
  if (!items.length) return null;
  return (
    <section className="section section-dark reviews" id={id}>
      <div className="container">
        <SectionIntro dark chip={chip ?? text[locale].chip} title={title ?? text[locale].reviews} />
      </div>
      <ReviewsWall items={items} locale={locale} />
    </section>
  );
}
