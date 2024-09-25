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
import RowOfImages from "./custom-news-section/RowOfImages";
import RowWithTextAndImage from "./custom-news-section/RowWithTextAndImage";
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
      <Typography variant="h5">
        Salton Sea Communities Face Rising Challenges Amid New Water
        Conservation Deal
      </Typography>
      {/* adding post for water irrigation deal */}
      <Box mt={2} mb={4}>
        <RowWithTextAndImage
          text={`On August 12, 2024, the Imperial Irrigation District (IID) approved a water conservation deal with the federal government. 
          This deal provides farmers with up to $300/af  for reducing water usage either through water conservation on farms,
          deficit irrigation (halting irrigation for periods of 45-60 days), or fallowing fields.
          This deal was approved with only a cursory public participation process with one month for public comment on an environmental
          assessment and a public meeting announced only 24 hours in advance.
          The environmental assessment did not comprehensively consider the impact on communities and downplayed the significant impact that 
          water use reductions will have on the Salton Sea.\n\n

          Now, just a month after the signing of the deal, the effects are already apparent, with communities scrambling to adapt amid the resulting challenges (Fig. 1).
          Water level data collected by the USGS in collaboration with the IID show that during August the Salton Sea declined by ~0.21 inches per day (6.3 inches per month),
          a significant increase over last year’s large decline of 0.14 inches per day (4.2 inches per month), as seen in Figs. 2 and 3.
          Even more alarming, the water level rate of decline for September (through Sept. 22, 2024) is 0.215 inches per day (6.45 inches per month), 
          more than twice as large as the rate of decline in September 2023 (Figs. 2 and 3).
          This extraordinary water level decline will subject residents to even greater exposure to dust and other pollutants from the exposed lakebed. 
          The effects of increased water level decline on harmful gas emissions such as hydrogen sulfide, from both the water and the newly exposed playa, remain unknown.\n\n

          While farm owners have received compensation for this program, area residents have not received compensation for their loss of work and no additional effort 
          has been made to mitigate the environmental health impacts of this increased shoreline exposure. Consequently, this has led to significant discontent 
          among the communities surrounding the Salton Sea (e.g. Fig. 4).`}
          imgSrc="/water-consv-deal-figs/figure-1-pier.jpg"
          altText="Improvised pier at the Salton Sea made of wooden pallets"
          captionText={
            <>
              <b>Figure 1</b>. Improvised pier used to launch an inflatable boat
              (August 28, 2024). The 12-meter pier extends over playa that had
              not been exposed on August 1, 2024.
            </>
          }
          imgWidth={"400px"}
          imgHeight={"600px"}
        />
        <RowOfImages
          imgSrc1="/water-consv-deal-figs/figure-2-water-lvl-rateofchange.png"
          altText1="Chart showing change of water at the Salton Sea"
          captionText1={
            <>
              <b>Figure 2</b>. Monthly rate of Salton Sea water level increase
              (positive) or decrease (negative) based on linear fits to USGS
              water level data (station 10254005) for fits with R² &gt;= 0.9.
              Missing data bars represent months where the fit had R² &lt; 0.9.
              The water level change rate for September includes data up to
              September 22, 2024, which was the most current data available at
              the time of writing.
            </>
          }
          imgSrc2="/water-consv-deal-figs/figure-3-total_water_level_ft.png"
          altText2="Chart showing total water level at the Salton Sea from May to Oct in 2024"
          captionText2={
            <>
              <b>Figure 3</b>. Salton Sea water level (ft) relative to the level
              measured on May 15 of each year. The plot displays 3-day running
              means of 15-minute raw water level data from USGS station
              10254005. May 15 was selected as the reference point, as it
              closely aligns with the seasonal high in water level driven by
              farming practices.
            </>
          }
          imgSrc3="/water-consv-deal-figs/figure-4-cpmmunity-discontent.jpg"
          altText3="Pardon Our Dust sign posted as the Salton Sea"
          captionText3={
            <>
              <b>Figure 4</b>. Artistic expression of community discontent with
              the Imperial Irrigation District (IID) seen on Bombay Beach.
            </>
          }
          imgWidth="400px"
          imgHeight="400px"
        />
      </Box>
      <Typography variant="h5">
        News Articles Relevant to the Salton Sea
      </Typography>
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
  // customNewsImageWrapper: {
  //   position: "relative"
  // },
  // rowWrapper: {
  //   display: "flex",
  //   flexWrap: "wrap",
  //   flexGrow: 1,
  //   justifyContent: "space-between"
  // },

  // rowWrapperOneItem: {
  //   display: "flex",
  //   marginBottom: "1rem"
  // },

  // column: {
  //   flex: "1 1 300px",
  //   marginLeft: "1rem",
  //   marginRight: "1rem"
  //   // marginBottom: "5rem"
  // }
}));
export default PageSection;
