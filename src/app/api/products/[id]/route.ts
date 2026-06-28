import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { RowDataPacket } from 'mysql2';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;

  try {
    const [rows] = await db.query<RowDataPacket[]>(
      'SELECT * FROM items WHERE item_id = ?',
      [id]
    );

    if (rows.length > 0) {
      return NextResponse.json(rows[0]);
    } else {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: 'Database error', details: message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;
  try {
    const { status } = await request.json();
    const allowed = ['available', 'reserved', 'sold'];
    if (!allowed.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }
    await db.query('UPDATE items SET status = ? WHERE item_id = ?', [status, id]);
    return NextResponse.json({ message: 'Status updated' });
  } catch (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  try {
    await db.query('DELETE FROM items WHERE item_id = ? AND email = ?', [id, email]);
    return NextResponse.json({ message: 'Item deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
