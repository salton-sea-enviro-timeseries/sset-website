import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { makeStyles, Typography } from "@material-ui/core";
interface HeroProps {
  title?: string;
  subtitle?: string;
  cta?: React.ReactNode;
  bgColor?: "primary" | "secondary" | "default";
  size?: "small" | "medium" | "large";
  bgImage?: string;
  bgImageOpacity?: number;
  sectionHeaderProps?: {
    titleProps?: {
      align?: string;
      className?: string;
      display?: string;
    };
    display?: string;
    justifyContent?: string;
    size?: number;
  };
}

const Hero: React.FC<HeroProps> = ({
  title = "",
  subtitle = "",
  cta = null,
  bgImage = "",
  bgImageOpacity = 0.75,
  bgColor = "primary",
  size = "medium",
  sectionHeaderProps = {}
}) => {
  //TODO fix props for custom Hero
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
      {!bgImage && isMounted ? (
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
      ) : bgImage ? (
        <Box
          style={{
            backgroundImage: `url(${bgImage})`,
            opacity: bgImageOpacity,
            backgroundSize: "cover",
            width: "100%",
            height: "100%"
          }}
        />
      ) : null}

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
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            {cta}
          </Box>
        )}
      </div>
    </Box>
  );
};

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