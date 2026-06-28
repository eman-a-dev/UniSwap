import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../lib/db';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

  try {
    const [rows]: any = await db.query(
      `SELECT i.* FROM items i
       INNER JOIN wishlist w ON i.item_id = w.item_id
       WHERE w.user_email = ?
       ORDER BY w.created_at DESC`,
      [email]
    );
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email, item_id } = await request.json();
    if (!email || !item_id) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

    await db.query(
      'INSERT IGNORE INTO wishlist (user_email, item_id) VALUES (?, ?)',
      [email, item_id]
    );
    return NextResponse.json({ message: 'Added to wishlist' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
  const item_id = searchParams.get('item_id');

  if (!email || !item_id) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

  try {
    await db.query('DELETE FROM wishlist WHERE user_email = ? AND item_id = ?', [email, item_id]);
    return NextResponse.json({ message: 'Removed from wishlist' });
  } catch (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
