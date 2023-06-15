import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Button,
  Typography,
  useMediaQuery
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useAppContext } from "components/AppContext";
import Hero from "components/Hero";
import Section from "components/Section";
import Layout from "components/Layout";
import Meta from "components/Meta";
import Translation from "components/Translation";
import AboutCard from "components/BioCard/AboutCard";
import { getCmsContent } from "util/getCmsContent";
import { InferGetStaticPropsType } from "next";
import SectionHeader from "components/SectionHeader";
import { AboutPage, Profile, Question } from "types";
import { shuffleArray, truncateQuestion } from "utils";

const AboutUsPage = ({
  listOfProfiles
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const classes = useStyles();
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
    let profiles;
    if (!Array.isArray(listOfProfiles)) {
      questions = listOfProfiles.fields.questions["en-US"];
      profiles = listOfProfiles.fields.profileList["en-US"]
        .map(
          ({
            fields: { community, fullName, responses, timestamp, title, image }
          }: any) => {
            const avatar = image && image["en-US"].fields.file["en-US"].url;
            return (
              responses["en-US"]["question-6"] && {
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
      <Meta title="About Us | Salton Sea Environmental Timeseries" />
      <Translation
        path="site.language.navLinks.about"
        propsToTranslate={{
          title: "site.language.navLinks.about"
        }}
      >
        <Hero
          bgColor="secondary"
          size="medium"
          salton-sea-flyer-front
          bgImage="/topography.svg"
          sectionHeaderProps={{
            titleProps: {
              align: "center",
              className: classes.header,
              display: "inline"
            },
            display: "flex",
            justifyContent: "center",
            size: 4
          }}
        />
      </Translation>
      <Section bgImage={"/curves.png"}>
        <Container className={classes.gridWrapper}>
          <SectionHeader
            title="Questions Asked To Our Community Members"
            titleProps={{
              align: "center",
              className: classes.header,
              display: "inline"
            }}
            display="flex"
            justifyContent="center"
            size={4}
          />
          <Grid container spacing={1} justifyContent="center">
            <Grid item xs={12} className={classes.questionWrapper}>
              {Object.entries(questionList).map(
                ([key, value]) =>
                  key !== "question-6" &&
                  key !== "question-7" && (
                    <Paper
                      key={key}
                      className={classes.questionPaper}
                      elevation={1}
                      onClick={handleQuestionClick(key)}
                    >
                      <Button
                        className={classes.questionButtonStyles}
                        variant="text"
                      >
                        <Typography className={classes.questionTextStyles}>
                          {truncateQuestion(value, isMatch)}
                        </Typography>
                      </Button>
                    </Paper>
                  )
              )}
            </Grid>
            <Grid
              item
              lg={6}
              md={6}
              sm={8}
              xs={12}
              className={classes.aboutCardsWrapper}
            >
              {shuffledProfiles.length > 0 && (
                <AboutCard
                  profiles={shuffledProfiles}
                  activeCard={activeCard}
                  handleCardClick={handleCardClick}
                  selectedQuestion={questionList[selectedQuestion]}
                />
              )}
            </Grid>
          </Grid>
        </Container>
      </Section>
    </Layout>
  );
};
const useStyles = makeStyles((theme) => ({
  header: {
    boxShadow: `inset 0 -5px 0 ${theme.palette.secondary.light}`
  },
  media: {
    height: 150,
    backgroundSize: "contain"
  },
  gridWrapper: {
    minWidth: "350px"
  },
  aboutCardsWrapper: {
    display: "flex",
    flexDirection: "column"
  },
  questionPaper: {
    width: 200,
    height: 100,
    [theme.breakpoints.down("sm")]: {
      width: 100
    },
    margin: 4
  },
  questionWrapper: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  questionTextStyles: {
    fontSize: "small"
  },
  questionButtonStyles: {
    width: "100%",
    height: "100%"
  }
}));

export default AboutUsPage;

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
        listOfProfiles: []
      }
    };
  }
};
