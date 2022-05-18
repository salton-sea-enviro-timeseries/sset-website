// import Head from "next/head";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Box, Card, colors, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Hero from "components/Hero";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import Layout from "components/Layout";

const ContactUsPage = () => {
  const classes = useStyles();
  return (
    <Layout>
      <Hero
        bgColor="secondary"
        size="medium"
        bgImage="/topography.svg"
        // bgImageOpacity={0.9}
        title="Contact Us"
        // subtitle="Some nice words here."
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
      <Section>
        <Container maxWidth="sm" className={classes.container}>
          <Card className={classes.card}>
            <Box width="100%" display="flex">
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <List dense>
                    <ListItem
                      dense
                      button
                      component="a"
                      href="mailto:nilda@alianzacv.org"
                    >
                      <ListItemText
                        primary="Nilda Ruiz"
                        secondary="nilda@alianzacv.org"
                      />
                    </ListItem>
                    <ListItem
                      dense
                      button
                      component="a"
                      href="https://www.alianzacv.org/"
                      target="_blank"
                    >
                      <ListItemText primary="www.alianzacv.org" />
                    </ListItem>
                  </List>
                </CardContent>
              </div>
              <CardMedia
                className={classes.cover}
                image="/alianzacv-logo.jpg"
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
                      href="mailto:rsinclair@llu.edu"
                    >
                      <ListItemText
                        primary="Dr. Ryan Sinclair"
                        secondary="rsinclair@llu.edu"
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </div>
              <CardMedia
                className={classes.cover}
                image="/loma-linda-university.png"
                title="Loma Linda University"
              />
            </Box>
          </Card>
          <Card>
            <CardContent>
              <Typography align="center" variant="h6" component="p">
                We are always looking for volunteers to help us with our
                research and outreach. We provide a modest stipend to compensate for the labor. If you are interested in volunteering for
                our research, please apply.
              </Typography>
              <Box pt={3} display="flex" justifyContent="center">
                <Button size="large" variant="contained" color="primary">
                  Coming Soon
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
