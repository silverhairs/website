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
    title: `${article.title} - boris kayi`,
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
    <main className="max-w-4xl mx-auto px-6 py-12">
      <Link
        href="/articles"
        className="inline-block mb-8 text-base text-muted hover:text-accent"
      >
        ← back to articles
      </Link>

      <article>
        <header className="mb-8 pb-8 border-b border-border">
          <h1 className="text-3xl font-semibold mb-4">{article.title}</h1>

          <div className="flex flex-wrap gap-4 text-sm text-muted">
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
            <span className="px-2 py-0.5 bg-border rounded">
              {article.category}
            </span>
          </div>

          {article.tags.length > 0 && (
            <div className="flex gap-2 mt-4 text-xs text-muted">
              {article.tags.map((tag) => (
                <span key={tag} className="px-2 py-1 bg-border rounded">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <MDXContent source={article.content} />
        </div>
      </article>

      <footer className="mt-16 pt-8 border-t border-border">
        <Link
          href="/articles"
          className="text-base text-muted hover:text-accent"
        >
          ← back to articles
        </Link>
      </footer>
    </main>
  );
}
