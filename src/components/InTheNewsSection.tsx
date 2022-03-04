import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import FeaturedNewsFeed from "components/InTheNews/FeaturedNewsFeed";
import { MediaObject } from "types";

interface FeaturedNewsFeedProps {
  mediaObjects: MediaObject[];
}

const InTheNewsSection = ({ mediaObjects }: FeaturedNewsFeedProps) => {
  const classes = useStyles();
  return (
    <Section bgImage="/curves.png">
      <Container>
        <Box>
          <SectionHeader
            title="In the News"
            titleProps={{
              align: "center",
              className: classes.header,
              display: "inline"
            }}
            display="flex"
            justifyContent="center"
            size={"h4"}
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
