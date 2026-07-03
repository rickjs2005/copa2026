import Link from "next/link";
import { getTeam } from "@/data/teams";
import { cn } from "@/lib/utils";

/**
 * Nome + bandeira de uma seleção a partir do slug. Aceita rótulos de
 * confronto ainda indefinido ("Vencedor Q1") e os exibe como placeholder.
 */
export function TeamLabel({
  slug,
  bold = false,
  link = true,
  flagSize = "text-xl",
  className,
}: {
  slug: string;
  bold?: boolean;
  link?: boolean;
  flagSize?: string;
  className?: string;
}) {
  const team = getTeam(slug);

  if (!team) {
    return (
      <span className={cn("flex items-center gap-2 text-muted-foreground", className)}>
        <span aria-hidden className={cn(flagSize, "grayscale opacity-60")}>⚽</span>
        <span className="text-sm">{slug}</span>
      </span>
    );
  }

  const content = (
    <>
      <span aria-hidden className={flagSize}>{team.flag}</span>
      <span className={cn("truncate", bold && "font-semibold")}>{team.name}</span>
    </>
  );

  if (!link) {
    return <span className={cn("flex min-w-0 items-center gap-2", className)}>{content}</span>;
  }

  return (
    <Link
      href={`/selecoes/${team.slug}`}
      prefetch={false}
      className={cn(
        "flex min-w-0 items-center gap-2 transition-colors hover:text-emerald-400",
        className
      )}
    >
      {content}
    </Link>
  );
}
