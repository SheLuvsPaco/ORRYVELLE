import { subServiceParams } from "@/lib/studio/routes";
import { bgSlug, enSlug } from "@/lib/studio/i18n";
import { shareImageSize } from "@/lib/studio/og";
import { renderCard, subServiceCard } from "@/lib/studio/share-cards";

type Props = { params: { slug: string; sub: string } };
const cardFor = ({ params }: Props) =>
  subServiceCard(enSlug("services", params.slug), enSlug("services", params.sub), "bg");

export const generateStaticParams = () =>
  subServiceParams().map(({ slug, sub }) => ({ slug: bgSlug("services", slug), sub: bgSlug("services", sub) }));
// One card per page, so its alt text can describe that page.
export const generateImageMetadata = (props: Props) => [
  { id: "card", alt: cardFor(props).alt, size: shareImageSize, contentType: "image/png" },
];

export default function Image(props: Props) {
  return renderCard(cardFor(props), "bg");
}
