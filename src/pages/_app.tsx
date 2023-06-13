import type { AppType } from "next/app";
import { trpc } from "@/utils/trpc";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

`;

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

export default trpc.withTRPC(MyApp);
