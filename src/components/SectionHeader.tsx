import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { TypographyVariant, makeStyles } from "@material-ui/core/styles";

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
  }
}));
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

  return (
    <Box
      component="header"
      className={classes.root + (props.className ? ` ${props.className}` : "")}
      {...otherProps}
    >
      {title && (
        <Typography
          variant={size}
          gutterBottom={props.subtitle ? true : false}
          {...titleProps}
        >
          {sectionFootNoteLink ? (
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
          ) : (
            title
          )}
        </Typography>
      )}

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

export default SectionHeader;
