import Link from 'next/link';
import { getAllArticles } from '@/lib/markdown';

export default function Home() {
  const recentArticles = getAllArticles().slice(0, 5);

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <section className="mb-16">
        <h1 className="text-3xl font-semibold mb-4">boris kayi</h1>
        <p className="text-muted leading-relaxed mb-6">
          Software engineer, writer, and perpetual learner. I write about code,
          mathematics, technology, philosophy, and whatever else crosses my mind.
        </p>
        <p className="text-muted leading-relaxed">
          This is a space for thinking, reading, and sharing ideas. Feel free to
          explore my <Link href="/articles">articles</Link> or see what I&apos;m{' '}
          <Link href="/reading">reading</Link>.
        </p>
      </section>

      {/* Recent Articles */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Recent Articles</h2>
          <Link href="/articles" className="text-sm text-muted hover:text-accent">
            view all →
          </Link>
        </div>

        {recentArticles.length === 0 ? (
          <p className="text-muted text-sm">No articles yet. Check back soon!</p>
        ) : (
          <div className="space-y-8">
            {recentArticles.map((article) => (
              <article key={article.slug} className="group">
                <Link href={`/articles/${article.slug}`}>
                  <div className="flex items-baseline justify-between gap-4 mb-2">
                    <h3 className="font-medium group-hover:text-accent transition-colors">
                      {article.title}
                    </h3>
                    <time className="text-sm text-muted whitespace-nowrap">
                      {new Date(article.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </time>
                  </div>
                  <p className="text-sm text-muted mb-2">{article.excerpt}</p>
                  <div className="flex gap-3 text-xs text-muted">
                    <span className="px-2 py-1 bg-border rounded">
                      {article.category}
                    </span>
                    <span>{article.readingTime}</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Quick Links */}
      <section>
        <div className="border-t border-border pt-8">
          <p className="text-sm text-muted mb-4">Find me elsewhere:</p>
          <div className="flex gap-4 text-sm">
            <a href="https://github.com/silverhairs" className="hover:text-accent">
              GitHub
            </a>
            <a href="https://twitter.com/silverhairs7" className="hover:text-accent">
              Twitter
            </a>
            <a href="mailto:hello@silverhairs.engineer" className="hover:text-accent">
              Email
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
