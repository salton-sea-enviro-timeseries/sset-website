import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { Divider, colors } from "@material-ui/core";
import FeaturedNewsFeed from "components/InTheNews/FeaturedNewsFeed";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import { Typography } from "@material-ui/core";
import { MediaObject } from "types";
import Image from "next/image";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
// TODO: add links to definitions
// or add a glossary section ???
type Props = {
  newsMediaData?: MediaObject[];
  bodyText: React.ReactNode | null;
  title: string;
  section: number;
  gradImages?: string[];
  id: string;
};
interface GradSectionClasses {
  gradContainer: string;
  imageWrapper: string;
}
const generateContent = (
  classes: { timeLineImage: string; graphDivider: string },
  id: string,
  newsSection?: MediaObject[],
  bodyText?: React.ReactNode | null
) => {
  return newsSection ? (
    <>
      <FeaturedNewsFeed newsMediaData={newsSection} />
      <Box mt="1em">
        <Typography component="p" align="center">
          *Many of these articles use highly negative language such as “toxic”
          and “death pit” in referring to the Salton Sea, portraying a hopeless
          situation. While we are very aware of the environmental state of the
          Salton Sea, we believe such language is damaging to the surrounding
          community and discourages remediation efforts. We encourage the use of
          positive language that centers not just biodiversity but the community
          and their stories who deserve a restored sea.
        </Typography>
      </Box>
    </>
  ) : id === "section-0" ? (
    <>
      <Typography component="div">{bodyText}</Typography>
      <Box display="flex" justifyContent={"space-evenly"}>
        <Divider color={"red"} className={classes.graphDivider} />
        <FiberManualRecordIcon color="primary" fontSize="small" />
        <Divider className={classes.graphDivider} />
      </Box>
      <Box
        display={"flex"}
        alignContent={"center"}
        className={classes.timeLineImage}
      >
        <Image
          src="/salton-sea-timeline.png"
          alt="salton sea timeline"
          layout="fill"
          objectFit="contain"
        />
      </Box>
    </>
  ) : (
    <Typography component="div">{bodyText}</Typography>
  );
};
const generateGradSection = (
  classes: GradSectionClasses,
  gradImages?: string[]
) => {
  return (
    gradImages && (
      <Box className={classes.gradContainer}>
        {gradImages.map((item, index) => (
          <div key={index} className={classes.imageWrapper}>
            <Image
              src={`https:${item}`}
              alt={"grad image"}
              layout="fill"
              objectFit="contain"
            />
          </div>
        ))}
      </Box>
    )
  );
};
const PageSection: React.FC<Props> = ({
  id,
  bodyText,
  title,
  newsMediaData,
  section,
  gradImages
}: Props) => {
  const classes = useStyles();

  return (
    <Section
      className={classes.section}
      bgImage={section % 2 === 0 ? "/curves.png" : null}
    >
      <Container>
        <Box>
          <SectionHeader
            title={title}
            titleProps={{
              align: "center",
              className: classes.header,
              display: "inline"
            }}
            display="flex"
            justifyContent="center"
            size={4}
          />
          {generateContent(classes, id, newsMediaData, bodyText)}
          {generateGradSection(classes, gradImages)}
        </Box>
      </Container>
    </Section>
  );
};
const useStyles = makeStyles((theme) => ({
  header: {
    boxShadow: `inset 0 -5px 0 ${theme.palette.secondary.light}`
  },
  section: {
    "&:nth-child(odd)": { backgroundColor: colors.teal[50] }
  },
  gradContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    flexWrap: "wrap"
  },
  imageWrapper: {
    minHeight: 400,
    width: 300,
    position: "relative",
    marginTop: "1rem"
  },
  timeLineImage: {
    [theme.breakpoints.down("sm")]: {
      height: 300
    },
    [theme.breakpoints.up("sm")]: {
      height: 600
    },
    width: "100%",
    marginTop: "2rem",
    position: "relative"
  },
  graphDivider: {
    margin: "auto",
    width: "50%",
    height: 2,
    borderRadius: 50,
    background: "#BCBCBC"
  }
}));
export default PageSection;
