import type { Insight } from "@/lib/studio/insights";
import type { Overlay } from "@/lib/studio/localize";
import aiReceptionist from "./ai-receptionist-vs-answering-service";
import customVsOffTheShelf from "./custom-software-vs-off-the-shelf";
import websitePlatforms from "./custom-website-vs-wordpress-webflow-shopify";
import aiRecommendations from "./get-recommended-by-chatgpt";
import automationPlatforms from "./n8n-vs-zapier-vs-make";

/** Bulgarian articles, keyed by the English slug. Sources and dates are shared with the English. */
export const bgInsights: Record<string, Overlay<Insight>> = {
  "ai-receptionist-vs-answering-service": aiReceptionist,
  "n8n-vs-zapier-vs-make": automationPlatforms,
  "custom-software-vs-off-the-shelf": customVsOffTheShelf,
  "custom-website-vs-wordpress-webflow-shopify": websitePlatforms,
  "get-recommended-by-chatgpt": aiRecommendations,
};
