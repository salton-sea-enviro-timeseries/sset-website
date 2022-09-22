import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import FeaturedNewsFeed from "components/InTheNews/FeaturedNewsFeed";
import { MediaObject } from "types";
import { getContent } from "util/getContent";
import { useAppContext } from "components/AppContext";
interface FeaturedNewsFeedProps {
  mediaObjects: MediaObject[];
}
type Title = {
  "en-US": string;
  es: string;
};
type Content = { content: { title: Title } };
type Props = FeaturedNewsFeedProps & Content;
const InTheNewsSection = ({ mediaObjects, content: { title } }: Props) => {
  const classes = useStyles();
  // @ts-ignore
  const { language } = useAppContext();
  return (
    <Section bgImage="/curves.png">
      <Container>
        <Box>
          <SectionHeader
            title={language === "en" ? title["en-US"] : title["es"]}
            titleProps={{
              align: "center",
              className: classes.header,
              display: "inline"
            }}
            display="flex"
            justifyContent="center"
            size={4}
          />
          <FeaturedNewsFeed mediaObjects={mediaObjects} />
        </Box>
      </Container>
    </Section>
  );
};
const useStyles = makeStyles((theme) => ({
  header: {
    boxShadow: `inset 0 -5px 0 ${theme.palette.secondary.light}`
  }
}));
export default InTheNewsSection;
