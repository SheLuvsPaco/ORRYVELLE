import { notFound } from "next/navigation";
import { SolutionRoute, findSubService, subServiceMetadata } from "@/components/studio/templates/ServiceRoutes";
import { subServiceParams } from "@/lib/studio/routes";
import { bgSlug, enSlug } from "@/lib/studio/i18n";

type Params = { params: { slug: string; sub: string } };

export const dynamicParams = false;
export const generateStaticParams = () =>
  subServiceParams().map(({ slug, sub }) => ({ slug: bgSlug("services", slug), sub: bgSlug("services", sub) }));
export const generateMetadata = ({ params }: Params) =>
  subServiceMetadata(enSlug("services", params.slug), enSlug("services", params.sub), "bg");

export default function Page({ params }: Params) {
  const solution = findSubService(enSlug("services", params.slug), enSlug("services", params.sub), "bg");
  if (!solution) notFound();
  return <SolutionRoute solution={solution} />;
}
