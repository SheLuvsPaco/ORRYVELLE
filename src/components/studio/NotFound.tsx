import { ButtonLink, Chip } from "./ui";
import { t as dictionary, type Locale } from "@/lib/studio/i18n";

const text = {
  en: { title: ["This page", "doesn’t exist."], body: "The link may be old or mistyped. Start from the home page, or book a free call and tell us what you were looking for.", back: "Back to home" },
  bg: { title: ["Тази страница", "не съществува."], body: "Връзката може да е стара или сгрешена. Започнете от началната страница или запазете безплатен разговор и ни кажете какво търсите.", back: "Към началото" },
} as const;

export default function NotFound({ locale }: { locale: Locale }) {
  const copy = dictionary(locale);
  const page = text[locale];
  return (
    <main id="main-content" className="section">
      <div className="container" style={{ maxWidth: 760, paddingBlock: "48px 24px" }}>
        <Chip>404</Chip>
        <h1 style={{ marginTop: 24 }}>
          {page.title[0]}
          <br />
          <span className="tone">{page.title[1]}</span>
        </h1>
        <p style={{ marginTop: 24, color: "var(--muted)", fontSize: 18 }}>{page.body}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 32 }}>
          <ButtonLink href={copy.home}>{page.back}</ButtonLink>
          <ButtonLink href={copy.contact} variant="outline">
            {copy.bookCall}
          </ButtonLink>
        </div>
      </div>
    </main>
  );
}
