import type { ReactElement } from "react";
import { Stack } from "@mui/material";
import { SocialsContainer } from "./StyledElements";
import SocialLinkItem from "./SocialLinkItem";

interface SocialMediaIconItem {
  icon?: ReactElement;
  url?: string;
  label: string;
}
interface SocialLinkContainerProps {
  socialMediaIcons: SocialMediaIconItem[];
  my?: number | string;
  mx?: number | string;
}
const SocialLinkContainer = ({
  socialMediaIcons,
  my = 1,
  mx = 2
}: SocialLinkContainerProps) => (
  <SocialsContainer marginTop={my}>
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={mx}
      component="ul"
      sx={{ listStyle: "none", p: 0, m: 0 }}
    >
      {socialMediaIcons.map((iconData) => (
        <SocialLinkItem key={iconData.label} {...iconData} />
      ))}
    </Stack>
  </SocialsContainer>
);

export default SocialLinkContainer;
