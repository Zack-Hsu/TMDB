import type { AppProps } from "next/app";
import { Provider as ReduxProvider } from 'react-redux';
import store from "@/store";
import "@/styles/base.scss"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider store={store}>
      <Component {...pageProps} />
    </ReduxProvider>
  );
}
