import { Container, Button, Box } from "@material-ui/core";
import Image from "next/image";
import { Card, CardMedia } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Hero from "components/Hero";
import Section from "components/Section";
import Layout from "components/Layout";
import Meta from "components/Meta";
import Translation from "components/Translation";
import ResourceSection from "components/ResourceSection";
type ArticleData = {
  data: {
    key: string;
    url: string;
    title: string;
    publicationTitle?: string;
    date: string;
  };
  links: {
    alternate: {
      href: string;
    };
  };
  meta: { creatorSummary: string };
};
const Resources = () => {
  const classes = useStyles();
  const groupID = 4854089;
  const zoteroUrl = `https://api.zotero.org/groups/${groupID}/items/top?limit=10&order=dateModified&v=3`;
  // TODO add Translations and import content from Contentful
  //  TODO Refactor : Make dry...
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
                <Image
                  src="/salton-sea-flyer-back.jpg"
                  alt="Alianza CV"
                  width={400}
                  height={(400 * 3300) / 2550}
                  priority
                />
              </Card>
              <Card className={classes.frontCard} elevation={5}>
                <Image
                  src="/salton-sea-flyer-front.jpg"
                  alt="Alianza CV"
                  width={400}
                  height={(400 * 3300) / 2550}
                  priority
                />
              </Card>
            </Box>
          </Box>
          <Box display="flex" justifyContent={"center"}>
            <Button color="primary" href="/salton-sea-flyer.pdf" download>
              Download Our Flyer
            </Button>
          </Box>
          <ResourceSection
            title={"Scientific Articles"}
            body="This links to a repository in Zotero of scientific articles. You
              can sign up for an account and request membership in the
              repository to get free access to PDFs of scientific articles. Feel
              free to add articles to this collaborative repository or reach out
              if there is an article that you want to read but don’t have access
              to!"
            link={`https://www.zotero.org/groups/${groupID}/saltonseascience/`}
            download={false}
          />
          <ResourceSection
            title={"2023 Salton Sea TMDL Public Letter"}
            body="Download PDF Establishment of Salton Sea TMDLs in 2023"
            link={"/salton-sea-mdl-public-letter-2023.pdf"}
            download={true}
          />
        </Container>
      </Section>
    </Layout>
  );
};
const useStyles = makeStyles((theme) => ({
  header: {
    boxShadow: `inset 0 -5px 0 ${theme.palette.primary.light}`,
    transition: "color 0.2s ease",
    "&:hover": {
      color: theme.palette.secondary.light
    }
  },
  section: {
    boxShadow: `inset 0 -5px 0 ${theme.palette.secondary.light}`
  },
  zotero: {
    maxWidth: 800
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
    minWidth: "365px"
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
    height: 385,
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
    height: 385,
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
  },
  imageWrapper: {
    position: "relative",
    width: "100%",
    height: "100%"
  }
}));

export default Resources;

// TODO: Bottom component may be used in the future once Zotero list is confirmed
// const { data = [], error, isValidating } = useSWR(zoteroUrl, fetcher);
// TODO add Translations and import content from Contentful
// const placeHolderList = Array.from({ length: 3 }).map((_, index) => (
//   <Grid container spacing={1} key={index} alignItems="center">
//     <Grid item>
//       <ButtonBase style={{ width: 80, height: 80 }}>
//         <Skeleton
//           animation="wave"
//           variant="text"
//           height="100%"
//           width="100%"
//         />
//       </ButtonBase>
//     </Grid>
//     <Grid item xs={12} sm container>
//       <Grid item xs container direction="column" spacing={2}>
//         <Grid item xs>
//           <Skeleton animation="wave" variant="text" height={25} />
//           <Skeleton animation="wave" variant="text" height={20} />
//           <Skeleton animation="wave" variant="text" height={10} />
//         </Grid>
//       </Grid>
//     </Grid>
//   </Grid>
// ));
{
  /* <Box className={classes.zoteroContainer}>
<Card className={classes.zotero}>
  <CardContent>
    {isValidating
      ? placeHolderList
      : data.map(
          ({
            data: article,
            meta,
            links: { alternate }
          }: ArticleData) => (
            <Box key={article.key} style={{ marginBottom: "1rem" }}>
              <Grid container spacing={1} alignItems="center">
                <Grid item>
                  <IconButton href={alternate.href} target="_blank">
                    <AssignmentOutlinedIcon
                      fontSize="large"
                      color="secondary"
                    />
                  </IconButton>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid
                    item
                    xs
                    container
                    direction="column"
                    spacing={2}
                  >
                    <Grid item xs>
                      <Typography
                        variant="subtitle1"
                        component="div"
                      >
                        {article.title}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {meta.creatorSummary} • {article.date}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                      >
                        {article.publicationTitle &&
                          article.publicationTitle}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          )
        )}
    {error && (
      <Typography>Error retrieving Scientific Articles</Typography>
    )}
    <Divider />
    <Typography variant="caption">
      *List of articles above were gathered from Zotero; a tool used
      to collect, organize, annotate, cite, and share research.
    </Typography>
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
</Box>  */
}
