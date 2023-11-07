import { Typography, Container, Link, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
type Props = {
  title: string;
  body?: string;
  link: string;
  download: boolean;
};
const ResourceSection = ({ title, body, link, download }: Props) => {
  const classes = useStyles();
  // TODO add Translations and import content from Contentful.

  return (
    <Container className={classes.resourceSection}>
      {download ? (
        <Button
          className={classes.downloadButton}
          variant="text"
          color="inherit"
          href={link}
          disableFocusRipple
          disableRipple
          download={download}
        >
          <Typography
            variant="h4"
            component="header"
            className={classes.header}
            display="inline"
          >
            {title}
          </Typography>
        </Button>
      ) : (
        <Link
          variant="inherit"
          underline="none"
          target={"_blank"}
          rel="noopener"
          href={link}
          color="inherit"
        >
          <Typography
            variant="h4"
            component="header"
            className={classes.header}
            display="inline"
          >
            {title}
          </Typography>
        </Link>
      )}
      <Typography variant="body2" style={{ marginTop: "1rem" }}>
        {body}
      </Typography>
    </Container>
  );
};
const useStyles = makeStyles((theme) => ({
  header: {
    boxShadow: `inset 0 -5px 0 ${theme.palette.primary.light}`,
    transition: "color 0.2s ease",
    "&:hover": {
      color: theme.palette.secondary.light
    }
  },
  resourceSection: {
    marginBottom: "1rem"
  },
  downloadButton: {
    ...theme.typography.h4,
    textTransform: "none",
    justifyContent: "flex-start",
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent"
    }
  }
}));

export default ResourceSection;
