import { GraphQLError } from "graphql"
import { Context } from "../../types/context"
import { MutationResolvers, QueryResolvers } from "../../types/graphql"

type Resolvers = {
  Query: Pick<QueryResolvers<Context>, "getUser">
  Mutation: Pick<MutationResolvers<Context>, "createUserName">
}

const resolvers: Resolvers = {
  Query: {},
  Mutation: {
    createUserName: async (_, { username }, ctx) => {
      const { prisma, session } = ctx
      if (!session?.user?.email) throw new GraphQLError("Not authorized")

      try {
        await prisma.user.update({
          where: { email: session.user.email },
          data: {
            username,
          },
        })
      } catch (error) {
        throw new GraphQLError("Failed to create username")
      }

      return "username created"
    },
  },
}

export default resolvers
