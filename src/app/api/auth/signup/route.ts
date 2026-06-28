import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '../../../lib/db';

export async function POST(req: Request) {
  try {
    const { full_name, email, password, confirmpassword } = await req.json();

    if (!full_name || !email || !password || !confirmpassword) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    if (password !== confirmpassword) {
      return NextResponse.json({ message: 'Passwords do not match' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ message: 'Password must be at least 6 characters' }, { status: 400 });
    }

    const [existing]: any = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return NextResponse.json({ message: 'An account with this email already exists' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      'INSERT INTO users (full_name, email, password, is_google_user) VALUES (?, ?, ?, 0)',
      [full_name, email, hashedPassword]
    );

    return NextResponse.json({ message: 'Account created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ message: 'Server error. Please try again.' }, { status: 500 });
  }
}
