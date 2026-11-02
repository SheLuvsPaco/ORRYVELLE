import { notFound } from "next/navigation";
import ArticlePage, { articleMetadata } from "@/components/studio/templates/ArticlePage";
import { articleParams } from "@/lib/studio/routes";
import { insightBySlug } from "@/lib/studio/insights";

export const dynamicParams = false;
export const generateStaticParams = () => articleParams().map((slug) => ({ slug: slug }));
export const generateMetadata = ({ params }: { params: { slug: string } }) => articleMetadata(params.slug, "en");

export default function Page({ params }: { params: { slug: string } }) {
  const insight = insightBySlug(params.slug, "en");
  if (!insight) notFound();
  return <ArticlePage insight={insight} locale="en" />;
}
