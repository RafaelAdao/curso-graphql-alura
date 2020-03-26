import axios from 'axios'
import ApolloClient from 'apollo-boost'

export const baseURL = 'http://localhost:4000'

export const api = axios.create({
  baseURL: 'http://localhost:3333',
  timeout: 10000,
  headers: {
    'content-type': 'application/json',
  }
})

export const opcoesFetch = (query) => ({
  method: 'post',
  headers: {
    'content-type': 'application/json',
  },
  body: JSON.stringify({
    query
  })
})

export const apolloClient = new ApolloClient({
  uri: baseURL,
  
})