import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Fade
} from "@mui/material";
import { styled } from "@mui/material/styles";

interface TutorialModalProps {
  open: boolean;
  onClose: () => void;
  locale: string;
}
// TODO: Retrieve content from contentful for translations
const TutorialModal: React.FC<TutorialModalProps> = ({
  open,
  onClose,
  locale
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      TransitionComponent={Fade}
      transitionDuration={{ enter: 500, exit: 500 }}
    >
      <DialogContentStyled>
        <VideoContainer>
          <Video
            src={`https://www.youtube.com/embed/${
              locale === "en-US" ? "cpeo_u3RO3s" : "dTk0K0mipI4"
            }?showinfo=0`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </VideoContainer>
      </DialogContentStyled>
      <TitleStyled>SSET Dashboard Tutorial</TitleStyled>
      <DescriptionContentStyled>
        <Typography>
          {locale === "en-US"
            ? "A quick overview on how to use the dashboard for community members"
            : "Una descripción general sobre cómo usar el dashboard para miembros de la comunidad"}
        </Typography>
      </DescriptionContentStyled>
      <DialogActions>
        <Button variant="contained" color="secondary" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
const DialogContentStyled = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(2)
}));

const TitleStyled = styled(DialogTitle)({
  paddingBottom: 0
});

const DescriptionContentStyled = styled(DialogContent)({
  overflow: "hidden"
});

const VideoContainer = styled("div")({
  width: "100%",
  paddingTop: "56.25%", // 16:9 aspect ratio
  position: "relative",
  overflow: "hidden"
});

const Video = styled("iframe")(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: theme.shape.borderRadius
}));
export default TutorialModal;
