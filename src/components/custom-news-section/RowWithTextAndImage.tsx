import { makeStyles, Theme } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";
import Image from "next/image";

interface RowWithTextAndImageProps {
  text: string;
  imgSrc: string;
  altText: string;
  imgWidth: string | number;
  imgHeight: string | number;
  captionText: React.ReactNode;
}
//TODO :refactor
const RowWithTextAndImage = ({
  text,
  imgSrc,
  altText,
  captionText
}: RowWithTextAndImageProps) => {
  const paragraphs = text.split(/\n\n/);
  const classes = useStyles();
  return (
    <Box className={classes.rowWrapper}>
      <Box className={classes.column}>
        {paragraphs.map((paragraph, index) => (
          <Typography key={index} style={{ marginBottom: "1rem" }}>
            {paragraph}
          </Typography>
        ))}
      </Box>
      <Box
        className={`${classes.column} ${classes.customNewsImageWrapper}`}
        sx={{ marginBottom: "2.5rem" }}
      >
        {/* Image */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            paddingBottom: "100.33%", //maintains a  aspect ratio (height/width)*100
            height: "0",
            minHeight: "400px",
            minWidth: "325px"
          }}
        >
          <Image src={imgSrc} alt={altText} layout="fill" objectFit="contain" />
        </Box>

        {/* Caption */}
        <Box sx={{ marginTop: "0.5rem" }}>
          <Typography variant="caption">{captionText}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  column: {
    flex: "1 1 300px",
    marginLeft: "1rem",
    marginRight: "1rem"
  },
  customNewsImageWrapper: {
    position: "relative"
  },
  rowWrapper: {
    display: "flex",
    flexWrap: "wrap",
    flexGrow: 1,
    justifyContent: "space-between"
  }
}));

export default RowWithTextAndImage;
