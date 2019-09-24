import React from 'react'
import ReactDOM from 'react-dom'
import { HelmetProvider } from 'react-helmet-async'

import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-client'
import { ApolloLink, split } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { onError } from 'apollo-link-error'

import App from './App'

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    // authorization: token ? `Bearer ${token}` : '',
    'x-hasura-admin-secret': 'Z@n@h0r1@',
  },
}))

const httpLink = new HttpLink({
  uri: 'https://my-task-tracking.herokuapp.com/v1/graphql',
  credentials: 'same-origin',
})

const wsLink = new WebSocketLink({
  uri: 'wss://my-task-tracking.herokuapp.com/v1/graphql',
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        'x-hasura-admin-secret': 'Z@n@h0r1@',
      },
    },
  },
})

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition'
      && definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
)

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) => console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ));
      }
      if (networkError) console.log(`[Network error]: ${networkError}`)
      if (networkError?.result?.code === 'invalid_token') {
        console.log(`[InvalidToken error]: ${networkError}`)
        window.localStorage.removeItem('token')
        window.location.href = '/'
      }
    }),
    authLink,
    link,
  ]),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </ApolloProvider>,
  document.getElementById('app'),
)
