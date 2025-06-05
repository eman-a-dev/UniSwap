
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
