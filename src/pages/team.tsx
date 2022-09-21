import type { InferGetStaticPropsType } from "next";
import {
  Box,
  Button,
  Container,
  makeStyles,
  Typography
} from "@material-ui/core";
import Link from "next/link";

import Layout from "components/Layout";
import Hero from "components/Hero";
import AboutSaltonSeaSection from "components/AboutSaltonSeaSection";
import AboutUsSection from "components/AboutUsSection";
import InTheNewsSection from "components/InTheNewsSection";
import scrape from "../lib/scrape";
import { getContent } from "util/getContent";
import { useAppContext } from "components/AppContext";
import TeamSection from "components/TeamSection";
import { TeamMember } from "types";
import GallerySection from "components/GallerySection";

const TeamPage = ({
  team,
  gallery
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  // @ts-ignore
  // const { language } = useAppContext();
  const classes = useStyles();

  return (
    <Layout>
      <Container className={classes.root} maxWidth="md">
        <Typography gutterBottom variant="h3" component="h1">
          Meet the Team
        </Typography>
        <Box py={7}>
          <GallerySection gallery={gallery} />
        </Box>
        <Box py={7}>
          <TeamSection team={team} />
        </Box>
      </Container>
    </Layout>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    padding: theme.spacing(5, 0)
  }
}));

export default TeamPage;

export const getStaticProps = async () => {
  const faker = require("@faker-js/faker").faker;

  const team: TeamMember[] = [];

  Array.from({ length: 6 }).forEach(() => {
    team.push({
      name: faker.name.fullName(),
      title: faker.name.jobTitle(),
      bio: faker.lorem.paragraph(),
      image: faker.image.abstract(640, 480, true),
      twitter: "https://twitter.com/",
      linkedin: "https://www.linkedin.com/in/",
      email: "myemail@mail.com",
      website: "https://www.google.com"
    });
  });

  const gallery = Array.from({ length: 12 }).map(
    () => faker.image.abstract(640, 480, true) as string
  );

  return {
    props: {
      team,
      gallery
    }
  };
};
