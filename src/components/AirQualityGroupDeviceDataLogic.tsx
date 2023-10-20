import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  makeStyles
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { AirQualityDevices, CommonDeviceType } from "types";
import { mapDeviceNames } from "util/mapDeviceNames";
import AirQualityPlots from "./AirQualityPlots";
import AirQualitySection from "./AirQualitySection";
import LoadingChart from "./LoadingChart";
import AQLegend from "./AQLegend";
import useSensorData from "hooks/useSensorData";

type DeviceRawData = {
  id: string;
  name: string;
  data: CommonDeviceType[];
};
type DataType = CommonDeviceType[];
function groupSensorData(data: DataType): Record<string, DeviceRawData> {
  return data.reduce(
    (sensors: Record<string, DeviceRawData>, curr: CommonDeviceType) => {
      const id = curr.DeviceID || curr.sn || curr.DeviceId;
      if (!sensors[id]) {
        sensors[id] = {
          id,
          name: mapDeviceNames(id),
          data: [{ ...curr }]
        };
      } else {
        sensors[id].data.push({ ...curr });
      }
      return sensors;
    },
    {}
  );
}

// ==============================================================
const AirQualityGroupDeviceDataLogic = ({
  devices
}: {
  devices: AirQualityDevices[];
}) => {
  const classes = useStyles();
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const { sensorData, fetchError, isValidating, formError, handleFormSubmit } =
    useSensorData({ devices, startDateRef, endDateRef });

  useEffect(() => {
    if (sensorData && sensorData.length > 0) {
      sessionStorage.setItem("sensorData", JSON.stringify(sensorData));
    }
  }, [sensorData]);
  const groupedData = useMemo(() => {
    return groupSensorData(sensorData);
  }, [sensorData]);

  if (fetchError) return <Typography>{`Error loading data`}</Typography>;
  //TODO: abstract skeleton and date pickers to its own component
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
          error={formError.error}
          helperText={formError.error && formError.startDateErrorMsg}
          id="start-date"
          label="Start Date"
          type="date"
          inputRef={startDateRef}
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          error={formError.error}
          helperText={formError.error && formError.endDateErrorMsg}
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

      <AQLegend />

      {isValidating ? (
        <>
          {" "}
          <Box pb={5}>
            {/* selector start */}
            <Box pr={0.5} pb={1}>
              <Skeleton height={50} width="100%" />
            </Box>
            {/* selector end */}

            {/* Parameter and AQI data */}
            <Box display="flex" flexWrap="wrap">
              {Array.from({ length: 3 }).map((item, index) => (
                <Box flex={1} p={1} key={index} m={0.5}>
                  <Skeleton variant="rect" height={85} width="100%" />
                </Box>
              ))}
            </Box>
          </Box>
          <LoadingChart />
        </>
      ) : (
        sensorData.length > 0 &&
        groupedData && (
          <>
            <AirQualitySection normalizedData={groupedData} />
            <AirQualityPlots
              normalizedData={groupedData}
              isLoading={isValidating}
            />
          </>
        )
      )}
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
export default React.memo(AirQualityGroupDeviceDataLogic);
