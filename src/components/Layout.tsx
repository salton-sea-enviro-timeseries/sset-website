import React from "react";
import { makeStyles } from "@material-ui/core";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Meta from "./Meta";

const Layout: React.FC = ({ children }) => {
  const classes = useStyles();
  return (
    <>
      <Meta />
      <Navbar />
      <main className={classes.main}>{children}</main>
      <Footer />
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column"
  }
}));

export default Layout;
