"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Tag } from "@/components/ui/tag";
import { faqs } from "@/lib/content";

/** FAQ (§10) */
export function Faq() {
  return (
    <section className="bg-surface-mid py-24">
      <Container className="flex flex-col gap-12 desktop:flex-row desktop:justify-between">
        <div className="flex max-w-[420px] flex-col gap-4">
          <Tag>FAQ</Tag>
          <h2 className="text-balance text-h2">
            Everything You Need Here
          </h2>
          <p className="text-body-l text-ink-muted">
            Everything you need to know about financing, warranties, delivery,
            and buying with confidence.
          </p>
        </div>

        <Accordion.Root
          type="single"
          collapsible
          className="w-full desktop:max-w-[620px]"
        >
          {faqs.map((faq) => (
            <Accordion.Item
              key={faq.question}
              value={faq.question}
              className="border-b border-ink/10"
            >
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full items-center justify-between gap-6 py-6 text-left text-h5 font-medium">
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
