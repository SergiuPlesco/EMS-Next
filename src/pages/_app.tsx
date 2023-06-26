import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppType } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { createGlobalStyle, ThemeProvider } from "styled-components";

import { trpc } from "@/utils/trpc";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

`;

import theme from "@/constants/theme";

const MyApp: AppType<{ session: Session }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <ReactQueryDevtools initialIsOpen={false} />

        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
};
export default trpc.withTRPC(MyApp);
