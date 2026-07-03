import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { getCuriosities } from "@/lib/api";
import { breadcrumbLd, JsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Curiosidades da Copa 2026",
  description:
    "Fatos e curiosidades da Copa do Mundo 2026: recordes, formato inédito de 48 seleções, estreantes, tecnologia e histórias que você não sabia.",
  alternates: { canonical: "/curiosidades" },
};

export default async function CuriosidadesPage() {
  const curiosities = await getCuriosities();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <SectionHeading
        eyebrow="Você sabia?"
        title="Curiosidades"
        description="Recordes, regras novas e histórias da maior Copa já disputada."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {curiosities.map((item, i) => (
          <Reveal key={item.title} delay={Math.min(i * 0.03, 0.15)}>
            <article className="flex h-full flex-col rounded-2xl border border-white/8 bg-white/[0.03] p-6 transition-colors hover:border-emerald-500/30">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
                <Sparkles aria-hidden className="h-3 w-3" />
                {item.tag}
              </span>
              <h2 className="mt-4 text-lg font-bold leading-snug">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
            </article>
          </Reveal>
        ))}
      </div>
      <JsonLd
        data={breadcrumbLd([
          { name: "Início", path: "/" },
          { name: "Curiosidades", path: "/curiosidades" },
        ])}
      />
    </div>
  );
}
