import { notFound } from "next/navigation";
import { ServiceRoute, serviceMetadata } from "@/components/studio/templates/ServiceRoutes";
import { serviceParams } from "@/lib/studio/routes";
import { serviceBySlug } from "@/lib/studio/content";

export const dynamicParams = false;
export const generateStaticParams = () => serviceParams().map((slug) => ({ slug: slug }));
export const generateMetadata = ({ params }: { params: { slug: string } }) => serviceMetadata(params.slug, "en");

export default function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  if (!serviceBySlug(slug)) notFound();
  return <ServiceRoute slug={slug} locale="en" />;
}
