import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { makeStyles, Typography } from "@material-ui/core";

function Hero(props) {
  const classes = useStyles();
  const [isMounted, setIsMounted] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  useEffect(() => {
    setIsMounted(true);

    if (typeof navigator !== "undefined") {
      setIsMobileDevice(
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      );
    }
  }, []);
  return (
    <Box position="relative" height="100vh">
      {isMounted ? (
        <video
          className={classes.video}
          playsInline
          autoPlay={!isMobileDevice}
          loop={!isMobileDevice}
          muted
          controls={isMobileDevice}
          preload="auto"
          poster="/hero-poster.jpg"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      ) : null}
      <div className={classes.overlay}>
        {(props.title || props.subtitle) && (
          <Container>
            <Box textAlign="center">
              <Typography
                component="h1"
                variant="h4"
                className={classes.subtitle}
              >
                {props.subtitle}
              </Typography>
              <Typography
                component="h2"
                variant="h3"
                className={classes.header}
              >
                {props.title}
              </Typography>
            </Box>
          </Container>
        )}
        {props.cta && (
          <Box
            py={5}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {props.cta}
          </Box>
        )}
      </div>
    </Box>
  );
}

const useStyles = makeStyles(() => ({
  video: {
    objectFit: "cover",
    width: "100%",
    height: "100%"
  },
  header: {
    fontWeight: 400,
    color: "white"
  },
  subtitle: {
    fontWeight: 700,
    color: "white"
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(44, 62, 80, 0.6)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
}));

export default Hero;
