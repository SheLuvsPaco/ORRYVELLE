import { subServiceParams } from "@/lib/studio/routes";
import { shareImageSize } from "@/lib/studio/og";
import { renderCard, subServiceCard } from "@/lib/studio/share-cards";

type Props = { params: { slug: string; sub: string } };
const cardFor = ({ params }: Props) => subServiceCard(params.slug, params.sub, "en");

export const generateStaticParams = () =>
  subServiceParams().map(({ slug, sub }) => ({ slug: slug, sub: sub }));
// One card per page, so its alt text can describe that page.
export const generateImageMetadata = (props: Props) => [
  { id: "card", alt: cardFor(props).alt, size: shareImageSize, contentType: "image/png" },
];

export default function Image(props: Props) {
  return renderCard(cardFor(props), "en");
}
