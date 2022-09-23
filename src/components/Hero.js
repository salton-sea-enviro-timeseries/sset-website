import React from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { makeStyles, Typography } from "@material-ui/core";

function Hero({ bgImage, title, subtitle, cta, ...props }) {
  const classes = useStyles();

  const isMobileDevice =
    process.browser &&
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  return (
    <Box position="relative" height="100vh">
      <video
        className={classes.video}
        playsInline
        autoPlay={!isMobileDevice ? true : false}
        loop={!isMobileDevice ? true : false}
        muted
        controls={isMobileDevice ? true : false}
        preload="auto"
      >
        <source src={bgImage} type="video/mp4" />
      </video>
      <div className={classes.overlay}>
        {(title || subtitle) && (
          <Container>
            <Box textAlign="center">
              <Typography
                component="h1"
                variant="h4"
                className={classes.subtitle}
              >
                {subtitle}
              </Typography>
              <Typography
                component="h2"
                variant="h3"
                className={classes.header}
              >
                {title}
              </Typography>
            </Box>
          </Container>
        )}
        {cta && (
          <Box
            py={5}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {cta}
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
