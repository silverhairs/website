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
    <main className="max-w-6xl mx-auto px-6 py-16">
      <div className="mb-16">
        <h1
          className="text-5xl font-bold mb-6 tracking-tight"
          style={{ color: 'var(--foreground)' }}
        >
          Articles
        </h1>
        <p
          className="text-xl md:text-2xl mb-8 max-w-2xl leading-relaxed"
          style={{ color: 'var(--foreground)' }}
        >
          Thoughts on code, math, technology, life, and philosophy.
        </p>

        {/* Category Filter */}
        <div className="flex gap-3 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFilter(cat.value)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all cursor-pointer ${
                filter === cat.value
                  ? 'btn-primary'
                  : 'btn-secondary'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {filteredArticles.length === 0 ? (
        <p
          className="text-base"
          style={{ color: 'var(--foreground-secondary)' }}
        >
          No articles found. {filter !== 'all' && 'Try a different filter.'}
        </p>
      ) : (
        <div className="space-y-8">
          {filteredArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="block group"
            >
              <div className="flex items-baseline justify-between gap-4 mb-2">
                <h2
                  className="text-xl font-semibold group-hover:opacity-70 transition-opacity"
                  style={{ color: 'var(--foreground)' }}
                >
                  {article.title}
                </h2>
                <time
                  className="text-sm whitespace-nowrap"
                  style={{ color: 'var(--foreground-secondary)' }}
                >
                  {new Date(article.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </time>
              </div>
              <p
                className="text-xl md:text-2xl mb-2 leading-relaxed"
                style={{ color: 'var(--foreground)' }}
              >
                {article.excerpt}
              </p>
              <div className="flex gap-3 flex-wrap items-center">
                <span className="tag">{article.category}</span>
                <span
                  className="text-xs"
                  style={{ color: 'var(--foreground-secondary)' }}
                >
                  {article.readingTime}
                </span>
                {article.tags.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs"
                        style={{ color: 'var(--foreground-secondary)' }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
