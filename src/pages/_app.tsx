import React from "react";
import type { AppProps } from "next/app";
// import "util/analytics.js";
import { ThemeProvider } from "util/theme.js";
import AppContextProvider from "components/AppContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <AppContextProvider>
        <Component {...pageProps} />
      </AppContextProvider>
    </ThemeProvider>
  );
}

export default MyApp;
