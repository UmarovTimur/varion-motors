import type { Metadata } from "next";
import { BlogCard } from "@/components/ui/blog-card";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { posts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Блог",
  description:
    "Как устроены цена под ключ, проверка и доставка авто из Кореи и Китая по СНГ.",
};

export default function BlogPage() {
  return (
    <>
      <PageHeader
        tag="Блог"
        title="Статьи"
        body="Как устроены цена под ключ, проверка и доставка авто из Кореи и Китая — без рекламы, так же, как отвечаем в переписке."
      />
      <section className="bg-background">
        <Container>
          <div className="grid grid-cols-1 gap-6 tablet:grid-cols-2 desktop:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
