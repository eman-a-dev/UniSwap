import { db } from './db';
import { User } from 'next-auth';

export async function saveUserToMySQL(user: User) {
  try {
    const [rows] = await db.execute(
      "SELECT id FROM users WHERE email = ?",
      [user.email]
    );

    if ((rows as any).length === 0) {
      await db.execute(
        `INSERT INTO users (email, full_name, google_id, profile_image, is_google_user)
         VALUES (?, ?, ?, ?, 1)`,
        [
          user.email,
          user.name || '',
          user.id || '',
          user.image || '',
        ]
      );
    }
  } catch (error) {
    console.error("Error saving user to MySQL:", error);
    throw error;
  }
}
