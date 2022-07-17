import React from "react";
import { makeStyles } from "@material-ui/core";

interface ContinuousColorLegendProps {
  startColor: string;
  midColor?: string;
  endColor: string;
  startTitle: string | number;
  midTitle?: string | number;
  endTitle: string | number;
  height?: number;
  width?: number;
}

function ContinuousColorLegend({
  startColor,
  midColor,
  endColor,
  startTitle,
  midTitle,
  endTitle,
  height,
  width
}: ContinuousColorLegendProps) {
  const classes = useStyles();
  const colors = [startColor];
  if (midColor) {
    colors.push(midColor);
  }
  colors.push(endColor);
  return (
    <div className={classes.root}>
      <div
        className={classes.gradient}
        style={{
          background: `linear-gradient(to right, ${colors.join(",")})`,
          width,
          height
        }}
      />
      <div className={classes.titles}>
        <span>{startTitle}</span>
        {midTitle && <span>{midTitle}</span>}
        <span>{endTitle}</span>
      </div>
    </div>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    fontSize: 12
  },
  gradient: {
    height: 4,
    borderRadius: 2,
    marginBottom: 5
  },
  titles: {
    display: "flex",
    justifyContent: "space-between"
  }
}));

export default ContinuousColorLegend;
