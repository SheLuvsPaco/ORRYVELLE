"use client";

import { useEffect } from "react";
import { CONSENT_CHANGE, readConsent, type Consent } from "@/lib/studio/consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

// Set only for the production deployment, so local development and preview
// deploys never send analytics. The .env.example placeholder counts as unset.
const PLACEHOLDER = "G-XXXXXXXXXX";
const configuredId = process.env.NEXT_PUBLIC_GA_ID;
const MEASUREMENT_ID = configuredId && configuredId !== PLACEHOLDER ? configuredId : undefined;

/** Analytics cookies last 13 months instead of Google's default 2 years (the cookie policy says so). */
const COOKIE_SECONDS = 395 * 24 * 60 * 60;

function load() {
  if (!MEASUREMENT_ID || window.gtag) return;
  window.dataLayer = window.dataLayer || [];
  // gtag.js only reads Arguments objects from dataLayer (an array is ignored), so this must be
  // a classic function pushing `arguments`, as in Google's own snippet.
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments);
  };
  // Consent mode v2, basic: nothing loads before the visitor accepts, and advertising
  // storage and signals stay off even then.
  window.gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "granted",
  });
  window.gtag("set", "ads_data_redaction", true);
  window.gtag("js", new Date());
  window.gtag("config", MEASUREMENT_ID, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    cookie_expires: COOKIE_SECONDS,
  });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

/** Withdrawn consent: stop sending and remove the analytics cookies already set. */
function stop() {
  if (!MEASUREMENT_ID) return;
  (window as unknown as Record<string, boolean>)[`ga-disable-${MEASUREMENT_ID}`] = true;
  window.gtag?.("consent", "update", { analytics_storage: "denied" });
  const host = location.hostname;
  const domains = ["", host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  for (const name of document.cookie.split("; ").map((cookie) => cookie.split("=")[0]!)) {
    if (name !== "_ga" && !name.startsWith("_ga_")) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain ? `; domain=${domain}` : ""}`;
    }
  }
}

/**
 * Google Analytics, only for visitors who accepted it in the cookie banner. A returning
 * visitor's earlier yes keeps analytics off the critical rendering path: it starts on the
 * first interaction or after the opening has settled. A fresh yes loads it straight away.
 */
export default function DeferredAnalytics() {
  useEffect(() => {
    if (!MEASUREMENT_ID) return;
    const events: Array<keyof WindowEventMap> = ["pointerdown", "keydown", "scroll"];
    let timer = 0;
    const cancel = () => {
      window.clearTimeout(timer);
      events.forEach((event) => window.removeEventListener(event, start));
    };
    const start = () => {
      cancel();
      load();
    };

    if (readConsent() === "granted") {
      events.forEach((event) => window.addEventListener(event, start, { passive: true, once: true }));
      timer = window.setTimeout(start, 12_000);
    }

    const onChange = (event: Event) => {
      const consent = (event as CustomEvent<Consent>).detail;
      if (consent === "granted") {
        (window as unknown as Record<string, boolean>)[`ga-disable-${MEASUREMENT_ID}`] = false;
        if (window.gtag) window.gtag("consent", "update", { analytics_storage: "granted" });
        else start();
      } else {
        cancel();
        stop();
      }
    };
    window.addEventListener(CONSENT_CHANGE, onChange);
    return () => {
      cancel();
      window.removeEventListener(CONSENT_CHANGE, onChange);
    };
  }, []);

  return null;
}
