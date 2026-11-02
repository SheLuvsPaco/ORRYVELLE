import { notFound } from "next/navigation";
import { SolutionRoute, findSubService, subServiceMetadata } from "@/components/studio/templates/ServiceRoutes";
import { subServiceParams } from "@/lib/studio/routes";

type Params = { params: { slug: string; sub: string } };

export const dynamicParams = false;
export const generateStaticParams = () =>
  subServiceParams().map(({ slug, sub }) => ({ slug: slug, sub: sub }));
export const generateMetadata = ({ params }: Params) =>
  subServiceMetadata(params.slug, params.sub, "en");

export default function Page({ params }: Params) {
  const solution = findSubService(params.slug, params.sub, "en");
  if (!solution) notFound();
  return <SolutionRoute solution={solution} />;
}
