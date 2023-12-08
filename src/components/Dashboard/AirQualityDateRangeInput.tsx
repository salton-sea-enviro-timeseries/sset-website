import {
  Box,
  Button,
  TextField,
  Typography,
  makeStyles
} from "@material-ui/core";
import { FormErrorRange } from "hooks/useSensorData";

type DateRangeProps = {
  handleFormSubmit: (evt: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isValidating: boolean;
  formError: FormErrorRange;
  startDateRef: React.RefObject<HTMLInputElement>;
  endDateRef: React.RefObject<HTMLInputElement>;
};

const AirQualityDateRangeInput = ({
  handleFormSubmit,
  isValidating,
  formError: { error, startDateErrorMsg, endDateErrorMsg },
  startDateRef,
  endDateRef
}: DateRangeProps) => {
  const classes = useStyles();

  return (
    <>
      <Box
        className={classes.dateContainer}
        component="form"
        onSubmit={handleFormSubmit}
      >
        <Button
          variant="outlined"
          size="small"
          color="primary"
          type="submit"
          disabled={isValidating}
        >
          Generate Plots
        </Button>
        <TextField
          error={error}
          helperText={error && startDateErrorMsg}
          id="start-date"
          label="Start Date"
          type="date"
          inputRef={startDateRef}
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          error={error}
          helperText={error && endDateErrorMsg}
          id="end-date"
          label="End Date"
          type="date"
          inputRef={endDateRef}
          InputLabelProps={{
            shrink: true
          }}
        />
      </Box>
      <Typography variant="caption" className={classes.dateRangeCaption}>
        <span className={classes.modCaption}>*MOD</span> sensors currently
        limited to an 8 day range
      </Typography>
    </>
  );
};
const useStyles = makeStyles((theme) => ({
  dateContainer: {
    display: "flex",
    justifyContent: "flex-end",
    "& > *": {
      marginRight: "2rem"
    },
    "& > *:last-child": {
      marginRight: "0"
    }
  },
  modCaption: {
    color: theme.palette.secondary.main
  },
  dateRangeCaption: {
    display: "block",
    textAlign: "right",
    margin: 0,
    padding: 0
  }
}));
export default AirQualityDateRangeInput;
