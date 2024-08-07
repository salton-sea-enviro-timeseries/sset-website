import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Divider, colors } from "@material-ui/core";
import FeaturedNewsFeed from "components/InTheNews/FeaturedNewsFeed";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import { Typography } from "@material-ui/core";
import { MediaObject } from "types";
import Image from "next/image";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
// TODO: add links to definitions
// or add a glossary section ???
interface GradImages {
  imageTitle: string;
  imageUrl: string;
}
type Props = {
  newsMediaData?: MediaObject[];
  bodyText: React.ReactNode | null;
  title: string;
  section: number;
  gradImages?: GradImages[];
  id: string;
};
interface GradSectionClasses {
  avatarStyle: string | undefined;
  gradContainer: string;
  imageWrapper: string;
}
const generateContent = (
  classes: {
    timeLineImage: string;
    graphDivider: string;
  },
  id: string,
  sectionId: string,
  newsSection?: MediaObject[],
  bodyText?: React.ReactNode | null
) => {
  return newsSection ? (
    <>
      <FeaturedNewsFeed newsMediaData={newsSection} />
      <Box mt="1em" id={sectionId}>
        <Typography component="p" align="center" style={{ fontWeight: "bold" }}>
          <sup style={{ color: "red" }}>†</sup>Many of these articles use highly
          negative language such as “toxic” and “death pit” in referring to the
          Salton Sea, portraying a hopeless situation. While we are very aware
          of the environmental state of the Salton Sea, we believe such language
          is damaging to the surrounding community and discourages remediation
          efforts. We encourage the use of positive language that centers not
          just biodiversity but the community and their stories who deserve a
          restored sea.
        </Typography>
      </Box>
    </>
  ) : id === "section-0" ? (
    <>
      <Typography component="div">{bodyText}</Typography>
      <Box display="flex" justifyContent={"space-evenly"}>
        <Divider className={classes.graphDivider} />
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
  gradImages?: GradImages[]
) => {
  return (
    gradImages && (
      <Box className={classes.gradContainer}>
        {gradImages.map(({ imageTitle, imageUrl }, index) => (
          <div key={index} className={classes.imageWrapper}>
            <Avatar className={classes.avatarStyle}>
              <Image
                src={`https:${imageUrl}`}
                alt={"grad image"}
                layout="fill"
                objectFit="cover"
              />
            </Avatar>
            <Typography variant="h6">{imageTitle}</Typography>
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
  const sectionId = title.split(" ").join("").toLocaleLowerCase() + "-section";
  return (
    <Section
      className={classes.section}
      bgImage={section % 2 === 0 ? "/curves.png" : null}
    >
      <Container>
        <Box>
          <SectionHeader
            title={title}
            sectionId={sectionId}
            sectionFootNoteLink={!!newsMediaData}
            titleProps={{
              align: "center",
              className: classes.header,
              display: "inline"
            }}
            display="flex"
            justifyContent="center"
            size={"h4"}
          />
          {generateContent(classes, id, sectionId, newsMediaData, bodyText)}
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
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  "@global": {
    "@keyframes fade": {
      from: {
        opacity: 0
      },
      to: {
        opacity: 1
      }
    }
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
    position: "relative",
    animation: "fade linear both",
    animationTimeline: "view()",
    animationRange: "entry 50% cover 50%"
  },
  graphDivider: {
    margin: "auto",
    width: "50%",
    height: 2,
    borderRadius: 50,
    background: "#BCBCBC"
  },
  avatarStyle: {
    width: 250,
    height: 250
  }
}));
export default PageSection;
