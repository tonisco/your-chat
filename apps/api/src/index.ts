/* eslint-disable import/first */
import dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.resolve(__dirname, "../../../.env") })

import cors from "cors"
import express from "express"
import { useServer } from "graphql-ws/lib/use/ws"
import http from "http"
import morgan from "morgan"
import { WebSocketServer } from "ws"

import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from "@apollo/server/express4"
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer"
import { makeExecutableSchema } from "@graphql-tools/schema"

import resolvers from "./graphql/resolvers"
import typeDefs from "./graphql/typeDefs"
import { Context, context, subscriptionCtx } from "./utils/context"
import { env } from "./env"

const main = async () => {
  const app = express()

  if (process.env.NODE_ENV !== "production") app.use(morgan("dev"))

  const httpServer = http.createServer(app)

  const schema = makeExecutableSchema({ typeDefs, resolvers })

  const wsServer = new WebSocketServer({
    // This is the `httpServer` we created in a previous step.
    server: httpServer,
    // Pass a different path here if app.use
    // serves expressMiddleware at a different path
    path: "/subscription",
  })

  const serverCleanup = useServer(
    { schema, context: subscriptionCtx },
    wsServer,
  )

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            },
          }
        },
      },
    ],
  })

  await server.start()

  app.use(
    "/",
    cors({ credentials: true, origin: env.CLIENT_URL }),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }): Promise<Context> => context(req),
    }),
  )

  await new Promise<void>((resolve) =>
    // eslint-disable-next-line no-promise-executor-return
    httpServer.listen({ port: env.PORT }, resolve),
  )

  // eslint-disable-next-line no-console
  console.log(`🚀 Server ready at http://localhost:${env.PORT}/`)
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
})
