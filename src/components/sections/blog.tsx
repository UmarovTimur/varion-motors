import { BlogCard } from "@/components/ui/blog-card";
import { Container } from "@/components/ui/container";
import { SectionTop } from "@/components/ui/section-top";
import { posts } from "@/lib/content";

/**
 * Blog (§8). Desktop is one row: the header column on the left (445 of the
 * 1416px frame) and the two cards on the right (891, 20px gap).
 */
export function Blog() {
  return (
    <section className="bg-background">
      <Container className="flex flex-col gap-12 tablet:gap-16 desktop:flex-row desktop:items-start desktop:gap-20">
        <SectionTop
          variant="stack"
          tag="Blog"
          title="Insights & Expertise Now"
          body="Market trends, buying guides, and insider knowledge to help you make smarter decisions."
          action={{ label: "View All", href: "/blog" }}
          className="desktop:flex-[445]"
        />

        <div className="flex flex-col gap-5 tablet:flex-row desktop:flex-[891]">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </Container>
    </section>
  );
}
