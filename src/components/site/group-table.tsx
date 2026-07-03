import type { GroupId, GroupStanding } from "@/data/types";
import { TeamLabel } from "./team-label";
import { cn } from "@/lib/utils";

const HEADERS = [
  { key: "P", label: "Pontos" },
  { key: "J", label: "Jogos" },
  { key: "V", label: "Vitórias" },
  { key: "E", label: "Empates" },
  { key: "D", label: "Derrotas" },
  { key: "SG", label: "Saldo de gols" },
];

export function GroupTable({ group, standings }: { group: GroupId; standings: GroupStanding[] }) {
  return (
    <section
      aria-labelledby={`grupo-${group}`}
      className="overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03]"
    >
      <h3
        id={`grupo-${group}`}
        className="flex items-center gap-2 border-b border-white/8 px-5 py-3.5 text-sm font-bold"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 text-xs font-black text-black">
          {group}
        </span>
        Grupo {group}
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-muted-foreground">
              <th scope="col" className="px-5 py-2.5 text-left font-medium">
                Seleção
              </th>
              {HEADERS.map((h) => (
                <th
                  key={h.key}
                  scope="col"
                  className="px-2 py-2.5 text-center font-medium"
                >
                  <abbr title={h.label} className="no-underline">
                    {h.key}
                  </abbr>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {standings.map((row, i) => (
              <tr
                key={row.team}
                className={cn(
                  "border-t border-white/5",
                  i < 2 && "bg-emerald-500/[0.06]"
                )}
              >
                <td className="px-5 py-3">
                  <span className="flex items-center gap-2.5">
                    <span
                      className={cn(
                        "w-4 text-xs tabular-nums",
                        i < 2 ? "font-bold text-emerald-400" : "text-muted-foreground"
                      )}
                    >
                      {i + 1}
                    </span>
                    <TeamLabel slug={row.team} flagSize="text-lg" />
                  </span>
                </td>
                <td className="px-2 py-3 text-center font-bold tabular-nums">{row.points}</td>
                <td className="px-2 py-3 text-center tabular-nums text-muted-foreground">{row.played}</td>
                <td className="px-2 py-3 text-center tabular-nums text-muted-foreground">{row.won}</td>
                <td className="px-2 py-3 text-center tabular-nums text-muted-foreground">{row.drawn}</td>
                <td className="px-2 py-3 text-center tabular-nums text-muted-foreground">{row.lost}</td>
                <td className="px-2 py-3 text-center tabular-nums text-muted-foreground">
                  {row.goalsFor - row.goalsAgainst > 0 ? "+" : ""}
                  {row.goalsFor - row.goalsAgainst}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
