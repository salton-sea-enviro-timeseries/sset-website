import type { ReactElement } from "react";
import { ListItemButton } from "@mui/material";
import type { SxProps, Theme } from "@mui/system";

interface SocialLinkItemProps {
  icon?: ReactElement;
  url?: string;
  label?: string;
  sx?: SxProps<Theme>;
}

const SocialLinkItem = ({
  icon,
  url,
  label,
  sx
}: SocialLinkItemProps): JSX.Element | null => {
  if (!url || !icon) return null;

  return (
    <ListItemButton
      component="a"
      href={url}
      target="_blank"
      rel="noreferrer"
      sx={{ padding: 0, ...sx }}
    >
      {icon}
    </ListItemButton>
  );
};
export default SocialLinkItem;
