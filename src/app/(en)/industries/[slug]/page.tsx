import { notFound } from "next/navigation";
import { SolutionRoute, findIndustry, industryMetadata } from "@/components/studio/templates/ServiceRoutes";
import { industryParams } from "@/lib/studio/routes";

export const dynamicParams = false;
export const generateStaticParams = () => industryParams().map((slug) => ({ slug: slug }));
export const generateMetadata = ({ params }: { params: { slug: string } }) => industryMetadata(params.slug, "en");

export default function Page({ params }: { params: { slug: string } }) {
  const industry = findIndustry(params.slug, "en");
  if (!industry) notFound();
  return <SolutionRoute solution={industry} />;
}
