const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')

// Config
const { MONGODB } = require('./config.js')

// GraphQL typeDefs and resolvers
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    introspection: true,
    context: ({ req }) => ({ req })
})

mongoose.connect(MONGODB, {
    useNewUrlParser: true
}).then(() => {
    console.log('MongoDB connected')
    return server.listen({ port: 5000 })
}).then(res => {
    console.log(`Server running at ${res.url}`)
})

