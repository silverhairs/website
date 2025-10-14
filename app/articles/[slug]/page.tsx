import { notFound } from 'next/navigation';
import { getArticleBySlug, getAllArticles } from '@/lib/markdown';
import { MDXContent } from '@/lib/mdx';
import Link from 'next/link';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all articles
export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${article.title} - Boris Kayiranga`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <Link
        href="/articles"
        className="inline-flex items-center gap-2 mb-12 text-sm font-medium hover:opacity-70 transition-opacity"
        style={{ color: 'var(--foreground)' }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 12L6 8L10 4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Back to articles
      </Link>

      <article>
        <header className="mb-12">
          <h1
            className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight"
            style={{ color: 'var(--foreground)' }}
          >
            {article.title}
          </h1>

          <div
            className="flex flex-wrap gap-3 text-sm items-center"
            style={{ color: 'var(--foreground-secondary)' }}
          >
            <time>
              {new Date(article.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span>•</span>
            <span>{article.readingTime}</span>
            <span>•</span>
            <span className="tag">{article.category}</span>
          </div>

          {article.tags.length > 0 && (
            <div className="flex gap-2 mt-4 flex-wrap">
              {article.tags.map((tag) => (
                <span key={tag} className="tag">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div
          className="prose prose-neutral dark:prose-invert max-w-none text-xl md:text-2xl"
          style={{ color: 'var(--foreground)' }}
        >
          <MDXContent source={article.content} />
        </div>
      </article>

      <footer
        className="mt-24 pt-12 border-t"
        style={{ borderColor: 'var(--border)' }}
      >
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity"
          style={{ color: 'var(--foreground)' }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 12L6 8L10 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to articles
        </Link>
      </footer>
    </main>
  );
}
