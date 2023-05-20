import {
  CardContent,
  Typography,
  CardActionArea,
  Box
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton/IconButton";
import DoubleArrow from "@material-ui/icons/DoubleArrowSharp";
// import Image from "next/image";
import { Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useAppContext } from "components/AppContext";
import Translation from "components/Translation";
import CardDetails from "components/BioCard/CardDetails";

interface Props {
  activeCard: boolean;
  handleCardClick: React.MouseEventHandler<HTMLButtonElement>;
  selectedQuestion: string;
}
const AboutCard = ({
  activeCard,
  handleCardClick,
  selectedQuestion
}: Props) => {
  // TODO: refactor
  // TODO: add survey api
  const classes = useStyles();
  // @ts-ignore
  const { language } = useAppContext();
  return (
    <div className={classes.flipCard} key={1}>
      <div
        className={`${classes.flipCardInner} ${
          activeCard ? classes.flipped : ""
        }`}
      >
        <div className={classes.flipCardFront}>
          <Card className={classes.frontCard} elevation={4}>
            <CardActionArea
              data-card-id={1}
              style={{ height: "100%" }}
              onClick={handleCardClick}
            >
              <CardContent className={classes.content}>
                <Typography align="center" variant="h6">
                  {selectedQuestion}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
        <div className={classes.flipCardBack}>
          <Card
            className={classes.backCard}
            elevation={4}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <CardActionArea data-card-id={1} onClick={handleCardClick}>
              <CardContent
                style={{
                  padding: 8
                }}
              >
                <CardDetails
                  image="/logo-alt.png"
                  name={"John Doe"}
                  bio={
                    "Nam ut enim nec metus aliquet imperdiet nec sit amet mi.  Nunc laoreet pulvinar lectus. In ac efficitur lectus. Aliquam vulputate, augue at rutrum placerat, dolor ante sodales velit, non posuere augue ipsum rutrum erat. Morbi vel blandit nunc. Sed rhoncus, diam in eleifend iaculis, tortor arcu sodales magna, id pretium leo eros eu lectus. Phasellus tempor bibendum enim, eu ornare ante sagittis non."
                  }
                  answer={
                    "Phasellus tempor bibendum enim, eu ornare ante sagittis non."
                  }
                />
              </CardContent>
            </CardActionArea>
            <Box
              style={{
                width: "100%",
                // backgroundColor: "red",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 4
              }}
            >
              <IconButton aria-label="previous profile" color="primary">
                <DoubleArrow style={{ transform: "rotate(180deg)" }} />
              </IconButton>
              <IconButton aria-label="next profile" color="primary">
                <DoubleArrow />
              </IconButton>
            </Box>
          </Card>
        </div>
      </div>
    </div>
  );
};
const useStyles = makeStyles((theme) => ({
  frontCard: {
    height: "100%"
  },
  backCard: {
    height: "100%"
  },
  flipCard: {
    perspective: "1000px",
    [theme.breakpoints.between(300, 800)]: {
      minHeight: "550px"
    },
    [theme.breakpoints.between(800, 890)]: {
      minHeight: "500px"
    },
    [theme.breakpoints.between(890, "md")]: {
      minHeight: "450px"
    },
    [theme.breakpoints.up("md")]: {
      minHeight: "360px"
    }
  },
  flipCardInner: {
    position: "relative",
    width: "100%",
    height: "100%",
    transition: "transform 0.9s",
    transformStyle: "preserve-3d"
  },
  flipCardFront: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden"
  },
  flipCardBack: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    transform: "rotateY(180deg)"
  },
  flipped: {
    transform: "rotateY(180deg)"
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%"
  }
}));

export default AboutCard;
