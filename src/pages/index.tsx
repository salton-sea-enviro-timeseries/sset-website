import { useState } from "react";
import type { InferGetStaticPropsType } from "next";
import { Button, Container, makeStyles } from "@material-ui/core";
import Link from "next/link";
import { getCmsContent } from "util/getCmsContent";
import { HomePage, MediaObject, PageContent } from "types";
import Layout from "components/Layout";
import Hero from "components/Hero";
import PageSection from "components/PageSection";
import scrape from "../lib/scrape";
import TutorialModal from "../components/TutorialModal";
import { useAppContext } from "components/AppContext";
import { LocaleOption, NestedObjBodyText } from "types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import SubscriptionForm from "components/SubscriptionForm";
import Section from "components/Section";

// Contentful rich text helper
const renderDocument = (document: Document) => {
  const options = {
    renderText: (text: string) => {
      return text
        .split("\n")
        .reduce((children: any, textSegment: any, index: number) => {
          return [...children, index > 0 && <br key={index} />, textSegment];
        }, []);
    }
  };
  return documentToReactComponents(document, options);
};
const generateSectionContent = (
  contentList: PageContent | undefined,
  locale: string,
  newsMediaData: MediaObject[] | undefined
) => {
  return contentList?.map(({ fields }: any, index: number) => {
    const { body, title } = fields;
    const sectionTitle = title[locale as keyof LocaleOption<NestedObjBodyText>];
    return (
      <PageSection
        key={`section-${sectionTitle}`}
        id={`section-${index}`}
        bodyText={
          body
            ? renderDocument(
                body[locale as keyof LocaleOption<NestedObjBodyText>]
              )
            : null
        }
        section={index}
        title={sectionTitle}
        newsMediaData={body ? undefined : newsMediaData}
      />
    );
  });
};
const Home = ({
  newsMediaData,
  homepageContent
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const classes = useStyles();
  // @ts-ignore
  const { language } = useAppContext();
  const currentLocale = language === "en" ? "en-US" : "es";
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  //================== cms start ==========================
  const heroContentBase = homepageContent?.fields.hero["en-US"].fields;
  const heroTitle = heroContentBase?.title;
  const heroImage =
    heroContentBase?.heroImage["en-US"].fields.file["en-US"].url;
  const buttonText = heroContentBase?.buttonText;
  const heroSubTitle = heroContentBase?.subTitle;
  const sections = homepageContent?.fields.content["en-US"];
  const gradImages = homepageContent?.fields.media["en-US"].map(
    ({ fields: { file } }) => {
      return file["en-US"].url;
    }
  );
  const sectionContent = generateSectionContent(
    sections,
    currentLocale,
    newsMediaData
  );
  //================== cms end ============================
  return (
    <Layout>
      <Hero
        bgColor="primary"
        size="large"
        bgImage={heroImage}
        bgImageOpacity={0.75}
        title={heroTitle && heroTitle[currentLocale]}
        subtitle={heroSubTitle && heroSubTitle[currentLocale]}
        cta={
          <>
            <Link href="/dashboard/water-quality" passHref>
              <Button variant="contained" color="primary">
                {buttonText && buttonText[currentLocale]}
              </Button>
            </Link>
            <Button
              className={classes.tutorialButton}
              variant="text"
              size="large"
              onClick={handleOpen}
            >
              {currentLocale === "en-US" ? "Watch Tutorial" : "Ver El Tutorial"}
            </Button>
          </>
        }
      />
      {/* TODO: Retrieve content from contentful for tutorial video translations */}
      <TutorialModal open={open} onClose={handleClose} locale={currentLocale} />
      {sectionContent}
      <PageSection
        id="section-grads"
        bodyText={null}
        section={homepageContent?.fields.content["en-US"].length ?? 0}
        title={"Congratulations Recent Grads"}
        gradImages={gradImages}
      />
      <Section>
        <Container>
          <SubscriptionForm />
        </Container>
      </Section>
    </Layout>
  );
};

export default Home;

export const getStaticProps = async () => {
  const urls: string[] = [
    "https://www.alianzacv.org/news/aeroqual-air-quality-sensor-installed-in-the-salton-sea/",
    "https://www.kuer.org/health-science-environment/2024-01-02/the-salton-sea-shows-why-utah-should-pay-attention-to-great-salt-lakes-stench",
    "https://tos.org/oceanography/article/salton-sea-environmental-work-and-the-importance-of-community-science",
    "https://www.hcn.org/issues/55.6/south-water-in-search-of-answers-at-the-salton-sea?utm_medium=email&utm_source=govdelivery",
    "https://atmos.earth/salton-sea-california-drought-pollution/",
    //TODO: 403 error; come back to fix: anti scrap enabled
    // "https://thehill.com/policy/equilibrium-sustainability/3633056-dried-up-in-utah-drying-great-salt-lake-leads-to-air-pollution",
    "https://grist.org/health/how-californias-salton-sea-went-from-vacation-destination-to-toxic-nightmare/",
    "https://ca.audubon.org/news/it-takes-village-dr-ryan-sinclair-and-community-science-salton-sea",
    "https://www.cnbc.com/2021/11/06/californias-salton-sea-spewing-toxic-fumes-creating-ghost-towns-.html",
    "https://www.theguardian.com/us-news/2021/jul/23/salton-sea-california-lake-dust-drought-climate",
    "https://ca.audubon.org/news/valley-voice-salton-sea-communities-needed-relief-long-coronavirus"
  ];
  let newsMediaData;
  let homepageContent;
  try {
    newsMediaData = await scrape(urls);
  } catch (error) {
    console.error("Error while scraping URLs:", error);
    throw new Error(`An unexpected error has ocurred Error:${error}`);
  }
  try {
    homepageContent = await getCmsContent<HomePage>("homePage");
  } catch (error) {
    console.error("Error while fetching homepage content: ", error);
  }
  return {
    props: {
      newsMediaData,
      homepageContent
    }
  };
};
const useStyles = makeStyles((theme) => ({
  tutorialButton: {
    marginTop: 4,
    color: "white",
    borderColor: "whitesmoke",
    position: "absolute",
    bottom: 15,
    "&::after": {
      content: `""`,
      position: "absolute",
      width: "100%",
      height: 3,
      backgroundColor: "red",
      bottom: 0,
      left: 0,
      transformOrigin: "center",
      transform: "scaleX(.15)",
      transition: "transform .4s ease-in-out"
    },
    "&:hover::after": {
      transform: "scaleX(1)"
    }
  }
}));
