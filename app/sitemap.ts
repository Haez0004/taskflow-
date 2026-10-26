import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://taskflow-coral-delta.vercel.app",
      lastModified: new Date(),
    },
  ];
}
