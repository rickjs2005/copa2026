import type { Match } from "@/data/types";
import { getStadium } from "@/data/stadiums";
import { formatKickoffDate, formatKickoffTime } from "@/lib/format";
import { TeamLabel } from "./team-label";
import { cn } from "@/lib/utils";

function StatusBadge({ match }: { match: Match }) {
  if (match.status === "ao-vivo") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/15 px-2.5 py-1 text-xs font-semibold text-red-400">
        <span aria-hidden className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75 motion-reduce:animate-none" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
        </span>
        AO VIVO
      </span>
    );
  }
  if (match.status === "encerrado") {
    return (
      <span className="rounded-full bg-white/5 px-2.5 py-1 text-xs font-medium text-muted-foreground">
        Encerrado
      </span>
    );
  }
  return (
    <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400">
      {formatKickoffTime(match.kickoff)}
    </span>
  );
}

export function MatchCard({ match, showDate = false }: { match: Match; showDate?: boolean }) {
  const stadium = getStadium(match.stadium);
  const hasScore = match.homeScore !== null && match.awayScore !== null;

  return (
    <article
      className={cn(
        "group rounded-2xl border border-white/8 bg-white/[0.03] p-5",
        "transition-colors duration-300 hover:border-emerald-500/30 hover:bg-white/[0.05]"
      )}
    >
      <header className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
        <span className="truncate">
          {match.stage}
          {match.group ? ` · Grupo ${match.group}` : ""}
          {showDate ? ` · ${formatKickoffDate(match.kickoff)}` : ""}
        </span>
        <StatusBadge match={match} />
      </header>

      <div className="mt-4 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <TeamLabel slug={match.home} bold flagSize="text-2xl" />
          {hasScore && (
            <span className="text-xl font-bold tabular-nums">{match.homeScore}</span>
          )}
        </div>
        <div className="flex items-center justify-between gap-3">
          <TeamLabel slug={match.away} bold flagSize="text-2xl" />
          {hasScore && (
            <span className="text-xl font-bold tabular-nums">{match.awayScore}</span>
          )}
        </div>
      </div>

      {stadium && (
        <footer className="mt-4 border-t border-white/5 pt-3 text-xs text-muted-foreground">
          {stadium.name} · {stadium.city} {stadium.countryFlag}
        </footer>
      )}
    </article>
  );
}
