import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Media } from "@/components/ui/media";
import { formatDate, posts } from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  return { title: post?.title ?? "Article" };
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <article className="bg-surface pt-[150px] pb-24">
      <Container className="flex max-w-[820px] flex-col gap-8">
        <time dateTime={post.date} className="text-body-xs text-ink-subtle">
          {formatDate(post.date)}
        </time>
        <h1 className="text-balance text-h1">
          {post.title}
        </h1>
        <div className="relative aspect-[16/9] overflow-hidden rounded-card">
          <Media src={post.image} alt={post.title} priority />
        </div>
        <p className="text-body-l text-ink-muted">
          Article body is not part of the documented scope — wire this up to the
          CMS once the collection fields are defined.
        </p>
      </Container>
    </article>
  );
}
