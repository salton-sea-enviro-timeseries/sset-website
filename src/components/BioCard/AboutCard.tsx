import {
  CardContent,
  CardActionArea,
  Divider,
  useMediaQuery,
  Card,
  Box
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import CardDetails from "components/BioCard/CardDetails";
import CardFront from "./CardFront";
import ProfileNav from "./ProfileNav";
import useCardHeight from "hooks/useCardHeight";
import useWindowResize from "hooks/useWindowResize";
import useProfileNavigation from "hooks/useProfileNavigation";

interface ProfileResponse {
  image: string;
  fullName: string;
  community: string;
  title: string;
  question: string;
  responses?: string;
}
interface Props {
  profiles: ProfileResponse[];
  activeCard: boolean;
  handleCardClick: React.MouseEventHandler<HTMLButtonElement>;
  selectedQuestion: string;
}

const AboutCard = ({
  profiles,
  activeCard,
  handleCardClick,
  selectedQuestion
}: Props) => {
  const theme = useTheme();
  const matchesBreakpointSmallScreen = useMediaQuery(
    theme.breakpoints.down("xs")
  );
  const { profileIndex, handleBiosNav } = useProfileNavigation(profiles.length);
  const hasWindowResized = useWindowResize();
  const [cardHeight, handleHeightChange] = useCardHeight(
    activeCard,
    hasWindowResized,
    matchesBreakpointSmallScreen
  );
  const response = profiles[profileIndex];
  return (
    <CardContainer cardHeight={cardHeight}>
      <FlipCardInner className={activeCard ? "flipped" : ""}>
        <CardFront
          handleCardClick={handleCardClick}
          selectedQuestion={selectedQuestion}
        />
        <StyledCardBack elevation={4}>
          <CardActionArea data-card-id={1} onClick={handleCardClick}>
            <CardContent sx={{ padding: 2 }}>
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
        </StyledCardBack>
      </FlipCardInner>
    </CardContainer>
  );
};
const CardContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "cardHeight"
})<{ cardHeight: number }>(({ cardHeight }) => ({
  perspective: "1000px",
  transition: "height 0.9s",
  height: cardHeight
}));

const FlipCardInner = styled(Box)(() => ({
  position: "relative",
  width: "100%",
  height: "100%",
  transition: "transform 0.9s",
  transformStyle: "preserve-3d",
  "&.flipped": {
    transform: "rotateY(180deg)"
  }
}));

const StyledCardBack = styled(Card)(() => ({
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
}));

export default AboutCard;
