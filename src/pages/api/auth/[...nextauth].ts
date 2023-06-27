import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { prisma } from "@/server/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId:
        "53961321690-80tma0e4nk69qeplpd3b38le97uhlghm.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  secret: "sfj46jfg24564dfjgsdfg45", // required in produtction, see next-auth docs
};

export default NextAuth(authOptions);
