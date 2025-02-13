import React from "react";
import { styled } from "@mui/material/styles";
import TimelineYear from "./TimelineYear";
import Timeline from "@mui/lab/Timeline";
import {
  KeyboardArrowUpOutlined,
  KeyboardArrowDownOutlined
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
const timelineData = [
  {
    year: "2016",
    contents: []
  },
  {
    year: "2017",
    contents: []
  },
  {
    year: "2018",
    contents: []
  },
  {
    year: "2019",
    contents: []
  },
  {
    year: "2020",
    contents: []
  },
  {
    year: "2021",
    contents: []
  },
  {
    year: "2023",
    contents: []
  }
];
const NavigationTimeline: React.FC = () => {
  return (
    <StyledNavContainer>
      <IconButton aria-label="previous year" color="primary" id="prev">
        <KeyboardArrowUpOutlined fontSize="large" />
      </IconButton>
      <TimelineStyles>
        {timelineData.map((item, index) => (
          <TimelineYear
            key={item.year}
            year={item.year}
            contents={item.contents}
            timelineNav={true}
          />
        ))}
      </TimelineStyles>
      <IconButton aria-label="next year" color="primary" id="next">
        <KeyboardArrowDownOutlined fontSize="large" />
      </IconButton>
    </StyledNavContainer>
  );
};
const StyledNavContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "100%",
  border: "1px solid #ccc",
  borderRadius: "8px",
  backgroundColor: "#fff"
});
const TimelineStyles = styled(Timeline)({
  boxSizing: "border-box",
  margin: 0,
  padding: 0
});

export default NavigationTimeline;
