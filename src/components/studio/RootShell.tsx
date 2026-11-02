import SiteHeader from "./SiteHeader";
import FloatingBooking from "./FloatingBooking";
import Effects from "./Effects";
import DeferredAnalytics from "./DeferredAnalytics";
import ConsentBanner from "./ConsentBanner";
import DevGrid from "./DevGrid";
import SiteFooter from "./SiteFooter";
import JsonLd from "./JsonLd";
import { t as dictionary, type Locale } from "@/lib/studio/i18n";
import { graph, organizationSchema, websiteSchema } from "@/lib/studio/seo";

/** The document both root layouts share: (en) for English pages, (bg) for /bg. */
export default function RootShell({
  locale,
  fontClass,
  children,
}: {
  locale: Locale;
  /** From the layout's own font file, so each language preloads only its fonts. */
  fontClass: string;
  children: React.ReactNode;
}) {
  const copy = dictionary(locale);
  return (
    <html lang={copy.htmlLang} className={fontClass} suppressHydrationWarning>
      {/* eslint-disable-next-line @next/next/no-head-element -- this is the root layout's document, shared by both */}
      <head>
        {/* Marks that JS runs (used by the why-us slider styles) before first paint. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="studio" id="top">
        <a href="#main-content" className="skip-link">
          {copy.skip}
        </a>
        <JsonLd data={graph(organizationSchema(), websiteSchema())} />
        <SiteHeader locale={locale} />
        {children}
        <SiteFooter locale={locale} />
        <FloatingBooking locale={locale} />
        <Effects />
        <ConsentBanner locale={locale} />
        <DeferredAnalytics />
        <DevGrid />
      </body>
    </html>
  );
}
