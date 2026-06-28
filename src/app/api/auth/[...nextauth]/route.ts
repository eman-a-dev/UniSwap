import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "../../../lib/db";
import { saveUserToMySQL } from "../../../lib/saveUserToMySQL";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const [rows]: any = await db.query(
          "SELECT * FROM users WHERE email = ? AND is_google_user = 0",
          [credentials.email]
        );

        if (rows.length === 0) return null;

        const user = rows[0];
        const passwordMatch = await bcrypt.compare(credentials.password, user.password);
        if (!passwordMatch) return null;

        return {
          id: String(user.id),
          email: user.email,
          name: user.full_name,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          await saveUserToMySQL(user);
        } catch (error) {
          console.error("Error saving Google user:", error);
          return false;
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (session.user && token.email) {
        session.user.email = token.email;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/Home`;
    },
  },
  pages: {
    signIn: "/Login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
