import { db } from "./db";
import { User } from "next-auth";
import { RowDataPacket } from "mysql2";

export async function saveUserToMySQL(user: User) {
  try {
    if (!user.email) {
      throw new Error("User email is missing");
    }

    const [rows] = await db.execute<RowDataPacket[]>(
      "SELECT id FROM users WHERE email = ?",
      [user.email]
    );

    if (rows.length === 0) {
      await db.execute(
        `INSERT INTO users (email, full_name, google_id, profile_image, is_google_user)
         VALUES (?, ?, ?, ?, 1)`,
        [
          user.email,
          user.name ?? "",
          user.id ?? "",
          user.image ?? "",
        ]
      );
    }
  } catch (error) {
    console.error("Error saving user to MySQL:", error);
    throw error;
  }
}