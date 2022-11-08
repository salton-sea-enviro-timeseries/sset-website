import type { InferGetServerSidePropsType } from "next";
import { Button } from "@material-ui/core";
import Link from "next/link";
import { getCmsContent } from "util/getCmsContent";
import { HomePage } from "types";
import Layout from "components/Layout";
import Hero from "components/Hero";
import PageSection from "components/PageSection";
import scrape from "../lib/scrape";
import { useAppContext } from "components/AppContext";
import { LocaleOption, NestedObjBodyText } from "types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import { Key } from "react";

// Contentful rich text helper
const renderDocument = (document: Document) => {
  const options = {
    renderText: (text: string) => {
      return text
        .split("\n")
        .reduce((children: any, textSegment: any, index: Key) => {
          return [...children, index > 0 && <br key={index} />, textSegment];
        }, []);
    }
  };

  return documentToReactComponents(document, options);
};

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
    ({ fields }, index) => {
      const { body, title } = fields;
      return (
        <PageSection
          key={`section-${index}`}
          bodyText={
            body
              ? renderDocument(
                  body[locale as keyof LocaleOption<NestedObjBodyText>]
                )
              : null
          }
          section={index}
          title={title[locale as keyof LocaleOption<NestedObjBodyText>]}
          mediaObjects={body ? undefined : mediaData}
        />
      );
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
      {sectionContent}
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
      homepageContent
    }
  };
};
