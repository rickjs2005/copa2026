import type { Match, MatchStage } from "@/data/types";
import { formatKickoffDate, formatKickoffTime } from "@/lib/format";
import { TeamLabel } from "./team-label";

function BracketMatch({ match }: { match: Match }) {
  const hasScore = match.homeScore !== null && match.awayScore !== null;
  return (
    <div className="w-60 shrink-0 rounded-xl border border-white/8 bg-white/[0.03] p-3.5 transition-colors hover:border-emerald-500/30">
      <p className="mb-2.5 text-[11px] text-muted-foreground">
        {formatKickoffDate(match.kickoff)} · {formatKickoffTime(match.kickoff)}
      </p>
      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between gap-2">
          <TeamLabel slug={match.home} link={false} flagSize="text-base" className="text-sm" />
          {hasScore && <span className="font-bold tabular-nums">{match.homeScore}</span>}
        </div>
        <div className="flex items-center justify-between gap-2">
          <TeamLabel slug={match.away} link={false} flagSize="text-base" className="text-sm" />
          {hasScore && <span className="font-bold tabular-nums">{match.awayScore}</span>}
        </div>
      </div>
    </div>
  );
}

export function Bracket({
  rounds,
}: {
  rounds: { name: MatchStage; matches: Match[] }[];
}) {
  return (
    <div className="overflow-x-auto pb-4" role="region" aria-label="Chaveamento do mata-mata" tabIndex={0}>
      <div className="flex min-w-max gap-8">
        {rounds.map((round) => (
          <div key={round.name} className="flex flex-col">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-emerald-400">
              {round.name}
            </h3>
            <div className="flex flex-1 flex-col justify-around gap-4">
              {round.matches.map((match) => (
                <BracketMatch key={match.id} match={match} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
