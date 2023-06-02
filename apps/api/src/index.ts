import dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.resolve(__dirname, "../../../.env") })

import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from "@apollo/server/express4"
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer"
import express from "express"
import cors from "cors"
import http from "http"
import typeDefs from "./graphql/typeDefs"
import resolvers from "./graphql/resolvers"
import { PrismaClient } from "@prisma/client"
import { Context } from "./types/context"
import { getSession } from "next-auth/react"
import { env } from "./env"

const main = async () => {
  const app = express()

  const httpServer = http.createServer(app)

  console.log(process.env.NEXTAUTH_URL)

  const prisma = new PrismaClient()

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  await server.start()

  app.use(
    "/",
    cors({ credentials: true, origin: env.CLIENT_URL }),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }): Promise<Context> => {
        const session = await getSession({ req })

        return { prisma, session }
      },
    }),
  )

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: env.PORT }, resolve),
  )

  console.log(`🚀 Server ready at http://localhost:${env.PORT}/`)
}

main().catch(console.error)
