// app/api/search/route.ts
import { db } from '../../lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || '';

  if (!q) return NextResponse.json([]);

  try {
    const [rows]: any = await db.execute(
      'SELECT item_id , title FROM items WHERE LOWER(title) LIKE ? LIMIT 10',
      [`%${q.toLowerCase()}%`]
    );

    return NextResponse.json(rows);
  } catch (error) {
    console.error('DB error:', error);
    return NextResponse.json({ error: 'DB error' }, { status: 500 });
  }
}
