import React from "react";
import Link from "next/link";
import Container from "@material-ui/core/Container";
import Grid, { GridSize } from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { makeStyles } from "@material-ui/core/styles";
import { useAppContext } from "./AppContext";
import Image from "next/image";

const socialMediaIcons = [
  {
    icon: "/icon-facebook.svg",
    url: "https://www.facebook.com/AlianzaCoachellaValley/?ref=br_rs",
    label: "Facebook"
  },
  {
    icon: "/icon-instagram.svg",
    url: "https://www.instagram.com/alianzacv/",
    label: "Instagram"
  },
  {
    icon: "/x-social-media-white-square-icon.svg",
    url: "https://twitter.com/alianzacv",
    label: "Twitter"
  },

  {
    icon: "/youtube-color-icon.svg",
    url: "https://www.youtube.com/user/BHCECV",
    label: "Youtube"
  }
];

const logos = [
  {
    src: "/logo-alt.png",
    href: "/",
    alt: "SSET Logo",
    width: 100
  },
  {
    src: "/loma-linda-university-2.png",
    href: "https://llu.edu/",
    alt: "Loma Linda University",
    width: 200
  },
  {
    src: "/alianzacv-logo.jpg",
    href: "https://www.alianzacv.org/",
    alt: "Alianza Logo",
    width: 100
  },

  {
    src: "/logo_UCLA_white.svg",
    href: "https://www.ucla.edu/",
    alt: "UCLA Logo",
    width: 100
  },
  {
    src: "/brown-logo.svg",
    href: "https://www.brown.edu/",
    alt: "Brown Univ. Logo",
    width: 100
  },
  {
    src: "/yoc-logo.png",
    href: "https://www.alianzacv.org/our-work/#youth-organizing-council",
    alt: "Youth Organizing Council Logo",
    width: 100
  }
];
interface GridContainerProps {
  children: React.ReactNode;
  xs: GridSize;
  md: GridSize;
  alignItems?: "flex-start" | "center" | "flex-end" | "stretch" | "baseline";
  justifyContent?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
}
interface SocialLinkItemProps {
  icon: string;
  url: string;
  label: string;
  classes: any;
}
interface ImageLinkProps {
  href: string;
  src: string;
  alt: string;
  width: number;
}
const GridContainer: React.FC<GridContainerProps> = ({
  children,
  xs,
  md,
  alignItems,
  justifyContent
}) => (
  <Grid
    container
    item
    xs={xs}
    md={md}
    alignItems={alignItems}
    justifyContent={justifyContent}
  >
    {children}
  </Grid>
);
const SocialLinkItem: React.FC<SocialLinkItemProps> = ({
  icon,
  url,
  label,
  classes
}) => (
  <ListItem
    button
    component="a"
    href={url}
    target="_blank"
    rel="noreferrer"
    className={classes.listItem}
  >
    <ListItemIcon className={classes.socialIcon}>
      <Image src={icon} alt={label} width="24" height="24" />
    </ListItemIcon>
    <ListItemText>{label}</ListItemText>
  </ListItem>
);
const ImageLink: React.FC<ImageLinkProps> = ({ href, src, alt, width }) => (
  <Link href={href}>
    {/* eslint-disable @next/next/no-img-element*/}
    <a target="_blank" rel="noopener noreferrer">
      <img src={src} width={width} alt={alt} />
    </a>
  </Link>
);

const Footer = () => {
  const classes = useStyles();
  const ctx = useAppContext();
  if (!ctx) {
    return null;
  }
  const { width } = ctx;
  return (
    <Box
      component="footer"
      bgcolor="grey.900"
      color="white"
      py={2}
      className={classes.root}
      style={{ minWidth: width }}
    >
      <Container>
        <Grid container spacing={4}>
          <GridContainer xs={12} md={2}>
            <List disablePadding component="div">
              <ListItem className={classes.listItem} component="div">
                <Typography
                  variant="overline"
                  className={classes.listItemTextHeader}
                >
                  Socials
                </Typography>
              </ListItem>
              <Box className={classes.socialsContainer}>
                {socialMediaIcons.map((iconData) => (
                  <SocialLinkItem
                    key={iconData.label}
                    {...iconData}
                    classes={classes}
                  />
                ))}
              </Box>
            </List>
          </GridContainer>
          {/* socials end */}
          <GridContainer
            xs={12}
            md={10}
            alignItems="center"
            justifyContent="space-evenly"
          >
            {logos.map((logoData) => (
              <ImageLink key={logoData.alt} {...logoData} />
            ))}
          </GridContainer>
        </Grid>
        <Box pt={10}>
          <Typography align="center" variant="caption" component="p">
            Built in the Coachella Valley ☀️
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: theme.zIndex.drawer + 1
  },
  sticky: {
    marginTop: "auto"
  },
  socialsContainer: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexWrap: "wrap"
    },
    [theme.breakpoints.between("sm", "md")]: {
      flexWrap: "nowrap"
    },
    [theme.breakpoints.up("md")]: {
      flexWrap: "wrap"
    }
  },
  listItem: {
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 12,
    paddingRight: 12
  },
  listItemTextHeader: {
    fontWeight: "bold"
  },
  socialIcon: {
    minWidth: 30
  }
}));

export default Footer;
