import { Container } from "@/components/ui/container";
import { Tag } from "@/components/ui/tag";
import { typo } from "@/lib/utils";

/** Shared header for the secondary pages. */
export function PageHeader({
  tag,
  title,
  body,
}: {
  tag: string;
  title: string;
  body: string;
}) {
  return (
    <section className="bg-surface pt-28 pb-12 tablet:pt-[150px] tablet:pb-20">
      <Container className="flex max-w-[720px] flex-col gap-5">
        <Tag>{tag}</Tag>
        <h1 className="text-balance text-h1">{typo(title)}</h1>
        <p className="text-body-l text-ink-muted">{body}</p>
      </Container>
    </section>
  );
}
