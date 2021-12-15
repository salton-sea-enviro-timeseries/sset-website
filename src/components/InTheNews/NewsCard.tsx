import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { CardActionArea, makeStyles } from "@material-ui/core";
import { MediaObject } from "types";

interface NewsCardProps {
  media: MediaObject;
}

export default function NewsCard({ media }: NewsCardProps) {
  const classes = useStyles();
  return (
    <Card className={classes.card} elevation={2}>
      <CardActionArea
        className={classes.cardActionArea}
        target="_blank"
        href={media.link}
      >
        <CardMedia
          component={"img"}
          height="140"
          image={media.imageUrl}
          alt={media.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {media.title}
          </Typography>
          <Typography variant="body2" style={{ color: "text.secondary" }}>
            {media.description}
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
