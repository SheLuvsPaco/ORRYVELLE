import { locationCard, renderCard } from "@/lib/studio/share-cards";
import { shareImageSize } from "@/lib/studio/og";

const card = locationCard("bg");
export const alt = card.alt;
export const size = shareImageSize;
export const contentType = "image/png";

export default function Image() {
  return renderCard(card, "bg");
}
