import { notFound } from "next/navigation";
import { ServiceRoute, serviceMetadata } from "@/components/studio/templates/ServiceRoutes";
import { serviceParams } from "@/lib/studio/routes";
import { serviceBySlug } from "@/lib/studio/content";
import { bgSlug, enSlug } from "@/lib/studio/i18n";

export const dynamicParams = false;
export const generateStaticParams = () => serviceParams().map((slug) => ({ slug: bgSlug("services", slug) }));
export const generateMetadata = ({ params }: { params: { slug: string } }) => serviceMetadata(enSlug("services", params.slug), "bg");

export default function Page({ params }: { params: { slug: string } }) {
  const slug = enSlug("services", params.slug);
  if (!serviceBySlug(slug)) notFound();
  return <ServiceRoute slug={slug} locale="bg" />;
}
