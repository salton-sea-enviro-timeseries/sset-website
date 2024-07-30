import React from "react";
import { Box, Divider, IconButton, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LinkOutlinedIcon from "@material-ui/icons/LinkOutlined";

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
  const classes = useStyles();

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
          <Paper key={i} elevation={3} className={classes.paper}>
            <Typography
              variant="h6"
              component="h1"
              align="left"
              style={{ marginBottom: ".5rem" }}
            >
              {title}
            </Typography>
            <Typography
              component="p"
              align="left"
              className={classes.bulletPoint}
            >
              {description}
            </Typography>
            <Typography
              variant="subtitle1"
              align="left"
              className={classes.subtitleResult}
            >
              Systems Change Result
            </Typography>
            <Typography align="left" className={classes.bulletPoint}>
              {result}
            </Typography>
            <Divider />
            <Typography variant="subtitle2" align="left">
              Community/Age Group
            </Typography>
            <Box className={classes.contentFooter} component="footer">
              <Box className={classes.communityAgeWrapper}>
                {communityAgeGroup?.map((text, i) => (
                  <Typography
                    key={i}
                    component="p"
                    className={classes.listItem}
                    variant="body2"
                  >
                    {text}
                  </Typography>
                ))}
              </Box>
              {docTitle && src && (
                <Box display="flex" alignItems="center">
                  <Typography component="p" variant="body2">
                    {docTitle}:
                  </Typography>

                  <IconButton
                    color="inherit"
                    aria-label="document link"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={src}
                    className={classes.iconButtonLink}
                  >
                    <LinkOutlinedIcon />
                  </IconButton>
                </Box>
              )}
            </Box>
          </Paper>
        )
      )}
    </>
  );
};
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "6px 16px",
    "&:nth-child(even)": {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    }
  },
  contentFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  communityAgeWrapper: {
    display: "flex",
    flexWrap: "wrap"
  },
  listItem: {
    color: "#8892b0 ",
    marginRight: theme.spacing(1)
  },
  subtitleResult: {
    color: "#0f52ba"
  },
  bulletPoint: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    position: "relative",
    paddingLeft: theme.spacing(2),
    "&::before": {
      content: '"•"',
      position: "absolute",
      left: 0,
      color: "#000"
    }
  },
  iconButtonLink: {
    "&:hover": {
      color: "blue"
    }
  }
}));

export default TimelineItemContent;
