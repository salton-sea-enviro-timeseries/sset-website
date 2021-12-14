// import * as React from 'react'
import Card from "@material-ui/core/Card";
import Link from "next/link";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import {
  Button,
  CardActionArea,
  CardActions,
  makeStyles
} from "@material-ui/core";
import { MediaObject } from "types";
import { type } from "os";

interface NewsCardProps {
  // [key: string]: MediaObject[];
  newsData: MediaObject;
}

export default function NewsCard({ newsData }: NewsCardProps) {
  const classes = useStyles();

  console.log("image", newsData.imageUrl);
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <Link passHref href={newsData.link}>
          <a target="_blank">
            <Typography gutterBottom variant="h5" component="div">
              {newsData.title}
            </Typography>
          </a>
        </Link>

        <CardMedia
          component={"img"}
          height="140"
          image={newsData.imageUrl}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {newsData.provider}
          </Typography>
          <Typography variant="body2" style={{ color: "text.secondary" }}>
            {newsData.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  );
}

const useStyles = makeStyles(() => ({
  card: {
    maxWidth: 400
  }
}));
