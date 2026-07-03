import Link from "next/link";

const COLUMNS = [
  {
    title: "Explorar",
    links: [
      { href: "/estadios", label: "Estádios em 3D" },
      { href: "/figurinhas", label: "Figurinhas da Copa" },
      { href: "/historia", label: "História das Copas" },
      { href: "/curiosidades", label: "Curiosidades" },
    ],
  },
  {
    title: "Edições",
    links: [
      { href: "/historia", label: "Todos os campeões" },
      { href: "/estadios", label: "Palcos das finais" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div className="max-w-xs">
            <p className="font-display text-2xl tracking-wide">
              As<span aria-hidden className="text-[0.8em]">🏆</span>Copas
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Um tributo independente às Copas do Mundo — a história, os
              campeões e os estádios que viraram lendas, em 3D.
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
                      className="inline-flex min-h-9 items-center text-sm text-muted-foreground transition-colors hover:text-grass"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-12 border-t border-border pt-6 text-xs leading-relaxed text-muted-foreground">
          <p>
            Site independente, sem vínculo com a FIFA ou federações. Nomes de
            competições e seleções são usados apenas para fins informativos e
            históricos. Os modelos 3D são representações estilizadas autorais.
          </p>
        </div>
      </div>
    </footer>
  );
}
