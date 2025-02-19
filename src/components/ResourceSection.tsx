import { Typography, Container, Link, Button, styled } from "@mui/material";
type Props = {
  title: string;
  body?: string;
  link: string;
  download?: boolean | string;
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
  const variant = `h${headerSize}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  // TODO add Translations and import content from Contentful.

  return (
    <StyledContainer>
      {download ? (
        <StyledDownloadLink href={link} download={download}>
          <StyledHeader variant={variant} display="inline">
            {title}
          </StyledHeader>
        </StyledDownloadLink>
      ) : (
        <Link
          variant="inherit"
          underline="none"
          target={"_blank"}
          rel="noopener"
          href={link}
          color="inherit"
        >
          <StyledHeader variant={variant} display="inline">
            {title}
          </StyledHeader>
        </Link>
      )}
      <Typography variant="body2" sx={{ marginTop: "1rem" }}>
        {body}
      </Typography>
      {children}
    </StyledContainer>
  );
};
const StyledContainer = styled(Container)(({ theme }) => ({
  marginBottom: "1rem"
}));

const StyledHeader = styled(Typography)(({ theme }) => ({
  boxShadow: `inset 0 -5px 0 ${theme.palette.primary.light}`,
  transition: "color 0.2s ease",
  "&:hover": {
    color: theme.palette.secondary.light
  }
}));
const StyledDownloadLink = styled("a")(({ theme }) => ({
  ...theme.typography.h4,
  textTransform: "none",
  justifyContent: "flex-start",
  padding: 0,
  textDecoration: "none",
  "&:hover": {
    backgroundColor: "transparent",
    color: theme.palette.secondary.light
  }
}));

export default ResourceSection;
