const typeDefs = `#graphql
    type Query {
        getUser: UserDetails
    }

    type UserDetails {
        id: String
        email: String
        username: String
    }    
`

export default typeDefs
