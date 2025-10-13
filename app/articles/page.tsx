import Link from 'next/link';
import { getAllArticles } from '@/lib/markdown';
import ArticlesClient from './ArticlesClient';

export default function ArticlesPage() {
  const articles = getAllArticles();

  return <ArticlesClient articles={articles} />;
}
