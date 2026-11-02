import type { MetadataRoute } from "next";
import { site } from "@/lib/studio/site";

/**
 * Every crawler is welcome, including AI search, assistant and training crawlers: being
 * readable by them is how the studio gets recommended. They're named explicitly so the
 * policy stays clear even if a crawler starts treating "*" differently.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Amazonbot",
  "meta-externalagent",
  "DuckAssistBot",
  "MistralAI-User",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      { userAgent: AI_CRAWLERS, allow: "/", disallow: "/api/" },
    ],
    // No Host line: it was a Yandex-only directive that Yandex itself retired.
    sitemap: `${site.url}/sitemap.xml`,
  };
}
