import React from "react";
import type { AppProps } from "next/app";
// import "util/analytics.js";
import { ThemeProvider } from "util/theme.js";
import "react-vis/dist/styles/legends.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
