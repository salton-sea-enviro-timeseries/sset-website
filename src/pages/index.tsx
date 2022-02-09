import Layout from "components/Layout";
import Hero from "components/Hero";
import AboutSaltonSeaSection from "components/AboutSaltonSeaSection";
import AboutUsSection from "components/AboutUsSection";
import InTheNewsSection from "components/InTheNewsSection";
import scrape from "../lib/scrape";
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
        title="Salton Sea Environmental Timeseries"
        subtitle=<a href="https://saltonsea.netlify.app/dashboard">Go to the data</a>
      />
      <AboutSaltonSeaSection />
      <AboutUsSection />
      <InTheNewsSection mediaObjects={mediaData} />
    </Layout>
  );
};

export default Home;

export const getStaticProps = async () => {
  const urls = [
    "https://www.npr.org/podcasts/655974992/living-downstream",
    "https://kesq.com/news/2021/07/07/changes-happening-at-the-salton-sea-on-a-state-federal-level/",
    "https://www.cnbc.com/2021/11/06/californias-salton-sea-spewing-toxic-fumes-creating-ghost-towns-.html"
  ];

  const mediaData = await scrape(urls);

  return {
    props: {
      mediaData
    }
  };
};
