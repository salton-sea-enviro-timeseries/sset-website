import React from "react";
import { styled } from "@mui/material/styles";

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
  const colors = [startColor];
  if (midColor) {
    colors.push(midColor);
  }
  colors.push(endColor);
  return (
    <ColorLegendRoot>
      <Gradient
        sx={{
          background: `linear-gradient(to right, ${colors.join(",")})`,
          width,
          height
        }}
      />
      <Titles>
        <span>{startTitle}</span>
        {midTitle && <span>{midTitle}</span>}
        <span>{endTitle}</span>
      </Titles>
    </ColorLegendRoot>
  );
}
const ColorLegendRoot = styled("div")(() => ({
  fontSize: 12
}));
const Gradient = styled("div")(() => ({
  height: 4,
  borderRadius: 2,
  marginBottom: 5
}));
const Titles = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between"
}));

export default ContinuousColorLegend;
