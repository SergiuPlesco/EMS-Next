import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { type Session } from "next-auth";

import { getServerAuthSession } from "@/pages/api/auth/[...nextauth]";

import { prisma } from "./prisma";

type CreateContextOptions = {
  session: Session | null;
};

const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    prisma,
  };
};

export const createContext = async (
  opts: trpcNext.CreateNextContextOptions
) => {
  const { req, res } = opts;
  const session = await getServerAuthSession({ req, res });
  return createInnerTRPCContext({
    session,
  });
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
