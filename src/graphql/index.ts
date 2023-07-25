import { ApolloServer } from "@apollo/server";
import { User } from "./user";
async function createApolloGraphQlServer() {
  const gqlServer = new ApolloServer({
    typeDefs: `
    ${User.typeDefs}
    type Query {
        ${User.queries}
    }
    type Mutation  {
        ${User.mutation}
    }
        `,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
      },
      Mutation: {
        ...User.resolvers.mutation,
      },
    },
  });
  await gqlServer.start();
  return gqlServer;
}

export default createApolloGraphQlServer;
