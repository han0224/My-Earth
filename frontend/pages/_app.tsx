import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { store, wrapper } from "../store";
import Audios from "../components/Audios";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";

function MyApp({ Component, pageProps }: AppProps) {
  const persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<div>loading...</div>}>
        <Head>
          <title>My Earth</title>
        </Head>
        <Component {...pageProps} />
        {/* main 페이지랑 오디오 재생 시에만 */}
        <Audios />
      </PersistGate>
    </Provider>
  );
}

// export default MyApp;
export default wrapper.withRedux(MyApp);
