import React, { useEffect, useRef, useState } from "react";
import {
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent
} from "@material-ui/lab";
import TimelineItemContent from "./TimelineItemContent";
import {
  ButtonBase,
  IconButton,
  Typography,
  makeStyles
} from "@material-ui/core";

interface Content {
  title?: string;
  description?: string;
  result?: string;
  communityAgeGroup?: string[];
  documentOrMedia: {
    docTitle: string;
    src: string;
  };
}

interface TimelineYearProps {
  year: string;
  contents: Content[];
  timelineNav: boolean;
}

const TimelineYear: React.FC<TimelineYearProps> = ({
  year,
  contents,
  timelineNav
}) => {
  const classes = useStyles();
  const [inView, setInView] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = itemRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: [0.15, 0.4, 1] }
    );
    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);
  return (
    <TimelineItem ref={itemRef}>
      <TimelineOppositeContent>
        <Typography color="textSecondary">{year}</Typography>
      </TimelineOppositeContent>
      <TimelineSeparator>
        {timelineNav && (
          <>
            {/* <IconButton aria-label="year" id={year}>
              <TimelineDot variant={"outlined"} color={"inherit"} />
            </IconButton> */}

            {/* <TimelineDot variant={"outlined"} color={"inherit"} /> */}
            <ButtonBase className={classes.buttonBase}>
              <TimelineDot variant={"outlined"} color={"inherit"} />
            </ButtonBase>
            <TimelineConnector className={classes.secondaryTail} />
          </>
        )}
        {!timelineNav && (
          <>
            <TimelineDot
              variant={inView ? "default" : "outlined"}
              color={inView ? "primary" : "inherit"}
            />
            <TimelineConnector
              className={inView ? classes.inViewTail : classes.secondaryTail}
            />
          </>
        )}

        {/* {timelineNav ? (
          <>
            <TimelineDot variant={"outlined"} color={"inherit"} />
            <TimelineConnector className={classes.secondaryTail} />
          </>
        ) : (
          <>
            <TimelineDot
              variant={inView ? "default" : "outlined"}
              color={inView ? "primary" : "inherit"}
            />
            <TimelineConnector
              className={inView ? classes.inViewTail : classes.secondaryTail}
            />
          </>
        )} */}

        {/* <TimelineDot
          variant={timelineNav || inView ? "default" : "outlined"}
          color={inView ? "primary" : "inherit"}
        />
        <TimelineConnector
          className={inView ? classes.inViewTail : classes.secondaryTail}
        /> */}

        {/* <TimelineDot
          variant={inView ? "default" : "outlined"}
          color={inView ? "primary" : "inherit"}
        /> */}

        {/* <TimelineConnector
          className={inView ? classes.inViewTail : classes.secondaryTail}
        /> */}
      </TimelineSeparator>
      <TimelineContent>
        <TimelineItemContent contents={contents} />
      </TimelineContent>
    </TimelineItem>
  );
};
// const useStyles = makeStyles((theme) => ({
//   secondaryTail: {
//     backgroundColor: theme.palette.primary.main
//   }
// }));

const useStyles = makeStyles((theme) => ({
  secondaryTail: {
    backgroundColor: "default"
  },
  inViewDot: {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.main
  },
  inViewTail: {
    backgroundColor: theme.palette.primary.main
  },

  buttonBase: {
    width: 30,
    height: 30,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%"
  },
  pulse: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    backgroundColor: theme.palette.primary.main,
    opacity: 0,
    animation: "$pulse-animation 1.5s infinite"
  },
  "@keyframes pulse-animation": {
    "0%": {
      transform: "scale(0.8)",
      opacity: 1
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0
    }
  }
}));

export default TimelineYear;
