import {
  Avatar,
  Box,
  Container,
  Divider,
  Typography,
  colors,
  styled
} from "@mui/material";
import FeaturedNewsFeed from "components/InTheNews/FeaturedNewsFeed";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import { ArticleFields } from "types";
import Image from "next/image";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
// TODO: add links to definitions
// or add a glossary section ???
interface GradImages {
  imageTitle: string;
  imageUrl: string;
}
type Props = {
  newsArticleList?: ArticleFields[];
  bodyText: React.ReactNode | null;
  title: string;
  sectionNum: number;
  gradImages?: GradImages[];
  id: string;
};
const generateContent = (
  id: string,
  newsArticleList?: ArticleFields[],
  bodyText?: React.ReactNode | null
) => {
  return newsArticleList ? (
    <>
      <FeaturedNewsFeed newsArticleList={newsArticleList} />
      <Box mt="1em" id={`${id}-footnote`}>
        {/* TODO: this content is on contentful now */}
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
  ) : id === "thesaltonsea" ? (
    <>
      <Typography component="div">{bodyText}</Typography>
      <Box display="flex" justifyContent={"space-evenly"}>
        <StyledGraphDivider />
        <FiberManualRecordIcon color="primary" fontSize="small" />
        <StyledGraphDivider />
      </Box>
      <StyledTimeLineImage>
        <Image
          src="/salton-sea-timeline.png"
          alt="salton sea timeline"
          fill
          sizes="100vw"
          style={{
            objectFit: "contain"
          }}
        />
      </StyledTimeLineImage>
    </>
  ) : (
    <Typography component="div">{bodyText}</Typography>
  );
};
const generateGradSection = (gradImages?: GradImages[]) => {
  return (
    gradImages && (
      <StyledGradContainer>
        {gradImages.map(({ imageTitle, imageUrl }, index) => (
          <StyledImageWrapper key={index}>
            <StyledAvatar>
              <Image
                src={`https:${imageUrl}`}
                alt={"grad image"}
                width={250}
                height={250}
                style={{
                  objectFit: "cover"
                }}
              />
            </StyledAvatar>
            <Typography variant="h6">{imageTitle}</Typography>
          </StyledImageWrapper>
        ))}
      </StyledGradContainer>
    )
  );
};
const PageSection: React.FC<Props> = ({
  id,
  bodyText,
  title,
  newsArticleList,
  sectionNum,
  gradImages
}: Props) => {
  return (
    <StyledSection
      bgImage={sectionNum % 2 === 0 ? "/curves.png" : null}
      className={sectionNum % 2 === 0 ? "even" : "odd"}
    >
      <Container>
        <Box>
          <SectionHeader
            title={title}
            sectionId={id}
            sectionFootNoteLink={!!newsArticleList}
            titleProps={{
              align: "center",
              component: StyledHeader,
              display: "inline"
            }}
            display="flex"
            justifyContent="center"
            size={"h4"}
          />
          {generateContent(id, newsArticleList, bodyText)}
          {generateGradSection(gradImages)}
        </Box>
      </Container>
    </StyledSection>
  );
};

const StyledSection = styled(Section)(({ theme }) => ({
  "&.odd": { backgroundColor: colors.teal[50] },
  "&.even": { backgroundColor: theme.palette.background.default }
}));

const StyledHeader = styled("div")(({ theme }) => ({
  boxShadow: `inset 0 -5px 0 ${theme.palette.secondary.light}`
}));

const StyledGradContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-evenly",
  flexWrap: "wrap"
});

const StyledImageWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
});

const StyledTimeLineImage = styled(Box)(({ theme }) => ({
  width: "100%",
  marginTop: "2rem",
  position: "relative",
  animation: "fade linear both",
  animationTimeline: "view()",
  animationRange: "entry 50% cover 50%",
  [theme.breakpoints.down("sm")]: {
    height: 300
  },
  [theme.breakpoints.up("sm")]: {
    height: 600
  }
}));

const StyledGraphDivider = styled(Divider)({
  margin: "auto",
  width: "50%",
  height: 2,
  borderRadius: 50,
  background: "#BCBCBC"
});

const StyledAvatar = styled(Avatar)({
  width: 250,
  height: 250
});
export default PageSection;
