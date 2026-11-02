import localFont from "next/font/local";
import { instrumentSerif } from "./fonts-serif";

/*
 * Bulgarian fonts. DM Sans and Barlow Condensed have no Cyrillic, so /bg uses the closest
 * Cyrillic-capable matches, subset to Latin plus Cyrillic (49 KB preloaded).
 */

const onest = localFont({
  src: "./fonts/onest.woff2",
  weight: "400 700",
  display: "optional",
  variable: "--font-body",
});

// One weight keeps Bulgarian pages as light as English ones; headings are all 600.
const firaSansExtraCondensed = localFont({
  src: "./fonts/fira-sans-extra-condensed-600.woff2",
  weight: "600",
  display: "swap",
  variable: "--font-display",
  adjustFontFallback: "Arial",
});

export const fontClassBg = `${onest.variable} ${firaSansExtraCondensed.variable} ${instrumentSerif.variable}`;
