import type { MetadataRoute } from "next";
import { TEAMS } from "@/data/teams";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes = [
    "",
    "/jogos",
    "/tabela",
    "/mata-mata",
    "/estatisticas",
    "/selecoes",
    "/estadios",
    "/historia",
    "/curiosidades",
    "/noticias",
    "/faq",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: (path === "" || path === "/jogos" ? "hourly" : "daily") as
      | "hourly"
      | "daily",
    priority: path === "" ? 1 : path === "/jogos" ? 0.9 : 0.7,
  }));

  const teamRoutes = TEAMS.map((team) => ({
    url: `${SITE_URL}/selecoes/${team.slug}`,
    lastModified,
    changeFrequency: "daily" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...teamRoutes];
}
