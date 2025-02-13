import React from "react";
import { styled } from "@mui/material/styles";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Meta from "./Meta";
import { Box } from "@mui/material";

interface LayoutProps {
  className?: string;
  minWidth?: string;
}
const Layout: React.FC<LayoutProps> = ({
  children,
  className,
  minWidth = "100vw"
}) => {
  return (
    <Box display="flex" flexDirection="column" minWidth={minWidth}>
      <Meta />
      <Navbar minWidth={minWidth} />
      <StyledMain>{children}</StyledMain>
      <Footer className={className} />
    </Box>
  );
};
const StyledMain = styled("main")({
  flexGrow: 1,
  width: "100%"
});

export default Layout;
