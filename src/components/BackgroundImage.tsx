import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    content: "",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: "absolute",
    zIndex: 0
  }
}));

function BackgroundImage(props: {
  [x: string]: any;
  image: any;
  opacity: any;
}) {
  const classes = useStyles();

  const { image, opacity, ...otherProps } = props;

  return (
    <div
      className={classes.root}
      style={{
        backgroundImage: `url(${image})`,
        opacity: opacity,
        backgroundRepeat: "repeat",
        backgroundSize: "auto"
      }}
      {...otherProps}
    />
  );
}

export default BackgroundImage;
