import { GraphQLError } from "graphql"
import { withFilter } from "graphql-subscriptions"

import {
  Conversation,
  Message,
  MutationResolvers,
  QueryResolvers,
  SubMessageReturn,
} from "../../types/graphql"
import { Context, SubscriptionCtx } from "../../utils/context"
import {
  CONVERSATION_UPDATED,
  MESSAGE_DELETED,
  MESSAGE_EDITED,
  MESSAGE_SENT,
} from "../../utils/events"
import { isMember } from "../../utils/functions"

type ResolverType = {
  Query: Pick<QueryResolvers<Context>, "messages">
  Mutation: Pick<
    MutationResolvers<Context>,
    "sendMessage" | "editMessage" | "deleteMessage"
  >
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

      const { body, conversationId } = args

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
          include: {
            conversationMembers: { include: { user: true } },
            latestMessage: { include: { sender: true } },
          },
        })

        const messageSent: Message = newMessage

        const conversationUpdated: Conversation = conversation

        await pubsub.publish(MESSAGE_SENT, { messageSent })
        await pubsub.publish(CONVERSATION_UPDATED, { conversationUpdated })
      } catch (error: any) {
        throw new GraphQLError(error?.message)
      }

      return true
    },
    editMessage: async (_, args, ctx) => {
      const { prisma, pubsub, session } = ctx
      const { body, conversationId, messageId } = args

      if (!session?.user) throw new GraphQLError("Not authorized")
      try {
        const isAuthor = await prisma.message.findFirst({
          where: { senderId: session.user.id, conversationId, id: messageId },
        })

        if (!isAuthor) throw new GraphQLError("Not the author")

        const message = await prisma.message.update({
          where: { id: messageId },
          data: { body },
          include: { sender: true },
        })

        const members = await prisma.conversationMember.findMany({
          where: { conversationId },
          include: { user: true },
        })

        const editedMessage: SubMessageReturn = {
          conversationId,
          changeMessage: message,
          members,
        }

        await pubsub.publish(MESSAGE_EDITED, editedMessage)
      } catch (error: any) {
        throw new GraphQLError(error?.message)
      }

      return true
    },
    deleteMessage: async (_, args, ctx) => {
      const { prisma, session, pubsub } = ctx
      const { messageId, conversationId } = args

      if (!session?.user) throw new GraphQLError("Not authorized")

      try {
        const isAuthor = await prisma.message.findFirst({
          where: { senderId: session.user.id, conversationId, id: messageId },
        })

        if (!isAuthor) throw new GraphQLError("Not the author")

        const message = await prisma.message.update({
          where: { id: messageId },
          data: { body: "This message was deleted", isDeleted: true },
          include: { sender: true },
        })

        const members = await prisma.conversationMember.findMany({
          where: { conversationId },
          include: { user: true },
        })

        const deletedMessage: SubMessageReturn = {
          conversationId,
          changeMessage: message,
          members,
        }

        await pubsub.publish(MESSAGE_DELETED, deletedMessage)
      } catch (error: any) {
        throw new GraphQLError(error?.message)
      }

      return true
    },
  },
  Subscription: {
    messageSent: {
      subscribe: withFilter(
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
    editedMessage: {
      subscribe: withFilter(
        (_, args, ctx: SubscriptionCtx) =>
          ctx.pubsub.asyncIterator([MESSAGE_EDITED]),
        (payload: SubMessageReturn, args, ctx: SubscriptionCtx) => {
          const { session } = ctx

          if (!session?.user) throw new GraphQLError("Not authorized")

          return isMember(payload.members, session.user)
        },
      ),
    },
    deletedMessage: {
      subscribe: withFilter(
        (_, args, ctx: SubscriptionCtx) =>
          ctx.pubsub.asyncIterator([MESSAGE_DELETED]),
        (payload: SubMessageReturn, args, ctx: SubscriptionCtx) => {
          const { session } = ctx

          if (!session?.user) throw new GraphQLError("Not authorized")

          return isMember(payload.members, session.user)
        },
      ),
    },
  },
}

export default resolver
