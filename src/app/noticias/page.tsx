import type { Metadata } from "next";
import { Clock } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { getNews } from "@/lib/api";
import { formatFullDate } from "@/lib/format";
import { breadcrumbLd, JsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Notícias da Copa 2026",
  description:
    "As últimas notícias da Copa do Mundo 2026: resultados, bastidores, seleções, recordes e tudo que move o torneio, em leitura rápida.",
  alternates: { canonical: "/noticias" },
};

export default async function NoticiasPage() {
  const news = await getNews();
  const [featured, ...rest] = news;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <SectionHeading
        eyebrow="Cobertura"
        title="Notícias"
        description="Leituras rápidas, direto ao ponto — estrutura pronta para redação/CMS."
      />

      <div className="grid gap-5 lg:grid-cols-3">
        {/* destaque */}
        <Reveal className="lg:col-span-2 lg:row-span-2">
          <article className="flex h-full flex-col justify-end rounded-3xl border border-white/8 bg-gradient-to-br from-emerald-500/15 via-white/[0.03] to-cyan-500/10 p-8 transition-colors hover:border-emerald-500/30 sm:p-10">
            <span className="w-fit rounded-full bg-red-500/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-red-400">
              {featured.category}
            </span>
            <h2 className="mt-4 text-balance text-2xl font-black leading-tight tracking-tight sm:text-4xl">
              {featured.title}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {featured.summary}
            </p>
            <p className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
              <Clock aria-hidden className="h-3.5 w-3.5" />
              {formatFullDate(featured.publishedAt)} · {featured.readingMinutes} min
            </p>
          </article>
        </Reveal>

        {rest.map((item, i) => (
          <Reveal key={item.slug} delay={Math.min(i * 0.04, 0.2)}>
            <article
              className={cn(
                "flex h-full flex-col rounded-2xl border border-white/8 bg-white/[0.03] p-6",
                "transition-colors hover:border-emerald-500/30"
              )}
            >
              <span className="w-fit rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
                {item.category}
              </span>
              <h2 className="mt-3 flex-1 font-bold leading-snug">{item.title}</h2>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                {item.summary}
              </p>
              <p className="mt-4 flex items-center gap-2 border-t border-white/5 pt-3 text-xs text-muted-foreground">
                <Clock aria-hidden className="h-3.5 w-3.5" />
                {formatFullDate(item.publishedAt)} · {item.readingMinutes} min
              </p>
            </article>
          </Reveal>
        ))}
      </div>

      <JsonLd
        data={breadcrumbLd([
          { name: "Início", path: "/" },
          { name: "Notícias", path: "/noticias" },
        ])}
      />
    </div>
  );
}
