import React from "react";
import Link from "next/link";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import MuiLink from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { makeStyles } from "@material-ui/core/styles";

import logo from "../../public/logo.svg";
import Image from "next/image";

function Footer() {
  const classes = useStyles();

  return (
    <Box component="footer" bgcolor="grey.900" color="white" py={2}>
      <Container>
        <Grid container={true} justifyContent="space-between" spacing={4}>
          <Grid item={true} xs={12} md={4}>
            <Link href="/">
              <a>
                <Image
                  src={"/logo"}
                  height="60"
                  width="120"
                  alt="Logo Goes Here"
                  //placeholder="blur"
                  className={classes.brand}
                />
              </a>
            </Link>

            {/* {props.description && (
              <Box mt={3}>
                <Typography component="p">{props.description}</Typography>
              </Box>
            )} */}

            {/* {props.copyright && (
              <Box mt={3}>
                <Typography component="p">{props.copyright}</Typography>
              </Box>
            )} */}
          </Grid>
          <Grid item={true} xs={12} md={6}>
            <Grid container={true} spacing={4} justifyContent="flex-end">
              <Grid item={true} xs={12} md={4}>
                <List disablePadding={true} component="div">
                  <ListItem className={classes.listItem} component="div">
                    <Typography
                      variant="overline"
                      className={classes.listItemTextHeader}
                    >
                      Social
                    </Typography>
                  </ListItem>
                  <ListItem
                    button={true}
                    component="a"
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noreferrer"
                    className={classes.listItem}
                  >
                    <ListItemIcon className={classes.socialIcon}>
                      <Image
                        src="/icon-facebook.svg"
                        alt="Facebook"
                        width="24"
                        height="24"
                        // placeholder="blur"
                      />
                    </ListItemIcon>
                    <ListItemText>Facebook</ListItemText>
                  </ListItem>
                  <ListItem
                    button={true}
                    component="a"
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className={classes.listItem}
                  >
                    <ListItemIcon className={classes.socialIcon}>
                      <Image
                        src="/icon-instagram.svg"
                        alt="Instagram"
                        width="24"
                        height="24"
                        // placeholder="blur"
                      />
                    </ListItemIcon>
                    <ListItemText>Instagram</ListItemText>
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box pt={10}>
          <Typography align="center" variant="caption" component="p">
            Built in the Coachella Valley ☀️
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  sticky: {
    marginTop: "auto"
  },
  brand: {
    display: "block",
    height: 32
  },
  listItem: {
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 12,
    paddingRight: 12
  },
  listItemTextHeader: {
    fontWeight: "bold"
  },
  socialIcon: {
    minWidth: 30
  }
}));

export default Footer;
