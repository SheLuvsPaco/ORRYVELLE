import { industryParams } from "@/lib/studio/routes";
import { shareImageSize } from "@/lib/studio/og";
import { industryCard, renderCard } from "@/lib/studio/share-cards";

type Props = { params: { slug: string } };
const cardFor = ({ params }: Props) => industryCard(params.slug, "en");

export const generateStaticParams = () => industryParams().map((slug) => ({ slug: slug }));
// One card per page, so its alt text can describe that page.
export const generateImageMetadata = (props: Props) => [
  { id: "card", alt: cardFor(props).alt, size: shareImageSize, contentType: "image/png" },
];

export default function Image(props: Props) {
  return renderCard(cardFor(props), "en");
}
