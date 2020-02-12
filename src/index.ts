import "reflect-metadata";
import { ApolloServer, gql } from "apollo-server";
import { createConnection } from "typeorm";

const main = async () => {
  try {
    const connection = await createConnection();

    // The GraphQL schema
    const typeDefs = gql`
      type Query {
        "A simple type for getting started!"
        hello: String
      }
    `;

    // A map of functions which return data for the schema.
    const resolvers = {
      Query: {
        hello: () => "world",
      },
    };

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: {
        connection,
      },
    });

    server.listen().then(({ url }) => {
      console.log(`🚀 Server ready at ${url}`);
    });
  } catch (e) {
    console.error(e);
  }
};

main();
