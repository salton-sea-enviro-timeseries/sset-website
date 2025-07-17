import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

export const DownloadText = styled(Typography)(({ theme }) => ({
  textDecoration: "none",
  color: "black",
  boxShadow: `inset 0 -4px 0 ${theme.palette.primary.light}`,
  transition: "color 0.2s ease",
  "&:hover": {
    color: theme.palette.secondary.light
  }
}));

export const DownloadButton = styled(Button)(({ theme }) => ({
  ...theme.typography.h5,
  textTransform: "none",
  justifyContent: "flex-start",
  padding: 0,
  "&:hover": {
    backgroundColor: "transparent"
  }
}));
