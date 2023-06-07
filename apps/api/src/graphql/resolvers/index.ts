import merge from "lodash.merge"

import conversationResolver from "./conversation"
import userResolver from "./user"

const resolvers = merge({}, userResolver, conversationResolver)

export default resolvers
