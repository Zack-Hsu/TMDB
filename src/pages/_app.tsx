import type { AppProps } from "next/app";
import { Provider as ReduxProvider, useSelector } from 'react-redux';
import store from "@/store";

export default function App({ Component, pageProps }: AppProps) {

  return (
    <ReduxProvider store={store}>
      <Component {...pageProps} />
    </ReduxProvider>
  );
}
