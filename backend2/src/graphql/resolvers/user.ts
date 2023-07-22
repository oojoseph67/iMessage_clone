const resolvers = {
  Query: {
    searchUsers: () => {},
  },

  Mutation: {
    createUsername: (_: any, args: { username: string }, context: any) => {
          const { username } = args;
          console.log("--------------------------")
          console.log("HEY AT THE API", username);
          console.log("HEY IS A CONTEXT", context)
          console.log("--------------------------");

    },
  },

  // Subscription: {

  // }
};

export default resolvers;
