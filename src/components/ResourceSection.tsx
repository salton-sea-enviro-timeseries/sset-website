import { Typography, Container, Link, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
type Props = {
  title: string;
  body?: string;
  link: string;
  download: boolean;
  headerSize?: number;
  children?: React.ReactNode;
};
const ResourceSection = ({
  title,
  body,
  link,
  download,
  headerSize = 4,
  children
}: Props) => {
  const classes = useStyles();
  const variant = `h${headerSize}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  // TODO add Translations and import content from Contentful.

  return (
    // lassName={classes.resourceSection}
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
            variant={variant}
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
            variant={variant}
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
      {children}
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
