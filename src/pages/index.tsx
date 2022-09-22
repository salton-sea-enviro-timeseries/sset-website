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
import { getContent } from "util/getContent";
import { useAppContext } from "components/AppContext";
import React from "react";

const Home = ({
  mediaData,
  cmsData
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // @ts-ignore
  const { language } = useAppContext();
  // TODO: Find way to destructure types
  // const {
  //   fields: { content, hero, metadata }
  // } = cmsData;
  const heroTitle = cmsData.fields.hero["en-US"].fields.title;
  const heroImage =
    cmsData.fields.hero["en-US"].fields.heroImage["en-US"].fields.file["en-US"]
      .url;
  const buttonText = cmsData.fields.hero["en-US"].fields.buttonText;

  type Field = {
    content?: { data: {}; content: []; nodeType: string };
    title: { "en-US": string; es: string };
  };

  type FieldObj = { fields: Field };
  const sectionContent = cmsData.fields.content["en-US"].map(
    ({ fields }: FieldObj) => {
      return fields;
    }
  );
  // console.log("about salton sea", cmsData.fields.content["en-US"]);
  console.log("section Obj", sectionContent);
  return (
    <Layout>
      <Hero
        bgColor="primary"
        size="large"
        bgImage={heroImage}
        bgImageOpacity={0.75}
        title={language === "en" ? heroTitle["en-US"] : heroTitle["es"]}
        subtitle=""
        cta={
          <Link href="/dashboard" passHref>
            <Button variant="contained" color="primary">
              {language === "en" ? buttonText["en-US"] : buttonText["es"]}
            </Button>
          </Link>
        }
      />

      <AboutSaltonSeaSection content={sectionContent[0]} />
      <AboutUsSection content={sectionContent[1]} />
      <InTheNewsSection mediaObjects={mediaData} content={sectionContent[2]} />

      {/* {sectionContent.map(({ content, title }: Field) => (
        <>
          <AboutSaltonSeaSection key={title["en-US"]} />
          <AboutUsSection key={title["en-US"]} />
          <InTheNewsSection mediaObjects={mediaData} key={title["en-US"]} />
        </>
      ))} */}
      {/* <AboutSaltonSeaSection />
      <AboutUsSection />
      <InTheNewsSection mediaObjects={mediaData} /> */}
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

  const homepageContent = await getCmsContent("homePage");
  return {
    props: {
      mediaData,
      cmsData: homepageContent.items[0]
    }
  };
};
