import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import createApolloGraphQlServer from "./graphql";
import dotenv from 'dotenv'
async function init() {
  dotenv.config({})
  const app = express();
  const PORT = 8000 || process.env.PORT;
  app.use(express.json());
  app.use("/graphql", expressMiddleware(await createApolloGraphQlServer()));

  app.listen(PORT, () => {
    console.log("Server listen on port 8000");
  });
}
init();
