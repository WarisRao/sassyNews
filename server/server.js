import express from 'express';
const { ApolloServer, gql } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schema');
import {seedCache,} from './dataApi';
import  model from './Models';

export const app = express();

app.get('/', (req, res) => res.send('Hi World!'));

const delay = 2000;
setImmediate(()=>{
  seedCache();
},delay);


export const server = new ApolloServer({

  typeDefs,
  resolvers,
  context: {
    Feed:model.Feed,
    NewsItem:model.NewsItem,
    Comment:model.Comment,
    User:model.User
  }
});

server.applyMiddleware({ app }); 

