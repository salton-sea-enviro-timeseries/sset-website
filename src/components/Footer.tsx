import React from "react";
import {
  Container,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import Link from "next/link";
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
    icon: "/youtube_logo_icon2.png",
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
    width: 150
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
interface LayoutProps {
  className?: string;
  sx?: object;
}
interface SocialLinkItemProps {
  icon: string;
  url: string;
  label: string;
}
interface ImageLinkProps {
  href: string;
  src: string;
  alt: string;
  width: number;
}
const SocialLinkItem: React.FC<SocialLinkItemProps> = ({
  icon,
  url,
  label
}) => (
  <Link href={url} passHref>
    <StyledBaseLink target="_blank" rel="noreferrer">
      <StyledListItem>
        <SocialIcon>
          <Image src={icon} alt={label} width="24" height="24" />
        </SocialIcon>
        <ListItemText>{label}</ListItemText>
      </StyledListItem>
    </StyledBaseLink>
  </Link>
);
const ImageLink: React.FC<ImageLinkProps> = ({ href, src, alt, width }) => (
  <Link href={href}>
    {/* eslint-disable @next/next/no-img-element*/}
    <a target="_blank" rel="noopener noreferrer">
      <img src={src} width={width} alt={alt} />
    </a>
  </Link>
);

const Footer: React.FC<LayoutProps> = ({ className, sx }) => {
  return (
    <StyledFooter as="footer" className={className}>
      <Container>
        <Grid2 container spacing={4}>
          {/* Socials Section */}
          <Grid2 size={{ xs: 12, md: 2 }}>
            <List disablePadding>
              <StyledListItem as="div">
                <HeaderText variant="overline">Socials</HeaderText>
              </StyledListItem>
              <SocialsContainer>
                {socialMediaIcons.map((iconData) => (
                  <SocialLinkItem key={iconData.label} {...iconData} />
                ))}
              </SocialsContainer>
            </List>
          </Grid2>
          {/* Logos Section */}
          <LogoContainer>
            {logos.map((logoData) => (
              <ImageLink key={logoData.alt} {...logoData} />
            ))}
          </LogoContainer>
        </Grid2>
        <Box pt={10}>
          <Typography align="center" variant="caption" component="p">
            Built in the Coachella Valley ☀️
          </Typography>
        </Box>
      </Container>
    </StyledFooter>
  );
};
const StyledFooter = styled(Box)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: theme.palette.grey[900],
  color: theme.palette.common.white,
  padding: theme.spacing(2),
  width: "100%",
  minWidth: "100%",
  maxWidth: "100vw",
  flexGrow: 1
}));

const SocialsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(1),
  [theme.breakpoints.up("md")]: {
    flexWrap: "wrap"
  }
}));

const LogoContainer = styled(Grid2)(({ theme }) => ({
  display: "flex",
  flexGrow: 1,
  alignItems: "center",
  justifyContent: "space-evenly",
  flexWrap: "wrap"
}));

const StyledListItem = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== "classes" && prop !== "button"
})(({ theme }) => ({
  paddingTop: theme.spacing(0.5),
  paddingBottom: theme.spacing(0.5),
  paddingLeft: theme.spacing(1.5),
  paddingRight: theme.spacing(1.5)
}));
const SocialIcon = styled(ListItemIcon)(() => ({
  minWidth: 30
}));

const HeaderText = styled(Typography)(() => ({
  fontWeight: "bold"
}));

const StyledBaseLink = styled("a")(({ theme }) => ({
  color: theme.palette.common.white,
  textDecoration: "none"
}));

export default Footer;
