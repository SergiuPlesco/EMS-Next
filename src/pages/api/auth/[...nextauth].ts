import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import type { NextAuthOptions } from "next-auth";
import NextAuth, { getServerSession } from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import { prisma } from "@/server/prisma";

const { NEXT_PUBLIC_GOOGLE_ID = "", NEXT_PUBLIC_GOOGLE_SECRET = "" } =
  process.env; // for typescript

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: NEXT_PUBLIC_GOOGLE_ID,
      clientSecret: NEXT_PUBLIC_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  secret: "sfj46jfg24564dfjgsdfg45", // required in produtction, see next-auth docs
};

export default NextAuth(authOptions);

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
