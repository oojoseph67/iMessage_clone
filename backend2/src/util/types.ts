import { ISODateString } from "next-auth";
import { PrismaClient } from "@prisma/client";

export default interface GraphQLContext {
  session: Session | null;
  prisma: PrismaClient;
}

/**
 * Users
 */

export interface Session {
  user: User;
  expires: ISODateString;
}

export interface User {
  id: string;
  username: string;
  name: string;
  image: string;
  email: string;
  emailVerified: boolean;
}

export interface CreateUsernameResponse {
  success?: boolean;
  error?: string;
}
