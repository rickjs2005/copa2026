const CHAMPIONS = [
  "1930 Uruguai", "1934 Itália", "1938 Itália", "1950 Uruguai", "1954 Alemanha",
  "1958 Brasil", "1962 Brasil", "1966 Inglaterra", "1970 Brasil", "1974 Alemanha",
  "1978 Argentina", "1982 Itália", "1986 Argentina", "1990 Alemanha", "1994 Brasil",
  "1998 França", "2002 Brasil", "2006 Itália", "2010 Espanha", "2014 Alemanha",
  "2018 França", "2022 Argentina", "2026 ?",
];

/** Faixa editorial com todos os campeões — rolagem infinita lenta.
 *  Conteúdo duplicado para o loop; leitores de tela recebem a lista uma vez. */
export function Ticker() {
  const line = CHAMPIONS.join("  ★  ");
  return (
    <div className="overflow-hidden border-y border-border bg-card py-3">
      <p className="sr-only">Campeões de todas as Copas: {CHAMPIONS.join(", ")}</p>
      <div aria-hidden className="flex w-max animate-ticker gap-8 whitespace-nowrap">
        {[0, 1].map((i) => (
          <span
            key={i}
            className="font-display text-sm tracking-[0.14em] text-muted-foreground"
          >
            {line}
            {"  ★  "}
          </span>
        ))}
      </div>
    </div>
  );
}
