import localFont from "next/font/local";
import { instrumentSerif } from "./fonts-serif";

/*
 * English fonts. Self-hosted subsets, cut with fonttools (see the site-performance memory):
 * basic Latin plus the punctuation the copy uses, 47 KB preloaded. Bulgarian pages load
 * their own Cyrillic pair from fonts-bg.ts instead. Keep the two languages in separate
 * files: next/font preloads every font declared in a module a layout imports.
 * Re-subset if copy gains new characters.
 */

const dmSans = localFont({
  src: "./fonts/dm-sans.woff2",
  weight: "400 700",
  // Keep body copy immediately readable on constrained connections instead of
  // repainting the hero paragraph late and extending LCP.
  display: "optional",
  variable: "--font-body",
});

const barlowCondensed = localFont({
  src: [
    { path: "./fonts/barlow-condensed-500.woff2", weight: "500" },
    { path: "./fonts/barlow-condensed-600.woff2", weight: "600" },
    { path: "./fonts/barlow-condensed-700.woff2", weight: "700" },
  ],
  display: "swap",
  variable: "--font-display",
  adjustFontFallback: "Arial",
});

export const fontClassEn = `${dmSans.variable} ${barlowCondensed.variable} ${instrumentSerif.variable}`;
