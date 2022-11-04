import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from '@apollo/client'
// import { ApolloProvider } from '@apollo/react-hooks'
import ErrorPage from "./error-page";
import Person from "./routes/person";
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphQLErrors, networkError }) => { 
  if (graphQLErrors) 
    graphQLErrors.map(({ message, locations, path }) => 
      alert(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)); 
  if (networkError) alert(`[Network error]: ${networkError}`);  
});

const link = from([
  errorLink, 
  new HttpLink({ uri: "http://localhost:4000/graphql" })
])

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
})



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
   children: [
      {
        path: "person/:personId",
        element: <Person />,
      },
    ],
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
        <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);