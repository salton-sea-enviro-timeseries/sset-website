import React, { useEffect } from "react";
import Script from "next/script";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "util/createEmotionCache";
import * as gtag from "../util/gtag";
import { ThemeProvider } from "util/theme.js";
import AppContextProvider from "components/AppContext";
import { useRouter } from "next/router";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

// Extend AppProps to include `emotionCache`
type AppPropsWithEmotionCache = AppProps & {
  Component: NextPageWithLayout;
  emotionCache?: EmotionCache;
};

// Create a client-side Emotion cache
const clientSideEmotionCache = createEmotionCache();

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache
}: AppPropsWithEmotionCache) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const router = useRouter();
  // TODO config cookies banners
  {
    /* <script id="Cookiebot" src="https://consent.cookiebot.com/uc.js" data-cbid="223ebf7c-c8d8-4dfb-bcc3-d4050accdd47" data-blockingmode="auto" type="text/javascript"></script> */
  }
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
    <CacheProvider value={emotionCache}>
      <ThemeProvider>
        <AppContextProvider>
          <Script
            src="https://consent.cookiebot.com/uc.js"
            strategy="afterInteractive"
            id="Cookiebot"
            data-cbid="223ebf7c-c8d8-4dfb-bcc3-d4050accdd47"
            data-blockingmode="auto"
            type="text/javascript"
          />
          {getLayout(<Component {...pageProps} />)}
        </AppContextProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
