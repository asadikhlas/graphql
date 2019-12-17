const http = require('http')
const cors = require('cors')
const express = require('express')
const {ApolloServer} = require('apollo-server-express')
const mongoose = require('mongoose')
const {mergeResolvers, mergeTypes} = require('merge-graphql-schemas')
require('dotenv').config()

const app = express()
const httpServer = http.createServer(app)

app.models = {}
app.graphql = {}
app.graphql.typeDefs = []
app.graphql.resolvers = []

require('./config')(app)
require('./db')(app, mongoose)
require('./models')(app, mongoose)
require('./modules')(app, mongoose)

const typeDefs = app.graphql.typeDefs;
const resolvers = app.graphql.resolvers;

const GqlServer = new ApolloServer({
    playground: process.env.NODE_ENV === 'production' ? false : true,
    typeDefs: mergeTypes(typeDefs),
    resolvers: mergeResolvers(resolvers)
})

app.use(cors())
GqlServer.applyMiddleware({app})

const PORT = process.env.PORT || 3001
httpServer.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
})