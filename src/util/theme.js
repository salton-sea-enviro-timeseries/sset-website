import React, { useEffect } from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

const globalTheme = createTheme({
  palette: {
    primary: {
      // Use hue from colors or hex
      main: "#14202B"
    },
    secondary: {
      main: "#ca6d68"
    },
    background: {
      // Background for <body>
      // and <Section color="default">
      default: "#fff",
      // Background for elevated
      // components (<Card>, etc)
      paper: "#fff"
    }
  },
  typography: {
    fontSize: 14,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
    // Uncomment to make button lowercase
    // button: { textTransform: "none" },
  }
});

const theme = createTheme(
  {
    overrides: {
      MuiCssBaseline: {
        "@global": {
          "#__next": {
            // Flex column that is height
            // of viewport so that footer
            // can push self to bottom by
            // with auto margin-top
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            // Prevent child elements from
            // shrinking when content
            // is taller than the screen
            // (quirk of flex parent)
            "& > *": {
              flexShrink: 0
            }
          }
        }
      }
      // MuiButton: {
      //   root: {
      //     // borderRadius: 0
      //     textTransform: "none"
      //   },
      //   contained: {
      //     backgroundColor: globalTheme.palette.primary.main,
      //     color: globalTheme.palette.primary.contrastText,
      //     boxShadow: `3px 3px 0 0 ${globalTheme.palette.secondary.main}`,
      //     "&:hover": {
      //       backgroundColor: globalTheme.palette.primary.dark,
      //       boxShadow: `5px 5px 0 0 ${globalTheme.palette.secondary.main}`
      //     }
      //   }
      //   // outlined: {
      //   //   border: `1px solid ${globalTheme.palette.accent.main}`,
      //   //   color: globalTheme.palette.accent.main
      //   // },
      //   // containedPrimary: {
      //   //   backgroundColor: globalTheme.palette.accent.main,
      //   //   color: globalTheme.palette.accent.contrastText,
      //   //   "&:hover": {
      //   //     backgroundColor: globalTheme.palette.accent.dark
      //   //   }
      //   // }

      //   // containedSecondary: {
      //   //   background: secondaryGradient
      //   // },
      // }
    }
  },
  globalTheme
);

export const ThemeProvider = (props) => {
  // Since Next.js server-renders we need to remove
  // the server-side injected CSS on mount so the
  // client can take over with managing styles.
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      {/* Set global MUI styles */}
      <CssBaseline />
      {props.children}
    </MuiThemeProvider>
  );
};
