import { CardContent, Typography, CardActionArea } from "@material-ui/core";
import { Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useAppContext } from "components/AppContext";

interface Props {
  handleCardClick: React.MouseEventHandler<HTMLButtonElement>;
  selectedQuestion: string;
}
const CardFront = ({ handleCardClick, selectedQuestion }: Props) => {
  // @ts-ignore
  const { language } = useAppContext();
  const classes = useStyles();

  return (
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
  );
};
const useStyles = makeStyles(() => ({
  cardFront: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden"
  }
}));

export default CardFront;
