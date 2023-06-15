import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId:
        "53961321690-80tma0e4nk69qeplpd3b38le97uhlghm.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
};

export default NextAuth(authOptions);
