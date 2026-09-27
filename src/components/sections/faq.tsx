"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Tag } from "@/components/ui/tag";
import { faqs } from "@/lib/content";
import { typo } from "@/lib/utils";

/** FAQ (§10) */
export function Faq() {
  return (
    <section id="faq" className="bg-background">
      <Container className="flex flex-col gap-8 tablet:gap-16 desktop:flex-row desktop:items-start desktop:gap-20">
        <div className="flex flex-col gap-4 desktop:flex-[445]">
          <Tag>Частые вопросы</Tag>
          <h2 className="max-w-[480px] text-balance text-h2">
            {typo("Что обычно спрашивают")}
          </h2>
          <p className="text-body text-ink-muted">
            Оплата, сроки, растаможка и что будет, если что-то пойдёт не так.
            Отвечаем так же, как в переписке — без мелкого шрифта. Правила
            ввоза в разных странах СНГ отличаются, поэтому точный расчёт
            делаем под вашу страну.
          </p>
        </div>

        <Accordion.Root
          type="single"
          collapsible
          className="w-full desktop:flex-[891]"
        >
          {faqs.map((faq) => (
            <Accordion.Item
              key={faq.question}
              value={faq.question}
              className="border-b border-ink/10"
            >
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full items-center justify-between gap-6 py-4 text-left text-h5 tablet:py-6 font-medium">
                  {faq.question}
                  <ChevronDown className="size-5 shrink-0 text-ink-subtle transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <p className="pb-6 text-body-l text-ink-muted">{faq.answer}</p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </Container>
    </section>
  );
}
