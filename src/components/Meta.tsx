import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

const DEFAULT_DESCRIPTION = `
We are a team of non-local scientists and community members (with scientific and non- scientific careers) developing a water monitoring program to collect information on the Salton Sea that can be used for further advocacy efforts. Our data dashboard presents our observations in a series of visualizations that are easily accessible.
`;

function Meta(props: any) {
  const { children, ...customPageMeta } = props;
  const router = useRouter();

  const globalMeta = {
    siteName: "Salton Sea Environmental Timeseries",
    domain: "https://saltonseascience.org",
    twitterHandle: ""
  };

  const defaultPageMeta = {
    title: "Salton Sea Environmental Timeseries",
    description: DEFAULT_DESCRIPTION,
    image: "/logo-red.png",
    type: "website"
  };

  const meta = { ...globalMeta, ...defaultPageMeta, ...customPageMeta };

  return (
    <Head>
      <title>{meta.title}</title>
      <meta content={meta.description} name="description" key="description" />
      {meta.domain && (
        <link
          rel="canonical"
          href={`${meta.domain}${router.asPath}`}
          key="canonical"
        />
      )}

      {/* Open Graph */}
      <meta property="og:title" content={meta.title} key="og-title" />
      <meta
        property="og:description"
        content={meta.description}
        key="og-description"
      />
      <meta
        property="og:site_name"
        content={meta.siteName}
        key="og-site-name"
      />
      <meta property="og:type" content="website" key="og-type" />
      {meta.domain && (
        <meta
          property="og:url"
          content={`${meta.domain}${router.asPath}`}
          key="og-url"
        />
      )}
      {meta.domain && meta.image && (
        <meta
          property="og:image"
          content={`${meta.domain}${meta.image}`}
          key="og-image"
        />
      )}

      {/* Twitter */}
      <meta name="twitter:title" content={meta.title} key="twitter-title" />
      <meta
        name="twitter:description"
        content={meta.description}
        key="twitter-description"
      />
      <meta
        name="twitter:card"
        content="summary_large_image"
        key="twitter-card"
      />
      {meta.twitterHandle && (
        <meta
          name="twitter:site"
          content={meta.twitterHandle}
          key="twitter-site"
        />
      )}
      {meta.domain && meta.image && (
        <meta
          name="twitter:image"
          content={`${meta.domain}${meta.image}`}
          key="twitter-image"
        />
      )}
    </Head>
  );
}

export default Meta;
