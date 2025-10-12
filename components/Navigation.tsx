import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Navigation() {
  return (
    <nav className="border-b border-border mb-12">
      <div className="max-w-4xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-lg font-semibold hover:text-accent">
            ~/
          </Link>
          <div className="flex gap-6 text-sm items-center">
            <Link href="/articles" className="hover:text-accent">
              articles
            </Link>
            <Link href="/reading" className="hover:text-accent">
              reading
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
