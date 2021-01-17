const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    vokabeln: [Vokabel]!
    vokabel(id: ID!): Vokabel!
    favorite(marked: Boolean!): [Vokabel]!
  }
  type Mutation {
    createVokabel(german: String!, korean: String!): Vokabel!
    deleteVokabel(id: ID!): Boolean!
    updateVokabel(id: ID!, german: String!, korean: String!): Vokabel!
    toggleMark(id: ID!, marked: Boolean): Vokabel!
  }
  type Vokabel {
    id: ID!
    german: String!
    korean: String!
    author: String!
    marked: Boolean!
  }
`;

module.exports = typeDefs;
