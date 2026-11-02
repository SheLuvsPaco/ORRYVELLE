import { execFileSync } from "node:child_process";
import type { MetadataRoute } from "next";
import { services, site } from "@/lib/studio/content";
import { href, locales } from "@/lib/studio/i18n";
import { insights } from "@/lib/studio/insights";
import { projects } from "@/lib/studio/projects";
import { solutionPath, solutions } from "@/lib/studio/solutions";

/**
 * Last real change to a page: the newest commit touching its source files. Crawlers learn to
 * ignore dates that change on every build, so if git history isn't available the date is
 * left out rather than guessed.
 */
function lastChanged(...files: string[]): Date | undefined {
  try {
    const iso = execFileSync("git", ["log", "-1", "--format=%cI", "--", ...files], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return iso ? new Date(iso) : undefined;
  } catch {
    return undefined;
  }
}

const CONTENT = "src/lib/studio/content.ts";
const PROJECTS = "src/lib/studio/projects.ts";

const BG = "src/content/bg";
const url = (path: string) => `${site.url}${path === "/" ? "" : path}`;
const solutionFile = (solution: (typeof solutions)[number]) =>
  `src/content/solutions/${
    solution.kind === "service"
      ? { "custom-software": "software", "enterprise-solutions": "enterprise", websites: "websites" }[solution.service]
      : solution.kind === "industry"
        ? "industries"
        : "bulgaria"
  }.ts`;

/**
 * Every page in both languages. Paths are the English ones; each entry is listed once per
 * language with its twin as an alternate (hreflang), dated by the newest change to its
 * template, English content or Bulgarian overlay.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number; files: string[]; date?: Date }[] = [
    { path: "/", priority: 1, files: ["src/components/studio/templates/HomePage.tsx", "src/components/studio/HomeHero.tsx", CONTENT] },
    ...services.map((service) => ({
      path: `/services/${service.slug}`,
      priority: 0.9,
      files: ["src/components/studio/ServicePage.tsx", CONTENT, `${BG}/studio.ts`],
    })),
    ...solutions.map((solution) => ({
      path: solutionPath(solution),
      priority: solution.kind === "service" ? 0.85 : 0.75,
      files: [solutionFile(solution), "src/components/studio/SolutionPage.tsx", `${BG}/solutions`],
    })),
    { path: "/industries", priority: 0.7, files: ["src/components/studio/templates/IndustriesPage.tsx", "src/content/solutions/industries.ts"] },
    { path: "/work", priority: 0.8, files: ["src/components/studio/templates/WorkPage.tsx", PROJECTS] },
    ...projects.map((project) => ({
      path: `/work/${project.slug}`,
      priority: 0.6,
      files: ["src/components/studio/templates/CaseStudyPage.tsx", PROJECTS, `${BG}/projects.ts`],
    })),
    { path: "/insights", priority: 0.7, files: ["src/components/studio/templates/InsightsPage.tsx", "src/lib/studio/insights.ts"] },
    // Articles carry their own editorial dates.
    ...insights.map((insight) => ({
      path: `/insights/${insight.slug}`,
      priority: 0.7,
      files: [],
      date: new Date(`${insight.updated}T12:00:00Z`),
    })),
    { path: "/about", priority: 0.7, files: ["src/components/studio/templates/AboutPage.tsx", CONTENT] },
    { path: "/contact", priority: 0.8, files: ["src/components/studio/templates/ContactPage.tsx"] },
    ...(["privacy", "cookies"] as const).map((slug) => ({
      path: `/${slug}`,
      priority: 0.2,
      files: [`src/content/legal/${slug}.ts`, `src/content/bg/legal/${slug}.ts`],
    })),
  ];

  return pages.flatMap(({ path, priority, files, date }) => {
    const lastModified = date ?? lastChanged(...files);
    // The same set the page head declares, so the two hreflang sources never disagree.
    const languages = {
      ...Object.fromEntries(locales.map((locale) => [locale, url(href(locale, path))])),
      "x-default": url(path),
    };
    return locales.map((locale) => ({
      url: url(href(locale, path)),
      ...(lastModified ? { lastModified } : {}),
      changeFrequency: "monthly" as const,
      priority,
      alternates: { languages },
    }));
  });
}
