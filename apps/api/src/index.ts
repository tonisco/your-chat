import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from "@apollo/server/express4"
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer"
import express from "express"
import cors from "cors"
import http from "http"
import typeDefs from "./graphql/typeDefs"
import resolvers from "./graphql/resolvers"

const main = async () => {
  const app = express()

  const httpServer = http.createServer(app)

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  await server.start()

  app.use("/", cors(), express.json(), expressMiddleware(server, {}))

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve),
  )

  console.log(`🚀 Server ready at http://localhost:4000/`)
}

main().catch(console.error)
