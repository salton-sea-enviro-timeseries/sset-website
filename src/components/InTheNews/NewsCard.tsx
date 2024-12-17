import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { CardActionArea, makeStyles } from "@material-ui/core";
import { ArticleFields } from "types";
import { useAppContext } from "components/AppContext";
// TODO: add articleProvider to the end of card and add custom links to end of card
export default function NewsCard({
  articleDescriptionLong,
  articleProvider,
  articleTitle,
  articleUrl,
  imageUrl,
  customImage,
  order
}: ArticleFields) {
  const classes = useStyles();
  // @ts-ignore
  const { language } = useAppContext();
  const currentLocale = language === "en" ? "en-US" : "es";
  return (
    <Card className={classes.card} elevation={2}>
      <CardActionArea
        className={classes.cardActionArea}
        target="_blank"
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
      </CardActionArea>
    </Card>
  );
}
const useStyles = makeStyles(() => ({
  card: {
    height: "100%"
  },
  cardActionArea: {
    height: "100%"
  }
}));
