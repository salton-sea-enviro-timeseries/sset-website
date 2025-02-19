import React from "react";
import { Box, Divider, IconButton, Paper, Typography } from "@mui/material";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import { styled } from "@mui/material/styles";

interface TimelineItemContentProps {
  contents: {
    title?: string;
    description?: string;
    result?: string;
    communityAgeGroup?: string[];
    documentOrMedia: {
      docTitle: string;
      src: string;
    };
  }[];
}

const TimelineItemContent: React.FC<TimelineItemContentProps> = ({
  contents
}) => {
  return (
    <>
      {contents.map(
        (
          {
            title,
            description,
            result,
            communityAgeGroup,
            documentOrMedia: { docTitle, src }
          },
          i
        ) => (
          <StyledPaper key={i} elevation={3}>
            <Typography
              variant="h6"
              component="h1"
              align="left"
              style={{ marginBottom: ".5rem" }}
            >
              {title}
            </Typography>
            <BulletPoint as="p" align="left">
              {description}
            </BulletPoint>
            <SubtitleResult variant="subtitle1" align="left">
              Systems Change Result
            </SubtitleResult>
            <BulletPoint align="left">{result}</BulletPoint>
            <Divider />
            <Typography variant="subtitle2" align="left">
              Community/Age Group
            </Typography>
            <ContentFooter as="footer">
              <CommunityAgeWrapper>
                {communityAgeGroup?.map((text, i) => (
                  <ListItem key={i} as="p" variant="body2">
                    {text}
                  </ListItem>
                ))}
              </CommunityAgeWrapper>
              {docTitle && src && (
                <Box display="flex" alignItems="center">
                  <Typography component="p" variant="body2">
                    {docTitle}:
                  </Typography>
                  <StyledLink
                    href={src}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconButton color="inherit" aria-label="document link">
                      <LinkOutlinedIcon />
                    </IconButton>
                  </StyledLink>
                </Box>
              )}
            </ContentFooter>
          </StyledPaper>
        )
      )}
    </>
  );
};
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: "6px 16px",
  ":nth-of-type(even)": {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}));

const ContentFooter = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
});

const CommunityAgeWrapper = styled(Box)({
  display: "flex",
  flexWrap: "wrap"
});

const ListItem = styled(Typography)(({ theme }) => ({
  color: "#8892b0",
  marginRight: theme.spacing(1)
}));

const SubtitleResult = styled(Typography)({
  color: "#0f52ba"
});

const BulletPoint = styled(Typography)(({ theme }) => ({
  marginRight: theme.spacing(1),
  marginBottom: theme.spacing(1),
  position: "relative",
  paddingLeft: theme.spacing(2),
  "&::before": {
    content: '"\\2022"', // Unicode for bullet point
    position: "absolute",
    left: 0,
    color: "#000"
  }
}));
const StyledLink = styled("a")({
  textDecoration: "none",
  color: "inherit",
  ":hover": {
    color: "blue"
  }
});

export default TimelineItemContent;
