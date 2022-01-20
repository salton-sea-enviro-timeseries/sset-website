import Layout from "components/Layout";
import Hero from "components/Hero";
import AboutSaltonSeaSection from "components/AboutSaltonSeaSection";
import AboutUsSection from "components/AboutUsSection";
import InTheNewsSection from "components/InTheNewsSection";
import getFeaturedMedia from "../lib/scrape";
import type { InferGetStaticPropsType } from "next";

const Home = ({
  mediaData
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout>
      <Hero
        bgColor="primary"
        size="large"
        bgImage="/hero.jpg"
        bgImageOpacity={0.75}
        title="Your landing page title here"
        subtitle="Some nice words here."
      />
      <AboutSaltonSeaSection />
      <AboutUsSection />
      <InTheNewsSection mediaObjects={mediaData} />
    </Layout>
  );
};

export default Home;

export const getStaticProps = async () => {
  const mediaData = await getFeaturedMedia();

  return {
    props: {
      mediaData
    }
  };
};
