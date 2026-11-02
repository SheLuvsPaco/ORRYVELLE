import { insightsFeed } from "@/lib/studio/feed";

export const dynamic = "force-static";

export function GET() {
  return insightsFeed("bg");
}
