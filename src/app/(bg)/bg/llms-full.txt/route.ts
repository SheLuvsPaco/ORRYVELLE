import { llmsFullTxt } from "@/lib/studio/llms";

export const dynamic = "force-static";

export function GET() {
  return new Response(llmsFullTxt("bg"), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
