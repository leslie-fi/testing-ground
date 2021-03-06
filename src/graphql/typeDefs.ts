import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Comment {
    id: Int!
    post_id: Int!
    body: String!
    author: String
  }

  type User {
    id: Int!
    name: String!
    email: String!
    subscriber: Boolean!
    password: String!
  }

  type Query {
    comments: [Comment!]!
    postComments(post_id: Int!): [Comment!]!
    userById(id: Int!): User
    userByEmail(email: String!): User
    users: [User!]!
    subscribedUsers: [User]!
  }

  input CreateUserInput {
    name: String!
    email: String!
    subscriber: Boolean!
    password: String!
  }

  input CreateCommentInput {
    post_id: Int!
    body: String!
    author: String
  }

  input UpdateUserInput {
    name: String!
    email: String!
    subscriber: Boolean!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User
    updateUser(id: Int!, input: UpdateUserInput!): User
    deleteUser(id: Int!): Boolean
    createComment(input: CreateCommentInput!): Comment
  }
`;

