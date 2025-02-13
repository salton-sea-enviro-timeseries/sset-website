import { CardContent, Typography, CardActionArea, Card } from "@mui/material";
import { styled } from "@mui/material/styles";

interface Props {
  handleCardClick: React.MouseEventHandler<HTMLButtonElement>;
  selectedQuestion: string;
}
const CardFront = ({ handleCardClick, selectedQuestion }: Props) => {
  return (
    <CardFrontRoot elevation={4}>
      <CardActionArea
        data-card-id={1}
        sx={{ height: "100%" }}
        onClick={handleCardClick}
      >
        <CardContent>
          <Typography align="center" variant="h6">
            {selectedQuestion}
          </Typography>
        </CardContent>
      </CardActionArea>
    </CardFrontRoot>
  );
};
const CardFrontRoot = styled(Card)(() => ({
  position: "absolute",
  top: 0,
  bottom: 0,
  width: "100%",
  height: "100%",
  backfaceVisibility: "hidden"
}));

export default CardFront;
