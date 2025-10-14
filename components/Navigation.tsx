import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Navigation() {
  return (
    <nav className="border-b border-[var(--border)] sticky top-0 z-50 bg-[var(--background)] backdrop-blur-lg bg-opacity-80">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-lg font-bold hover:opacity-70 transition-opacity"
            style={{ color: 'var(--foreground)' }}
          >
            Boris Kayiranga
          </Link>
          <div className="flex gap-6 text-sm items-center font-medium">
            <Link
              href="/articles"
              className="hover:opacity-70 transition-opacity"
              style={{ color: 'var(--foreground)' }}
            >
              Articles
            </Link>
            <Link
              href="/reading"
              className="hover:opacity-70 transition-opacity"
              style={{ color: 'var(--foreground)' }}
            >
              Reading
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
