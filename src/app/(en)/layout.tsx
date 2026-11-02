import type { Metadata, Viewport } from "next";
import RootShell from "@/components/studio/RootShell";
import { fontClassEn } from "../fonts";
import { ogLocale, siteRobots, siteVerification } from "@/lib/studio/seo";
import { site } from "@/lib/studio/site";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "AI Automation, Custom Software & Website Design | Orryvelle",
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: "AI Automation, Custom Software & Website Design | Orryvelle",
    description: site.description,
    type: "website",
    siteName: site.name,
    locale: ogLocale.en,
  },
  twitter: { card: "summary_large_image" },
  robots: siteRobots,
  verification: siteVerification,
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ece8df",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="en" fontClass={fontClassEn}>{children}</RootShell>;
}
