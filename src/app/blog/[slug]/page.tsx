import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CallToAction } from "@/components/sections/call-to-action";
import { BlogCard } from "@/components/ui/blog-card";
import { Container } from "@/components/ui/container";
import { SectionTop } from "@/components/ui/section-top";
import { Tag } from "@/components/ui/tag";
import { formatDate, posts, type PostBlock } from "@/lib/content";
import { typo } from "@/lib/utils";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  return post ? { title: post.title, description: post.lead } : {};
}

/**
 * Blog post — measured off the Framer template's article page at 1530 / 1000
 * / 390: Hero → Other posts → Call To Action.
 *
 * Hero is two equal columns 80px apart on desktop. The left one (tag, title,
 * lead; gap 16) is sticky, so the headline stays in view while the right one
 * scrolls: the cover photo (radius 16; 456px tall, 400 on phone) and, 32px
 * under it, the text column capped at 480. Below desktop the columns stack
 * (gap 64 tablet / 48 phone) and nothing sticks.
 *
 * Framer puts the content 32px under its 70px nav and sticks the title 18px
 * under it; the same gaps under this site's taller floating header (bottom
 * edge at 80px) give 112 and 98.
 */
export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const others = posts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <section className="bg-background">
        <Container className="flex flex-col gap-12 pt-[112px] tablet:gap-16 desktop:flex-row desktop:items-start desktop:gap-20">
          {/* Left */}
          <div className="flex flex-col gap-4 desktop:sticky desktop:top-[98px] desktop:flex-1">
            <p className="flex flex-wrap gap-1">
              <Tag>Статья</Tag>
              <Tag>-</Tag>
              <Tag>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </Tag>
            </p>
            <h1 className="max-w-[550px] text-[40px] leading-none text-ink tablet:text-h1">
              {typo(post.title)}
            </h1>
            <p className="max-w-[480px] text-body text-ink-muted">
              {post.lead}
            </p>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-16 tablet:gap-8 desktop:flex-1">
            <div className="relative h-[400px] overflow-clip rounded-md bg-background-mid tablet:h-[456px]">
              <Image
                src={post.image}
                alt=""
                fill
                priority
                sizes="(min-width: 1200px) 50vw, 100vw"
                className="object-cover object-center"
              />
            </div>
            <div className="max-w-[480px]">
              {post.body.map((block, i) => (
                <Block key={i} block={block} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {others.length > 0 ? (
        <section className="bg-background">
          <Container className="flex flex-col gap-12 tablet:gap-16 desktop:gap-20">
            <SectionTop
              tag="Блог"
              title="Читайте также"
              action={{ label: "Все статьи", href: "/blog" }}
            />
            <div className="grid grid-cols-1 gap-6 tablet:grid-cols-2 desktop:grid-cols-3">
              {others.map((other) => (
                <BlogCard key={other.slug} post={other} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <CallToAction />
    </>
  );
}

/**
 * Rich text, spaced like Framer's: 20px above a paragraph, 40px above a
 * subheading, and none above a list — it hangs straight off the line that
 * introduces it ("…складывается из таких частей:"). Nothing above the first
 * block. Subheadings are Heading 5 in bold black; body copy is 16/24 #4D4D4D
 * with its bold lead-in in black.
 */
function Block({ block }: { block: PostBlock }) {
  if (block.type === "h") {
    return (
      <h2 className="mt-10 text-h5 font-bold text-ink first:mt-0">
        {typo(block.text)}
      </h2>
    );
  }

  if (block.type === "ul") {
    return (
      <ul className="list-disc pl-5 text-body text-ink-muted">
        {block.items.map((item, i) => (
          <li key={i}>
            <Lead text={item.lead} />
            {item.text}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <p className="mt-5 text-body text-ink-muted first:mt-0">
      <Lead text={block.lead} />
      {block.text}
    </p>
  );
}

function Lead({ text }: { text?: string }) {
  return text ? <strong className="font-bold text-ink">{text} </strong> : null;
}
