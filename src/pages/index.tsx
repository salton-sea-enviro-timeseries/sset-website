import type { InferGetServerSidePropsType } from "next";
import { getCmsContent } from "util/getCmsContent";
import { Button } from "@material-ui/core";
import Link from "next/link";
import Layout from "components/Layout";
import Hero from "components/Hero";
import AboutSaltonSeaSection from "components/AboutSaltonSeaSection";
import AboutUsSection from "components/AboutUsSection";
import InTheNewsSection from "components/InTheNewsSection";
import scrape from "../lib/scrape";
import { useAppContext } from "components/AppContext";
import React from "react";
import { HomePage } from "util/getCmsContent";
const Home = ({
  mediaData,
  cmsData
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // @ts-ignore
  const { language } = useAppContext();
  const locale = language === "en" ? "en-US" : "es";
  // TODO: Find way to refactor cms start ===================================
  const heroTitle = cmsData.fields.hero["en-US"].fields.title;
  const heroImage =
    cmsData.fields.hero["en-US"].fields.heroImage["en-US"].fields.file["en-US"]
      .url;
  const buttonText = cmsData.fields.hero["en-US"].fields.buttonText;
  const heroSubTitle = cmsData.fields.hero["en-US"].fields.subTitle;

  const sectionContent = cmsData.fields.content["en-US"].map(({ fields }) => {
    return fields;
  });
  //  cms end =================================================================
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

      <AboutSaltonSeaSection content={sectionContent[0]} locale={locale} />
      <AboutUsSection content={sectionContent[1]} locale={locale} />
      <InTheNewsSection
        mediaObjects={mediaData}
        content={sectionContent[2]}
        locale={locale}
      />
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
  return {
    props: {
      mediaData,
      cmsData: homepageContent
    }
  };
};
