import { useState } from "react";
import {
  CardContent,
  CardActionArea,
  Divider,
  useMediaQuery,
  Card
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useAppContext } from "components/AppContext";
import CardDetails from "components/BioCard/CardDetails";
import CardFront from "./CardFront";
import ProfileNav from "./ProfileNav";

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
  const [cardHeight, setCardHeight] = useState(350);
  const [profileIndex, setProfileIndex] = useState(0);
  const classes = useStyles({ cardHeight });
  const theme = useTheme();
  const matchesBreakpointSmallScreen = useMediaQuery(
    theme.breakpoints.down("xs")
  );

  const handleHeightChange = (height: number) => {
    const totalCardHeightWithNav = height + 70;
    if (activeCard) {
      setCardHeight(() =>
        height <= 330
          ? Math.max(totalCardHeightWithNav, 370)
          : totalCardHeightWithNav
      );
    }
    if (!activeCard) {
      matchesBreakpointSmallScreen ? setCardHeight(370) : setCardHeight(350);
    }
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
        <CardFront
          handleCardClick={handleCardClick}
          selectedQuestion={selectedQuestion}
        />
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
          <ProfileNav handleBiosNav={handleBiosNav} />
        </Card>
      </div>
    </div>
  );
};
const useStyles = makeStyles((theme) => ({
  cardContainer: ({ cardHeight }: { cardHeight: number }) => ({
    perspective: "1000px",
    transition: "height 0.9s",
    height: cardHeight
  }),
  flipCardInner: {
    position: "relative",
    width: "100%",
    height: "100%",
    transition: "transform 0.9s",
    transformStyle: "preserve-3d"
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
  }
}));

export default AboutCard;
