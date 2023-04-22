import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fade,
  Typography,
  makeStyles
} from "@material-ui/core";

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
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      TransitionComponent={Fade}
      transitionDuration={{ enter: 500, exit: 500 }}
    >
      <DialogContent className={classes.dialogContent}>
        <div className={classes.videoContainer}>
          <iframe
            className={classes.video}
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${
              locale === "en-US" ? "cpeo_u3RO3s" : "dTk0K0mipI4"
            }?showinfo=0`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </DialogContent>
      <DialogTitle className={classes.title}>
        SSET Dashboard Tutorial
      </DialogTitle>
      <DialogContent className={classes.descriptionContent}>
        <Typography>
          {locale === "en-US"
            ? "A quick overview on how to use the dashboard for community members"
            : "Una descripción general sobre cómo usar el dashboard para miembros de la comunidad"}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="secondary" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TutorialModal;
const useStyles = makeStyles((theme) => ({
  dialogContent: {
    padding: theme.spacing(2)
  },
  title: {
    paddingBottom: 0
  },
  descriptionContent: {
    overflow: "hidden"
  },
  videoContainer: {
    width: "100%",
    paddingTop: "56.25%",
    position: "relative"
  },
  videoWrapper: {
    borderRadius: theme.shape.borderRadius,
    overflow: "hidden",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%"
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: theme.shape.borderRadius
  }
}));
