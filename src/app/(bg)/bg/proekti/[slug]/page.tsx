import { notFound } from "next/navigation";
import CaseStudyPage, { caseStudyMetadata } from "@/components/studio/templates/CaseStudyPage";
import { caseStudyParams } from "@/lib/studio/routes";
import { projectBySlug } from "@/lib/studio/projects";

export const dynamicParams = false;
export const generateStaticParams = () => caseStudyParams().map((slug) => ({ slug }));
export const generateMetadata = ({ params }: { params: { slug: string } }) => caseStudyMetadata(params.slug, "bg");

export default function Page({ params }: { params: { slug: string } }) {
  const project = projectBySlug(params.slug, "bg");
  if (!project) notFound();
  return <CaseStudyPage project={project} locale="bg" />;
}
