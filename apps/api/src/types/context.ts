import { Session } from "next-auth"

import { PrismaClient } from "@prisma/client"

export type Context = {
  prisma: PrismaClient
  session: Session | null
}
