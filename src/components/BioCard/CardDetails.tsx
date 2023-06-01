import { Avatar, Typography, Grid, makeStyles, Box } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";

type AboutUsProps = {
  image: string;
  name: string;
  answer: string;
  title: string;
  community: string;
  question: string;
  activeCard: boolean;
  onHeightChange: (height: number) => void;
};
const CardDetails = ({
  image,
  name,
  community,
  title,
  question,
  answer,
  activeCard,
  onHeightChange
}: AboutUsProps) => {
  const classes = useStyles();
  const refHeight = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let height = refHeight.current?.offsetHeight || 0;
    onHeightChange(height);
  }, [activeCard, onHeightChange]);

  return (
    <Grid
      container
      spacing={0}
      className={classes.gridContainer}
      ref={refHeight}
    >
      <Grid item xs={12} md={3} className={classes.contentWrapper}>
        <Avatar className={classes.avatarStyles} alt={"Avatar"} src={image} />
      </Grid>
      <Grid item xs={12} md={9} className={classes.bioWrapper}>
        <Box display="flex" flexWrap="wrap" alignItems="center">
          <Typography className={classes.nameTextStyles} variant="h6">
            {name}:
          </Typography>
          <Typography className={classes.titleTextStyles}>{title}</Typography>
        </Box>
        <Typography>
          <b> From:</b> {community}
        </Typography>
        <Box>
          <Typography noWrap={true} gutterBottom={true}>
            <Typography component="span" color="primary">
              <strong>Question:</strong>
            </Typography>
            {question}
          </Typography>
        </Box>
        <Typography>
          <strong>Answer:</strong> {answer}
        </Typography>
      </Grid>
    </Grid>
  );
};
export default CardDetails;

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    display: "flex",
    alignItems: "center"
  },
  contentWrapper: {
    padding: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  avatarStyles: {
    width: 150,
    height: 150,
    marginRight: 2
  },
  bioWrapper: {
    padding: 16
  },
  nameTextStyles: {
    fontSize: theme.typography.h6.fontSize,
    paddingRight: ".5rem"
  },
  titleTextStyles: {
    fontSize: theme.typography.subtitle1.fontSize
  }
}));
