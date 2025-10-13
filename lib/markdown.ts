import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const contentDirectory = path.join(process.cwd(), "content");

export interface ArticleMeta {
  slug: string;
  title: string;
  date: string;
  category: "technical" | "rants" | "philosophy";
  tags: string[];
  excerpt: string;
  readingTime: string;
}

export interface Article extends ArticleMeta {
  content: string;
}

export interface ReadingItem {
  slug: string;
  title: string;
  author: string;
  type: "book" | "paper";
  status: "reading" | "read" | "to-read";
  dateAdded: string;
  dateFinished?: string;
  notes?: string;
  rating?: number;
  url?: string;
}

export function getAllArticles(): ArticleMeta[] {
  const articlesDirectory = path.join(contentDirectory, "articles");

  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(articlesDirectory);
  const articles = fileNames
    .filter((fileName) => fileName.endsWith(".md") || fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, "");
      const fullPath = path.join(articlesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      const stats = readingTime(content);

      return {
        slug,
        title: data.title || slug,
        date: data.date || new Date().toISOString(),
        category: data.category || "technical",
        tags: data.tags || [],
        excerpt: data.excerpt || content.slice(0, 150) + "...",
        readingTime: stats.text,
      };
    });

  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getArticleBySlug(slug: string): Article | null {
  const articlesDirectory = path.join(contentDirectory, "articles");

  try {
    const fullPath = path.join(articlesDirectory, `${slug}.md`);
    let fileContents: string;

    if (fs.existsSync(fullPath)) {
      fileContents = fs.readFileSync(fullPath, "utf8");
    } else {
      const mdxPath = path.join(articlesDirectory, `${slug}.mdx`);
      if (fs.existsSync(mdxPath)) {
        fileContents = fs.readFileSync(mdxPath, "utf8");
      } else {
        return null;
      }
    }

    const { data, content } = matter(fileContents);
    const stats = readingTime(content);

    return {
      slug,
      title: data.title || slug,
      date: data.date || new Date().toISOString(),
      category: data.category || "technical",
      tags: data.tags || [],
      excerpt: data.excerpt || content.slice(0, 150) + "...",
      readingTime: stats.text,
      content,
    };
  } catch (error) {
    console.error(`Error reading article ${slug}:`, error);
    return null;
  }
}

export function getArticlesByCategory(category: string): ArticleMeta[] {
  const allArticles = getAllArticles();
  return allArticles.filter((article) => article.category === category);
}

export function getAllReadingItems(): ReadingItem[] {
  const readingDirectory = path.join(contentDirectory, "reading");

  if (!fs.existsSync(readingDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(readingDirectory);
  const items = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(readingDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || slug,
        author: data.author || "Unknown",
        type: data.type || "book",
        status: data.status || "to-read",
        dateAdded: data.dateAdded || new Date().toISOString(),
        dateFinished: data.dateFinished,
        notes: content,
        rating: data.rating,
        url: data.url,
      };
    });

  return items.sort(
    (a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime(),
  );
}

export function getReadingItemBySlug(slug: string): ReadingItem | null {
  const readingDirectory = path.join(contentDirectory, "reading");

  try {
    const fullPath = path.join(readingDirectory, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || slug,
      author: data.author || "Unknown",
      type: data.type || "book",
      status: data.status || "to-read",
      dateAdded: data.dateAdded || new Date().toISOString(),
      dateFinished: data.dateFinished,
      notes: content,
      rating: data.rating,
      url: data.url,
    };
  } catch (error) {
    console.error(`Error reading item ${slug}:`, error);
    return null;
  }
}

export function getReadingItemsByStatus(status: string): ReadingItem[] {
  const allItems = getAllReadingItems();
  return allItems.filter((item) => item.status === status);
}
