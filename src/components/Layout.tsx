import React from "react";
import { makeStyles } from "@material-ui/core";
import { orange } from "@material-ui/core/colors";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout: React.FC = ({ children }) => {
  const classes = useStyles();
  return (
    <>
      <Navbar />
      <main className={classes.main}>{children}</main>
      <Footer />
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  header: {
    fontWeight: theme.typography.fontWeightBold
  },
  main: {
    flex: 1
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "center",
    // alignItems: "center",
    // padding: theme.spacing(5, 0)
  },
  accentUnderline: {
    boxShadow: `inset 0 -2px 0 ${orange[500]}`
  },
  accentWord: {
    color: orange[500],
    backgroundColor: orange[100],
    padding: theme.spacing(0, 1)
  }
}));

export default Layout;
