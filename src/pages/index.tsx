import { useState } from "react";
import type { InferGetStaticPropsType } from "next";
import { Button, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { getCmsContent } from "util/getCmsContent";
import {
  ArticleFields,
  Content1,
  Content2,
  HomePage,
  PageContent
} from "types";
import Layout from "components/Layout";
import Hero from "components/Hero";
import PageSection from "components/PageSection";
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
  sections: PageContent | undefined,
  locale: string,
  newsArticleList: ArticleFields[]
) => {
  if (Array.isArray(sections)) {
    return sections?.map(({ fields }: any, index: number) => {
      const { body, title } = fields;
      const sectionTitle =
        title[locale as keyof LocaleOption<NestedObjBodyText>];
      const section = sectionTitle.split(" ").join("").toLocaleLowerCase();
      return (
        <PageSection
          key={section}
          id={section}
          bodyText={
            body
              ? renderDocument(
                  body[locale as keyof LocaleOption<NestedObjBodyText>]
                )
              : null
          }
          sectionNum={index}
          title={sectionTitle}
          newsArticleList={body ? undefined : newsArticleList}
        />
      );
    });
  }
};

const Home = ({
  homepageContent
}: InferGetStaticPropsType<typeof getStaticProps>) => {
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
  //TODO: assign Hero Images on contentful for each page
  // const heroImage =
  //   heroContentBase?.heroImage["en-US"].fields.file["en-US"].url;
  const buttonText = heroContentBase?.buttonText;
  const heroSubTitle = heroContentBase?.subTitle;
  const allSections = homepageContent?.fields.content["en-US"] || [];
  let sections: Content1[] = [];
  let newsArticleList: ArticleFields[] = [];
  if (Array.isArray(allSections)) {
    sections = allSections.slice(0, 3) as Content1[];
    const newsSection = (allSections.slice(3)[0] as Content2).fields
      .newsArticles["en-US"];
    if (Array.isArray(newsSection)) {
      newsArticleList = newsSection.map((article) => article.fields);
    }
  } else {
    console.error("allSections is not an array");
  }

  const gradImages = homepageContent?.fields.media["en-US"].map(
    ({ fields: { file, title } }) => {
      return { imageTitle: title["en-US"], imageUrl: file["en-US"].url };
    }
  );
  const sectionContent = generateSectionContent(
    sections,
    currentLocale,
    newsArticleList
  );
  //================== cms end ============================
  return (
    <Layout>
      <Hero
        bgColor="primary"
        size="large"
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
            <StyledTutorialButton
              variant="text"
              size="large"
              onClick={handleOpen}
            >
              {currentLocale === "en-US" ? "Watch Tutorial" : "Ver El Tutorial"}
            </StyledTutorialButton>
            ;
          </>
        }
      />
      {/* TODO: Retrieve content from contentful for tutorial video translations */}
      <TutorialModal open={open} onClose={handleClose} locale={currentLocale} />
      {sectionContent}
      <PageSection
        id="section-grads"
        bodyText={null}
        sectionNum={sections.length ?? 0}
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

const StyledTutorialButton = styled(Button)(({ theme }) => ({
  marginTop: 4,
  color: "white",
  borderColor: "whitesmoke",
  position: "absolute",
  bottom: 15,
  "&::after": {
    content: '""',
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
}));
export default Home;
//TODO need to initiate rebuild for contenful changes
// consider changing for instant fixes?
export const getStaticProps = async () => {
  // TODO: Extract urls to contentful
  let homepageContent;
  try {
    homepageContent = await getCmsContent<HomePage>("homePage");
  } catch (error) {
    console.error("Error while fetching homepage content: ", error);
  }
  return {
    props: {
      homepageContent
    }
  };
};
