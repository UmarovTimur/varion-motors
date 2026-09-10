import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Media } from "@/components/ui/media";
import { PageHeader } from "@/components/ui/page-header";
import { formatDate, posts } from "@/lib/content";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  return (
    <>
      <PageHeader
        tag="Blog"
        title="Insights & Expertise Now"
        body="Market trends, buying guides, and insider knowledge to help you make smarter decisions."
      />
      <section className="bg-surface pb-24">
        <Container>
          <div className="grid gap-6 tablet:grid-cols-2">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group isolate flex flex-col overflow-hidden rounded-card bg-paper"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-t-card">
                  <Media
                    src={post.image}
                    alt={post.title}
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col gap-3 p-6">
                  <time dateTime={post.date} className="text-body-xs text-ink-subtle">
                    {formatDate(post.date)}
                  </time>
                  <h2 className="text-balance text-h4 font-semibold">
                    {post.title}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
