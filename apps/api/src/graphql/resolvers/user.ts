import { GraphQLError } from "graphql"
import { Context } from "../../types/context"
import { MutationResolvers, QueryResolvers } from "../../types/graphql"

type Resolvers = {
  Query: Pick<QueryResolvers<Context>, "getUser">
  Mutation: Pick<MutationResolvers<Context>, "createUsername">
}

const resolvers: Resolvers = {
  Query: {},
  Mutation: {
    createUsername: async (_, { username }, ctx) => {
      const { prisma, session } = ctx
      if (!session?.user?.email) throw new GraphQLError("Not authorized")

      try {
        await prisma.user.update({
          where: { email: session.user.email },
          data: {
            username: username.toLocaleLowerCase(),
          },
        })
      } catch (error) {
        throw new GraphQLError("Failed to create username")
      }

      return { message: "username created" }
    },
  },
}

export default resolvers
