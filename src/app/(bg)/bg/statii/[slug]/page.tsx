import { notFound } from "next/navigation";
import ArticlePage, { articleMetadata } from "@/components/studio/templates/ArticlePage";
import { articleParams } from "@/lib/studio/routes";
import { bgSlug, enSlug } from "@/lib/studio/i18n";
import { insightBySlug } from "@/lib/studio/insights";

export const dynamicParams = false;
export const generateStaticParams = () => articleParams().map((slug) => ({ slug: bgSlug("insights", slug) }));
export const generateMetadata = ({ params }: { params: { slug: string } }) => articleMetadata(enSlug("insights", params.slug), "bg");

export default function Page({ params }: { params: { slug: string } }) {
  const insight = insightBySlug(enSlug("insights", params.slug), "bg");
  if (!insight) notFound();
  return <ArticlePage insight={insight} locale="bg" />;
}
