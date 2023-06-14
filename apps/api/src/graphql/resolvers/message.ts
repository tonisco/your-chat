import { GraphQLError } from "graphql"

import { QueryResolvers } from "../../types/graphql"
import { Context } from "../../utils/context"

type ResolverType = {
  Query: Pick<QueryResolvers<Context>, "messages">
}
const resolver: ResolverType = {
  Query: {
    messages: async (_, { conversationId }, ctx) => {
      const { prisma, session } = ctx

      if (!session?.user) throw new GraphQLError("Not authorized")

      const allMessages = await prisma.message.findMany({
        where: { conversationId },
        include: { sender: true },
      })

      return allMessages
    },
  },
}

export default resolver
