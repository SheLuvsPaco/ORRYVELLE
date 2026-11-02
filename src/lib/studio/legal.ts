import type { Locale } from "./i18n";
import privacyEn from "@/content/legal/privacy";
import cookiesEn from "@/content/legal/cookies";
import privacyBg from "@/content/bg/legal/privacy";
import cookiesBg from "@/content/bg/legal/cookies";

/**
 * The privacy and cookie policies. Unlike other content, each language is a complete document
 * (legal text is written, not overlaid), but both must say the same thing: change them together
 * and move `updated` on both. Facts in them (processors, cookies, retention) must match the code:
 * DeferredAnalytics.tsx, consent.ts, ContactExperience.tsx and the enquiry API route.
 */

export type LegalSlug = "privacy" | "cookies";

export type LegalDoc = {
  slug: LegalSlug;
  title: string;
  /** Meta description and the lede under the title. */
  description: string;
  /** ISO date of the last change; shown on the page. */
  updated: string;
  /** Markdown; every ## heading goes into the page's table of contents. */
  body: string;
};

const docs: Record<Locale, Record<LegalSlug, LegalDoc>> = {
  en: { privacy: privacyEn, cookies: cookiesEn },
  bg: { privacy: privacyBg, cookies: cookiesBg },
};

export const legalDoc = (slug: LegalSlug, locale: Locale) => docs[locale][slug];
