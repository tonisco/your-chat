import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import { env } from "@/env"

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "database",
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
      return { ...session, user: { ...session.user, ...user } }
    },
  },
}
