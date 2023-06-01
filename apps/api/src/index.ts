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

const main = async () => {
  const app = express()

  const httpServer = http.createServer(app)

  const prisma = new PrismaClient()

  // const schema = new executableS()

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  await server.start()

  app.use(
    "/",
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }): Promise<Context> => {
        const session = await getSession({ req })
        return { prisma, session }
      },
    }),
  )

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve),
  )

  console.log(`🚀 Server ready at http://localhost:4000/`)
}

main().catch(console.error)
