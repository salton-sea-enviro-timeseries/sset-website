import type { InferGetStaticPropsType } from "next";
import { Button } from "@material-ui/core";
import Link from "next/link";

import Layout from "components/Layout";
import Hero from "components/Hero";
import AboutSaltonSeaSection from "components/AboutSaltonSeaSection";
import AboutUsSection from "components/AboutUsSection";
import InTheNewsSection from "components/InTheNewsSection";
import scrape from "../lib/scrape";
import { getContent } from "util/getContent";
import { useAppContext } from "components/AppContext";

const Home = ({
  mediaData,
  gallery
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  // @ts-ignore
  const { language } = useAppContext();
  return (
    <Layout>
      <Hero
        bgColor="primary"
        size="large"
        bgImage="/hero.jpg"
        bgImageOpacity={0.75}
        title={getContent(`pages.home.${language}.content.hero`)}
        subtitle=""
        cta={
          <Link href="/dashboard" passHref>
            <Button variant="contained" color="primary">
              {getContent(`pages.home.${language}.content.call_to_action`)}
            </Button>
          </Link>
        }
      />
      <AboutSaltonSeaSection />
      <AboutUsSection gallery={gallery} />
      <InTheNewsSection mediaObjects={mediaData} />
    </Layout>
  );
};

export default Home;

export const getStaticProps = async () => {
  const faker = require("@faker-js/faker").faker;

  const urls = [
    // "https://kesq.com/news/2021/07/07/changes-happening-at-the-salton-sea-on-a-state-federal-level/",
    "https://www.cnbc.com/2021/11/06/californias-salton-sea-spewing-toxic-fumes-creating-ghost-towns-.html"
  ];

  const mediaData = await scrape(urls);

  const gallery = Array.from({ length: 12 }).map(
    () => faker.image.abstract(640, 480, true) as string
  );

  return {
    props: {
      mediaData,
      gallery
    }
  };
};
