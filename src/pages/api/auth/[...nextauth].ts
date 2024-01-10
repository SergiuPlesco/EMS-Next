import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import type { NextAuthOptions } from "next-auth";
import NextAuth, { getServerSession } from "next-auth/next";
import Google from "next-auth/providers/google";

import { ADMIN_EMAILS } from "@/constants/common";
import prisma from "@/server/prisma";

const { NEXT_PUBLIC_GOOGLE_ID = "", NEXT_PUBLIC_GOOGLE_SECRET = "" } =
  process.env; // for typescript

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: NEXT_PUBLIC_GOOGLE_ID,
      clientSecret: NEXT_PUBLIC_GOOGLE_SECRET,
      async profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: ADMIN_EMAILS.includes(profile.email) ? "superadmin" : "user",
        };
      },
    }),
  ],
  callbacks: {
    session: async ({ session, user }) => {
      return {
        ...session,
        user: {
          ...user,
        },
      };
    },
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
