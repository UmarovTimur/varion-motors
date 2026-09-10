import { BlogCard } from "@/components/ui/blog-card";
import { Container } from "@/components/ui/container";
import { SectionTop } from "@/components/ui/section-top";
import { posts } from "@/lib/content";

/** Blog (§8) */
export function Blog() {
  return (
    <section className="bg-surface py-24">
      <Container className="flex flex-col gap-14">
        <SectionTop
          tag="Blog"
          title="Insights & Expertise Now"
          body="Market trends, buying guides, and insider knowledge to help you make smarter decisions."
          action={{ label: "View All", href: "/blog" }}
        />

        <div className="grid gap-6 tablet:grid-cols-2">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </Container>
    </section>
  );
}
