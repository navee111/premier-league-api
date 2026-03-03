import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { typeDefs } from './schema.js'
import { resolvers } from './resolvers.js'
import { context } from './context.js'

const app = express()

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers, context })
  await server.start()
  server.applyMiddleware({ app, path: '/graphql' })

  app.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  })
}

startServer()