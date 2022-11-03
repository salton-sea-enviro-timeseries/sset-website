import type { InferGetServerSidePropsType } from "next";
import { Button } from "@material-ui/core";
import Link from "next/link";
import { getCmsContent } from "util/getCmsContent";
import { HomePage } from "types";
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
  homepageContent
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // @ts-ignore
  const { language } = useAppContext();
  const locale = language === "en" ? "en-US" : "es";
  //================== cms start ==========================
  const heroContentBase = homepageContent.fields.hero["en-US"].fields;
  const heroTitle = heroContentBase.title;
  const heroImage = heroContentBase.heroImage["en-US"].fields.file["en-US"].url;
  const buttonText = heroContentBase.buttonText;
  const heroSubTitle = heroContentBase.subTitle;
  const sectionContent = homepageContent.fields.content["en-US"].map(
    ({ fields }) => {
      return fields;
    }
  );
  //================== cms end ============================
  return (
    <Layout>
      <Hero
        bgColor="primary"
        size="large"
        bgImage={heroImage}
        bgImageOpacity={0.75}
        title={heroTitle[locale]}
        subtitle={heroSubTitle[locale]}
        cta={
          <Link href="/dashboard" passHref>
            <Button variant="contained" color="primary">
              {buttonText[locale]}
            </Button>
          </Link>
        }
      />
      <AboutSaltonSeaSection />
      <AboutUsSection />
      <InTheNewsSection mediaObjects={mediaData} />
    </Layout>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const urls = [
    // "https://kesq.com/news/2021/07/07/changes-happening-at-the-salton-sea-on-a-state-federal-level/",
    "https://www.cnbc.com/2021/11/06/californias-salton-sea-spewing-toxic-fumes-creating-ghost-towns-.html"
  ];

  const mediaData = await scrape(urls);
  const homepageContent = await getCmsContent<HomePage>("homePage");
  console.log("cms result: ", homepageContent);
  return {
    props: {
      mediaData,
      homepageContent
    }
  };
};
