import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActionAreaProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ArticleFields } from "types";
import { useAppContext } from "components/AppContext";
// TODO: add articleProvider to the end of card and add custom links to end of card
interface ExtendedCardActionAreaProps extends CardActionAreaProps {
  component?: React.ElementType;
  target?: string;
  rel?: string;
  href?: string;
}
export default function NewsCard({
  articleDescriptionLong,
  articleProvider,
  articleTitle,
  articleUrl,
  imageUrl,
  customImage,
  order
}: ArticleFields) {
  // @ts-ignore
  const { language } = useAppContext();
  const currentLocale = language === "en" ? "en-US" : "es";
  return (
    <StyledCard elevation={2}>
      <StyledCardActionArea
        component="a"
        target="_blank"
        rel="noopener noreferrer"
        href={articleUrl["en-US"] ?? ""}
      >
        <CardMedia
          component={"img"}
          height="225"
          image={
            imageUrl?.["en-US"] ??
            customImage?.["en-US"].fields.file["en-US"].url ??
            "/alianza-logo.jpg"
          }
          alt={articleTitle[currentLocale]}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {articleTitle[currentLocale]}
          </Typography>
          <Typography variant="body2" style={{ color: "text.secondary" }}>
            {articleDescriptionLong[currentLocale]}
          </Typography>
        </CardContent>
      </StyledCardActionArea>
    </StyledCard>
  );
}
const StyledCard = styled(Card)({
  height: "100%"
});
const StyledCardActionArea = styled(CardActionArea, {
  shouldForwardProp: (prop) => true
})<ExtendedCardActionAreaProps>({
  height: "100%"
});
