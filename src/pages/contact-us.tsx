// import Head from "next/head";
import { getCmsContent } from "util/getCmsContent";
import type { InferGetServerSidePropsType } from "next";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { ContactPage } from "util/getCmsContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Box, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useAppContext } from "components/AppContext";
import Hero from "components/Hero";
import Section from "components/Section";
import Layout from "components/Layout";
import Meta from "components/Meta";

const ContactUsPage = ({
  cmsData
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const classes = useStyles();
  // @ts-ignore
  const { language } = useAppContext();
  // cms const start===============================================================
  const locale = language === "en" ? "en-US" : "es";
  const heroTitle = cmsData.fields.title[locale];
  const heroImage = cmsData.fields.heroImage["en-US"].fields.file["en-US"].url;
  const membersList = cmsData.fields.members["en-US"];
  const contactUsBodyText = cmsData.fields.body[locale];
  const applyLink = cmsData.fields.applyLink["en-US"];
  const callToActionText = cmsData.fields.callToAction[locale];
  // cms const end ===============================================================
  return (
    <Layout>
      <Meta title="Contact Us | Salton Sea Environmental Timeseries" />
      <Hero
        bgColor="secondary"
        size="medium"
        bgImage={heroImage}
        title={heroTitle}
        subtitle={null}
        cta={null}
      />
      <Section>
        <Container maxWidth="sm" className={classes.container}>
          <Card className={classes.card}>
            {/* TODO: Refactor: Move to separate component */}
            <Box width="100%" display="flex">
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <List dense>
                    <ListItem
                      dense
                      button
                      component="a"
                      href={membersList[0].fields.email["en-US"]}
                    >
                      <ListItemText
                        primary={membersList[0].fields.name["en-US"]}
                        secondary={membersList[0].fields.email["en-US"]}
                      />
                    </ListItem>
                    <ListItem
                      dense
                      button
                      component="a"
                      href={membersList[0].fields.website["en-US"]}
                      target="_blank"
                    >
                      <ListItemText
                        primary={membersList[0].fields.website["en-US"]}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </div>
              <CardMedia
                className={classes.cover}
                image={
                  membersList[0].fields.affiliation["en-US"].fields.file[
                    "en-US"
                  ].url
                }
                title="Alianza CV"
              />
            </Box>
            <Box width="100%" display="flex">
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <List>
                    <ListItem
                      dense
                      button
                      component="a"
                      href={membersList[1].fields.email["en-US"]}
                    >
                      <ListItemText
                        primary={membersList[1].fields.name["en-US"]}
                        secondary={membersList[1].fields.email["en-US"]}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </div>
              <CardMedia
                className={classes.cover}
                image={
                  membersList[1].fields.affiliation["en-US"].fields.file[
                    "en-US"
                  ].url
                }
                title="Loma Linda University"
              />
            </Box>
          </Card>
          <Card>
            <CardContent>
              <Typography align="center" variant="h6" component="p">
                {contactUsBodyText}
              </Typography>
              <Box display="flex" pt={3} justifyContent="center">
                <Button
                  href={applyLink}
                  target="_blank"
                  size="large"
                  variant="contained"
                  color="primary"
                >
                  {callToActionText}
                </Button>
              </Box>
            </CardContent>
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
    top: "-6rem"
  },
  card: {
    display: "flex",
    flexDirection: "column",
    margin: "1rem 0"
  },
  details: {
    display: "flex",
    flexDirection: "column",
    flex: "1 0 auto"
  },
  content: {
    flex: "1 0 auto",
    padding: "8px"
  },
  cover: {
    width: "50%",
    backgroundSize: "contain"
  }
}));

export default ContactUsPage;

export const getServerSideProps = async () => {
  const contactPage = await getCmsContent<ContactPage>("contactPage");
  return {
    props: {
      cmsData: contactPage
    }
  };
};
