import { servicesIn } from "./content";
import { insightsIn } from "./insights";
import { projectsIn } from "./projects";
import { industriesIn, solutionsIn } from "./solutions";

/*
 * The ids each dynamic route is generated for (English slugs). Kept apart from the page
 * templates: share-image routes import these, and importing a template there would pull its
 * client components into the bundle every page loads.
 */
export const caseStudyParams = () => projectsIn("en").map((project) => project.slug);
export const articleParams = () => insightsIn("en").map((insight) => insight.slug);
export const serviceParams = () => servicesIn("en").map((service) => service.slug);
export const subServiceParams = () =>
  solutionsIn("en")
    .filter((solution) => solution.kind === "service")
    .map((solution) => ({ slug: solution.service, sub: solution.slug }));
export const industryParams = () => industriesIn("en").map((industry) => industry.slug);
