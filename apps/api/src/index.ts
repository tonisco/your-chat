import dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.resolve(__dirname, "../../../.env") })

import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from "@apollo/server/express4"
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer"
import express from "express"
import morgan from "morgan"
import cors from "cors"
import http from "http"
import typeDefs from "./graphql/typeDefs"
import resolvers from "./graphql/resolvers"
import { Context } from "./types/context"
import { env } from "./env"
import context from "./utils/context"

const main = async () => {
  const app = express()

  if (process.env.NODE_ENV !== "production") app.use(morgan("dev"))

  const httpServer = http.createServer(app)

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
      context: async ({ req }): Promise<Context> => await context(req),
    }),
  )

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: env.PORT }, resolve),
  )

  console.log(`🚀 Server ready at http://localhost:${env.PORT}/`)
}

main().catch(console.error)
