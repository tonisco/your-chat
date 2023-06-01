import { MutationResolvers, QueryResolvers } from "../../types/graphql"

type Resolvers = {
  Query: Pick<QueryResolvers, "getUser">
  Mutation: Pick<MutationResolvers, "createUserName">
}

const resolvers: Resolvers = {
  Query: {},
  Mutation: {
    createUserName: (_, { username }) => {
      return "username created"
    },
  },
}

export default resolvers
