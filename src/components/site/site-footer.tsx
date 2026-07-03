import Link from "next/link";

const COLUMNS = [
  {
    title: "Torneio",
    links: [
      { href: "/jogos", label: "Jogos" },
      { href: "/tabela", label: "Classificação" },
      { href: "/mata-mata", label: "Mata-mata" },
      { href: "/estatisticas", label: "Estatísticas" },
    ],
  },
  {
    title: "Explorar",
    links: [
      { href: "/selecoes", label: "Seleções" },
      { href: "/estadios", label: "Estádios e sedes" },
      { href: "/historia", label: "História das Copas" },
      { href: "/curiosidades", label: "Curiosidades" },
    ],
  },
  {
    title: "Mais",
    links: [
      { href: "/noticias", label: "Notícias" },
      { href: "/faq", label: "Perguntas frequentes" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/8">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="max-w-xs">
            <p className="flex items-center gap-2 font-bold tracking-tight">
              <span
                aria-hidden
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 text-sm font-black text-black"
              >
                26
              </span>
              copa<span className="text-emerald-400">2026</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Guia independente da Copa do Mundo 2026 — jogos, tabelas,
              estatísticas e histórias do maior evento do futebol.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="text-sm font-semibold">{col.title}</h2>
              <ul className="mt-3 space-y-1">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex min-h-9 items-center text-sm text-muted-foreground transition-colors hover:text-emerald-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-12 border-t border-white/5 pt-6 text-xs leading-relaxed text-muted-foreground">
          <p>
            Site independente, sem vínculo com a FIFA ou federações. Nomes de
            competições e seleções são usados apenas para fins informativos.
            Os dados exibidos nesta versão são de demonstração — estrutura
            pronta para dados oficiais em tempo real.
          </p>
        </div>
      </div>
    </footer>
  );
}
