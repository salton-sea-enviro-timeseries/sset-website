import React from "react";
import { makeStyles } from "@material-ui/core";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Meta from "./Meta";

interface LayoutProps {
  className?: string;
}
const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  const classes = useStyles();

  return (
    <>
      <Meta />
      <Navbar />
      <main className={`${classes.main} ${className}`}>{children}</main>
      <Footer className={className} />
    </>
  );
};

const useStyles = makeStyles(() => ({
  main: {
    flex: 1
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "center",
    // alignItems: "center",
    // padding: theme.spacing(5, 0)
  }
}));

export default Layout;
