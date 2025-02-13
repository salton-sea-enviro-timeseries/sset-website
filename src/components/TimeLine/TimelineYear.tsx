import React, { useEffect, useRef, useState } from "react";
import {
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent
} from "@mui/lab";
import { styled } from "@mui/material/styles";
import TimelineItemContent from "./TimelineItemContent";
import { ButtonBase, Typography } from "@mui/material";

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
    <StyledTimelineItem ref={itemRef}>
      <StyledTimelineOppositeContent>
        <Typography color="textSecondary">{year}</Typography>
      </StyledTimelineOppositeContent>
      <TimelineSeparator>
        {timelineNav ? (
          <>
            <StyledButtonBase>
              <StyledTimelineDot variant="outlined" color="inherit" />
              <StyledPulse />
            </StyledButtonBase>
            <StyledTimelineConnector className="secondary" />
          </>
        ) : (
          <>
            <StyledTimelineDot
              variant={inView ? "filled" : "outlined"}
              color={inView ? "primary" : "inherit"}
              inView={inView}
            >
              {inView && <StyledPulse />}
            </StyledTimelineDot>
            <StyledTimelineConnector inView={inView} />
          </>
        )}
      </TimelineSeparator>
      <TimelineContent>
        <TimelineItemContent contents={contents} />
      </TimelineContent>
    </StyledTimelineItem>
  );
};
const StyledTimelineItem = styled(TimelineItem)``;

const StyledTimelineOppositeContent = styled(TimelineOppositeContent)``;

const StyledTimelineConnector = styled(TimelineConnector, {
  shouldForwardProp: (prop) => prop !== "inView"
})<{ inView?: boolean }>(({ theme, inView }) => ({
  backgroundColor: inView ? theme.palette.primary.main : theme.palette.grey[300]
}));

const StyledTimelineDot = styled(TimelineDot, {
  shouldForwardProp: (prop) => prop !== "inView"
})<{ inView?: boolean }>(({ theme, inView }) => ({
  borderColor: inView ? theme.palette.primary.main : undefined,
  backgroundColor: inView ? theme.palette.primary.main : undefined
}));

const StyledButtonBase = styled(ButtonBase)({
  width: 30,
  height: 30,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%"
});

const StyledPulse = styled("div")(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  borderRadius: "50%",
  backgroundColor: theme.palette.primary.main,
  opacity: 0,
  animation: "pulse-animation 1.5s infinite",
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
