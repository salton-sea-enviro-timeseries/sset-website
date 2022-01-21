import React from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { emphasize } from "@material-ui/core/styles/colorManipulator";
import capitalize from "@material-ui/core/utils/capitalize";
import BackgroundImage from "./BackgroundImage";
import { CSSProperties } from "@material-ui/core/styles/withStyles";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    // Ensure child <Container> is above background
    // image (if one is set with the bgImage prop).
    "& > .MuiContainer-root": {
      position: "relative"
    }
  },

  // Create color classes that set background color and determine
  // text color and dividing border automatically based on background color.
  // Adds the keys colorDefault, colorLight, etc
  ...[
    ["default", theme.palette.background.default],
    ["light", emphasize(theme.palette.background.default, 0.03)],
    ["primary", theme.palette.primary.main],
    ["secondary", theme.palette.secondary.light]
  ].reduce((acc, [name, value]) => {
    acc[`color${capitalize(name)}`] = {
      backgroundColor: value,
      // Ensure text is legible on background
      color: theme.palette.getContrastText(value),
      // Sibling selector that adds a top border if section above
      // has the same color class.
      // We use emphasize to compute border based on background color
      // and make sure it's always lightly visible.
      [`& + &`]: {
        borderTop: `1px solid ${emphasize(value, 0.09)}`
      }
    };
    return acc;
  }, {} as { [key: string]: CSSProperties }),

  colorInherit: {
    color: "inherit"
  },

  colorTransparent: {
    backgroundColor: "transparent",
    color: "inherit"
  }
}));
interface SectionProps {
  bgColor?: string;
  bgImage?: string;
  bgImageOpacity?: string;
  size?: string;
  className?: string;
  style?: Object;
  children: JSX.Element;
}
function Section(props: SectionProps) {
  const classes = useStyles();

  const {
    bgColor = "default",
    bgImage,
    bgImageOpacity,
    size = "normal",
    className,
    children,
    ...otherProps
  } = props;

  // Get MUI responsize size object based
  // on size prop (normal, medium, large, auto)
  const verticalPadding = {
    normal: { xs: 6 },
    medium: { xs: 6, sm: 10 },
    large: { xs: 6, sm: 20 },
    auto: 0
  }[size];

  return (
    <Box
      component="section"
      py={verticalPadding}
      className={
        classes.root +
        ` ${classes[`color${capitalize(bgColor)}` as keyof typeof classes]}` +
        (className ? ` ${className}` : "")
      }
      {...otherProps}
    >
      {bgImage && <BackgroundImage image={bgImage} opacity={bgImageOpacity} />}

      {props.children}
    </Box>
  );
}

export default Section;
