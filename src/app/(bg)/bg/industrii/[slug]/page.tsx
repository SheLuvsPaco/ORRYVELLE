import { notFound } from "next/navigation";
import { SolutionRoute, findIndustry, industryMetadata } from "@/components/studio/templates/ServiceRoutes";
import { industryParams } from "@/lib/studio/routes";
import { bgSlug, enSlug } from "@/lib/studio/i18n";

export const dynamicParams = false;
export const generateStaticParams = () => industryParams().map((slug) => ({ slug: bgSlug("industries", slug) }));
export const generateMetadata = ({ params }: { params: { slug: string } }) => industryMetadata(enSlug("industries", params.slug), "bg");

export default function Page({ params }: { params: { slug: string } }) {
  const industry = findIndustry(enSlug("industries", params.slug), "bg");
  if (!industry) notFound();
  return <SolutionRoute solution={industry} />;
}
