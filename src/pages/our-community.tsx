import { useEffect, useState } from "react";
import {
  Container,
  Grid2,
  Paper,
  Button,
  Typography,
  useMediaQuery
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { useAppContext } from "components/AppContext";
import Hero from "components/Hero";
import Section from "components/Section";
import Layout from "components/Layout";
import Meta from "components/Meta";
import Translation from "components/Translation";
import AboutCard from "components/BioCard/AboutCard";
import { getCmsContent } from "util/getCmsContent";
import SectionHeader from "components/SectionHeader";
import { AboutPage, Profile, Question } from "types";
import { shuffleArray, truncateQuestion } from "utils";
import { Entry } from "contentful";

interface AboutUsPageProps {
  listOfProfiles: Entry<AboutPage> | null;
}
interface RawProfile {
  fields: Profile;
}
interface HeaderStylesProps {
  boxShadow: (theme: any) => string;
}

const OurCommunity = ({ listOfProfiles }: AboutUsPageProps) => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down(960));
  // TODO: configure translations
  // @ts-ignore
  const { language } = useAppContext();
  const [activeCard, setActiveCard] = useState(false);
  const [selectedQuestion, setSelectedQuestion] =
    useState<string>("question-1");
  const [shuffledProfiles, setShuffledProfiles] = useState<any[]>([]);
  const [questionList, setQuestionList] = useState<Question>({});
  const handleCardClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setActiveCard((prev) => !prev);
  };
  const handleQuestionClick = (question: string) => () => {
    setSelectedQuestion(question);
    setActiveCard(() => false);
  };

  useEffect(() => {
    // Normalize CMS profiles
    let questions: Question;
    let profiles: RawProfile[];
    if (listOfProfiles && "fields" in listOfProfiles) {
      questions = listOfProfiles.fields.questions["en-US"];
      profiles = listOfProfiles.fields.profileList["en-US"]
        .map(
          ({
            fields: { community, fullName, responses, timestamp, title, image }
          }: any) => {
            const avatar = image && image["en-US"].fields.file["en-US"].url;
            return (
              responses["en-US"]["question-6"] &&
              responses["en-US"][selectedQuestion] && {
                community: community["en-US"],
                fullName: fullName["en-US"],
                responses: responses["en-US"][selectedQuestion],
                question: questions[selectedQuestion],
                timestamp: timestamp["en-US"],
                title: title["en-US"],
                image: avatar
              }
            );
          }
        )
        .filter((profile: Profile) => profile);
      setShuffledProfiles(shuffleArray(profiles));
      setQuestionList(questions);
    } else {
      questions = {};
      profiles = [];
    }
  }, [listOfProfiles, selectedQuestion]);

  return (
    <Layout>
      <Meta title="Our Community | Salton Sea Environmental Timeseries" />
      <Translation
        path="site.language.navLinks.community"
        propsToTranslate={{
          title: "site.language.navLinks.community"
        }}
      >
        <Hero bgColor="secondary" size="medium" />
      </Translation>
      <Section bgImage={"/curves.png"}>
        <StyledContainer>
          <SectionHeader
            title="Questions Asked To Our Community Members"
            titleProps={{
              align: "center",
              sx: HeaderStyles,
              display: "inline"
            }}
            display="flex"
            justifyContent="center"
            size={"h4"}
            sectionId={"ourCommunity-section"}
          />
          <Grid2 container spacing={1} justifyContent="center">
            <QuestionWrapper size={{ xs: 12 }}>
              {Object.entries(questionList).map(
                ([key, value]) =>
                  key !== "question-6" &&
                  key !== "question-7" && (
                    <StyledPaper
                      key={key}
                      elevation={1}
                      onClick={handleQuestionClick(key)}
                    >
                      <QuestionButtonStyles variant="text">
                        <QuestionTextStyles>
                          {truncateQuestion(value, isMatch)}
                        </QuestionTextStyles>
                      </QuestionButtonStyles>
                    </StyledPaper>
                  )
              )}
            </QuestionWrapper>
            <AboutCardsWrapper size={{ lg: 6, md: 6, sm: 8, xs: 12 }}>
              {shuffledProfiles.length > 0 && (
                <AboutCard
                  profiles={shuffledProfiles}
                  activeCard={activeCard}
                  handleCardClick={handleCardClick}
                  selectedQuestion={questionList[selectedQuestion]}
                />
              )}
            </AboutCardsWrapper>
          </Grid2>
        </StyledContainer>
      </Section>
    </Layout>
  );
};

const StyledContainer = styled(Container)(({ theme }) => ({
  minWidth: "350px"
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  width: 200,
  height: 100,
  margin: 4,
  [theme.breakpoints.down("sm")]: {
    width: 100
  }
}));

const QuestionWrapper = styled(Grid2)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center"
}));

const AboutCardsWrapper = styled(Grid2)({
  display: "flex",
  flexDirection: "column"
});

const QuestionButtonStyles = styled(Button)({
  width: "100%",
  height: "100%",
  color: "inherit"
});

const QuestionTextStyles = styled(Typography)({
  fontSize: "small"
});

const HeaderStyles: HeaderStylesProps = {
  boxShadow: (theme) => `inset 0 -5px 0 ${theme.palette.secondary.light}`
};

const MediaStyles = {
  height: 150,
  backgroundSize: "contain"
};
export default OurCommunity;

export const getStaticProps = async () => {
  try {
    const listOfProfiles = await getCmsContent<AboutPage>(
      "communityScienceProfileList"
    );

    return {
      props: {
        listOfProfiles
      }
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        listOfProfiles: null
      }
    };
  }
};
