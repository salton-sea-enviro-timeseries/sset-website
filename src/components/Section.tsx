import React from "react";
import { styled, emphasize } from "@mui/material/styles";
import { capitalize } from "@mui/material/utils";
import Box from "@mui/material/Box";
import BackgroundImage from "./BackgroundImage";
interface SectionProps {
  bgColor?: string;
  bgImage?: string | null;
  bgImageOpacity?: string | number;
  size?: "normal" | "medium" | "large" | "auto";
  className?: string;
  sx?: object;
  style?: React.CSSProperties;
  children: React.ReactNode;
}
const verticalPadding = {
  normal: { xs: 6 },
  medium: { xs: 6, sm: 10 },
  large: { xs: 6, sm: 20 },
  auto: 0
};
function Section({
  bgColor = "default",
  bgImage,
  bgImageOpacity,
  size = "normal",
  className,
  sx,
  children,
  ...otherProps
}: SectionProps) {
  return (
    <StyledSection
      as="section"
      py={verticalPadding[size]}
      bgcolor={capitalize(bgColor)}
      className={className}
      sx={sx}
      {...otherProps}
    >
      {bgImage && <BackgroundImage image={bgImage} opacity={bgImageOpacity} />}

      {children}
    </StyledSection>
  );
}
const StyledSection = styled(Box, {
  shouldForwardProp: (prop) => !["bgColor", "size"].includes(prop as string)
})(({ theme, bgColor }: { theme: any; bgColor?: string }) => {
  // Create color classes that set background color and determine
  // text color and dividing border automatically based on background color.
  // Adds the keys colorDefault, colorLight, etc
  const colors = {
    default: theme.palette.background.default,
    light: emphasize(theme.palette.background.default, 0.03),
    primary: theme.palette.primary.main,
    secondary: theme.palette.secondary.light,
    transparent: "transparent"
  };

  return {
    // Ensure child <Container> is above background
    // image (if one is set with the bgImage prop).
    position: "relative",
    [`& > .MuiContainer-root`]: {
      position: "relative"
    },
    backgroundColor: colors[bgColor as keyof typeof colors] || colors.default,
    color: theme.palette.getContrastText(
      colors[bgColor as keyof typeof colors] || colors.default
    ),
    [`& + &`]: {
      borderTop: `1px solid ${emphasize(
        colors[bgColor as keyof typeof colors] || colors.default,
        0.09
      )}`
    }
  };
});

export default Section;
