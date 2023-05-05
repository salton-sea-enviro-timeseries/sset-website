import { useState } from "react";
import {
  Container,
  CardContent,
  Typography,
  CardActionArea
} from "@material-ui/core";
import Image from "next/image";
import { Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useAppContext } from "components/AppContext";
import Hero from "components/Hero";
import Section from "components/Section";
import Layout from "components/Layout";
import Meta from "components/Meta";
import Translation from "components/Translation";

import CardDetails from "components/BioCard/CardDetails";

const AboutUsPage = () => {
  // TODO: refactor
  // TODO: add survey api
  const classes = useStyles();
  // @ts-ignore
  const { language } = useAppContext();
  const [activeCards, setActiveCards] = useState<{ [key: number]: boolean }>(
    {}
  );
  const handleCardClick: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    const cardId = parseInt(event.currentTarget.dataset.cardId || "");
    setActiveCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

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
        <Container maxWidth="sm">
          <div className={classes.flipCard} key={1}>
            <div
              className={`${classes.flipCardInner} ${
                activeCards[1] ? classes.flipped : ""
              }`}
            >
              <div className={classes.flipCardFront}>
                <Card className={classes.frontCard} elevation={4}>
                  <CardActionArea
                    data-card-id={1}
                    style={{ height: "100%" }}
                    onClick={handleCardClick}
                  >
                    <CardContent className={classes.content}>
                      <Typography align="center" variant="h6">
                        Question Goes Here: Lorem ipsum dolor sit amet.Lorem
                        ipsum dolor sit amet Lorem ipsum dolor sit amet. Lorem
                        ipsum dolor sit amet
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
              <div className={classes.flipCardBack}>
                <Card className={classes.backCard} elevation={4}>
                  <CardActionArea
                    data-card-id={1}
                    style={{ height: "100%" }}
                    onClick={handleCardClick}
                  >
                    <CardContent style={{ height: "100%", padding: 0 }}>
                      <CardDetails
                        image="/logo-alt.png"
                        name={"John Doe"}
                        bio={
                          "Nam ut enim nec metus aliquet imperdiet nec sit amet mi.  Nunc laoreet pulvinar lectus. In ac efficitur lectus. Aliquam vulputate, augue at rutrum placerat, dolor ante sodales velit, non posuere augue ipsum rutrum erat. Morbi vel blandit nunc. Sed rhoncus, diam in eleifend iaculis, tortor arcu sodales magna, id pretium leo eros eu lectus. Phasellus tempor bibendum enim, eu ornare ante sagittis non."
                        }
                        answer={
                          "Phasellus tempor bibendum enim, eu ornare ante sagittis non."
                        }
                      />
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
            </div>
          </div>
          <div className={classes.flipCard} key={2}>
            <div
              className={`${classes.flipCardInner} ${
                activeCards[2] ? classes.flipped : ""
              }`}
            >
              <div className={classes.flipCardFront}>
                <Card className={classes.frontCard} elevation={4}>
                  <CardActionArea
                    data-card-id={2}
                    style={{ height: "100%" }}
                    onClick={handleCardClick}
                  >
                    <CardContent className={classes.content}>
                      <Typography align="center" variant="h6">
                        Question Goes Here: Lorem ipsum dolor sit amet.Lorem
                        ipsum dolor sit amet Lorem ipsum dolor sit amet. Lorem
                        ipsum dolor sit amet
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
              <div className={classes.flipCardBack}>
                <Card className={classes.backCard} elevation={4}>
                  <CardActionArea
                    data-card-id={2}
                    style={{ height: "100%" }}
                    onClick={handleCardClick}
                  >
                    <CardContent style={{ height: "100%", padding: 0 }}>
                      <CardDetails
                        image="/logo-alt.png"
                        name={"John Doe"}
                        bio={
                          "Nam ut enim nec metus aliquet imperdiet nec sit amet mi.  Nunc laoreet pulvinar lectus. In ac efficitur lectus. Aliquam vulputate, augue at rutrum placerat, dolor ante sodales velit, non posuere augue ipsum rutrum erat. Morbi vel blandit nunc. Sed rhoncus, diam in eleifend iaculis, tortor arcu sodales magna, id pretium leo eros eu lectus. Phasellus tempor bibendum enim, eu ornare ante sagittis non."
                        }
                        answer={
                          "Phasellus tempor bibendum enim, eu ornare ante sagittis non."
                        }
                      />
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
            </div>
          </div>
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

  frontCard: {
    height: "100%"
  },
  backCard: {
    height: "100%"
  },
  flipCard: {
    perspective: "1000px",
    marginBottom: "2rem",
    display: "grid",
    [theme.breakpoints.down("md")]: {
      minHeight: "500px"
    },
    [theme.breakpoints.up("md")]: {
      minHeight: "310px"
    }
  },
  flipCardInner: {
    position: "relative",
    backgroundColor: "blue",
    width: "100%",
    height: "100%",
    transition: "transform 0.9s",
    transformStyle: "preserve-3d"
  },
  flipCardFront: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden"
  },
  flipCardBack: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    transform: "rotateY(180deg)"
  },
  flipped: {
    transform: "rotateY(180deg)"
  },
  details: {
    display: "flex",
    flexDirection: "column",
    flex: "1 0 auto"
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%"
  },
  cover: {
    width: "50%",
    backgroundSize: "contain"
  }
}));

export default AboutUsPage;
