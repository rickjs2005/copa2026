import type { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/site/section-heading";
import { getFaq } from "@/lib/api";
import { breadcrumbLd, faqLd, JsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Perguntas frequentes sobre a Copa 2026",
  description:
    "Quando é a final? Quantas seleções jogam? Onde são os jogos? As respostas para as dúvidas mais comuns sobre a Copa do Mundo 2026.",
  alternates: { canonical: "/faq" },
};

export default async function FaqPage() {
  const faq = await getFaq();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <SectionHeading
        eyebrow="Tira-dúvidas"
        title="Perguntas frequentes"
        description="As respostas rápidas para o que todo mundo pergunta ao Google."
      />

      <Accordion type="single" collapsible className="w-full">
        {faq.map((item, i) => (
          <AccordionItem key={item.question} value={`item-${i}`}>
            <AccordionTrigger className="text-left text-base font-semibold hover:text-emerald-400 hover:no-underline">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-base leading-relaxed text-muted-foreground">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <JsonLd data={faqLd(faq)} />
      <JsonLd
        data={breadcrumbLd([
          { name: "Início", path: "/" },
          { name: "FAQ", path: "/faq" },
        ])}
      />
    </div>
  );
}
