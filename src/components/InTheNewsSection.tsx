import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import useSWR from "swr";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import FeaturedNewsFeed, {
  FeaturedNewsFeedLoader
} from "components/InTheNews/FeaturedNewsFeed";
import { MediaObject } from "types";
import { Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error: any = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

const mediaLinks = [
  "https://www.npr.org/podcasts/655974992/living-downstream",
  "https://kesq.com/news/2021/07/07/changes-happening-at-the-salton-sea-on-a-state-federal-level/",
  "https://www.cnbc.com/2021/11/06/californias-salton-sea-spewing-toxic-fumes-creating-ghost-towns-.html"
];

const InTheNewsSection = () => {
  const classes = useStyles();
  const { data, error } = useSWR<MediaObject[]>(
    `/api/scrape?urls=${mediaLinks.join(",")}`,
    fetcher
  );

  if (error) return null;
  if (!data)
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
          <FeaturedNewsFeed mediaObjects={data} />
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
