import { ApolloError } from "apollo-server-core";
import GraphQLContext, { CreateUsernameResponse } from "../../util/types";
import { User } from "@prisma/client";

const resolvers = {
  Query: {
    searchUsers: async (
      _: any,
      args: { username: string },
      context: GraphQLContext
    ): Promise<Array<User>> => {
      console.log("SEARCHING !!!...");
      const { username: searchedUsername } = args;
      const { session, prisma } = context;

      if (!session?.user) {
        throw new ApolloError("Not authorized");
      }

      //   const {
      //     user: { username: myUsername },
      //       } = session;

      const myUsername = session?.user?.username;

      try {
        const users = await prisma.user.findMany({
          where: {
            username: {
              contains: searchedUsername,
              not: myUsername,
              mode: "insensitive",
            },
          },
        });
        console.log("🚀 ~ file: user.ts:36 ~ users:", users)
        return users;
      } catch (error: any) {
        console.log("searching gone wrong", error);
        throw new ApolloError(error?.message);
      }
    },
  },

  Mutation: {
    createUsername: async (
      _: any,
      args: { username: string },
      context: GraphQLContext
    ): Promise<CreateUsernameResponse> => {
      const { username } = args;
      const { session, prisma } = context;

      if (!session?.user) {
        return {
          error: "Not authorized",
        };
      }

      const { id: userId } = session.user;

      try {
        /**
         * checking that the input username is not taken
         */

        const checkUser = await prisma.user.findUnique({
          where: {
            username: username,
          },
        });

        if (checkUser) {
          return {
            error: "Username already taken. Try another username",
          };
        }

        /**
         * update user username
         */

        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            username: username,
          },
        });

        return { success: true };
      } catch (error: any) {
        console.log("create username error", error);
        // return { error: "Error" }
        return { error: error?.message };
      }
    },
  },

  // Subscription: {

  // }
};

export default resolvers;
