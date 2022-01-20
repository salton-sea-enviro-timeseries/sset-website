import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import FeaturedNewsFeed, {
  FeaturedNewsFeedLoader
} from "components/InTheNews/FeaturedNewsFeed";
import { Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

const InTheNewsSection = ({ mediaObjects }: any) => {
  const classes = useStyles();

  if (!mediaObjects)
    return (
      <Section bgImage="/curves.png">
        <Container>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography gutterBottom align="center" variant="h3">
              <Skeleton variant="text" width={200} />
            </Typography>
            <FeaturedNewsFeedLoader />
          </Box>
        </Container>
      </Section>
    );

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
