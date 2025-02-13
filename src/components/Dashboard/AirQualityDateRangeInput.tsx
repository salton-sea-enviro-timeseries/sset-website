import { Button, TextField, Typography } from "@mui/material";
import { FormErrorRange } from "hooks/useSensorData";
import { styled } from "@mui/material/styles";
import { theme } from "highcharts";

type DateRangeProps = {
  handleFormSubmit: (evt: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isValidating: boolean;
  formError: FormErrorRange;
  startDateRef: React.RefObject<HTMLInputElement>;
  endDateRef: React.RefObject<HTMLInputElement>;
  buttonText?: string;
  startDateText?: string;
  endDateText?: string;
  modSensorGeneratePlotHelperText?: string;
};

const AirQualityDateRangeInput = ({
  handleFormSubmit,
  isValidating,
  formError: { error, startDateErrorMsg, endDateErrorMsg },
  startDateRef,
  endDateRef,
  buttonText,
  startDateText,
  endDateText,
  modSensorGeneratePlotHelperText
}: DateRangeProps) => {
  return (
    <>
      <DateContainer component="form" onSubmit={handleFormSubmit}>
        <Button
          variant="outlined"
          size="small"
          color="primary"
          type="submit"
          disabled={isValidating}
        >
          {buttonText}
        </Button>
        <TextField
          error={error}
          helperText={error && startDateErrorMsg}
          id="start-date"
          label={startDateText}
          type="date"
          inputRef={startDateRef}
          slotProps={{
            inputLabel: { shrink: true }
          }}
        />
        <TextField
          error={error}
          helperText={error && endDateErrorMsg}
          id="end-date"
          label={endDateText}
          type="date"
          inputRef={endDateRef}
          slotProps={{
            inputLabel: { shrink: true }
          }}
        />
      </DateContainer>
      <DateRangeCaption variant="caption">
        <ModCaption>*MOD</ModCaption>{" "}
        {modSensorGeneratePlotHelperText ||
          "sensors currently limited to an 8 day range"}
      </DateRangeCaption>
    </>
  );
};
const DateContainer = styled("form")(() => ({
  display: "flex",
  justifyContent: "flex-end",
  gap: "1rem"
}));
const ModCaption = styled("span")(({ theme }) => ({
  color: theme.palette.secondary.main,
  marginRight: "0.25rem"
}));
const DateRangeCaption = styled(Typography)(() => ({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  textAlign: "right",
  margin: 0,
  padding: 0
}));

export default AirQualityDateRangeInput;
