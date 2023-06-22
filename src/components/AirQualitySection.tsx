import { useState } from "react";
import { format } from "date-fns";
import { Typography, Box, MenuItem, TextField } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { AirQualityDevices, CommonDeviceType } from "types";
import {
  inspectData,
  isMODRawDeviceDataResponse,
  isRawDeviceAverageDataResponse,
  safeAccess
} from "util/typeGuardFunctions";
import AQLegend from "./AQLegend";
import WithLoading from "./WithLoading";
import { RawDeviceAverageDataResponse } from "lib/aqmd";
import AirQualityParamBox from "./AirQualityParamBox";

type ParamAQIStandardMap = {
  O3: number;
  "PM2.5": number;
  PM10: number;
  NO2: number;
  PM1: null;
};
type DeviceRawData = {
  id: string;
  name: string;
  data: CommonDeviceType[];
};

const paramAQIStandardMap: ParamAQIStandardMap = {
  O3: 70,
  "PM2.5": 35,
  PM10: 150,
  NO2: 100,
  PM1: null // set to null since there is no standard,
};

const generateMenuItems = (deviceList: AirQualityDevices[]) => {
  return deviceList.map(({ sensorId, value }) => {
    const sensorInfoArray = sensorId.split(":");
    return value[0] === "W" ? (
      <MenuItem key={sensorId} value={sensorInfoArray[0]}>
        {sensorId}
      </MenuItem>
    ) : null;
  });
};

const AirQualitySection = ({
  normalizedData,
  isLoading,
  deviceList,
  error
}: {
  normalizedData: Record<string, DeviceRawData>;
  isLoading: boolean;
  deviceList: AirQualityDevices[];
  error: any;
}) => {
  const [selectedSensor, setSelectedSensor] = useState("MOD-PM-00404");
  const [isLoadingSensor, setIsLoadingSensor] = useState(false);
  const sanitizedValue = deviceList.length > 0 ? selectedSensor : "";

  if (isLoading) {
    return (
      <Box pb={5}>
        {}
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
    );
  }
  const singleDeviceData =
    normalizedData && normalizedData[selectedSensor].data;
  if (error) console.error(error);
  const handleChangeSensor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoadingSensor(true);
    setSelectedSensor(event.target.value);
    setTimeout(() => {
      setIsLoadingSensor(false);
    }, 300);
  };
  if (error) return <Typography>Error loading data</Typography>;
  const recentDeviceData = inspectData(singleDeviceData);

  let dateTime;
  if (isMODRawDeviceDataResponse(recentDeviceData)) {
    dateTime = format(
      new Date(recentDeviceData["timestamp_local"]),
      "MMM d yyyy hh:mm a "
    );
  } else if (isRawDeviceAverageDataResponse(recentDeviceData)) {
    dateTime = format(
      new Date(recentDeviceData["TimeStamp"] * 1000),
      "MMM d yyyy hh:mm a "
    );
  }
  const workingDeviceList = generateMenuItems(deviceList);

  const parameterValues = Object.keys(paramAQIStandardMap).map(
    (parameter, index) => {
      return (
        <WithLoading
          isLoading={isLoadingSensor}
          key={index}
          variant="rect"
          height={120}
          width={140}
          style={{
            margin: 0.5,
            padding: 1
          }}
        >
          <AirQualityParamBox
            key={parameter}
            parameter={parameter}
            parameterValue={safeAccess(
              parameter as keyof ParamAQIStandardMap,
              recentDeviceData
            )}
            unitOfMeasure={safeAccess(
              `${parameter}UOM` as keyof RawDeviceAverageDataResponse,
              recentDeviceData
            )}
            aqiStandard={
              paramAQIStandardMap[parameter as keyof ParamAQIStandardMap]
            }
          />
        </WithLoading>
      );
    }
  );
  return (
    <Box pb={5}>
      {/* selector start */}
      <Box pr={0.5} pb={1}>
        <AQLegend />
        <WithLoading variant="rect" height={40} isLoading={isLoadingSensor}>
          <TextField
            fullWidth
            label="Sensor"
            select
            size="small"
            variant="outlined"
            value={sanitizedValue}
            onChange={handleChangeSensor}
          >
            {workingDeviceList}
          </TextField>
          {Array.isArray(recentDeviceData) && recentDeviceData.length === 0 && (
            <Typography>No Data Available for {selectedSensor}</Typography>
          )}
        </WithLoading>
      </Box>
      {/* selector end */}
      <WithLoading isLoading={isLoadingSensor}>
        {dateTime && <Typography>AQI Values From {dateTime}</Typography>}
      </WithLoading>
      {/* Parameter and AQI data */}
      <Box display="flex" flexWrap="wrap">
        {recentDeviceData && parameterValues}
      </Box>
    </Box>
  );
};

export default AirQualitySection;
