'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ReadingItem } from '@/lib/markdown';

interface ReadingClientProps {
  items: ReadingItem[];
}

export default function ReadingClient({ items }: ReadingClientProps) {
  const [filter, setFilter] = useState<string>('all');

  const filteredItems =
    filter === 'all'
      ? items
      : items.filter((item) => item.status === filter);

  const statusFilters = [
    { value: 'all', label: 'All' },
    { value: 'reading', label: 'Currently Reading' },
    { value: 'read', label: 'Read' },
    { value: 'to-read', label: 'To Read' },
  ];

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'reading':
        return { backgroundColor: 'var(--accent)', color: '#fff' };
      case 'read':
        return { backgroundColor: 'var(--card-bg)', color: 'var(--foreground-secondary)' };
      case 'to-read':
        return { backgroundColor: 'var(--card-bg)', color: 'var(--foreground)' };
      default:
        return { backgroundColor: 'var(--card-bg)', color: 'var(--foreground-secondary)' };
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <div className="mb-16">
        <h1
          className="text-5xl font-bold mb-6 tracking-tight"
          style={{ color: 'var(--foreground)' }}
        >
          Reading List
        </h1>
        <p
          className="text-xl md:text-2xl mb-8 max-w-2xl leading-relaxed"
          style={{ color: 'var(--foreground)' }}
        >
          Books and papers I&apos;m reading, have read, or plan to read, with personal notes.
        </p>

        {/* Status Filter */}
        <div className="flex gap-3 flex-wrap">
          {statusFilters.map((statusFilter) => (
            <button
              key={statusFilter.value}
              onClick={() => setFilter(statusFilter.value)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all cursor-pointer ${
                filter === statusFilter.value
                  ? 'btn-primary'
                  : 'btn-secondary'
              }`}
            >
              {statusFilter.label}
            </button>
          ))}
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <p
          className="text-base"
          style={{ color: 'var(--foreground-secondary)' }}
        >
          No items found. {filter !== 'all' && 'Try a different filter.'}
        </p>
      ) : (
        <div className="space-y-8">
          {filteredItems.map((item) => (
            <Link
              key={item.slug}
              href={`/reading/${item.slug}`}
              className="block group"
            >
              <div className="flex items-baseline justify-between gap-4 mb-2">
                <h2
                  className="text-xl font-semibold group-hover:opacity-70 transition-opacity"
                  style={{ color: 'var(--foreground)' }}
                >
                  {item.title}
                </h2>
                <span
                  className="text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap"
                  style={getStatusBadgeStyle(item.status)}
                >
                  {item.status === 'to-read'
                    ? 'To Read'
                    : item.status === 'reading'
                    ? 'Reading'
                    : 'Read'}
                </span>
              </div>
              <p
                className="text-xl md:text-2xl mb-2"
                style={{ color: 'var(--foreground)' }}
              >
                by {item.author}
              </p>
              <div className="flex gap-3 flex-wrap items-center">
                <span className="tag capitalize">{item.type}</span>
                {item.rating && (
                  <span
                    className="text-sm"
                    style={{ color: 'var(--accent)' }}
                  >
                    {'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}
                  </span>
                )}
                {item.dateFinished && (
                  <span
                    className="text-xs"
                    style={{ color: 'var(--foreground-secondary)' }}
                  >
                    Finished:{' '}
                    {new Date(item.dateFinished).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                    })}
                  </span>
                )}
                {item.notes && (
                  <span
                    className="text-xs"
                    style={{ color: 'var(--foreground-secondary)' }}
                  >
                    📝 Has notes
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
