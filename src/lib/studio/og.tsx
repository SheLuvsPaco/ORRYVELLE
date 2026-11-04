import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "./site";

/**
 * Branded share card (1200×630) used for link previews in chats, social posts and AI answers:
 * the mark and wordmark, a kicker, the page's two-tone headline and the domain.
 * Rendered at build time; the fonts are static TTF copies of the site's subset fonts.
 */

export const shareImageSize = { width: 1200, height: 630 };

/** The aspect ratios Google recommends for Article images; the card layout reflows to each. */
export const coverSizes = {
  "16x9": { width: 1200, height: 675 },
  "4x3": { width: 1200, height: 900 },
  "1x1": { width: 1200, height: 1200 },
};
export type CoverRatio = keyof typeof coverSizes;

const fontsDir = join(process.cwd(), "src/app/fonts/og");
const markSvg = join(fontsDir, "mark.svg");

// Bulgarian cards use the Cyrillic-capable pair, as the pages do (see app/fonts.ts).
const fontFiles = {
  en: ["barlow-condensed-600.ttf", "dm-sans-500.ttf"],
  bg: ["fira-sans-extra-condensed-600.ttf", "onest-500.ttf"],
};

export async function shareImage({
  kicker,
  title,
  locale = "en",
  size: canvas = shareImageSize,
}: {
  kicker: string;
  title: [string, string];
  locale?: "en" | "bg";
  size?: { width: number; height: number };
}) {
  const [displayFile, bodyFile] = fontFiles[locale];
  const [display, body, mark] = await Promise.all([
    readFile(join(fontsDir, displayFile!)),
    readFile(join(fontsDir, bodyFile!)),
    readFile(markSvg, "utf8"),
  ]);
  const length = title.join(" ").length;
  const size = length > 44 ? 80 : length > 30 ? 94 : 112;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          backgroundColor: "#0e171b",
          backgroundImage:
            "radial-gradient(circle at 12% 0%, rgba(208,173,139,0.24), rgba(14,23,27,0) 58%), radial-gradient(circle at 100% 100%, rgba(120,150,160,0.16), rgba(14,23,27,0) 50%)",
          color: "#ece8df",
          fontFamily: "Body",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`data:image/svg+xml;base64,${Buffer.from(mark).toString("base64")}`}
            width={64}
            height={64}
            alt=""
          />
          <span style={{ fontFamily: "Display", fontSize: 30, letterSpacing: "0.32em" }}>
            {site.name.toUpperCase()}
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              color: "#d0ad8b",
              fontSize: 24,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            <span style={{ width: 10, height: 10, backgroundColor: "#d0ad8b" }} />
            {kicker}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Display",
              fontSize: size,
              lineHeight: 0.95,
              textTransform: "uppercase",
            }}
          >
            <span>{title[0]}</span>
            <span style={{ color: "#a39684" }}>{title[1]}</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: 26,
            borderTop: "1px solid rgba(236,232,223,0.16)",
            fontSize: 22,
            color: "rgba(236,232,223,0.62)",
          }}
        >
          <span>{site.url.replace("https://", "")}</span>
          <span>{locale === "bg" ? "Софтуер по поръчка · AI и автоматизация · Уебсайтове" : "Custom software · Enterprise solutions · Websites"}</span>
        </div>
      </div>
    ),
    {
      ...canvas,
      fonts: [
        { name: "Display", data: display, weight: 600, style: "normal" },
        { name: "Body", data: body, weight: 500, style: "normal" },
      ],
    },
  );
}
