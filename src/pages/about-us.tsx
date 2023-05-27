import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Button,
  Typography,
  useMediaQuery
} from "@material-ui/core";
import Image from "next/image";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useAppContext } from "components/AppContext";
import Hero from "components/Hero";
import Section from "components/Section";
import Layout from "components/Layout";
import Meta from "components/Meta";
import Translation from "components/Translation";
import AboutCard from "components/BioCard/AboutCard";

type Question = {
  [key: string]: string;
};
// Todo create interface of answer array
const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
};
const truncateQuestion = (question: string, breakpointMatch: boolean) => {
  if (breakpointMatch) {
    return question.slice(0, 30) + "...";
  }
  if (question.length <= 80) {
    return question;
  }
  return question.slice(0, 80) + "...";
};

const questionObject: Question = {
  "question-1":
    " What was something you learned about the science of water quality in the Salton Sea?",
  "question-2":
    "What were some ways that you learned about science through this program? e.g. processing samples at the sea, making presentations, attending presentations",
  "question-3":
    "What about the water quality in the Salton Sea do you want to share more widely with the community? e.g. reasons behind sulfur smell, bacteria, nutrient inflows, algae growth, fish die off due to hypoxia and high salinity",
  "question-4":
    "From your perspective, what was most valuable about the community science program for meeting the goal of advancing environmental justice?",
  "question-5":
    "What changes would you like to see as this community science program moves forward in the future?",
  // Do not display in responses
  "question-6":
    "Do we have permission to post your answers on the dashboard website?",
  "question-7":
    "Do we have your permission to post your answers related to topics you learned about on social media? e.g. reasons behind sulfur smell, algae growth, fish die off, bacteria *Reason for post is to pose the question and have an answer from the lens of a community scientist that may connect more to the wider community"
};
const communityScienceProfiles = [
  {
    Timestamp: "8/31/2022 16:13:48",
    fullName: "Consuelo Marquez",
    // default image
    image: "/logo-alt.png",
    title: "Community Scientist",
    community: "Coachella",
    "question-1":
      "I learned that the contamination that community members and Shore cities residents has always theorized was right. I wasn't surprised at any of the results of hypersalinity, eutrophication, et, but I am glad that we have the data to finally support our experiences that gov't agencies has previously ignored us for not having.",
    "question-2":
      "Sample processing procedures, interpreting data and results, making presentations, communicating with teams, working to improve accessibility between higher education institutions (+ their work) and disadvantaged communities.",
    "question-3":
      "LIterally everything! Agricultural companies are contaminating the water and no one knows the hard facts behind it (aside from personal experiences and theories) Now that I have a clearer picture of the entire process, I am looking forward to shedding light on this. I want to put everyone on blast.",
    "question-4":
      "It was having actual community members be a part of the data collection happening. This includes being a part of the collection process, working towards advocating for your community, and knowing that power community scientists have with the data collected to help themselves and their local community.",
    "question-5":
      "I'm not sure who would be in charge of this, but including webinar training, data interpretation, internal and external 'research paper literacy' workshops, and a clearer plan for work and outreach earlier in the program would be good for everyone.",
    "question-6": "No",
    "question-7": "Yes"
  },
  {
    Timestamp: "9/5/2022 23:24:47",
    fullName: "Daniel Ramirez",
    image: "/logo-alt.png",
    title: "student",
    community: "Thermal",
    "question-1":
      "I have learned that water is essential for life, so the health of any body of water determines the health of its ecosystem. In the Salton Sea, I learned what substances were in the lake such as nitrogen, phosphorous, sulfur, and others. The concentrations of these nutrients gives the community and scientists an idea on the lake's health. For instance, much of certain chemicals in the water can promote the growth of plants and animals like phytoplanktons. These plants can deplete the water from oxygen if it grows uncontrollably.",
    "question-2":
      "Through the program, I learned the systematic approach that science has on any question or issue. I learned that there were ways to answer those questions that community had about the Salton Sea by monitoring what chemicals/nutrients the water contained. This program used the method of sample collection and water treatment to determine what and how much was in the water by using multi-parameters and photometers. In science, the data collected is shared (through presentations or publicly available data) in order to obtain a better understanding of the Salton Sea's health. This can give the community insight so that we can make proposals and promote advocacy.",
    "question-3":
      "Algae growth and how it comes to be. How excessive nutrients can lead to algal blooms and lead to oxygen depletion.",
    "question-4":
      "I think making data accessible is the most valuable thing about the community science program because is informs the community about the Salton Sea. Having more knowledge about an issue enables the community to have better planning, implementation, and evaluation of a policy.",
    "question-5":
      "More sophisticated and accurate methods for measuring different parameters for water quality. Lab training and importance of accurately measuring volumes and dilutions. More efficient way to collect samples and obtain data on sampling events. More community involvement. Ensuring participants fully understand the problem or issue. Share possible solutions or alternatives.",
    "question-6": "Yes",
    "question-7": "Yes"
  },
  {
    Timestamp: "9/5/2022 23:24:51",
    fullName: "Paola Meza",
    image: "/logo-alt.png",
    title: "Undergraduate at UCSD",
    community: "Thermal",
    "question-1":
      "It was interesting to learn about the high levels of nutrients in the water such as nitrogen and sulfur which result in a detrimental impact on living organisms within and around the body of water. ",
    "question-2":
      "My favorite part of this program is really connecting with the science aspect especially the hands on portions where we physically go out to the Salton Sea and extract water samples to further analyze the nutrient concentrations.",
    "question-3":
      "I would like share the reason behind the “rotten eggs” smell that spreads throughout the community  is due to the release of sulfur emissions by algae when they metabolize. ",
    "question-4":
      "A great achievement for this program has definitely been the creation and development of the website saltonseascience.org which has become a platform where the team can share findings and crucial information regarding levels and concentrations of certain nutrients and chemicals that affect the water quality and overall the community’s health. This website was created in hopes to provide an outlook for the community to follow the progress of the program and communicate the urgency of demanding that action be taken by our local policymakers.",
    "question-5":
      "It would be great to see more people come out to the Salton Sea and get to experience first hand what it is like to obtain the water samples that lead us to discover the needs and areas in which the sea needs help.",
    "question-6": "Yes",
    "question-7": "Yes"
  },
  {
    Timestamp: "9/7/2022 10:37:47",
    fullName: "Eduardo medina",
    image: "/logo-alt.png",
    title: "Student",
    community: "Mecca",
    "question-1":
      "I learned a lot such as diluting samples, testing for phosphate and nitrate, communicate information, work in a team, and many more",
    "question-2":
      "I learned how to gather and test the water samples for different chemicals, and attended a couple of zoom calls speaking about the date that has been recovered from our findings",
    "question-3":
      "The chemicals in the water such as nitrate that can get into the air and affect breathing ",
    "question-4":
      "That the community was involved and people who cared about their living environment came to see if there was a way to help the conditions at hand or possibly at hand ",
    "question-5":
      "I would like to see more people involved for faster results and more days where we go out to test the water ",
    "question-6": "Yes",
    "question-7": "Yes"
  },
  {
    Timestamp: "9/7/2022 19:47:07",
    fullName: "Ed Luna",
    // default image
    image: "/logo-alt.png",
    title: "Water Reclamation and Reuse",
    community: "Mecca",
    "question-1":
      "Historically grounded, established and affected inland body of water for training, research, data collection and documentation for future reference.",
    "question-2":
      "As a educator/participant I am pleased to note that, when given adequately inclusive opportunities, students develop a greater sense for self-discipline and team-building roles.",
    "question-3":
      "Of course! Informed communities necessarily assume proactive postures and leadership roles in resolving environmental problems which negatively impact their neighborhoods. ",
    "question-4":
      "From my perspective, justice in all contexts relies primarily on thorough knowledge and understanding of the social, political and scientific environment(s) of human endeavor.",
    "question-5":
      " A more inclusive participation of community members, ie, students K-12, Y-A’s, adult heads of households, crafts, professional, and tech employed individuals; ultimately with certificate or educational units, that can be referenced to such as resume’s, etc.",
    "question-6": "Yes",
    "question-7": "Yes"
  }
];

