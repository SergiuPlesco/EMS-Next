import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppType } from "next/app";
import { ThemeProvider } from "styled-components";
import { createGlobalStyle } from "styled-components";

import MainLayout from "@/layouts/MainLayout/MainLayout";
import { trpc } from "@/utils/trpc";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

`;

import theme from "@/constants/theme";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ReactQueryDevtools initialIsOpen={false} />

      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ThemeProvider>
  );
};
export default trpc.withTRPC(MyApp);
