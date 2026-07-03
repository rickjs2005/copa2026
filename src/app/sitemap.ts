import type { MetadataRoute } from "next";
import { ICONIC_STADIUMS } from "@/data/iconic-stadiums";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages = ["", "/estadios", "/historia", "/curiosidades"].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : path === "/estadios" ? 0.9 : 0.7,
  }));

  const stadiums = ICONIC_STADIUMS.map((s) => ({
    url: `${SITE_URL}/estadios/${s.slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...pages, ...stadiums];
}
