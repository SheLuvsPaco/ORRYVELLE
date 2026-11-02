import { coverSizes, type CoverRatio } from "@/lib/studio/og";
import { articleParams } from "@/lib/studio/routes";
import { insightCard, renderCard } from "@/lib/studio/share-cards";

/*
 * The article's images at stable URLs for its Article structured data, in the 16:9, 4:3 and
 * 1:1 ratios Google recommends (/insights/<slug>/cover/16x9.png). The share card route
 * (opengraph-image) is served under a hashed name, so schema can't point at it directly.
 */
export const dynamic = "force-static";
export const dynamicParams = false;
export const generateStaticParams = () =>
  articleParams().flatMap((slug) => Object.keys(coverSizes).map((ratio) => ({ slug, ratio: `${ratio}.png` })));

export function GET(_request: Request, { params }: { params: { slug: string; ratio: string } }) {
  const ratio = params.ratio.replace(".png", "") as CoverRatio;
  return renderCard(insightCard(params.slug, "en"), "en", coverSizes[ratio]);
}
