import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { CardActionArea, makeStyles } from "@material-ui/core";
import { MediaObject } from "types";

interface VideoCardProps {
  title: string;
  description: string;
  src: string;
}

export default function VideoCard({ title, description, src }: VideoCardProps) {
  const classes = useStyles();
  return (
    <Card className={classes.card} elevation={2}>
      <iframe
        width="100%"
        height={225}
        src={src}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" style={{ color: "text.secondary" }}>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}

const useStyles = makeStyles(() => ({
  card: {
    height: "100%"
  },
  video: {
    objectFit: "cover",
    width: "100%"
  }
}));
