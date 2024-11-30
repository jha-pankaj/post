// schema.js
const { gql } = require('apollo-server-express');


const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post]
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    user: User!
    likes: Int
    dislikes: Int
    comments: [Comment],
    createdAt:String!
  }

  type Comment {
    id: ID!
    content: String!
    post: Post!
    user: User!
    createdAt:String!
  }

  type Query {
    users: [User]
    posts: [Post]
    post(id: ID!): Post
    userByEmail(email: String!): User
  }

  type Mutation {
    addUser(name: String!, email: String!): User
    addPost(title: String!, content: String!, userId: ID!): Post
    addComment(content: String!, postId: ID!, userId: ID!): Comment
    likePost(postId: ID!): Post
    dislikePost(postId: ID!): Post
  }
`;

module.exports = typeDefs;
