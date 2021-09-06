const gql = require('graphql-tag')

module.exports = gql`
    type Post {
        id: ID!
        body: String!
        username: String!
        creationDate: String!
    }

    type User {
        id: ID!
        token: String!
        email: String!
        username: String!
        creationDate: String!
    }

    input RegisterInput {
        username: String!
        email: String!
        password: String!
        confirmPassword: String!
    }

    input LoginInput {
        username: String!
        password: String!
    }

    type Query {
        getPost: [Post]
    }

    type Mutation {
        register(registerInput: RegisterInput): User!
        login(loginInput: LoginInput): User!
    }
`