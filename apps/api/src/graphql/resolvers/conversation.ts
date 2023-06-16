import { GraphQLError } from "graphql"
import { withFilter } from "graphql-subscriptions"

import { createId } from "@paralleldrive/cuid2"

import {
  Conversation,
  MutationResolvers,
  QueryResolvers,
} from "../../types/graphql"
import { Context, SubscriptionCtx } from "../../utils/context"
import { CONVERSATION_CREATED, CONVERSATION_UPDATED } from "../../utils/events"
import { isMember } from "../../utils/functions"

type Resolvers = {
  Mutation: Pick<MutationResolvers<Context>, "createConversation">
  Query: Pick<QueryResolvers<Context>, "conversations">
  // Subscription: Pick<
  //   SubscriptionResolvers<SubscriptionCtx>,
  //   "conversationCreated"
  // >
  Subscription: any
}

const resolvers: Resolvers = {
  Query: {
    async conversations(_, arg, ctx) {
      const { prisma, session } = ctx

      if (!session?.user) throw new GraphQLError("Not authorized")
      try {
        const allConversations = await prisma.conversation.findMany({
          where: { conversationMembers: { some: { userId: session.user.id } } },
          include: {
            conversationMembers: { include: { user: true } },
            latestMessage: { include: { sender: true } },
          },
          orderBy: { updatedAt: "desc" },
        })

        return allConversations
      } catch (error) {
        throw new GraphQLError("Failed to find all conversations")
      }
    },
  },
  Mutation: {
    async createConversation(_, { input }, ctx) {
      const { prisma, session, pubsub } = ctx

      if (!session?.user) throw new GraphQLError("Not authorized")

      const { id } = session.user

      const chatId = createId()

      if (input.length < 2) {
        throw new Error("Not enough users selected")
      }

      // prevent two users making multiple chat with only them in it
      if (input.length === 2) {
        const multiple = await prisma.conversation.findFirst({
          where: {
            OR: [
              {
                adminId: input[0].id,
                conversationMembers: { some: { userId: input[1].id } },
              },
              {
                adminId: input[1].id,
                conversationMembers: { some: { userId: input[0].id } },
              },
            ],
            AND: {
              conversationMembersNumber: 2,
            },
          },
        })
        if (multiple)
          throw new GraphQLError("You have chat with this user already")
      }
      let createdConversation

      try {
        createdConversation = await prisma.$transaction(async (prim) => {
          const newConversation = await prim.conversation.create({
            data: {
              conversationMembersNumber: input.length,
              adminId: id,
              conversationMembers: {
                createMany: {
                  data: input.map((val) => ({
                    hasReadlastMessage: val.id === id,
                    unreadMessageNumber: val.id === id ? 0 : 1,
                    userId: val.id,
                  })),
                },
              },
            },
          })

          await prim.message.create({
            data: {
              body: "created chat",
              type: "bot",
              id: chatId,
              conversationId: newConversation.id,
              senderId: id,
              isLatest: { connect: { id: newConversation.id } },
            },
          })
          return newConversation
        })
      } catch (error) {
        throw new GraphQLError("Failed to create Chat")
      }

      // fetched to so as to get latest message
      const conversation: Conversation | null =
        await prisma.conversation.findUnique({
          where: { id: createdConversation.id },
          include: {
            conversationMembers: { include: { user: true } },
            latestMessage: { include: { sender: true } },
          },
        })

      if (conversation) {
        await pubsub.publish(CONVERSATION_CREATED, {
          conversationCreated: conversation,
        })
      }

      return { message: "Chat created", conversationId: conversation?.id }
    },
  },
  Subscription: {
    conversationCreated: {
      subscribe: withFilter(
        (_, args, ctx: SubscriptionCtx) =>
          ctx.pubsub.asyncIterator([CONVERSATION_CREATED]),
        (
          val: { conversationCreated: Conversation },
          args,
          ctx: SubscriptionCtx,
        ) => {
          const { session } = ctx

          if (!session) throw new GraphQLError("Not authorized")

          return isMember(
            val.conversationCreated.conversationMembers,
            session.user,
          )
        },
      ),
    },
    conversationUpdated: {
      subscribe: withFilter(
        (_, args, ctx: SubscriptionCtx) =>
          ctx.pubsub.asyncIterator(CONVERSATION_UPDATED),
        (
          { conversationUpdated }: { conversationUpdated: Conversation },
          _,
          { session }: SubscriptionCtx,
        ) => {
          if (!session?.user) throw new GraphQLError("Not authorized")

          return isMember(conversationUpdated.conversationMembers, session.user)
        },
      ),
    },
  },
}

export default resolvers
