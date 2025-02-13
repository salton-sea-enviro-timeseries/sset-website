import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  styled
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppContext } from "./AppContext";
import { Language } from "types";
import { getContent } from "util/getContent";

function Navbar({ minWidth = "100vw" }: { minWidth?: string }) {
  const router = useRouter();
  // @ts-ignore
  const { language, setLanguage } = useAppContext();
  const Links = React.useMemo(() => {
    return [
      {
        href: "/",
        label: getContent(`site.${language}.navLinks.home`)
      },
      {
        href: "/dashboard/water-quality",
        label: getContent(`site.${language}.navLinks.dashboard`)
      },
      {
        href: "/contact-us",
        label: getContent(`site.${language}.navLinks.contact`)
      },
      {
        href: "/resources",
        label: getContent(`site.${language}.navLinks.resources`)
      },
      {
        href: "/our-community",
        label: getContent(`site.${language}.navLinks.community`)
      },
      {
        href: "/about-us",
        label: getContent(`site.${language}.navLinks.about`)
      }
    ];
  }, [language]);

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
    <StyledAppBar color="transparent" position="fixed" elevation={1}>
      <StyledToolbar sx={{ minWidth: minWidth }}>
        <Box display="flex" alignItems="center">
          <Link href="/" passHref>
            <a>
              {/* eslint-disable  @next/next/no-img-element */}
              <img width={150} src="/logo-red.png" alt="SSET Logo" />
            </a>
          </Link>
          <CloseIcon fontSize="small" sx={{ marginLeft: "2" }} />
          <Link href="https://thrivingsaltonsea.com/" passHref>
            <a target="_blank" rel="noopener noreferrer">
              {/* eslint-disable  @next/next/no-img-element */}
              <img
                width={150}
                src="/thriving-salton-sea-communities.png"
                alt="Thriving Salton Sea Communities Logo"
              />
            </a>
          </Link>
        </Box>
        <Box sx={{ flexGrow: 1, minWidth: "1px" }} />
        {/* Hidden on mobile */}
        <Box
          sx={{
            display: { xs: "flex", md: "none" }
          }}
        >
          <Box display="flex" alignItems="center">
            <IconButton
              onClick={handleOpenMenu}
              color="inherit"
              aria-label="Menu"
              aria-haspopup="true"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              open={Boolean(menuAnchor)}
              anchorEl={menuAnchor}
              onClose={handleCloseMenu}
              keepMounted={true}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left"
              }}
            >
              {Links.map((link, index) => (
                <Link passHref href={link.href} key={index}>
                  <MenuItem selected={isActiveLink(link.href)}>
                    {link.label}
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
        </Box>
        {/* Visible on larger screens */}
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <Box height="100%" display="flex" alignItems="center">
            {Links.map((link, index) => (
              <Button
                key={index}
                href={link.href}
                size="small"
                variant={isActiveLink(link.href) ? "outlined" : undefined}
                color={isActiveLink(link.href) ? "primary" : "inherit"}
                sx={{ mx: 0.25 }}
              >
                {link.label}
              </Button>
            ))}
          </Box>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box display="flex" alignItems="center" pl={1} pr={1}>
          <ToggleButtonGroup
            value={language}
            exclusive
            onChange={handleToggleLanguage}
            aria-label="text alignment"
          >
            <StyledToggleButton size="small" value="en" aria-label="English">
              EN
            </StyledToggleButton>
            <StyledToggleButton size="small" value="es" aria-label="Espanol">
              ES
            </StyledToggleButton>
          </ToggleButtonGroup>
        </Box>
      </StyledToolbar>
    </StyledAppBar>
  );
}
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  zIndex: theme.zIndex.drawer + 1,
  width: "100%"
}));

const StyledToolbar = styled(Toolbar)({
  alignItems: "stretch"
});

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  padding: "2px 5px",
  fontWeight: "bold",
  "&.Mui-selected": {
    color: "#ffffff",
    backgroundColor: "#181818",
    // Override hover for selected state
    "&:hover": {
      backgroundColor: "#181818"
    }
  }
}));

export default Navbar;
