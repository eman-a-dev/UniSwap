// app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const [rows]: any = await db.query(
      'SELECT * FROM users WHERE email = ? AND password = ?',
      [email, password]
    );

    if (rows.length > 0) {
      return NextResponse.json({ message: 'Login successful' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }
  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
