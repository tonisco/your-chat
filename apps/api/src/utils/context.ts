import { Session } from "next-auth"
import { getSession } from "next-auth/react"
import { Request } from "express"

import { PrismaClient } from "@prisma/client"

import { Context } from "../types/context"

import { verifyToken } from "./jwt"

const prisma = new PrismaClient()

const context = async (req: Request): Promise<Context> => {
  let session: Session | null = null

  if (req.headers.authorization?.startsWith("Bearer")) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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