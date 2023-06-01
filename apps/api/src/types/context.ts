import { PrismaClient } from "@prisma/client"
import { Session } from "next-auth"

export type Context = {
  prisma: PrismaClient
  session: Session | null
}
