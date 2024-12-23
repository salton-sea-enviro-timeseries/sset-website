import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import createEmotionServer from "@emotion/server/create-instance";
import { cache } from "@emotion/react";
import { GA_TRACKING_ID } from "../util/gtag";

// Function to create an emotion cahce
const createEmotionCache = () => {
  return createCache({ key: "css", prepend: true });
};

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    // Render app and page and get the context of the page with collected side effects.
    const originalRenderPage = ctx.renderPage;
    const cache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);
    ctx.renderPage = () =>
      originalRenderPage({
        enchanceApp: (App) =>
          function EnhanceApp(props) {
            return <App emotionCache={cache} {...props} />;
          }
      });

    const initialProps = await Document.getInitialProps(ctx);
    // Extract Emotion styles
    const emotionStyles = extractcriticalToChuncks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map((style) => (
      <style
        key={style.key}
        data-emotion={`${style.key} ${style.ids.join(" ")}`}
        dangerouslySetInnerHTML={{ __html: style.css }}
      />
    ));
    return {
      ...initialProps,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: [
        ...React.Children.toArray(initialProps.styles),
        ...emotionStyleTags
      ]
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link href="/favicon.ico" rel="shortcut icon" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          {process.env.NODE_ENV === "production" && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
          `
                }}
              />
            </>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
