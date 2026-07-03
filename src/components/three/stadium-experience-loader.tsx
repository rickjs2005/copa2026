"use client";

import dynamic from "next/dynamic";

/** O 3D só carrega no cliente e sob demanda — a página chega estática e
 *  instantânea; o canvas hidrata em seguida (code splitting real). */
const StadiumExperienceInner = dynamic(
  () => import("./stadium-experience").then((m) => m.StadiumExperience),
  {
    ssr: false,
    loading: () => (
      <div
        aria-label="Carregando experiência 3D"
        className="flex h-[68dvh] min-h-[480px] w-full animate-pulse items-center justify-center border border-border bg-[#0b0d10]"
      >
        <p className="text-sm text-muted-foreground">Montando o estádio… 🏗️</p>
      </div>
    ),
  }
);

export function StadiumExperienceLazy({ initialSlug }: { initialSlug?: string }) {
  return <StadiumExperienceInner initialSlug={initialSlug} />;
}
