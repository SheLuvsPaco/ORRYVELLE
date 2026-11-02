"use client";

import { useEffect, useRef, useState } from "react";
import { CONSENT_OPEN, readConsent, saveConsent, type Consent } from "@/lib/studio/consent";
import { href, type Locale } from "@/lib/studio/i18n";
import "./styles/consent-banner.css";

const text = {
  en: {
    label: "Cookie choice",
    title: "Analytics cookies",
    body: "With your permission, we use Google Analytics to see which pages help visitors and which lead to a booked call. It stays off unless you accept, and you can change your mind at any time.",
    policy: "Cookie policy",
    accept: "Accept",
    reject: "Reject",
  },
  bg: {
    label: "Избор за бисквитките",
    title: "Бисквитки за анализ",
    body: "С ваше разрешение използваме Google Analytics, за да виждаме кои страници са полезни и кои водят до запазен разговор. Изключени са, докато не приемете, и можете да промените избора си по всяко време.",
    policy: "Политика за бисквитките",
    accept: "Приемам",
    reject: "Отказвам",
  },
};

/**
 * Asks once for analytics consent (the only optional cookies on the site). Not a wall: the
 * page stays usable, and both answers have the same weight. Reopened from "Cookie settings".
 */
export default function ConsentBanner({ locale = "en" }: { locale?: Locale }) {
  const copy = text[locale];
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<Consent | null>(null);
  const panel = useRef<HTMLElement>(null);

  useEffect(() => {
    const stored = readConsent();
    setCurrent(stored);
    setOpen(stored === null);
    const reopen = () => {
      setCurrent(readConsent());
      setOpen(true);
      requestAnimationFrame(() => panel.current?.focus());
    };
    window.addEventListener(CONSENT_OPEN, reopen);
    return () => window.removeEventListener(CONSENT_OPEN, reopen);
  }, []);

  // Lets the booking pill make room for the banner while it's open.
  useEffect(() => {
    document.documentElement.toggleAttribute("data-consent-open", open);
  }, [open]);

  if (!open) return null;
  const choose = (consent: Consent) => {
    saveConsent(consent);
    setOpen(false);
  };
  return (
    <section ref={panel} className="consent-banner" aria-label={copy.label} tabIndex={-1}>
      <div className="consent-copy">
        <h2>{copy.title}</h2>
        <p>
          {copy.body} <a href={href(locale, "/cookies")}>{copy.policy}</a>
        </p>
      </div>
      <div className="consent-actions">
        <button type="button" onClick={() => choose("denied")} aria-pressed={current === "denied"}>
          {copy.reject}
        </button>
        <button type="button" onClick={() => choose("granted")} aria-pressed={current === "granted"}>
          {copy.accept}
        </button>
      </div>
    </section>
  );
}
