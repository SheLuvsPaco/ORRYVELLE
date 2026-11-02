import { articleParams } from "@/lib/studio/routes";
import { bgSlug, enSlug } from "@/lib/studio/i18n";
import { shareImageSize } from "@/lib/studio/og";
import { insightCard, renderCard } from "@/lib/studio/share-cards";

type Props = { params: { slug: string } };
const cardFor = ({ params }: Props) => insightCard(enSlug("insights", params.slug), "bg");

export const generateStaticParams = () => articleParams().map((slug) => ({ slug: bgSlug("insights", slug) }));
// One card per page, so its alt text can describe that page.
export const generateImageMetadata = (props: Props) => [
  { id: "card", alt: cardFor(props).alt, size: shareImageSize, contentType: "image/png" },
];

export default function Image(props: Props) {
  return renderCard(cardFor(props), "bg");
}
