import { getStadium } from "@/data/stadiums";
import { getTeam } from "@/data/teams";
import type { Match } from "@/data/types";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://copa2026-guia.vercel.app";

export const SITE_NAME = "Copa 2026 — Guia da Copa do Mundo";

/** Injeta JSON-LD (Schema.org) de forma segura. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify de dados próprios (não input de usuário)
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "pt-BR",
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function faqLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function sportsEventLd(match: Match) {
  const home = getTeam(match.home);
  const away = getTeam(match.away);
  const stadium = getStadium(match.stadium);
  if (!home || !away) return null;
  return {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: `${home.name} x ${away.name} — ${match.stage}`,
    sport: "Futebol",
    startDate: match.kickoff,
    eventStatus:
      match.status === "encerrado"
        ? "https://schema.org/EventScheduled"
        : "https://schema.org/EventScheduled",
    location: stadium
      ? {
          "@type": "StadiumOrArena",
          name: stadium.name,
          address: { "@type": "PostalAddress", addressLocality: stadium.city, addressCountry: stadium.country },
        }
      : undefined,
    competitor: [
      { "@type": "SportsTeam", name: home.name },
      { "@type": "SportsTeam", name: away.name },
    ],
  };
}
