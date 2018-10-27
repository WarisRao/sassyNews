const { gql } = require('apollo-server-express');
import {
    GraphQLScalarType,
  } from 'graphql';

export const typeDefs = gql`

  type Comment {
    id: Int!
    creationTime: Date!
    comments: [Comment]!
    parent: Int!
    submitterId: String!
    text: String
    upvoted: Boolean!
    author: User
  }

  scalar Date

  enum FeedType {
    TOP
    NEW
    SHOW
    ASK
    JOB
  }
  
  type NewsItem {
    id: Int!
    comments: [Comment]!
    commentCount: Int!
    creationTime: Date!
    hides: [String]!
    hidden: Boolean!
    submitterId: String!
    title: String!
    text: String
    upvoted: Boolean!
    upvotes: [String]!
    upvoteCount: Int!
    url: String
    author: User
  }

  type User {
    id: String!
    about: String
    creationTime: Date!
    dateOfBirth: Date
    email: String
    favorites: [Int]
    firstName: String
    hides: [Int]!
    karma: Int!
    lastName: String
    likes: [Int]!
    posts: [Int]!
  }

  type Query {

    comment(id: Int!): Comment

    feed(
      type: FeedType!,
      first: Int
      skip: Int,    
    ): [NewsItem]

    me: User

    newsItem(id: Int!): NewsItem

    user(id: String!): User
  }

  type Mutation {
    upvoteNewsItem (
      id: Int!
    ): NewsItem

    hideNewsItem (
      id: Int!
    ): NewsItem

    submitNewsItem (
      title: String!
      url: String
      text: String
    ): NewsItem
  }

`;

export const resolvers = {
    
    Query: {
      comment: (_, { id }, context) => context.Comment.getComment(id),
  
      feed(root, { type, first, skip }, context) {
        const limit = (first < 1 || first > 30) ? 30 : first;
        return context.Feed.getForType(type, limit, skip);
      },
  
      me: (_, __, context) => {
        logger('Me: userId:', context.userId);
        return context.userId && context.User.getUser(context.userId);
      },
  
      newsItem: (_, { id }, context) => context.NewsItem.getNewsItem(id),
  
      user: (_, { id }, context) => context.User.getUser(id),
    },
  
    Comment: {
      author: (comment, _, context) => context.User.getUser(comment.submitterId),
      comments: (comment, _, context) => context.Comment.getComments(comment.comments),
      upvoted: (comment, _, context) => comment.upvotes.includes(context.userId),
    },
  
    Date: new GraphQLScalarType({
      name: 'Date',
      description: 'UTC number of milliseconds since midnight Jan 1 1970 as in JS date',
      parseValue(value) {
        return new Date(value).valueOf();
      },
      serialize(value) {
        if (value instanceof Date) return value.valueOf();
        return value;
      },
      parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
          return parseInt(ast.value, 10);
        }
        return null;
      },
    }),
  
    NewsItem: {
      author: (newsItem, _, context) => context.User.getUser(newsItem.submitterId),
      comments: (newsItem, _, context) => context.Comment.getComments(newsItem.comments),
      hidden: (newsItem, _, context) => newsItem.hides.includes(context.userId),
      upvoted: (newsItem, _, context) => newsItem.upvotes.includes(context.userId),
    },
  
    User: {
      posts: (user, _, context) => context.User.getPostsForUser(user.id),
    },
  };