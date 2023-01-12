import React from "react";
import Link from "next/link";
import clsx from "clsx";
import {
  Box,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
  useTheme
} from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowForward";
import ArrowLeftIcon from "@material-ui/icons/ArrowBack";
import WaterQualityIcon from "@material-ui/icons/Waves";
import AirQualityIcon from "@material-ui/icons/FilterDrama";
import { useRouter } from "next/router";

import Footer from "./Footer";
import Navbar from "./Navbar";

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
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const isActive = (pathname: string) => {
    return router.pathname === pathname;
  };

  return (
    <>
      <Navbar />
      <Box display="flex" flex={1} pb={5}>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open
            })
          }}
        >
          <List>
            <ListItem
              button
              onClick={!open ? handleDrawerOpen : handleDrawerClose}
            >
              <ListItemIcon>
                {!open ? <ArrowRightIcon /> : <ArrowLeftIcon />}
              </ListItemIcon>
              <ListItemText />
            </ListItem>
            {DASHBOARD_LINKS.map(({ href, label, Icon }) => (
              <Link key={label} href={href} passHref>
                <ListItem button component="a">
                  <ListItemIcon>
                    <Icon color={isActive(href) ? "primary" : undefined} />
                  </ListItemIcon>
                  <ListItemText
                    primary={label}
                    primaryTypographyProps={{
                      color: isActive(href) ? "primary" : undefined
                    }}
                  />
                </ListItem>
              </Link>
            ))}
          </List>
        </Drawer>
        <Container maxWidth="lg" className={classes.main}>
          <>{children}</>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column"
  },
  main: {
    flexGrow: 1,
    paddingTop: NAVBAR_HEIGHT + theme.spacing(3),
    width: `calc(100% - ${DRAWER_WIDTH}px)`
  },
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: DRAWER_WIDTH,
    paddingTop: NAVBAR_HEIGHT,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    paddingTop: NAVBAR_HEIGHT,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    }
  }
}));

export default DashboardLayout;
