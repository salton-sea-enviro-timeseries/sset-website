import React, { useEffect } from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  CssBaseline
} from "@mui/material";
import { colors } from "@mui/material";

const globalTheme = createTheme({
  palette: {
    primary: {
      main: colors.teal[500] // Use Material-UI's teal color
    },
    secondary: {
      main: "#f896a6" // Custom secondary color soft red (pink)
    },
    background: {
      default: "#fff", // Background for body
      paper: "#fff" // Background for elevated components
    }
  },
  typography: {
    fontSize: 14,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
    // Uncomment to make button text lowercase
    // button: { textTransform: "none" },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        // Global styles applied to <body> and Next.js root element
        "#__next": {
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          "& > *": {
            flexShrink: 0 // Prevent child elements from shrinking
          }
        }
      }
    }
    // Example customization for other components (optional)
    // MuiButton: {
    //   styleOverrides: {
    //     contained: {
    //       backgroundColor: colors.teal[500],
    //       color: "#fff",
    //       boxShadow: `3px 3px 0 0 #f896a6`,
    //       "&:hover": {
    //         backgroundColor: colors.teal[700],
    //         boxShadow: `5px 5px 0 0 #f896a6`
    //       }
    //     }
    //   }
    // }
  }
});

// ThemeProvider component to wrap your app
export const ThemeProvider = (props) => {
  // Remove server-side injected CSS (no longer needed in MUI v5 if Emotion is used)
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <MuiThemeProvider theme={globalTheme}>
      <CssBaseline />
      {props.children}
    </MuiThemeProvider>
  );
};
