import {
  CardContent,
  Typography,
  CardActionArea,
  Box,
  Divider
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton/IconButton";
import DoubleArrow from "@material-ui/icons/DoubleArrowSharp";
import { Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useAppContext } from "components/AppContext";
import CardDetails from "components/BioCard/CardDetails";
import { useState } from "react";

interface Props {
  //TODO fix responses types
  responses: any[];
  activeCard: boolean;
  handleCardClick: React.MouseEventHandler<HTMLButtonElement>;
  selectedQuestion: string;
}
const AboutCard = ({
  responses,
  activeCard,
  handleCardClick,
  selectedQuestion
}: Props) => {
  // TODO: add contentful
  // @ts-ignore
  const { language } = useAppContext();

  const [cardHeight, setCardHeight] = useState(340);
  const [profileIndex, setProfileIndex] = useState(0);
  const classes = useStyles({ cardHeight });

  const handleHeightChange = (height: number) => {
    activeCard
      ? setCardHeight((prev) =>
          prev >= 340 ? height + 70 : Math.max(height, prev)
        )
      : setCardHeight(340);
  };
  const handleBiosNav: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    const id = event.currentTarget.id;
    if (id === "prevQuest") {
      profileIndex === 0
        ? setProfileIndex(responses.length - 1)
        : setProfileIndex((prev) => prev - 1);
    }

    if (id === "nextQuest") {
      profileIndex === responses.length - 1
        ? setProfileIndex(0)
        : setProfileIndex((prev) => prev + 1);
    }
  };

  return (
    <div className={classes.cardContainer}>
      <div
        className={`${classes.flipCardInner} ${
          activeCard ? classes.flipped : ""
        }`}
      >
        <Card className={classes.cardFront} elevation={4}>
          <CardActionArea
            data-card-id={1}
            style={{ height: "100%" }}
            onClick={handleCardClick}
          >
            <CardContent>
              <Typography align="center" variant="h6">
                {selectedQuestion}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className={classes.cardBack} elevation={4}>
          <CardActionArea data-card-id={1} onClick={handleCardClick}>
            <CardContent
              style={{
                padding: 8
              }}
            >
              <CardDetails
                image={responses[profileIndex].image}
                name={responses[profileIndex].fullName}
                activeCard={activeCard}
                community={responses[profileIndex].community}
                title={responses[profileIndex].title}
                question={responses[profileIndex].question}
                answer={responses[profileIndex].answer}
                onHeightChange={handleHeightChange}
              />
            </CardContent>
          </CardActionArea>
          <Divider variant="middle" />
          <Box className={classes.iconButtonWrapper}>
            <IconButton
              aria-label="previous profile"
              color="primary"
              id="prevQuest"
              onClick={handleBiosNav}
            >
              <DoubleArrow style={{ transform: "rotate(180deg)" }} />
            </IconButton>

            <IconButton
              aria-label="next profile"
              color="primary"
              id="nextQuest"
              onClick={handleBiosNav}
            >
              <DoubleArrow />
            </IconButton>
          </Box>
        </Card>
      </div>
    </div>
  );
};
const useStyles = makeStyles((theme) => ({
  cardContainer: (props: { cardHeight: number }) => ({
    perspective: "1000px",
    height: props.cardHeight
  }),
  flipCardInner: {
    position: "relative",
    width: "100%",
    height: "100%",
    transition: "transform 0.9s",
    transformStyle: "preserve-3d"
  },
  cardFront: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden"
  },
  cardBack: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    transform: "rotateY(180deg)"
  },
  flipped: {
    transform: "rotateY(180deg)"
  },
  iconButtonWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 4
  }
}));

export default AboutCard;
