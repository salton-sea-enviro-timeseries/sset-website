import React, { useState, useEffect, useRef } from "react";
import { useAppContext } from "components/AppContext";
import { Box, Collapse, Link, Typography } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import DoubleArrowSharpIcon from "@mui/icons-material/DoubleArrowSharp";
import { styled } from "@mui/material/styles";
import { ArticleFields } from "types";
import NewsCard from "./NewsCard";
import VideoCard from "./VideoCard";

interface FeaturedNewsFeedProps {
  newsArticleList: ArticleFields[];
}
const isVideoLink = (url: string | undefined): boolean => {
  if (!url) return false;
  return (
    url.includes("youtube.com") ||
    url.includes("vimeo.com") ||
    url.includes("embed")
  );
};
const FeaturedNewsFeed = ({ newsArticleList }: FeaturedNewsFeedProps) => {
  // @ts-ignore
  const { language } = useAppContext();
  const currentLocale = language === "en" ? "en-US" : "es";
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [transitionExited, setTransitionExited] = useState(false);
  const scrollPositionRef = useRef(0);
  const handleToggle = () => {
    if (typeof window !== "undefined") {
      setShowMoreInfo((prevShowMoreInfo) => {
        if (!prevShowMoreInfo) {
          scrollPositionRef.current = window.scrollY;
        }
        return !prevShowMoreInfo;
      });
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined" && !showMoreInfo) {
      window.scrollTo({
        top: scrollPositionRef.current
      });
    }
  }, [showMoreInfo]);
  const { firstFiveArticles, remainingArticles } = newsArticleList.reduce(
    (acc, article) => {
      const orderValue = article?.order?.["en-US"];
      if (orderValue >= 1 && orderValue <= 5) {
        acc.firstFiveArticles.push(article); // Collect articles with order 1-5
      } else if (!orderValue) {
        acc.remainingArticles.push(article); // Collect articles without order
      }
      return acc;
    },
    {
      firstFiveArticles: [] as ArticleFields[],
      remainingArticles: [] as ArticleFields[]
    }
  );
  // Sort the first five articles
  firstFiveArticles.sort((a, b) => {
    const orderA = a.order?.["en-US"] ?? Number.MAX_SAFE_INTEGER;
    const orderB = b.order?.["en-US"] ?? Number.MAX_SAFE_INTEGER;
    return orderA - orderB;
  });
  return (
    <div>
      <ContainerSpacing container spacing={2}>
        {firstFiveArticles.map((article: ArticleFields, index: number) => (
          <React.Fragment key={index}>
            {index === 0 && (
              <>
                <Grid2 size={{ xs: 12, sm: 6, md: 8 }}>
                  <NewsCard {...article} />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                  <NewsCard {...firstFiveArticles[1]} />
                </Grid2>
              </>
            )}
            {index === 1 && (
              <ContainerSpacing container spacing={2}>
                <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                  <NewsCard {...firstFiveArticles[2]} />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                  <NewsCard {...firstFiveArticles[3]} />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                  <NewsCard {...firstFiveArticles[4]} />
                </Grid2>
              </ContainerSpacing>
            )}
          </React.Fragment>
        ))}
      </ContainerSpacing>
      <Collapse
        in={showMoreInfo}
        onExited={() => setTransitionExited(false)}
        onEnter={() => setTransitionExited(true)}
      >
        <ContainerSpacing container spacing={2}>
          {remainingArticles.map((article: ArticleFields, index: number) => {
            const imageUrl = article?.imageUrl?.["en-US"];
            const articleTitle = article?.articleTitle?.[currentLocale];
            const articleDescription =
              article?.articleDescriptionLong?.[currentLocale];
            return (
              <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                {isVideoLink(imageUrl) ? (
                  <VideoCard
                    src={imageUrl}
                    title={articleTitle || "Untitled Video"}
                    description={
                      articleDescription || "No description available"
                    }
                  />
                ) : (
                  <NewsCard {...article} />
                )}
              </Grid2>
            );
          })}
        </ContainerSpacing>
      </Collapse>
      {newsArticleList?.length > 0 && (
        <Box display={"flex"} justifyContent={"center"}>
          <Link
            component="button"
            style={{ display: "flex", alignItems: "center" }}
            onClick={handleToggle}
          >
            <Typography>{showMoreInfo ? "Show Less" : "See More"}</Typography>
            <ArrowIcon transitionExited={transitionExited} />
          </Link>
        </Box>
      )}
    </div>
  );
};
const ContainerSpacing = styled(Grid2)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(2)
}));

const ArrowIcon = styled(DoubleArrowSharpIcon, {
  shouldForwardProp: (prop) => prop !== "transitionExited"
})<{ transitionExited: boolean }>(({ transitionExited }) => ({
  fontSize: "1.2rem",
  transition: "300ms",
  transform: transitionExited ? "rotate(90deg)" : "rotate(270deg)"
}));

export default FeaturedNewsFeed;
