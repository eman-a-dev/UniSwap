import { db } from './db'; // Assuming db.ts exports the created connection
import { User } from 'next-auth';

export async function saveUserToMySQL(user: User) {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM users WHERE email = ?",
      [user.email]
    );

    if ((rows as any).length === 0) {
      await db.execute(
        `INSERT INTO users (email, full_name, google_id, profile_image, is_google_user)
         VALUES (?, ?, ?, ?, 1)`,
        [
          user.email,
          user.name,
          user.id || "",     // Google user ID, fallback if null
          user.image || "",  // Profile picture
        ]
      );
    }
  } catch (error) {
    console.error("Error saving user to MySQL:", error);
    throw error; // propagate to NextAuth for logging
  }
}
