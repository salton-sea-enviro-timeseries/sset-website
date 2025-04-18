import React from "react";
import { Tooltip } from "@mui/material";

interface HoverTooltipProps {
  children: React.ReactNode;
  title: NonNullable<React.ReactNode> | string;
}

const HoverTooltip: React.FC<HoverTooltipProps> = ({ children, title }) => {
  return (
    <Tooltip title={title} placement="right" arrow>
      <span>{children}</span>
    </Tooltip>
  );
};

export default HoverTooltip;