const AboutUsPage = () => {
  // TODO: refactor
  // TODO: add survey api
  const classes = useStyles();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down(960));
  // @ts-ignore
  const { language } = useAppContext();
  const [activeCard, setActiveCard] = useState(false);
  const [selectedQuestion, setSelectedQuestion] =
    useState<string>("question-1");
  const [shuffledAnswers, setShuffledAnswers] = useState<any[]>([
    { image: "/logo-alt.png", fullName: "John Doe", answer: "" }
  ]);

  const handleCardClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setActiveCard((prev) => !prev);
  };
  const handleQuestionClick = (question: string) => () => {
    setSelectedQuestion(question);
    setActiveCard(() => false);
  };

  useEffect(() => {
    // TODO: fix types
    const responses: any[] = [];
    communityScienceProfiles.forEach((profile) => {
      // TODO: fix to boolean
      if (profile["question-6"] === "Yes") {
        const { fullName, image, community, title } = profile;
        // @ts-ignore
        const answer = profile[selectedQuestion];
        const question = questionObject[selectedQuestion];
        responses.push({ fullName, image, community, title, question, answer });
      }
    });
    setShuffledAnswers(shuffleArray(responses));
  }, [selectedQuestion, isMatch]);

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
      <Section>
        <Container className={classes.gridWrapper}>
          <Grid container spacing={1} justifyContent="center">
            <Grid
              item
              lg={6}
              md={6}
              sm={12}
              xs={12}
              className={classes.questionWrapper}
            >
              {Object.entries(questionObject).map(
                ([key, value]) =>
                  key !== "question-6" && (
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
              <AboutCard
                responses={shuffledAnswers}
                activeCard={activeCard}
                handleCardClick={handleCardClick}
                selectedQuestion={questionObject[selectedQuestion]}
              />
            </Grid>
          </Grid>
        </Container>
      </Section>
    </Layout>
  );
};
const useStyles = makeStyles((theme) => ({
  header: {
    boxShadow: `inset 0 -5px 0 ${theme.palette.primary.light}`
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
