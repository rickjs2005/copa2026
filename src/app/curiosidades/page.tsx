import type { Metadata } from "next";
import { SectionHeading } from "@/components/site/section-heading";
import { CuriosityGrid } from "@/components/site/curiosity-grid";
import { getCuriosities } from "@/lib/api";
import { breadcrumbLd, JsonLd, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Curiosidades da Copa 2026",
  description:
    "Fatos e curiosidades da Copa do Mundo 2026: recordes, formato inédito de 48 seleções, estreantes, tecnologia e histórias que você não sabia.",
  alternates: { canonical: "/curiosidades" },
};

// mesma regra de slug usada nas âncoras do CuriosityGrid (client)
function slugify(title: string) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default async function CuriosidadesPage() {
  const curiosities = await getCuriosities();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <SectionHeading
        eyebrow="Você sabia? · Atualizado em 3 de julho de 2026"
        title="Curiosidades"
        description="Recordes, lendas, zebras e os fatos desta edição — incluindo a queda do recorde de Klose."
      />
      <CuriosityGrid items={curiosities} />
      <JsonLd
        data={breadcrumbLd([
          { name: "Início", path: "/" },
          { name: "Curiosidades", path: "/curiosidades" },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Curiosidades da Copa do Mundo",
          itemListElement: curiosities.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.title,
            url: `${SITE_URL}/curiosidades#${slugify(item.title)}`,
          })),
        }}
      />
    </div>
  );
}
