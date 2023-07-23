import GraphQLContext, { CreateUsernameResponse } from "../../util/types";

const resolvers = {
  Query: {
    searchUsers: () => {},
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
          return { error: error?.message }
      }
    },
  },

  // Subscription: {

  // }
};

export default resolvers;
