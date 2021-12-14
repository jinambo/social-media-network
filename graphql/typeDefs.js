const gql = require('graphql-tag')

module.exports = gql`
    type Post {
        id: ID!
        content: String!
        username: String!
        creationDate: String!
        comments: [Comment]!
        likes: [Like]!
        likesCount: Int!
        commentsCount: Int!
    }

    type User {
        id: ID!
        token: String!
        email: String!
        username: String!
        biography: String
        creationDate: String!
    }

    type Comment {
        id: ID!
        content: String!
        username: String!
        creationDate: String!
    }

    type Like {
        id: ID!
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
        getPosts: [Post]
        getPost(postId: ID!): Post
        getUsersPosts(username: String!): [Post]
        getUsers: [User]
        getUsersIterate(first: Int!): [User]
        getUser(username: String!): User
    }

    type Mutation {
        register(registerInput: RegisterInput): User!
        login(loginInput: LoginInput): User!
        createPost(content: String!): Post!
        removePost(postId: ID!): String!
        createComment(postId: ID!, content: String!): Post!
        removeComment(postId: ID!, commentId: ID!): Post!
        toggleLike(postId: ID!): Post!
    }
`