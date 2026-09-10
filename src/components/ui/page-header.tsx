import { Container } from "@/components/ui/container";
import { Tag } from "@/components/ui/tag";

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
    <section className="bg-surface pt-[150px] pb-20">
      <Container className="flex max-w-[720px] flex-col gap-5">
        <Tag>{tag}</Tag>
        <h1 className="text-balance text-h1">
          {title}
        </h1>
        <p className="text-body-l text-ink-muted">{body}</p>
      </Container>
    </section>
  );
}
