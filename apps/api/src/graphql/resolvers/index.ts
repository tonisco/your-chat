import merge from "lodash.merge"

import conversationResolver from "./conversation"
import messageResolver from "./message"
import userResolver from "./user"

const resolvers = merge({}, userResolver, conversationResolver, messageResolver)

export default resolvers
