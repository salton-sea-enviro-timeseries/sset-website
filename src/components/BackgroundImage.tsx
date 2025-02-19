import React from "react";
import { styled } from "@mui/material/styles";

function BackgroundImage(props: {
  [x: string]: any;
  image?: string;
  opacity?: string | number;
}) {
  const { image, opacity, ...otherProps } = props;
  return (
    <BackgroundImageRoot image={image} opacity={opacity} {...otherProps} />
  );
}
const BackgroundImageRoot = styled("div")<{
  image?: string;
  opacity?: string | number;
}>(({ theme, image, opacity }) => ({
  content: '""',
  backgroundPosition: "center center",
  backgroundSize: "auto",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  position: "absolute",
  zIndex: 0,
  //TODO provide default image
  backgroundImage: image ? `url(${image})` : "none",
  opacity: opacity
}));

export default BackgroundImage;
