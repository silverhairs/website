import { notFound } from 'next/navigation';
import { getReadingItemBySlug, getAllReadingItems } from '@/lib/markdown';
import { MDXContent } from '@/lib/mdx';
import Link from 'next/link';

interface ReadingItemPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all reading items
export async function generateStaticParams() {
  const items = getAllReadingItems();
  return items.map((item) => ({
    slug: item.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ReadingItemPageProps) {
  const { slug } = await params;
  const item = getReadingItemBySlug(slug);

  if (!item) {
    return {
      title: 'Reading Item Not Found',
    };
  }

  return {
    title: `${item.title} - Reading List`,
    description: `Notes on ${item.title} by ${item.author}`,
  };
}

export default async function ReadingItemPage({ params }: ReadingItemPageProps) {
  const { slug } = await params;
  const item = getReadingItemBySlug(slug);

  if (!item) {
    notFound();
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'reading':
        return 'Currently Reading';
      case 'read':
        return 'Read';
      case 'to-read':
        return 'To Read';
      default:
        return status;
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <Link
        href="/reading"
        className="inline-block mb-8 text-sm text-muted hover:text-accent"
      >
        ← back to reading list
      </Link>

      <article>
        <header className="mb-8 pb-8 border-b border-border">
          <h1 className="text-3xl font-semibold mb-2">{item.title}</h1>
          <p className="text-lg text-muted mb-6">by {item.author}</p>

          <div className="flex flex-wrap gap-4 text-sm">
            <span className="px-3 py-1 bg-border rounded capitalize">
              {item.type}
            </span>
            <span className="px-3 py-1 bg-border rounded">
              {getStatusLabel(item.status)}
            </span>
            {item.rating && (
              <span className="px-3 py-1 bg-border rounded">
                {'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-muted mt-4">
            <span>
              Added:{' '}
              {new Date(item.dateAdded).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            {item.dateFinished && (
              <>
                <span>•</span>
                <span>
                  Finished:{' '}
                  {new Date(item.dateFinished).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </>
            )}
          </div>

          {item.url && (
            <div className="mt-4">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-accent hover:underline"
              >
                View external link →
              </a>
            </div>
          )}
        </header>

        {item.notes && item.notes.trim() !== '' ? (
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <h2 className="text-xl font-semibold mb-4">Notes</h2>
            <MDXContent source={item.notes} />
          </div>
        ) : (
          <p className="text-muted text-sm">No notes yet.</p>
        )}
      </article>

      <footer className="mt-16 pt-8 border-t border-border">
        <Link
          href="/reading"
          className="text-sm text-muted hover:text-accent"
        >
          ← back to reading list
        </Link>
      </footer>
    </main>
  );
}
