import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  makeStyles
} from "@material-ui/core";

const GROUPID = "27983909003";
const SubscriptionForm = () => {
  const [formError, setFormError] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const classes = useStyles({ isSubscribed });

  const handleFormSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (emailRef.current && phoneRef.current) {
      try {
        const body = JSON.stringify({
          groupIdsAdd: [GROUPID],
          email: emailRef.current.value,
          firstName:
            firstNameRef.current != null &&
            firstNameRef.current.value.length > 0
              ? firstNameRef.current.value
              : "Not Provided",
          lastName:
            lastNameRef.current != null && lastNameRef.current.value.length > 0
              ? lastNameRef.current.value
              : "Not Provided",
          note: "User subscribed from SSET website",
          phoneNumber: phoneRef.current?.value
        });

        const response = await fetch("../api/email-subscription", {
          method: "POST",
          body: body
        });
        const data = await response.json();
        if (data) {
          setIsSubscribed(true);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      setFormError(true);
    }
  };

  return (
    <Box
      marginBottom="2rem"
      marginTop="2rem"
      component="form"
      className={classes.formContainer}
      onSubmit={handleFormSubmit}
    >
      <Typography variant="h5" gutterBottom>
        Subscribe to our weekly newsletter!
      </Typography>
      <Typography>
        SIGN UP TO RECEIVE EMAIL AND ALERTS ON UP COMING COMMUNITY UPDATES,
        EVENTS, AND WAYS YOU CAN HELP CONTRIBUTE.
      </Typography>
      <Box className={classes.inputNameEmailWrapper}>
        <TextField
          error={formError}
          id="first-name"
          label="First Name:"
          inputRef={firstNameRef}
          autoComplete="current-email"
          helperText={formError ? "Incorrect entry try again." : "Optional"}
        />
        <TextField
          error={formError}
          id="last-name"
          label="Last Name:"
          inputRef={lastNameRef}
          autoComplete="current-email"
          helperText={formError ? "Incorrect entry try again." : "Optional"}
        />
        <TextField
          error={formError}
          required
          id="standard-email-input"
          label="Email:"
          type="email"
          inputRef={emailRef}
          autoComplete="current-email"
          helperText={formError ?? "Incorrect entry try again."}
        />
        <TextField
          required
          error={formError}
          id="phone-number"
          label="Phone Num:"
          inputProps={{
            pattern: "\\+?[0-9]*\\([0-9]{3}\\) ?[0-9]{3}-[0-9]{4}"
          }}
          inputRef={phoneRef}
          autoComplete="current-email"
          helperText={
            formError
              ? "Incorrect entry try again."
              : "*Phone Num Required ex: +1(123) 123-1234"
          }
        />
      </Box>
      <Button
        variant="contained"
        className={classes.subscribeButton}
        size="medium"
        disabled={isSubscribed}
        type="submit"
      >
        {isSubscribed ? "Subscribed!" : "Subscribe"}
      </Button>
    </Box>
  );
};

export default SubscriptionForm;

const useStyles = makeStyles(() => ({
  formContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column"
  },

  inputNameEmailWrapper: {
    display: "flex",
    gap: "2rem",
    flexWrap: "wrap",
    marginBottom: "2rem"
  },
  subscribeButton: ({ isSubscribed }: { isSubscribed: boolean }) => ({
    backgroundColor: isSubscribed ? "#b2e5ed" : "#00abc5",
    color: "white"
  })
}));
