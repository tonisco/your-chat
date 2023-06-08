import { getSession } from "next-auth/react"
import { Request } from "express"
import { PubSub } from "graphql-subscriptions"
import { Context as ctx } from "graphql-ws/lib/server"

import { PrismaClient } from "@prisma/client"

import { verifyToken } from "./jwt"

const prisma = new PrismaClient()

const pubsub = new PubSub()

type Session = {
  expires: string
  user: {
    email: string | null
    id: string
    image: string | null
    name: string | null
    username: string | null
    emailVerified: Date | null
  }
}

export type Context = { prisma: PrismaClient; session: Session | null }

export const context = async (req: Request): Promise<Context> => {
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
    session = (await getSession({ req })) as Session | null
  }

  return { prisma, session }
}

export interface subCtx extends ctx {
  connectionParams: {
    session?: Session
  }
}

export const subscriptionCtx = async (subContext: subCtx) => {
  if (subContext.connectionParams?.session) {
    const { session } = subContext.connectionParams
    return { session, prisma, pubsub }
  }
  // Let the resolvers know we don't have a current user so they can
  // throw the appropriate error
  return { session: null, prisma, pubsub }
}

export type SubscriptionCtx = Awaited<ReturnType<typeof subscriptionCtx>>
