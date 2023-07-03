import { Head, Html, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html>
      <Head>
        <link
          href="https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css"
          rel="stylesheet"
        ></link>
      </Head>
      <body>
        <Main />
        <NextScript />
        <div id="post-modal"></div>
      </body>
    </Html>
  );
};

export default Document;
