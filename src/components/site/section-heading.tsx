import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  linkLabel,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4 sm:mb-10">
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-gold">
            <span aria-hidden className="h-px w-8 bg-gold/60" />
            {eyebrow}
          </p>
        )}
        <h2 className="font-display text-3xl sm:text-5xl">{title}</h2>
        {description && (
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">{description}</p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="group inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-grass transition-colors hover:text-grass-light"
        >
          {linkLabel ?? "Ver tudo"}
          <ArrowRight
            aria-hidden
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      )}
    </div>
  );
}
