import { GraphQLError } from "graphql"
import { withFilter } from "graphql-subscriptions"

import { createId } from "@paralleldrive/cuid2"

import {
  Conversation,
  MutationResolvers,
  QueryResolvers,
} from "../../types/graphql"
import { Context, SubscriptionCtx } from "../../utils/context"
import {
  ADDED_TO_CONVERSATION,
  CONVERSATION_CREATED,
  CONVERSATION_UPDATED,
  REMOVE_FROM_CONVERSATION,
} from "../../utils/events"
import { isMember } from "../../utils/functions"

type Members = { id: string; username: string }[]

type AddedToConversationProps = {
  addedToConversation: {
    conversation: Conversation
    members: Members
  }
}

type RemoveConversationProps = {
  removeFromConversation: { conversationId: String; members: Members }
}

type Resolvers = {
  Mutation: Pick<
    MutationResolvers<Context>,
    | "createConversation"
    | "markConversationAsRead"
    | "addNewMembers"
    | "removeMembers"
  >
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

    async markConversationAsRead(_, { conversationId }, ctx) {
      const { prisma, session } = ctx

      if (!session?.user) throw new GraphQLError("Not authorized")

      try {
        // Find conversation
        const conversation = await prisma.conversation.findFirst({
          where: { id: conversationId },
          include: { conversationMembers: { include: { user: true } } },
        })

        if (!conversation) throw new Error("Conversation not found")

        // check if member
        const member = isMember(conversation.conversationMembers, session.user)

        if (!member) throw new Error("Not a member of the conversation")

        const convoMem = conversation.conversationMembers.find(
          (user) => user.userId === session.user.id,
        )

        if (convoMem) {
          await prisma.conversationMember.update({
            where: { id: convoMem.id },
            data: { unreadMessageNumber: 0, hasReadlastMessage: true },
          })
        }
      } catch (error: any) {
        throw new Error(error.message)
      }

      return true
    },

    async addNewMembers(_, { conversationId, members }, ctx) {
      const { prisma, session, pubsub } = ctx

      if (!session?.user) throw new GraphQLError("Not authorized")
      try {
        const conversation = await prisma.conversation.findFirst({
          where: { id: conversationId },
          include: { conversationMembers: { include: { user: true } } },
        })

        if (!conversation) throw new GraphQLError("Conversation does not exist")

        const member = isMember(conversation.conversationMembers, session.user)

        if (!member) throw new GraphQLError("Not a member of the application")

        const newUsers = members.map((membe) => membe.username).join(", ")

        const updatedConversation = await prisma.conversation.update({
          where: { id: conversationId },
          data: {
            conversationMembers: {
              createMany: {
                data: members.map((user) => ({
                  hasReadlastMessage: false,
                  unreadMessageNumber: 1,
                  userId: user.id,
                })),
              },
            },
            latestMessage: {
              create: {
                body: `added ${newUsers} to chat`,
                type: "bot",
                conversation: {
                  connect: { id: conversationId },
                },
                sender: {
                  connect: { id: session.user.id },
                },
              },
            },
          },
          include: {
            conversationMembers: { include: { user: true } },
            latestMessage: { include: { sender: true } },
          },
        })

        const conversationToSend = updatedConversation

        const addedProps: AddedToConversationProps = {
          addedToConversation: {
            conversation: conversationToSend,
            members,
          },
        }

        await pubsub.publish(ADDED_TO_CONVERSATION, addedProps)
        await pubsub.publish(CONVERSATION_UPDATED, {
          conversationUpdated: conversationToSend,
        })
      } catch (error: any) {
        throw new GraphQLError(error?.message)
      }

      const message =
        members.length > 1
          ? "Users have been added to chat"
          : "User has been added to chat"

      return { message }
    },

    async removeMembers(_, { conversationId, members }, ctx) {
      const { prisma, session, pubsub } = ctx

      if (!session?.user) throw new GraphQLError("Not authorized")

      try {
        const conversation = await prisma.conversation.findFirst({
          where: { id: conversationId },
          include: { conversationMembers: { include: { user: true } } },
        })

        if (!conversation) throw new GraphQLError("Conversation does not exist")

        const member = isMember(conversation.conversationMembers, session.user)

        if (!member) throw new GraphQLError("Not a member of the application")

        const newUsers = members.map((membe) => membe.username).join(", ")
        const membersIds = members.map((mem) => mem.id)

        await prisma.conversationMember.deleteMany({
          where: { userId: { in: membersIds }, conversationId },
        })

        const updatedConversation = await prisma.conversation.update({
          where: { id: conversationId },
          data: {
            latestMessage: {
              create: {
                body: `removed ${newUsers} from chat`,
                type: "bot",
                conversation: {
                  connect: { id: conversationId },
                },
                sender: {
                  connect: { id: session.user.id },
                },
              },
            },
          },
          include: {
            conversationMembers: { include: { user: true } },
            latestMessage: { include: { sender: true } },
          },
        })

        const conversationUpdated: Conversation = updatedConversation

        await pubsub.publish(CONVERSATION_UPDATED, {
          conversationUpdated,
        })
      } catch (error: any) {
        throw new GraphQLError(error?.message)
      }

      return true
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
    addedToConversation: {
      subscribe: withFilter(
        (_, args, ctx: SubscriptionCtx) =>
          ctx.pubsub.asyncIterator(ADDED_TO_CONVERSATION),
        (
          { addedToConversation: { members } }: AddedToConversationProps,
          _,
          ctx: SubscriptionCtx,
        ) => {
          const { session } = ctx

          if (!session?.user) throw new GraphQLError("Not authorized")

          return members.some((member) => member.id === session.user.id)
        },
      ),
    },
    removeFromConversation: {
      subscribe: withFilter(
        (_, args, ctx: SubscriptionCtx) =>
          ctx.pubsub.asyncIterator(REMOVE_FROM_CONVERSATION),
        (
          { removeFromConversation: { members } }: RemoveConversationProps,
          _,
          ctx: SubscriptionCtx,
        ) => {
          const { session } = ctx

          if (!session?.user) throw new GraphQLError("Not authorized")

          return members.some((member) => member.id === session.user.id)
        },
      ),
    },
  },
}

export default resolvers
