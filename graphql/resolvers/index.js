const { GraphQLUpload } = require('graphql-upload');

const postResolver = require('./posts')
const userResolver = require('./users')

module.exports = {
    Upload: GraphQLUpload,
    // Modifier - React to the changes and automatically update the values
    Post: {
        likesCount: parent => parent.likes.length,
        commentsCount: parent => parent.comments.length,
        // cokoliv: () => 'ahoj'
    },
    Query: {
        ...postResolver.Query,
        ...userResolver.Query
    },
    Mutation: {
        ...userResolver.Mutation,
        ...postResolver.Mutation,
    }
}