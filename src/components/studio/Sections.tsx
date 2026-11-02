import Link from "next/link";
import { servicesIn } from "@/lib/studio/content";
import { href, type Locale } from "@/lib/studio/i18n";
import { Corners, Icon } from "./ui";

/** The three disciplines as framed marks, used where a credential strip would sit. */
export function DisciplineStrip({ dark = false, locale = "en" }: { dark?: boolean; locale?: Locale }) {
  return (
    <ul
      className={`discipline-strip ${dark ? "is-dark" : ""}`}
      aria-label={locale === "bg" ? "Нашите направления" : "Our disciplines"}
    >
      {servicesIn(locale).map((service) => (
        <li key={service.slug}>
          <Link href={href(locale, `/services/${service.slug}`)}>
            <Icon name={service.icon} size={18} />
            <span>
              <small>/{service.number}</small>
              {service.name}
            </span>
            <Corners />
          </Link>
        </li>
      ))}
    </ul>
  );
}
