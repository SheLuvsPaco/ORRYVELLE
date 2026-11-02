"use client";

import { openConsentSettings } from "@/lib/studio/consent";

/** Reopens the cookie banner so the visitor can change or withdraw their choice. */
export default function CookieSettingsButton({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <button type="button" className={className} onClick={openConsentSettings}>
      {children}
    </button>
  );
}
