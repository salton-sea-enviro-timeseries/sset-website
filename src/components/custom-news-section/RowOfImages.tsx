import { makeStyles, Theme } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";
import Image from "next/image";

interface RowOfImagesProps {
  imgSrc1: string;
  imgSrc2: string;
  imgSrc3: string;
  altText1: string;
  altText2: string;
  altText3: string;
  imgWidth: string | number;
  imgHeight: string | number;
  captionText1: React.ReactNode;
  captionText2?: React.ReactNode;
  captionText3?: React.ReactNode;
}
interface StyleProps {
  imgWidth: string | number;
  imgHeight: string | number;
}
//TODO :refactor
const RowOfImages = ({
  imgSrc1,
  imgSrc2,
  imgSrc3,
  altText1,
  altText2,
  altText3,
  imgWidth,
  imgHeight,
  captionText1,
  captionText2,
  captionText3
}: RowOfImagesProps) => {
  const classes = useStyles({ imgWidth, imgHeight });
  return (
    <Box className={classes.rowWrapper}>
      {/* First Image and Caption */}
      <Box className={classes.imageAndCaptionContainer}>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            paddingBottom: "66.66%", //maintains a  aspect ratio (height/width)*100
            height: "0"
          }}
        >
          <Image
            src={imgSrc1}
            alt={altText1}
            layout="fill"
            objectFit="contain"
          />
        </Box>
        {captionText1 && (
          <Box>
            <Typography variant="caption">{captionText1}</Typography>
          </Box>
        )}
      </Box>

      {/* Second Image and Caption */}
      <Box className={classes.imageAndCaptionContainer}>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            paddingBottom: "61.8%", //maintains a  aspect ratio (height/width)*100
            height: "0"
          }}
        >
          <Image
            src={imgSrc2}
            alt={altText2}
            layout="fill"
            objectFit="contain"
          />
        </Box>
        {captionText2 && (
          <Box sx={{ marginTop: "0.5rem", textAlign: "left" }}>
            <Typography variant="caption">{captionText2}</Typography>
          </Box>
        )}
      </Box>

      {/* Third Image and Caption */}
      <Box className={classes.imageAndCaptionContainer}>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            paddingBottom: "100.33%", //maintains a  aspect ratio (height/width)*100
            height: "0"
          }}
        >
          <Image
            src={imgSrc3}
            alt={altText3}
            layout="fill"
            objectFit="contain"
          />
        </Box>
        {captionText3 && (
          <Box sx={{ marginTop: "0.5rem", textAlign: "left" }}>
            <Typography variant="caption">{captionText3}</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  rowWrapper: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center"
    },
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    width: "100%",
    height: "100%",
    marginBottom: "2.5rem",
    flexWrap: "wrap"
  },
  imageAndCaptionContainer: (props) => ({
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: props.imgWidth,
    height: props.imgHeight,
    marginBottom: "1rem"
  })
}));

export default RowOfImages;
