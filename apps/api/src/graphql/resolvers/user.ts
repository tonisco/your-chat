import { GraphQLError } from "graphql"

import { Context } from "../../types/context"
import { MutationResolvers, QueryResolvers } from "../../types/graphql"
import { createToken } from "../../utils/jwt"

type Resolvers = {
  Query: Pick<QueryResolvers<Context>, "findUsers">
  Mutation: Pick<MutationResolvers<Context>, "createUsername" | "loginUser">
}

const resolvers: Resolvers = {
  Query: {
    findUsers: async (_, { username }, ctx) => {
      const { prisma, session } = ctx

      if (!session?.user) throw new GraphQLError("Not authorized")

      try {
        const users = await prisma.user.findMany({
          where: {
            username: {
              contains: username,
              mode: "insensitive",
            },
            NOT: {
              name: session.user.name,
            },
          },
          select: { id: true, username: true, image: true },
        })

        return users
      } catch (error) {
        throw new GraphQLError("Failed to find users")
      }
    },
  },
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

    loginUser: async (_, data, ctx) => {
      const { email, image, name, username } = data
      const { prisma } = ctx

      const user = await prisma.user.findUnique({ where: { email } })

      if (user) {
        const token = createToken(user.id)
        return { ...user, token }
      }

      try {
        const newUser = await prisma.user.create({
          data: { email, image, name, username },
        })
        const token = createToken(newUser.id)

        return { ...newUser, token }
      } catch (error) {
        throw new GraphQLError("Failed to create account")
      }
    },
  },
}

export default resolvers
