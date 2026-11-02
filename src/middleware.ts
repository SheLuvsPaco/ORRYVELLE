import { NextResponse, type NextRequest } from "next/server";
import { href } from "@/lib/studio/i18n";

/**
 * Visitors in Bulgaria who land on an English page are sent to its Bulgarian twin (every
 * page has one). Guard rails, so search and AI engines index both languages:
 * - only English to Bulgarian; nobody is ever redirected away from a /bg page;
 * - crawlers, previews and audit tools are never redirected (Google crawls mostly from the US);
 * - a choice made with the language switch (the `lang` cookie) always wins, in either direction;
 * - client-side navigations and prefetches pass through untouched.
 * The country comes from Vercel's edge header; without it (local dev) nothing happens.
 */

const BOTS =
  /bot|crawl|spider|slurp|archiver|facebookexternalhit|embedly|quora link preview|whatsapp|telegram|skype|preview|lighthouse|pagespeed|headless|gtmetrix|python|curl|wget|httpclient/i;

export function middleware(request: NextRequest) {
  // A language picked with the switch wins; otherwise Bulgaria means Bulgarian.
  const picked = request.cookies.get("lang")?.value;
  const wanted = picked ?? (request.headers.get("x-vercel-ip-country") === "BG" ? "bg" : "en");
  if (wanted !== "bg") return NextResponse.next();
  // Only full page loads (browsers ask for HTML); Next.js strips its own RSC and prefetch
  // headers before middleware runs, so client navigations are recognised this way.
  if (!request.headers.get("accept")?.includes("text/html")) return NextResponse.next();
  if (request.headers.get("purpose") === "prefetch" || request.headers.get("sec-purpose")?.includes("prefetch"))
    return NextResponse.next();
  if (BOTS.test(request.headers.get("user-agent") ?? "")) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = href("bg", request.nextUrl.pathname);
  const response = NextResponse.redirect(url, 307);
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

// English pages only: not /bg, the API, Next.js assets or files (anything with an extension).
export const config = {
  matcher: ["/", "/((?!bg(?:/|$)|api/|_next/|.*\\.[a-zA-Z0-9]+$).*)"],
};
