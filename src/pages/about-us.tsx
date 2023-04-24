import {
  Container,
  Button,
  Box,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Typography,
  CardActionArea
} from "@material-ui/core";
import Image from "next/image";
import { Card, CardMedia } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useAppContext } from "components/AppContext";
import Hero from "components/Hero";
import Section from "components/Section";
import Layout from "components/Layout";
import Meta from "components/Meta";
import Translation from "components/Translation";
import ResourceSection from "components/ResourceSection";
import CardDetails from "components/BioCard/CardDetails";

const AboutUsPage = () => {
  const classes = useStyles();

  // @ts-ignore
  const { language } = useAppContext();

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
        <Container maxWidth="sm" className={classes.container}>
          <Card className={classes.frontCard} elevation={4}>
            <CardActionArea style={{ height: "100%" }}>
              <CardContent className={classes.content}>
                <Typography align="center" variant="h6">
                  Question Goes Here: Lorem ipsum dolor sit amet.Lorem ipsum
                  dolor sit amet Lorem ipsum dolor sit amet. Lorem ipsum dolor
                  sit amet
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card className={classes.backCard} elevation={4}>
            <CardActionArea style={{ height: "100%" }}>
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
  container: {
    // backgroundColor: "blue"
    // top: "-6rem"
  },
  frontCard: {
    margin: "1rem 0",
    height: "300px"
  },
  backCard: {
    margin: "1rem 0"
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
