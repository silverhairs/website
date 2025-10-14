import Link from "next/link";
import { getAllArticles } from "@/lib/markdown";

export default function Home() {
  const recentArticles = getAllArticles().slice(0, 5);

  return (
    <main className="max-w-6xl mx-auto px-6">
      {/* Hero Section */}
      <section className="py-24">
        <p
          className="text-xl md:text-2xl leading-relaxed mb-8 text-justify"
          style={{ color: "var(--foreground)" }}
        >
          Also known online by the moniker silverhairs{" "}
          <span style={{ color: "var(--foreground-secondary)" }}>
            /ˈsɪl.vər.hɛər/
          </span>
          , Boris is a perpetual learner with various interests including but
          limited to energy, software, architecture, and finance. <br />
          Here, he writes about computers, technology, and whatever else crosses
          my mind.
        </p>
        <div className="flex gap-4 items-center">
          <Link href="/articles" className="btn btn-secondary">
            Articles
          </Link>
          <Link href="/reading" className="btn btn-secondary">
            Reading List
          </Link>
        </div>
      </section>

      {/* Recent Articles */}
      <section className="pb-16">
        <div className="flex items-center justify-between mb-12">
          <h2
            className="text-3xl font-bold tracking-tight"
            style={{ color: "var(--foreground)" }}
          >
            Recent Articles
          </h2>
          <Link
            href="/articles"
            className="text-sm font-medium hover:opacity-70 transition-opacity"
            style={{ color: "var(--foreground)" }}
          >
            View all →
          </Link>
        </div>

        {recentArticles.length === 0 ? (
          <p
            className="text-base"
            style={{ color: "var(--foreground-secondary)" }}
          >
            No articles yet. Check back soon!
          </p>
        ) : (
          <div className="space-y-8">
            {recentArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="block group"
              >
                <div className="flex items-baseline justify-between gap-4 mb-2">
                  <h3
                    className="text-xl font-semibold group-hover:opacity-70 transition-opacity"
                    style={{ color: "var(--foreground)" }}
                  >
                    {article.title}
                  </h3>
                  <time
                    className="text-sm whitespace-nowrap"
                    style={{ color: "var(--foreground-secondary)" }}
                  >
                    {new Date(article.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                </div>
                <p
                  className="text-xl md:text-2xl mb-2 leading-relaxed"
                  style={{ color: "var(--foreground)" }}
                >
                  {article.excerpt}
                </p>
                <div className="flex gap-3 items-center">
                  <span className="tag">{article.category}</span>
                  <span
                    className="text-xs"
                    style={{ color: "var(--foreground-secondary)" }}
                  >
                    {article.readingTime}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
