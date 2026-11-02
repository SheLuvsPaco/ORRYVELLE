import { fixedCard, renderCard } from "@/lib/studio/share-cards";
import { shareImageSize } from "@/lib/studio/og";

const card = fixedCard("contact", "en");
export const alt = card.alt;
export const size = shareImageSize;
export const contentType = "image/png";

export default function Image() {
  return renderCard(card, "en");
}
