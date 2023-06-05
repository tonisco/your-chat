import { PrismaClient } from "@prisma/client"
import { Request } from "express"
import { Session } from "next-auth"
import { getSession } from "next-auth/react"
import { verifyToken } from "./jwt"
import { Context } from "../types/context"

const prisma = new PrismaClient()

const context = async (req: Request): Promise<Context> => {
  let session: Session | null = null

  if (req.headers.authorization?.startsWith("Bearer")) {
    const [_, token] = req.headers.authorization.split(" ")

    let id

    if (token) {
      try {
        const value = verifyToken(token)

        id = value.id
      } catch (error) {
        throw new Error("Token not valid")
      }

      const user = await prisma.user.findUnique({ where: { id } })

      if (user) session = { expires: "", user }
    }
  } else {
    session = await getSession({ req })
  }

  return { prisma, session }
}

export default context
