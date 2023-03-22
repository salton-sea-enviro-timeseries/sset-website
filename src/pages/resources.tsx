import { Typography, Container, Button, Box, Grid } from "@material-ui/core";
import { List, ListItem, ListItemText, ListItemIcon } from "@material-ui/core";
import { Card, CardActions, CardContent, CardMedia } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
import LaunchOutlinedIcon from "@material-ui/icons/LaunchOutlined";
import Skeleton from "@material-ui/lab/Skeleton";
import DownloadIcon from "@material-ui/icons/CloudDownload";
import Hero from "components/Hero";
import Section from "components/Section";
import Layout from "components/Layout";
import SectionHeader from "components/SectionHeader";
import Meta from "components/Meta";
import Translation from "components/Translation";
import { fetcher } from "utils";
import useSWR from "swr";
type ArticleData = {
  data: {
    key: string;
    url: string;
    title: string;
    publicationTitle?: string;
    date: string;
  };
  meta: { creatorSummary: string };
};
const Resources = () => {
  const classes = useStyles();
  const groupID = 4854089;
  const zoteroUrl = `https://api.zotero.org/groups/${groupID}/items/top?limit=10&order=dateModified&v=3`;
  const { data = [], error } = useSWR(zoteroUrl, fetcher);
  const isLoading = !data.length && !error;
  // TODO add Translations and import content from Contentful
  const placeHolderList = Array.from({ length: 3 }).map((_, index) => (
    <ListItem key={index}>
      <ListItemIcon style={{ marginRight: "1rem" }}>
        <Skeleton height={50} width="100%" variant="rect" />
      </ListItemIcon>
      <ListItemText>
        <Skeleton animation="wave" variant="text" height={25} width="100%" />
        <Skeleton animation="wave" variant="text" height={20} width="100%" />
        <Skeleton animation="wave" variant="text" height={10} width="100%" />
      </ListItemText>
    </ListItem>
  ));
  return (
    <Layout>
      <Meta title="Resources | Salton Sea Environmental Timeseries" />
      <Translation
        path="site.language.navLinks.resources"
        propsToTranslate={{
          title: "site.language.navLinks.resources"
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
        <Container
          maxWidth="xl"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Box className={classes.flyerContainerWrapper}>
            <Box className={classes.flyerContainer}>
              <Card className={classes.backCard}>
                <CardMedia
                  component={"img"}
                  className={classes.cover}
                  image="/salton-sea-flyer-back.jpg"
                  title="Alianza CV"
                />
              </Card>
              <Card className={classes.frontCard} elevation={5}>
                <CardMedia
                  component={"img"}
                  className={classes.cover}
                  image="/salton-sea-flyer-front.jpg"
                  title="Alianza CV"
                />
              </Card>
            </Box>
          </Box>

          <Box display="flex" justifyContent={"center"}>
            <Button color="primary" href="/salton-sea-flyer.pdf" download>
              Download Our Flyer
            </Button>
          </Box>
          <SectionHeader
            title={"Zotero Artilces"}
            titleProps={{
              align: "center",
              className: classes.section,
              display: "inline"
            }}
            paddingTop="1rem"
            display="flex"
            justifyContent="center"
            size={4}
          />

          <Box className={classes.zoteroContainer}>
            <Card className={classes.zotero}>
              <CardContent>
                {isLoading ? (
                  <List>{placeHolderList}</List>
                ) : (
                  <List>
                    {data.map(({ data: article, meta }: ArticleData) => (
                      <ListItem
                        key={article.key}
                        button
                        component="a"
                        href={article.url}
                        target="_blank"
                      >
                        <ListItemIcon>
                          <AssignmentOutlinedIcon
                            fontSize="large"
                            color="secondary"
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={article.title}
                          secondary={
                            <>
                              <Typography
                                component="span"
                                display="block"
                                variant="body1"
                              >
                                {meta.creatorSummary} • {article.date}
                              </Typography>
                              {article.publicationTitle &&
                                article.publicationTitle}
                            </>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                )}
              </CardContent>
              <CardActions disableSpacing className={classes.zoteroButton}>
                <Button
                  endIcon={<LaunchOutlinedIcon />}
                  target="_blank"
                  size="small"
                  variant="contained"
                  color="primary"
                  href={`https://www.zotero.org/groups/${groupID}/saltonseascience/`}
                  download
                >
                  Zotero
                </Button>
              </CardActions>
            </Card>
          </Box>
        </Container>
      </Section>
    </Layout>
  );
};
const useStyles = makeStyles((theme) => ({
  header: {
    boxShadow: `inset 0 -5px 0 ${theme.palette.primary.light}`
  },
  section: {
    boxShadow: `inset 0 -5px 0 ${theme.palette.secondary.light}`
  },
  card: {
    width: 300,
    margin: "1rem 0"
  },
  zotero: {
    maxWidth: 800
  },
  cover: {
    backgroundSize: "contain"
  },
  flyerTitle: {
    fontWeight: 400
  },
  zoteroContainer: {
    display: "flex",
    justifyContent: "center"
  },
  zoteroButton: {
    justifyContent: "flex-end"
  },
  flyerContainerWrapper: {
    minWidth: "370px",
    maxHeight: 480
  },
  flyerContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column"
    },
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row"
    }
  },
  frontCard: {
    width: 300,
    margin: "1rem 0",
    transition: "transform 300ms",
    [theme.breakpoints.up("sm")]: {
      transform: "rotate(8deg)"
    },
    [theme.breakpoints.down("xs")]: {
      position: "relative",
      zIndex: 1,
      left: "2.5em",
      top: "1.5em"
    }
  },
  backCard: {
    width: 300,
    margin: "1rem 0",
    transition: "transform 300ms",
    [theme.breakpoints.up("sm")]: {
      transform: "rotate(-8deg)"
    },
    [theme.breakpoints.down("xs")]: {
      position: "absolute",
      zIndex: 0,
      bottom: "2em",
      left: "0"
    }
  }
}));

export default Resources;
