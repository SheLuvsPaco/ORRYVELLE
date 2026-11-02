import localFont from "next/font/local";

// Shared by both languages; not preloaded, it only loads where a page uses it.
export const instrumentSerif = localFont({
  src: "./fonts/instrument-serif.woff2",
  weight: "400",
  display: "swap",
  variable: "--font-serif",
  preload: false,
  adjustFontFallback: "Times New Roman",
});
