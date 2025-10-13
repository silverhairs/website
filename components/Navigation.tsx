import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Navigation() {
  return (
    <nav className="border-b border-border mb-12">
      <div className="max-w-4xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold hover:text-accent">
            ~/
          </Link>
          <div className="flex gap-8 text-base items-center">
            <Link href="/articles" className="hover:text-accent transition-colors">
              articles
            </Link>
            <Link href="/reading" className="hover:text-accent transition-colors">
              reading
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
