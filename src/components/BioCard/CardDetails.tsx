import { Avatar, Typography, Grid } from "@material-ui/core";

type AboutUsProps = {
  image: string;
  name: string;
  bio: string;
  answer: string;
};
const CardDetails = ({ image, name, bio, answer }: AboutUsProps) => {
  return (
    <Grid container spacing={0} style={{ height: "100%" }}>
      <Grid
        item
        sm={12}
        xs={12}
        md={3}
        lg={4}
        style={{
          padding: 16,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Avatar
          style={{ width: 150, height: 150, marginRight: 2 }}
          alt={"Avatar"}
          src={image}
        />
      </Grid>
      <Grid item sm={12} md={9} lg={8} style={{ padding: 16 }}>
        {/* Bio here  */}
        <Typography style={{ fontSize: "large" }} variant="h6">
          {name}
        </Typography>
        <Typography variant="body2">{bio}</Typography>
        <Typography component="span">
          <b>Answer:</b> {answer}
        </Typography>
      </Grid>
    </Grid>
  );
};
export default CardDetails;
