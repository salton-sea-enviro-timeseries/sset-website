import React from "react";
import Link from "next/link";
import {
  Box,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
  ListItemButton,
  Theme,
  CSSObject,
  IconButton
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowForward";
import ArrowLeftIcon from "@mui/icons-material/ArrowBack";
import WaterQualityIcon from "@mui/icons-material/Waves";
import AirQualityIcon from "@mui/icons-material/FilterDrama";
import { useRouter } from "next/router";
import Footer from "../Footer";
import Navbar from "../Navbar";

const DRAWER_WIDTH = 240;
const NAVBAR_HEIGHT = 80;
// TODO: move these out to a data file
const DASHBOARD_LINKS = [
  {
    href: "/dashboard/water-quality",
    label: "Water Quality",
    // @ts-ignore
    Icon: (props) => <WaterQualityIcon {...props} />
  },
  {
    href: "/dashboard/air-quality",
    label: "Air Quality",
    // @ts-ignore
    Icon: (props) => <AirQualityIcon {...props} />
  }
];

const DashboardLayout: React.FC = ({ children }) => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => setOpen((prev) => !prev);
  const isActive = (pathname: string) => {
    return router.pathname === pathname;
  };

  return (<>
    <Navbar />
    <Box display="flex" flex={1} pb={5}>
      <MuiDrawer open={open} variant="permanent">
        <DrawerHeader>
          <IconButton
            aria-label="open drawer"
            onClick={toggleDrawer}
            color="inherit"
            edge="end"
            sx={{ paddingTop: 2 }}
          >
            <ListItemIcon>
              {!open ? <ArrowRightIcon /> : <ArrowLeftIcon />}
            </ListItemIcon>
          </IconButton>
        </DrawerHeader>
        <List>
          {" "}
          {DASHBOARD_LINKS.map(({ href, label, Icon }) => (
            <Link key={label} href={href} passHref legacyBehavior>
              <ListItemButton component="a">
                <ListItemIcon>
                  <Icon color={isActive(href) ? "primary" : undefined} />
                </ListItemIcon>
                <ListItemText
                  primary={label}
                  slotProps={{
                    primary: { color: isActive(href) ? "primary" : undefined }
                  }}
                />
              </ListItemButton>
            </Link>
          ))}
        </List>
      </MuiDrawer>
      <StyledMain>
        <StyledContainer maxWidth="lg">
          <>{children}</>
        </StyledContainer>
      </StyledMain>
    </Box>
    <Footer />
  </>);
};
const openedMixin = (theme: Theme): CSSObject => ({
  width: DRAWER_WIDTH,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: "hidden"
});
const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`
  }
});
const DrawerHeader = styled("div")(({ theme }) => ({
  marginTop: NAVBAR_HEIGHT + 20,
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end"
}));

const MuiDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme)
      }
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme)
      }
    }
  ]
}));
const StyledMain = styled("main")(({ theme }) => ({
  flexGrow: 1,
  width: `calc(100% - ${DRAWER_WIDTH}px)`
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: `calc(${theme.spacing(3)} + ${NAVBAR_HEIGHT}px)`,
  width: "100%"
}));

export default DashboardLayout;
