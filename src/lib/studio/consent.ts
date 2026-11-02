/**
 * The visitor's cookie choice. Only analytics needs consent (the cookie policy lists everything
 * else as strictly necessary), so the choice is one yes or no. It lives in localStorage on the
 * visitor's device, is never sent to us, and is asked again after six months or when VERSION
 * changes (raise it when a new kind of optional cookie is added).
 */

const KEY = "orryvelle-consent";
const VERSION = 1;
const MAX_AGE = 182 * 24 * 60 * 60 * 1000;

/** Fired on window when the choice changes; `detail` is the new value. */
export const CONSENT_CHANGE = "orryvelle:consent";
/** Fired on window to reopen the banner (footer and cookie policy "Cookie settings"). */
export const CONSENT_OPEN = "orryvelle:consent-open";

export type Consent = "granted" | "denied";

export function readConsent(): Consent | null {
  try {
    const stored = JSON.parse(localStorage.getItem(KEY) ?? "null") as { v: number; analytics: boolean; at: number } | null;
    if (!stored || stored.v !== VERSION || Date.now() - stored.at > MAX_AGE) return null;
    return stored.analytics ? "granted" : "denied";
  } catch {
    return null;
  }
}

export function saveConsent(consent: Consent) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ v: VERSION, analytics: consent === "granted", at: Date.now() }));
  } catch {
    // Storage blocked: the choice still applies to this page view.
  }
  window.dispatchEvent(new CustomEvent<Consent>(CONSENT_CHANGE, { detail: consent }));
}

export const openConsentSettings = () => window.dispatchEvent(new Event(CONSENT_OPEN));

/**
 * Sends a Google Analytics event. gtag only exists once the visitor has accepted analytics,
 * so without consent this does nothing. Never pass personal data (names, emails, messages).
 */
export function track(event: string, params: Record<string, string> = {}) {
  window.gtag?.("event", event, params);
}
