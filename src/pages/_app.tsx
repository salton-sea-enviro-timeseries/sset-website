import React, { useEffect } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import * as gtag from "../util/gtag";
import { ThemeProvider } from "util/theme.js";
import AppContextProvider from "components/AppContext";
import { useRouter } from "next/router";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <ThemeProvider>
      <AppContextProvider>
        {getLayout(<Component {...pageProps} />)}
      </AppContextProvider>
    </ThemeProvider>
  );
}

export default MyApp;
