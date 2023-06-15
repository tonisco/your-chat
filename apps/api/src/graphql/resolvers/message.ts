import { GraphQLError } from "graphql"
import { withFilter } from "graphql-subscriptions"

import {
  Conversation,
  Message,
  MutationResolvers,
  QueryResolvers,
} from "../../types/graphql"
import { Context, SubscriptionCtx } from "../../utils/context"
import { CONVERSATION_UPDATED, MESSAGE_SENT } from "../../utils/events"
import { isMember } from "../../utils/functions"

type ResolverType = {
  Query: Pick<QueryResolvers<Context>, "messages">
  Mutation: Pick<MutationResolvers<Context>, "sendMessage">
  Subscription: any
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
      const { prisma, session, pubsub } = ctx

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
          include: { sender: true },
        })

        const conversation = await prisma.conversation.update({
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
          include: { conversationMembers: { include: { user: true } } },
        })

        const messageSent: Message = newMessage

        const conversationUpdated: Conversation = conversation

        pubsub.publish(MESSAGE_SENT, { messageSent })
        pubsub.publish(CONVERSATION_UPDATED, { conversationUpdated })
      } catch (error: any) {
        throw new GraphQLError(error?.message)
      }

      return true
    },
  },
  Subscription: {
    messageSent: withFilter(
      (_, args, ctx: SubscriptionCtx) =>
        ctx.pubsub.asyncIterator([MESSAGE_SENT]),
      (
        payload: { messageSent: Message },
        args: { conversationId: string },
        ctx: SubscriptionCtx,
      ) => {
        const { session } = ctx

        if (!session?.user) throw new GraphQLError("Not authorized")

        return payload.messageSent.conversationId === args.conversationId
      },
    ),
  },
}

export default resolver
