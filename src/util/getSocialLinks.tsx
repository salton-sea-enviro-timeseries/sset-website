import {
  EmailIcon,
  FaceBookIcon,
  InstagramIcon,
  LinkedInIcon,
  XxIcon
} from "@/assets/social-icons";
import type { JSX } from "react";

export interface SocialMediaItem {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  twitter?: string;
  bluesky?: string;
  email?: string;
}

export interface IconProps {
  width?: number;
  height?: number;
  fill?: string;
}

export interface SocialLink {
  icon: JSX.Element;
  url: string;
  label: string;
}

/**
 * Returns an array of social media links with icons, labels, and URLs.
 * Automatically filters out socials without a URL.
 */
export function getSocialLinks(
  socials: SocialMediaItem,
  iconProps?: IconProps
): SocialLink[] {
  const { facebook, twitter, linkedin, instagram, email } = socials;
  const { width, height, fill } = iconProps ?? {};

  const links: SocialLink[] = [
    {
      icon: <FaceBookIcon fill={fill} width={width} height={height} />,
      url: facebook ?? "",
      label: "Facebook"
    },
    {
      icon: <XxIcon fill={fill} width={width} height={height} />,
      url: twitter ?? "",
      label: "Twitter/X"
    },
    {
      icon: <LinkedInIcon />,
      url: linkedin ?? "",
      label: "LinkedIn"
    },
    {
      icon: <InstagramIcon fill={fill} width={width} height={height} />,
      url: instagram ?? "",
      label: "Instagram"
    },
    {
      icon: <EmailIcon />,
      url: email ?? "",
      label: "Email"
    }
  ];

  return links.filter((link) => Boolean(link.url));
}
