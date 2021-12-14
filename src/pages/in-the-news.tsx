// import Head from "next/head";
import { Box } from "@material-ui/core";
import Layout from "components/Layout";
import FeaturedNewsFeed from "components/featured-news-feed/FeaturedNewsFeed";

const InTheNews = () => {
  return (
    <Layout>
      <Box px={1}>
        <h1>WIP In the News Page</h1>
        <FeaturedNewsFeed />
      </Box>
    </Layout>
  );
};

export default InTheNews;
