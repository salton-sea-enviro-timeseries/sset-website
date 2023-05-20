import { Avatar, Typography, Grid, makeStyles } from "@material-ui/core";

type AboutUsProps = {
  image: string;
  name: string;
  bio: string;
  answer: string;
};
const CardDetails = ({ image, name, bio, answer }: AboutUsProps) => {
  const classes = useStyles();
  return (
    <Grid container spacing={0} className={classes.gridContainer}>
      <Grid
        item
        sm={12}
        xs={12}
        md={3}
        lg={4}
        className={classes.contentWrapper}
      >
        <Avatar className={classes.avatarStyles} alt={"Avatar"} src={image} />
      </Grid>
      <Grid item sm={12} md={9} lg={8} className={classes.bioWrapper}>
        {/* Bio here  */}
        <Typography style={{ fontSize: "large" }} variant="h6" gutterBottom>
          {name}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {bio}
        </Typography>
        <Typography>
          <b>Answer:</b> {answer}
        </Typography>
      </Grid>
    </Grid>
  );
};
export default CardDetails;

const useStyles = makeStyles(() => ({
  gridContainer: {
    display: "flex",
    alignItems: "center"
  },
  contentWrapper: {
    padding: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  avatarStyles: {
    width: 150,
    height: 150,
    marginRight: 2
  },
  bioWrapper: {
    padding: 16
  }
}));
