const resolvers = {
  Query: {
    getUser: () => ({ id: "1", email: "test@mail.com", username: "test" }),
  },
}

export default resolvers
