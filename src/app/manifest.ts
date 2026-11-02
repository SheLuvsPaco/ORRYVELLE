import type { MetadataRoute } from "next";
import { site } from "@/lib/studio/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.name,
    description: "Custom software, enterprise solutions and premium websites.",
    id: "/",
    lang: "en",
    start_url: "/",
    display: "standalone",
    // Matches the viewport theme colour (the paper tone) set in layout.tsx.
    background_color: "#ece8df",
    theme_color: "#ece8df",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
