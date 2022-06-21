import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { wrapper } from "../store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>My Earth</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

// export default MyApp;
export default wrapper.withRedux(MyApp);
