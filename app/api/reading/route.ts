import { NextResponse } from 'next/server';
import { getAllReadingItems } from '@/lib/markdown';

export async function GET() {
  try {
    const items = getAllReadingItems();
    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching reading items:', error);
    return NextResponse.json({ error: 'Failed to fetch reading items' }, { status: 500 });
  }
}
