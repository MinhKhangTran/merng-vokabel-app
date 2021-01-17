const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./graphql/schema");
const { Query } = require("./graphql/resolvers/query");
const { Mutation } = require("./graphql/resolvers/mutation");
const mongoose = require("mongoose");
const model = require("./models");
require("dotenv").config();

const app = express();

const port = process.env.PORT;

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation
  },
  context: async () => {
    return { model };
  }
});

server.applyMiddleware({ app });

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen({ port }, () =>
      console.log(`server is listening at http://localhost:${port}`)
    );
  })
  .catch((err) => console.log(err));
