import { Grid } from "@material-ui/core";
import { MediaObject } from "types";
import NewsCard from "./NewsCard";

interface FeaturedNewsFeedProps {
  mediaObjects: MediaObject[];
}

const FeaturedNewsFeed = ({ mediaObjects }: FeaturedNewsFeedProps) => {
  return (
    <Grid container spacing={2}>
      {mediaObjects.map((media: MediaObject) => (
        <Grid item xs={12} sm={6} md={4} key={media.link}>
          <NewsCard media={media} />
        </Grid>
      ))}
    </Grid>
  );
};

export default FeaturedNewsFeed;
