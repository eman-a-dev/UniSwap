import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../lib/db';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

  try {
    const [rows]: any = await db.query(
      'SELECT * FROM items WHERE email = ? ORDER BY created_at DESC',
      [email]
    );
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
