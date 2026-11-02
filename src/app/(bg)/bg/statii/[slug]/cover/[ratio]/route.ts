import { bgSlug, enSlug } from "@/lib/studio/i18n";
import { coverSizes, type CoverRatio } from "@/lib/studio/og";
import { articleParams } from "@/lib/studio/routes";
import { insightCard, renderCard } from "@/lib/studio/share-cards";

/* The Bulgarian twin of the English cover route: Article images in 16:9, 4:3 and 1:1. */
export const dynamic = "force-static";
export const dynamicParams = false;
export const generateStaticParams = () =>
  articleParams().flatMap((slug) =>
    Object.keys(coverSizes).map((ratio) => ({ slug: bgSlug("insights", slug), ratio: `${ratio}.png` })),
  );

export function GET(_request: Request, { params }: { params: { slug: string; ratio: string } }) {
  const ratio = params.ratio.replace(".png", "") as CoverRatio;
  return renderCard(insightCard(enSlug("insights", params.slug), "bg"), "bg", coverSizes[ratio]);
}
