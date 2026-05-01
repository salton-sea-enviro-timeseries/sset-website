import { Box, Typography, type SxProps, type Theme } from "@mui/material";

import { styled } from "@mui/material/styles";
interface StyledImageWrapperProps {
  backgroundImage: string;
  height?: string;
  borderRadius?: number;
  sx?: SxProps<Theme>;
}

export const StyledImageWrapper = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== "backgroundImage" && prop !== "height" && prop !== "borderRadius"
})<StyledImageWrapperProps>(
  ({ backgroundImage, height = "100%", borderRadius = 28 }) => ({
    position: "relative",
    borderRadius,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: "no-repeat",
    height,
    backgroundSize: "cover",
    backgroundPosition: "top center"
  })
);
export const StyledSmallArticleText = styled(Typography)({
  fontSize: "1.25rem",
  letterSpacing: 0,
  fontWeight: 400
});

export const StyledSmallTextLeaderShip = styled(StyledSmallArticleText)({
  fontWeight: 600,
  lineHeight: "24px",
  color: "28261B"
});

export const SocialsContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "marginTop"
})<{ marginTop?: string | number }>(({ theme, marginTop = 1 }) => ({
  marginTop: typeof marginTop == "number" ? theme.spacing(marginTop) : marginTop
}));
