import { MutationResolvers, QueryResolvers } from "../../types/graphql"

type Resolvers = {
  Query: Pick<QueryResolvers, "getUser" | "deleteUser">
  Mutation: Pick<MutationResolvers, "editUser">
}

const resolvers: Resolvers = {
  Query: {
    getUser: () => ({ id: "1", email: "test@mail.com", username: "test" }),
    deleteUser: () => true,
  },
  Mutation: {
    editUser: () => "yes",
  },
}

export default resolvers
