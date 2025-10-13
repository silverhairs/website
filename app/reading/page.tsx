import { getAllReadingItems } from '@/lib/markdown';
import ReadingClient from './ReadingClient';

export default function ReadingPage() {
  const items = getAllReadingItems();

  return <ReadingClient items={items} />;
}
