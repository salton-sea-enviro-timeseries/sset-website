import React, { useState } from "react";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "next/link";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import { Box, Divider } from "@material-ui/core";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { useAppContext } from "./AppContext";
import { Language } from "types";

const Links = [
  {
    href: "/",
    label: "Home"
  },
  {
    href: "/dashboard",
    label: "Dashboard"
  },
  {
    href: "/contact-us",
    label: "Contact Us"
  }
];

function Navbar() {
  const classes = useStyles();
  const router = useRouter();

  // @ts-ignore
  const { language, setLanguage } = useAppContext();

  console.log("LANGUAGE", language);

  const isActiveLink = (href: string) => router.asPath === href;

  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuAnchor(null);
  };

  const handleToggleLanguage = (
    event: React.MouseEvent<HTMLElement>,
    newLanguage: Language | null
  ) => {
    if (newLanguage && newLanguage !== language) {
      setLanguage(newLanguage as Language);
    }
  };

  return (
    <AppBar
      className={classes.navbar}
      color="transparent"
      position="sticky"
      elevation={1}
    >
      {/* <Container disableGutters={true}> */}
      <Toolbar className={classes.toolbar}>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Link href="/" passHref>
            <a>
              {/* eslint-disable  @next/next/no-img-element */}
              <img width={150} src="/logo-red.png" alt="SSET Logo" />
            </a>
          </Link>
        </Box>
        <div className={classes.spacer} />
        <Hidden smUp={true} implementation="css">
          <div className={classes.menuWrapper}>
            <IconButton
              onClick={handleOpenMenu}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
          </div>
          <Menu
            open={Boolean(menuAnchor)}
            anchorEl={menuAnchor}
            getContentAnchorEl={undefined}
            onClick={handleCloseMenu}
            onClose={handleCloseMenu}
            keepMounted={true}
            anchorOrigin={{
              vertical: "center",
              horizontal: "center"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center"
            }}
          >
            <div>
              {Links.map((link, index) => (
                <Link passHref href={link.href} key={index}>
                  <MenuItem selected={isActiveLink(link.href)}>
                    {link.label}
                  </MenuItem>
                </Link>
              ))}
            </div>
          </Menu>
        </Hidden>
        <Hidden xsDown={true} implementation="css">
          <Box height="100%" display="flex" alignItems="center">
            {Links.map((link, index) => (
              <Button
                key={index}
                href={link.href}
                size="small"
                variant={isActiveLink(link.href) ? "outlined" : undefined}
                color={isActiveLink(link.href) ? "primary" : undefined}
                className={classes.navlink}
              >
                {link.label}
              </Button>
            ))}
          </Box>
        </Hidden>
        <Divider orientation="vertical" flexItem />
        <Box display="flex" alignItems="center" pl={1}>
          <ToggleButtonGroup
            value={language}
            exclusive
            onChange={handleToggleLanguage}
            aria-label="text alignment"
          >
            <ToggleButton
              size="small"
              value="en"
              aria-label="English"
              className={classes.languageButton}
              classes={{
                selected: classes.selectedLanguageButton
              }}
            >
              EN
            </ToggleButton>
            <ToggleButton
              size="small"
              value="es"
              aria-label="Espanol"
              className={classes.languageButton}
              classes={{
                selected: classes.selectedLanguageButton
              }}
            >
              ES
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Toolbar>
      {/* </Container> */}
    </AppBar>
  );
}

const useStyles = makeStyles((theme) => ({
  logo: {
    height: 28,
    marginRight: theme.spacing(2)
  },
  spacer: {
    flexGrow: 1
  },
  navbar: {
    // backgroundColor: "#181818"
    backgroundColor: theme.palette.background.default
  },
  navlink: {
    margin: theme.spacing(0, 0.25)
    // color: "#fff",
    // height: "100%",
    // borderRadius: 0,
    // "&:hover, &.active": {
    //   "& .MuiButton-label": {
    //     height: "100%",
    //     boxShadow: `inset 0 -2px 0 ${theme.palette.secondary.light}`
    //   }
    // }
  },
  toolbar: {
    alignItems: "stretch"
  },
  menuWrapper: {
    height: "100%",
    display: "flex",
    alignItems: "center"
  },
  languageButton: {
    padding: "2px 5px",
    fontWeight: "bold"
  },
  selectedLanguageButton: {
    color: "#ffffff !important",
    backgroundColor: "#181818 !important"
  }
}));

export default Navbar;
