'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArticleMeta } from '@/lib/markdown';

interface ArticlesClientProps {
  articles: ArticleMeta[];
}

export default function ArticlesClient({ articles }: ArticlesClientProps) {
  const [filter, setFilter] = useState<string>('all');

  const filteredArticles =
    filter === 'all'
      ? articles
      : articles.filter((article) => article.category === filter);

  const categories = [
    { value: 'all', label: 'All' },
    { value: 'technical', label: 'Technical' },
    { value: 'rants', label: 'Rants' },
    { value: 'philosophy', label: 'Philosophy' },
  ];

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-semibold mb-4">Articles</h1>
        <p className="text-muted mb-6">
          Thoughts on code, math, technology, life, and philosophy.
        </p>

        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFilter(cat.value)}
              className={`px-3 py-1.5 text-base rounded transition-colors ${
                filter === cat.value
                  ? 'bg-foreground text-background'
                  : 'bg-border hover:bg-foreground/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {filteredArticles.length === 0 ? (
        <p className="text-muted text-sm">
          No articles found. {filter !== 'all' && 'Try a different filter.'}
        </p>
      ) : (
        <div className="space-y-8">
          {filteredArticles.map((article) => (
            <article key={article.slug} className="group">
              <Link href={`/articles/${article.slug}`}>
                <div className="flex items-baseline justify-between gap-4 mb-2">
                  <h2 className="text-lg font-medium group-hover:text-accent transition-colors">
                    {article.title}
                  </h2>
                  <time className="text-sm text-muted whitespace-nowrap">
                    {new Date(article.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </time>
                </div>
                <p className="text-sm text-muted mb-3">{article.excerpt}</p>
                <div className="flex gap-3 text-xs text-muted">
                  <span className="px-2 py-1 bg-border rounded">
                    {article.category}
                  </span>
                  <span>{article.readingTime}</span>
                  {article.tags.length > 0 && (
                    <div className="flex gap-2">
                      {article.tags.map((tag) => (
                        <span key={tag}>#{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
