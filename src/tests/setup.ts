import { ApolloServer } from "@apollo/server";
import { unwrapResolverError } from "@apollo/server/errors";
import { expressMiddleware } from "@as-integrations/express5";
import request from "supertest";

import app from "../app";
import { createContext } from "../graphql/context";
import { resolvers } from "../graphql/resolvers";
import { typeDefs } from "../graphql/typeDefs";
import { AppError } from "../utils/errors";

let serverStarted = false;
let testAgent: ReturnType<typeof request>;

const ensureServerStarted = async () => {
  if (serverStarted) {
    return;
  }

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError(formattedError, error) {
      const originalError = unwrapResolverError(error);

      if (originalError instanceof AppError) {
        return {
          ...formattedError,
          extensions: {
            ...formattedError.extensions,
            code: originalError.code,
            statusCode: originalError.statusCode,
          },
        };
      }

      return formattedError;
    },
  });

  await server.start();
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: createContext,
    })
  );

  testAgent = request(app);
  serverStarted = true;
};

export const graphqlRequest = async (
  query: string,
  token?: string
) => {
  await ensureServerStarted();

  return testAgent
    .post("/graphql")
    .set("Content-Type", "application/json")
    .set("Authorization", token ? `Bearer ${token}` : "")
    .send({ query });
};