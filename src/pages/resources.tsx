import { Container, Button, Box, Typography } from "@mui/material";
import Image from "next/image";
import { Card } from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import { useAppContext } from "components/AppContext";
import Hero from "components/Hero";
import Section from "components/Section";
import Layout from "components/Layout";
import Meta from "components/Meta";
import Translation from "components/Translation";
import ResourceSection from "components/ResourceSection";
import PackedBubbleChart from "components/resources/PackedBubbleChart";
// type ArticleData = {
//   data: {
//     key: string;
//     url: string;
//     title: string;
//     publicationTitle?: string;
//     date: string;
//   };
//   links: {
//     alternate: {
//       href: string;
//     };
//   };
//   meta: { creatorSummary: string };
// };
const Resources = () => {
  const groupID = 4854089;
  // const zoteroUrl = `https://api.zotero.org/groups/${groupID}/items/top?limit=10&order=dateModified&v=3`;
  // @ts-ignore
  const { language } = useAppContext();
  // TODO add Translations and import content from Contentful
  //  TODO Refactor : Make dry...
  return (
    <Layout minWidth={"825px"}>
      <div>
        <Meta title="Resources | Salton Sea Environmental Timeseries" />
        <Translation
          path="site.language.navLinks.resources"
          propsToTranslate={{
            title: "site.language.navLinks.resources"
          }}
        >
          <Hero bgColor="secondary" size="medium" />
        </Translation>
        <Section>
          <StyledContainer maxWidth="xl">
            <FlyerContainerWrapper>
              <FlyerContainer>
                <BackCard>
                  <Image
                    src="/salton-sea-flyer-back.jpg"
                    alt="Alianza CV"
                    width={400}
                    height={(400 * 3300) / 2550}
                    priority
                  />
                </BackCard>
                <FrontCard elevation={5}>
                  <Image
                    src="/salton-sea-flyer-front.jpg"
                    alt="Alianza CV"
                    width={400}
                    height={(400 * 3300) / 2550}
                    priority
                  />
                </FrontCard>
              </FlyerContainer>
            </FlyerContainerWrapper>
            <Box display="flex" justifyContent={"center"}>
              <Button
                color="primary"
                href={`/salton-sea-flyer-${language}.pdf`}
                download
              >
                {language === "en"
                  ? "Download Our Flyer (EN)"
                  : "Descarga nuestro volante (ES)"}
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
          </StyledContainer>
        </Section>
        <Section>
          <PackedBubbleChart />
        </Section>
        <Section>
          <Container>
            <ResourceSection
              title={"Salton Sea Ownership"}
              link={`/salton-sea-ownership-map.pdf`}
              download={true}
            />
            <Box display="flex" alignItems="center" flexDirection={"column"}>
              <ZoomAnimation mb="1rem">
                <Image
                  src="/ssa-ownership-map.png"
                  alt="SSA Ownership Map"
                  objectFit="contain"
                  width={400}
                  height={300}
                  layout="responsive"
                />
              </ZoomAnimation>
              <ZoomAnimation>
                <Image
                  src="/ssa-ownership-map-legend.png"
                  alt="SSA Ownership Map"
                  objectFit="contain"
                  width={650}
                  height={350}
                  layout="responsive"
                />
              </ZoomAnimation>
            </Box>
          </Container>
        </Section>
        <Container>
          <FieldScopeTitle variant="h4" as="header" align="center">
            Field Scope
          </FieldScopeTitle>
          <FlexContainer>
            <FlexItem>
              <ResourceSection
                title="Monitoring Salton Sea"
                body="A link to Field Scope, a tool used to design a pilot project led by the community to monitor the Salton Sea water quality."
                link="https://saltonsea.fieldscope.org/"
                download={false}
                headerSize={5}
              >
                <ImageWrapper>
                  <Image
                    src="/field-scope-monitoring-salton-sea-water-quality.png"
                    alt="Field Scope: Monitoring Salton Sea Water Quality"
                    objectFit="contain"
                    width={400}
                    height={200}
                    layout="responsive"
                  />
                </ImageWrapper>
              </ResourceSection>
            </FlexItem>
            <FlexItem>
              <ResourceSection
                title="Salton Sea Air Quality"
                body="A link to Field Scope, a tool used to make visualizations from community member contributions measuring Salton Sea air quality."
                link="https://saltonair.fieldscope.org/"
                download={false}
                headerSize={5}
              >
                <ImageWrapper>
                  <Image
                    src="/field-scope-salton-sea-air-quality.png"
                    alt="Field Scope: Salton Sea Air Quality"
                    objectFit="contain"
                    width={400}
                    height={200}
                    layout="responsive"
                  />
                </ImageWrapper>
              </ResourceSection>
            </FlexItem>
          </FlexContainer>
        </Container>
      </div>
    </Layout>
  );
};
const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
}));

const FlyerContainerWrapper = styled(Box)({
  minWidth: "365px"
});

const FlyerContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column"
  },
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row"
  }
}));

const FrontCard = styled(Card)(({ theme }) => ({
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
}));

const BackCard = styled(Card)(({ theme }) => ({
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
}));
const ImageWrapper = styled(Box)({
  maxWidth: "100%",
  height: "auto",
  verticalAlign: "middle",
  fontStyle: "italic",
  backgroundRepeat: "no-repeat",
  shapeMargin: "1rem"
});

const zoomAnimationKeyframes = keyframes`
  from {
    width: 50%;
    opacity: 25%;
  }
  to {
    opacity: 1;
    width: 100%;
  }
`;

const ZoomAnimation = styled(ImageWrapper)(({ theme }) => ({
  animation: `${zoomAnimationKeyframes} linear both`,
  animationTimeline: "view()",
  animationRange: "entry 50% cover 45%"
}));

const FieldScopeTitle = styled(Typography)({
  fontSize: "2rem",
  marginBottom: "1rem"
});

const FlexContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between"
}));

const FlexItem = styled(Box)(({ theme }) => ({
  flex: "1 1 45%",
  margin: "1rem",
  boxSizing: "border-box",
  [theme.breakpoints.down("sm")]: {
    flex: "1 1 100%"
  }
}));

const StyledPackedBubbleChartContainer = styled(Section)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minWidth: "825px",
  maxWidth: "100vw"
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
