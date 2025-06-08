import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { saveUserToMySQL } from "../../../lib/saveUserToMySQL";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
   async signIn({ user }) {
  try {
    await saveUserToMySQL(user);
    return true;
  } catch (error) {
    console.error("Error in saving user:", error);
    return false; // ya false return kar ke login rok sakte ho
  }
},

    async redirect({ url, baseUrl }) {
      // 👇 login ke baad home page pe bhejna hai
      return baseUrl;
      // agar dashboard bhejna ho to:
      // return `${baseUrl}/dashboard`
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
