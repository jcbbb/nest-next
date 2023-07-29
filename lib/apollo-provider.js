"use client";

import { ApolloLink, createHttpLink, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import {
  NextSSRApolloClient,
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";

export const cache = new NextSSRInMemoryCache()

function makeClient() {
  const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT
  });

  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : "";

  const wsLink = new GraphQLWsLink(createClient({
    url: "ws://localhost:3000/subscriptions",
    connectionParams: {
      authToken: token ? `Bearer ${token}` : ""
    }
  }))

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : ""
      }
    }
  })

  const splitLink = split(
    ({ query }) => {
      const defintion = getMainDefinition(query)
      return (
        defintion.kind === "OperationDefinition" &&
        defintion.operation === "subscription"
      )
    },
    authLink.concat(wsLink),
    authLink.concat(httpLink)
  )

  return new NextSSRApolloClient({
    cache,
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
          new SSRMultipartLink({
            stripDefer: true,
          }),
          httpLink,
        ])
        : splitLink
  });
}

export function ApolloWrapper({ children }) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
