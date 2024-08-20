import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { TypographyVariant, makeStyles } from "@material-ui/core/styles";
import Image from "next/image";
import { LaunchOutlined } from "@material-ui/icons";
import Link from "next/link";
type variantText = TypographyVariant;
interface SectionHeaderProps {
  subtitle?: string;
  subtitleProps?: Object;
  title?: string;
  sectionId: string;
  sectionFootNoteLink?: Boolean;
  titleProps?: Object;
  size?: variantText;
  className?: string;
  display?: string;
  justifyContent?: string;
}

const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "center" });
  }
};
function SectionHeader(props: SectionHeaderProps) {
  const classes = useStyles();
  const {
    subtitle,
    subtitleProps,
    title,
    sectionId,
    sectionFootNoteLink,
    titleProps,
    size,
    className,
    ...otherProps
  } = props;

  // Render nothing if no title or subtitle
  if (!title && !subtitle) {
    return null;
  }
  const renderTitleWithLink = () => (
    <a
      href={`#${sectionId}`}
      style={{ color: "inherit", textDecoration: "none" }}
      onClick={(e) => {
        e.preventDefault();
        scrollToSection(sectionId);
      }}
    >
      {title}
      <sup className={classes.footNoteStyledLink}>†</sup>
    </a>
  );
  const SectionTitle = () => (
    <Typography variant={size} gutterBottom={!!subtitle} {...titleProps}>
      {sectionFootNoteLink ? renderTitleWithLink() : title}
    </Typography>
  );
  const renderGraduationSection = () => (
    <Box className={classes.graduationSectionTitleWrapper}>
      <Image
        src="/graduation-illustration-balloons.svg"
        alt="balloons illustration"
        layout="intrinsic"
        width={150}
        height={150}
        objectFit="contain"
      />
      <SectionTitle />
      <Image
        src="/graduation-illustration-2.svg"
        alt="graduation celebration"
        layout="fixed"
        width={150}
        height={150}
        objectFit="contain"
      />
    </Box>
  );
  const renderAboutUsSection = () => (
    <Link href="/about-us">
      <a className={classes.aboutLaunchLink}>
        <Typography variant={size} gutterBottom={!!subtitle} {...titleProps}>
          {title}
        </Typography>
        <LaunchOutlined />
      </a>
    </Link>
  );

  return (
    <Box
      component="header"
      className={`${classes.root} ${className || ""}`}
      {...otherProps}
    >
      {title &&
        (sectionId === "congratulationsrecentgrads-section" ? (
          renderGraduationSection()
        ) : sectionId === "aboutus-section" ? (
          renderAboutUsSection()
        ) : (
          <SectionTitle />
        ))}

      {subtitle && (
        <Typography
          variant="subtitle1"
          className={classes.subtitle}
          {...subtitleProps}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    // Add bottom margin if element below
    "&:not(:last-child)": {
      marginBottom: "2rem"
    }
  },
  subtitle: {
    // Subtitle text generally isn't very long
    // so usually looks better to limit width.
    maxWidth: 700,
    // So we can have max-width but still
    // have alignment controlled by text-align.
    display: "inline-block"
  },
  footNoteStyledLink: {
    color: "#336699",
    fontWeight: "bold",
    transition: "300ms",
    "&:hover": {
      color: "red"
    }
  },
  graduationSectionTitleWrapper: {
    display: "flex",
    alignItems: "center"
  },
  aboutLaunchLink: {
    color: "inherit",
    textDecoration: "none",
    "& > svg": {
      transition: "color 300ms"
    },
    "&:hover > svg": {
      color: "royalBlue"
    }
  }
}));

export default SectionHeader;
