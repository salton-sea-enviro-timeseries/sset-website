import { useEffect, useState } from "react";
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
import { debounce } from "lodash";

interface ProfileResponse {
  image: string;
  fullName: string;
  community: string;
  title: string;
  question: string;
  responses: string;
}
interface Props {
  profiles: ProfileResponse[];
  activeCard: boolean;
  handleCardClick: React.MouseEventHandler<HTMLButtonElement>;
  selectedQuestion: string;
}
const BACK_CARD_HEIGHT = 350;
const FRONT_CARD_HEIGHT = 370;
const NAV_HEIGHT = 70;
const MIN_HEIGHT = 350;

const AboutCard = ({
  profiles,
  activeCard,
  handleCardClick,
  selectedQuestion
}: Props) => {
  // @ts-ignore
  const { language } = useAppContext();
  const [cardHeight, setCardHeight] = useState(BACK_CARD_HEIGHT);
  const [isWindowResize, setIsWindowResize] = useState(false);
  const [profileIndex, setProfileIndex] = useState(0);
  const response = profiles[profileIndex];
  const classes = useStyles({ cardHeight });
  const theme = useTheme();
  const matchesBreakpointSmallScreen = useMediaQuery(
    theme.breakpoints.down("xs")
  );
  useEffect(() => {
    const toggleHeightOnWindowResize = debounce(() => {
      setIsWindowResize((prev) => !prev);
    }, 800);

    window.addEventListener("resize", toggleHeightOnWindowResize);

    return () => {
      window.removeEventListener("resize", toggleHeightOnWindowResize);
      toggleHeightOnWindowResize.cancel();
    };
  }, []);
  const handleHeightChange = (height: number) => {
    const totalCardHeightWithNav = height + NAV_HEIGHT;
    if (activeCard || isWindowResize) {
      setCardHeight(() =>
        height <= MIN_HEIGHT
          ? Math.max(totalCardHeightWithNav, FRONT_CARD_HEIGHT)
          : totalCardHeightWithNav
      );
    }
    if (!activeCard) {
      matchesBreakpointSmallScreen
        ? setCardHeight(FRONT_CARD_HEIGHT)
        : setCardHeight(BACK_CARD_HEIGHT);
    }
  };
  const handleBiosNav: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    const id = event.currentTarget.id;
    const offset = id === "prevQuest" ? -1 : 1;
    const newProfileIndex =
      (profileIndex + offset + profiles.length) % profiles.length;
    setProfileIndex(newProfileIndex);
  };

  return (
    <div className={classes.cardContainer}>
      <div
        className={`${classes.flipCardInner} ${activeCard && classes.flipped}`}
      >
        <CardFront
          handleCardClick={handleCardClick}
          selectedQuestion={selectedQuestion}
        />
        <Card className={classes.cardBack} elevation={4}>
          <CardActionArea data-card-id={1} onClick={handleCardClick}>
            <CardContent className={classes.cardContent}>
              <CardDetails
                image={response.image}
                name={response.fullName}
                activeCard={activeCard}
                community={response.community}
                title={response.title}
                question={response.question}
                answer={response.responses}
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
  cardContent: {
    padding: 8
  },
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
