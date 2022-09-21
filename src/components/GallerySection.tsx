import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";

const GallerySection = ({ gallery }: { gallery: string[] }) => {
  const classes = useStyles();

  const getCols = (index: number) => {
    if ([0, 6, 10].includes(index)) return 2;
    return 1;
  };

  return (
    <div className={classes.root}>
      <ImageList className={classes.imageList} cols={3}>
        {gallery.map((item, index) => (
          <ImageListItem key={item} cols={getCols(index)}>
            <img src={item} />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper
    },
    imageList: {
      //   width: 500,
      //   height: 450
    }
  })
);

export default GallerySection;
