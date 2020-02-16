import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { createConnection, Connection } from "typeorm";
import { importSchema } from "graphql-import";
import {
  QueryResolvers,
  MutationResolvers,
  Resolvers,
} from "./generated/graphql_types";
import { User } from "./entity/User";
import { Post } from "./entity/Post";

type Context = {
  connection: Connection;
};

const main = async () => {
  try {
    const connection = await createConnection();

    const Query: QueryResolvers<Context> = {
      user: async (_parent, { id }, { connection }, _info) => {
        const user = await connection
          .getRepository(User)
          .findOne(id, { relations: ["posts "] });

        return user || null;
      },
      users: async (_parent, _args, { connection }, _info) => {
        const users = await connection
          .getRepository(User)
          .find({ relations: ["posts"] });

        return users || [];
      },
      post: async (_parent, { id }, { connection }, _info) => {
        const post = await connection
          .getRepository(Post)
          .findOne(id, { relations: ["user"] });

        return post;
      },
      posts: async (_parent, _args, { connection }, _info) => {
        const posts = await connection
          .getRepository(Post)
          .find({ relations: ["user"] });

        return posts || [];
      },
    };

    const Mutation: MutationResolvers<Context> = {
      addUser: async (_parent, args, { connection }, _info) => {
        const repository = connection.getRepository(User);

        const newUser = repository.create(args);

        const user = await repository.save(newUser);
        return user || null;
      },
      deleteUser: async (_parent, { id }, { connection }, _info) => {
        const repository = await connection.getRepository(User);

        const user = repository.findOne({ id });
        await repository.delete({ id });

        return user;
      },
    };

    const typeDefs = await importSchema("graphql/schema.graphql");
    const resolvers: Resolvers = {
      Query,
      Mutation,
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
