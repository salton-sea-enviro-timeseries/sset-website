import React from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
// import "util/analytics.js";
import { ThemeProvider } from "util/theme.js";
import AppContextProvider from "components/AppContext";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <ThemeProvider>
      <AppContextProvider>
        {getLayout(<Component {...pageProps} />)}
      </AppContextProvider>
    </ThemeProvider>
  );
}

export default MyApp;
