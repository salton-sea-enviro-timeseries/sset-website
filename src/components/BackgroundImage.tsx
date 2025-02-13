import React from "react";
import { styled } from "@mui/material/styles";

function BackgroundImage(props: {
  [x: string]: any;
  image?: string;
  opacity?: string | number;
}) {
  const { image, opacity, ...otherProps } = props;
  return (
    <BackgroundImageRoot
      styleProps={{ image: image || "", opacity }}
      image={image}
      opacity={opacity}
      {...otherProps}
    />
  );
}
const BackgroundImageRoot = styled("div")(({ theme, styleProps }) => ({
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
  backgroundImage: styleProps.image ? `url(${styleProps.image})` : "none",
  opacity: styleProps.opacity
}));

export default BackgroundImage;
