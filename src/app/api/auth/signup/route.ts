import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';

export async function POST(req: Request) {
  try {
    const { full_name, email, password, confirmpassword } = await req.json();

    if (!full_name || !email || !password || !confirmpassword) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    // Check if user already exists
    const [existing]: any = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return NextResponse.json({ message: 'User already exists' }, { status: 409 });
    }

    // Insert new user
    await db.query(
      'INSERT INTO users (full_name, email, password, confirmpassword) VALUES (?, ?, ?, ?)',
      [full_name, email, password, confirmpassword]
    );

    return NextResponse.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
