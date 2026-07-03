"use client";

import { useEffect, useRef, useState } from "react";
import { Link2, Sparkles } from "lucide-react";
import type { Curiosity } from "@/data/types";
import { SITE_URL } from "@/lib/seo";
import { cn } from "@/lib/utils";

/** Slug simples: minúsculas, sem acentos, hifens. */
export function slugifyCuriosity(title: string) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const ALL = "Todas";

/** Grade de curiosidades com filtro por tag, âncoras por card e copiar link. */
export function CuriosityGrid({ items }: { items: Curiosity[] }) {
  const [active, setActive] = useState<string>(ALL);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const tags = [...new Set(items.map((item) => item.tag))];
  const countOf = (tag: string) =>
    tag === ALL ? items.length : items.filter((item) => item.tag === tag).length;
  const visible = active === ALL ? items : items.filter((item) => item.tag === active);

  async function copyLink(id: string) {
    try {
      await navigator.clipboard.writeText(`${SITE_URL}/curiosidades#${id}`);
      setCopiedId(id);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // clipboard indisponível — silencioso
    }
  }

  return (
    <div>
      {/* filtros por tag */}
      <div
        role="group"
        aria-label="Filtrar curiosidades por tema"
        className="mb-8 flex flex-wrap gap-2"
      >
        {[ALL, ...tags].map((tag) => {
          const isActive = active === tag;
          return (
            <button
              key={tag}
              type="button"
              onClick={() => setActive(tag)}
              aria-pressed={isActive}
              className={cn(
                "inline-flex min-h-11 items-center gap-1.5 border px-4 text-xs font-semibold uppercase tracking-wider transition-colors",
                isActive
                  ? "border-gold bg-gold text-black"
                  : "border-border bg-card text-muted-foreground hover:border-gold/60 hover:text-foreground"
              )}
            >
              {tag}
              <span className={isActive ? "text-black/60" : "text-muted-foreground/70"}>
                {countOf(tag)}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item) => {
          const id = slugifyCuriosity(item.title);
          return (
            <article
              key={item.title}
              id={id}
              className="flex h-full scroll-mt-24 flex-col border border-border bg-card p-6 transition-colors hover:border-gold/50"
            >
              <button
                type="button"
                onClick={() => setActive(item.tag)}
                aria-label={`Filtrar por ${item.tag}`}
                className="inline-flex w-fit items-center gap-1.5 border border-border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-grass transition-colors hover:border-gold/60"
              >
                <Sparkles aria-hidden className="h-3 w-3" />
                {item.tag}
              </button>
              <h2 className="mt-4 text-lg font-bold leading-snug">{item.title}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {item.text}
              </p>
              <footer className="mt-4">
                <button
                  type="button"
                  onClick={() => copyLink(id)}
                  className="-my-3 inline-flex items-center gap-1.5 py-3 text-xs text-muted-foreground transition-colors hover:text-gold"
                >
                  <Link2 aria-hidden className="h-3.5 w-3.5" />
                  {copiedId === id ? "Copiado ✓" : "Copiar link"}
                </button>
              </footer>
            </article>
          );
        })}
      </div>
    </div>
  );
}
