import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { TypographyVariant } from "@material-ui/core";

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
  }
}));

type variantText = TypographyVariant;

interface SectionHeaderProps {
  subtitle?: string;
  subtitleProps?: string;
  title?: string;
  titleProps?: Object;
  size?: variantText;
  className?: string;
  display?: string;
  justifyContent?: string;
}

function SectionHeader(props: SectionHeaderProps) {
  const classes = useStyles();

  const {
    subtitle,
    subtitleProps,
    title,
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
          // variant={`h${size}`}
          gutterBottom={props.subtitle ? true : false}
          {...titleProps}
        >
          {title}
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
