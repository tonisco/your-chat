import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { env } from "@/env"

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: env.CLIENT_ID,
      clientSecret: env.CLIENT_SECRET,
    }),
  ],
  secret: env.NEXTAUTH_SECRET,
  callbacks: {
    session({ session, user }) {
      console.log("auth")
      return { ...session, user: { ...session.user, ...user } }
    },
  },
}
