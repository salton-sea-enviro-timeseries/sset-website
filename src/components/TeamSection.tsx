import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Box, IconButton } from "@material-ui/core";
import { Email, Web, LinkedIn, Twitter } from "@material-ui/icons";

import { TeamMember } from "types";

const TeamSection = ({ team }: { team: TeamMember[] }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      {team.map((member) => (
        <Grid key={member.name} item xs={12} sm={4}>
          <Card className={classes.card} elevation={4}>
            <CardMedia
              className={classes.media}
              image={member.image}
              title={member.name}
            />
            <CardContent className={classes.cardContent}>
              <Typography variant="h5" component="h2">
                {member.name}
              </Typography>
              <Typography gutterBottom variant="caption">
                {member.title}
              </Typography>
              <Box pt={2}>
                <Typography variant="body2" color="textSecondary" component="p">
                  {member.bio}
                </Typography>
              </Box>
            </CardContent>
            <CardActions className={classes.cardActions}>
              {member.email && (
                <IconButton
                  className={classes.socialButton}
                  href={`mailto:${member.email}`}
                >
                  <Email />
                </IconButton>
              )}
              {member.website && (
                <IconButton
                  className={classes.socialButton}
                  href={member.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Web />
                </IconButton>
              )}
              {member.linkedin && (
                <IconButton
                  className={classes.socialButton}
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedIn />
                </IconButton>
              )}
              {member.twitter && (
                <IconButton
                  className={classes.socialButton}
                  href={member.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter />
                </IconButton>
              )}
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  media: {
    height: 200
  },
  card: {
    display: "flex",
    flexDirection: "column",
    height: "100%"
  },
  cardContent: {
    flexGrow: 1
  },
  cardActions: {
    display: "flex",
    justifyContent: "center"
  },
  socialButton: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.grey[900],
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.grey[800]
    }
  }
}));

export default TeamSection;
