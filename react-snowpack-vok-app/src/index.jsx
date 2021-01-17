import React from "react";
import ReactDOM from "react-dom";
import Route from "./Route.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const uri = "https://merng-vokabel-app.herokuapp.com/graphql";
const cache = new InMemoryCache();
const client = new ApolloClient({
  uri,
  cache,
});
ReactDOM.render(
  <ApolloProvider client={client}>
    <ChakraProvider>
      <Route />
    </ChakraProvider>
  </ApolloProvider>,
  document.getElementById("root")
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
// if (import.meta.hot) {
//   import.meta.hot.accept();
// }
