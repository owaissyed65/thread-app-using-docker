import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import createApolloGraphQlServer from "./graphql";
import dotenv from "dotenv";
import UserService from "./service/userService";
async function init() {
  dotenv.config({});
  const app = express();
  const PORT = 8000 || process.env.PORT;
  app.use(express.json());
  app.use(
    "/graphql",
    expressMiddleware(await createApolloGraphQlServer(), {
      // @ts-ignore
      context: async ({ req }) => {
        const token = req.headers["token"];
        try {
          const user = UserService.decodeJWTToken(token as string);
          return { user };
        } catch (err) {
          return {};
        }
      },
    })
  );

  app.listen(PORT, () => {
    console.log("Server listen on port 8000");
  });
}
init();
