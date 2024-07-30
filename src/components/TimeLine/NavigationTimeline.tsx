import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TimelineYear from "./TimelineYear";
import Timeline from "@material-ui/lab/Timeline";
import {
  KeyboardArrowUpOutlined,
  KeyboardArrowDownOutlined
} from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
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
  const classes = useStyles();

  return (
    <div className={classes.navContainer}>
      <IconButton aria-label="previous year" color="primary" id="prev">
        <KeyboardArrowUpOutlined fontSize="large" />
      </IconButton>
      <Timeline className={classes.timelineStyles}>
        {timelineData.map((item, index) => (
          <TimelineYear
            key={item.year}
            year={item.year}
            contents={item.contents}
            timelineNav={true}
          />
        ))}
      </Timeline>
      <IconButton aria-label="next year" color="primary" id="next">
        <KeyboardArrowDownOutlined fontSize="large" />
      </IconButton>
    </div>
  );
};
const useStyles = makeStyles({
  navContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#fff"
  },
  timelineStyles: {
    boxSizing: "border-box",
    margin: 0,
    padding: 0
  }
});
export default NavigationTimeline;
