import { Grid } from "@material-ui/core";
import { MediaObject } from "types";
import NewsCard from "./NewsCard";
import VideoCard from "./VideoCard";

interface FeaturedNewsFeedProps {
  newsMediaData: MediaObject[];
}

const FeaturedNewsFeed = ({ newsMediaData }: FeaturedNewsFeedProps) => {
  return (
    <Grid container spacing={2}>
      {newsMediaData.map((media: MediaObject) => (
        <Grid item xs={12} sm={6} md={4} key={media.link}>
          <NewsCard media={media} />
        </Grid>
      ))}
      <Grid item xs={12} sm={6} md={4}>
        <VideoCard
          src="https://www.youtube.com/embed/WDjUyaD869I"
          title="Community Science Forum"
          description="The Alianza community science team presented a live webinar on the 7/20/22 to present the findings of water quality research conducted at the Salton Sea between 2021 and 2022. We hope you find it informative and illuminating as we continue to conduct community science-based research in the future."
        />
      </Grid>
    </Grid>
  );
};

export default FeaturedNewsFeed;
