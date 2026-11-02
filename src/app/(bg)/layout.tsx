import type { Metadata, Viewport } from "next";
import RootShell from "@/components/studio/RootShell";
import { fontClassBg } from "../fonts-bg";
import { ogLocale, siteRobots, siteVerification } from "@/lib/studio/seo";
import { site } from "@/lib/studio/site";
import "../globals.css";

const title = "Софтуер по поръчка, AI автоматизация и уебсайтове | Orryvelle";
const description =
  "Orryvelle изработва уебсайтове, онлайн магазини, софтуер по поръчка, AI асистенти и автоматизации за малък и среден бизнес. Запазете безплатен 30-минутен разговор.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s | ${site.name}` },
  description,
  openGraph: { title, description, type: "website", siteName: site.name, locale: ogLocale.bg },
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
  return <RootShell locale="bg" fontClass={fontClassBg}>{children}</RootShell>;
}
