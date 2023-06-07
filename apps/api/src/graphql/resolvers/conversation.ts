import { GraphQLError } from "graphql"

import { createId } from "@paralleldrive/cuid2"

import { Context } from "../../types/context"
import { MutationResolvers } from "../../types/graphql"

type Resolvers = {
  Mutation: Pick<MutationResolvers<Context>, "createConversation">
}

const resolvers: Resolvers = {
  Mutation: {
    async createConversation(_, { input }, ctx) {
      const { prisma, session } = ctx

      if (!session?.user) throw new GraphQLError("Not authorized")

      //   const { id } = session.user

      const id = ""

      const chatId = createId()

      if (input.length < 2) {
        throw new Error("Not enough users selected")
      }

      // prevent two users making multiple chat with only them in it
      //   if (input.length === 2) {
      //     const multiple = await prisma.conversation.findFirst({
      //       where: {
      //         OR: [
      //           {
      //             adminId: input[0].id,
      //             conversationMembers: { some: { id: input[1].id } },
      //           },
      //           {
      //             adminId: input[1].id,
      //             conversationMembers: { some: { id: input[0].id } },
      //           },
      //         ],
      //         AND: {
      //           conversationMembersNumber: 2,
      //         },
      //       },
      //     })
      //     if (multiple)
      //       throw new GraphQLError("You have chat with this user already")
      //   }

      try {
        await prisma.conversation.create({
          data: {
            conversationMembersNumber: input.length,
            adminId: id,
            latestMessageId: chatId,
            conversationMembers: {
              create: input.map((val) => ({
                hasReadlastMessage: val.id === id,
                unreadMessageNumber: val.id === id ? 0 : 1,
                userId: val.id,
              })),
            },
          },
        })
      } catch (error) {
        throw new GraphQLError("Failed to create Chat")
      }

      return { message: "Chat has been created" }
    },
  },
}

export default resolvers
