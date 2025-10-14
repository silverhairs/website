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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'reading':
        return 'text-accent';
      case 'read':
        return 'text-muted';
      case 'to-read':
        return 'text-foreground';
      default:
        return 'text-muted';
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-semibold mb-4">Reading List</h1>
        <p className="text-muted mb-6">
          Books and papers I&apos;m reading, have read, or plan to read, with personal notes.
        </p>

        {/* Status Filter */}
        <div className="flex gap-2 flex-wrap">
          {statusFilters.map((statusFilter) => (
            <button
              key={statusFilter.value}
              onClick={() => setFilter(statusFilter.value)}
              className={`px-3 py-1.5 text-base rounded transition-colors ${
                filter === statusFilter.value
                  ? 'bg-foreground text-background'
                  : 'bg-border hover:bg-foreground/10'
              }`}
            >
              {statusFilter.label}
            </button>
          ))}
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <p className="text-muted text-sm">
          No items found. {filter !== 'all' && 'Try a different filter.'}
        </p>
      ) : (
        <div className="space-y-6">
          {filteredItems.map((item) => (
            <article key={item.slug} className="group">
              <Link href={`/reading/${item.slug}`}>
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <h2 className="text-lg font-medium group-hover:text-accent transition-colors mb-1">
                      {item.title}
                    </h2>
                    <p className="text-sm text-muted">by {item.author}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`text-xs ${getStatusColor(item.status)}`}>
                      {item.status === 'to-read'
                        ? 'to read'
                        : item.status === 'reading'
                        ? 'reading'
                        : 'read'}
                    </span>
                    {item.rating && (
                      <span className="text-xs text-muted">
                        {'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 text-xs text-muted">
                  <span className="px-2 py-1 bg-border rounded capitalize">
                    {item.type}
                  </span>
                  {item.dateFinished && (
                    <span>
                      Finished:{' '}
                      {new Date(item.dateFinished).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                      })}
                    </span>
                  )}
                  {item.notes && <span>Has notes</span>}
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
