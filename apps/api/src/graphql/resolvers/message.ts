import { GraphQLError } from "graphql"

import { MutationResolvers, QueryResolvers } from "../../types/graphql"
import { Context } from "../../utils/context"
import { isMember } from "../../utils/functions"

type ResolverType = {
  Query: Pick<QueryResolvers<Context>, "messages">
  Mutation: Pick<MutationResolvers<Context>, "sendMessage">
}
const resolver: ResolverType = {
  Query: {
    messages: async (_, { conversationId }, ctx) => {
      const { prisma, session } = ctx

      if (!session?.user) throw new GraphQLError("Not authorized")

      try {
        // check if the conversation exist
        const exist = await prisma.conversation.findFirst({
          where: { id: conversationId },
          include: { conversationMembers: { include: { user: true } } },
        })

        if (!exist) throw new GraphQLError("Conversation was not found")

        // check if user is a member
        const checkMember = isMember(exist.conversationMembers, session.user)

        if (!checkMember)
          throw new GraphQLError(
            "You are not allowed to send message to this conversation",
          )

        const allMessages = await prisma.message.findMany({
          where: { conversationId },
          include: { sender: true },
          orderBy: { updatedAt: "desc" },
        })

        return allMessages
      } catch (error: any) {
        throw new GraphQLError(error?.message)
      }
    },
  },
  Mutation: {
    sendMessage: async (_, args, ctx) => {
      const { prisma, session } = ctx

      if (!session?.user) throw new GraphQLError("Not authorized")

      const {
        input: { body, conversationId },
      } = args

      try {
        //  check if conversation exist
        const exist = await prisma.conversation.findFirst({
          where: { id: conversationId },
          include: { conversationMembers: { include: { user: true } } },
        })

        if (!exist) throw new GraphQLError("Conversation does not exist")

        // check if user is a member
        const checkMember = isMember(exist.conversationMembers, session.user)

        if (!checkMember)
          throw new GraphQLError(
            "You are not allowed to send message to this conversation",
          )

        const newMessage = await prisma.message.create({
          data: {
            body,
            type: "user",
            conversationId,
            senderId: session.user.id,
          },
        })

        await prisma.conversation.update({
          where: { id: conversationId },
          data: {
            latestMessageId: newMessage.id,
            conversationMembers: {
              updateMany: {
                where: { NOT: { userId: session.user.id } },
                data: {
                  hasReadlastMessage: false,
                  unreadMessageNumber: { increment: 1 },
                },
              },
            },
          },
        })
      } catch (error: any) {
        throw new GraphQLError(error?.message)
      }

      return true
    },
  },
}

export default resolver
