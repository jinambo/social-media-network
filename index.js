const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { graphqlUploadExpress } = require('graphql-upload');

// const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')

// Config
const { MONGODB } = require('./config.js')

// GraphQL typeDefs and resolvers
const resolvers = require('./graphql/resolvers')
const typeDefs = require('./graphql/typeDefs')


async function startServer() {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      introspection: true,
      context: ({ req }) => ({ req })
    });
  
    await server.start();
  
    const app = express();
  
    app.use(graphqlUploadExpress());
    server.applyMiddleware({ app });

    mongoose.connect(MONGODB, {
        useNewUrlParser: true
    }).then(async () => {
        console.log('MongoDB connected')
        await new Promise(r => app.listen({ port: 5000 }, r));
    }).then(res => {
        console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`);
    })
}
  
startServer();


/*
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
}).then(() => {
    console.log('MongoDB connected')
    return server.listen({ port: 5000 })
}).then(res => {
    console.log(`Server running at ${res.url}`)
})
*/