import {
  Box,
  Collapse,
  Grid,
  Link,
  Typography,
  makeStyles
} from "@material-ui/core";
import { MediaObject } from "types";
import NewsCard from "./NewsCard";
import VideoCard from "./VideoCard";
import { useState } from "react";
import DoubleArrowSharpIcon from "@material-ui/icons/DoubleArrowSharp";

interface FeaturedNewsFeedProps {
  newsMediaData: MediaObject[];
}
const SWBRCB_DESCRIPTION =
  "The annual California State Waterboard Resources Control Board workshop was held on May 16th and May 17th of 2023 at the Imperial Valley College. Our very own community scientists (Cruz Marquez and Daniel Ramirez) and Dr. Ryan Sinclair were asked to be part of two panel discussions that talked about water quality and community voices and projects. These two topics were important to present to the public, the state waterboard, and the broader public as it leads to more visibility about the challenges the Salton Sea is facing and can lead to a common understanding about the possible solutions the state can act upon. We encourage you to watch both panels that were part of a larger range of topics.";

const FeaturedNewsFeed = ({ newsMediaData }: FeaturedNewsFeedProps) => {
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [transitionExited, setTransitionExited] = useState(false);
  const classes = useStyles(transitionExited);
  return (
    <>
      <Grid container spacing={2} className={classes.containerSpacing}>
        <Grid item xs={12} sm={6} md={4}>
          <VideoCard
            src="https://www.youtube.com/embed/t116cFHE1YE?start=6924&end=8940"
            title="Ryan Sinclair- SWBRCB"
            description={`${SWBRCB_DESCRIPTION} Dr. Ryan Sinclair’s portion is from about 1:55:45-2:29:00 `}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <VideoCard
            src="https://www.youtube.com/embed/t116cFHE1YE?start=8973&end=11505"
            title="Community Voices- SWBRCB"
            description={`${SWBRCB_DESCRIPTION} Community voices and projects panel is from about 2:29:30-3:11:45.`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <NewsCard media={newsMediaData[0]} />
        </Grid>
      </Grid>
      <Collapse
        in={showMoreInfo}
        onExited={() => setTransitionExited(false)}
        onEnter={() => setTransitionExited(true)}
      >
        <Grid container spacing={2} className={classes.containerSpacing}>
          {newsMediaData.slice(1).map((media: MediaObject) => (
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
      </Collapse>
      <Box display={"flex"} justifyContent={"center"}>
        <Link
          component="button"
          style={{ display: "flex", alignItems: "center" }}
          onClick={() => setShowMoreInfo(!showMoreInfo)}
        >
          <Typography>{showMoreInfo ? "Show Less" : "See More"}</Typography>
          <DoubleArrowSharpIcon
            className={`${classes.arrowStyles} ${classes.rotate}`}
          />
        </Link>
      </Box>
    </>
  );
};
const useStyles = makeStyles((theme) => ({
  containerSpacing: {
    marginBottom: theme.spacing(2)
  },
  arrowStyles: {
    fontSize: "1.2rem",
    transform: "rotate(270deg)"
  },
  rotate: (transitionExited) => ({
    transition: "300ms",
    transform: transitionExited ? "rotate(90deg)" : "rotate(270deg)"
  })
}));
export default FeaturedNewsFeed;
