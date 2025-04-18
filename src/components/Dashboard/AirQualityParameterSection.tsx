import { useState } from "react";
import { format } from "date-fns";
import {
  Typography,
  Box,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  SelectChangeEvent
} from "@mui/material";
import { CommonDeviceType } from "types";
import {
  inspectData,
  isMODRawDeviceDataResponse,
  isRawDeviceAverageDataResponse,
  safeAccess
} from "util/typeGuardFunctions";
import WithLoading from "../WithLoading";
import { RawDeviceAverageDataResponse } from "lib/aqmd";
import AirQualityParamBox from "./AirQualityParamBox";

type ParamAQIStandardMap = {
  O3: number;
  "PM2.5": number;
  PM10: number;
  NO2: number;
  PM1: null;
  CO: number;
  H2S: null;
};
type DeviceRawData = {
  id: string;
  name: string;
  data: CommonDeviceType[];
};
//Standards based on NAAQS
const paramAQIStandardMap: ParamAQIStandardMap = {
  O3: 70, //ppb
  "PM2.5": 35, //UOM ug/m3
  PM10: 150, //ppb -> 150ug/m3
  NO2: 100, // ppb
  PM1: null, // set to null since there is no standard,  //UOM ug/m3
  CO: 35000, // ppb,
  H2S: null
};
type MenuItem = {
  id: string;
  name: string;
};

const generateMenuItems = (
  deviceMenuList: Record<string, DeviceRawData>
): MenuItem[] => {
  return Object.values(deviceMenuList).map((sensor) => ({
    id: sensor.id,
    name: sensor.name
  }));
};

const AirQualityParameterSection = ({
  normalizedData,
  paramAQITitle,
  sensorSelectionHelperText
}: {
  normalizedData: Record<string, DeviceRawData>;
  paramAQITitle?: string;
  sensorSelectionHelperText?: string;
}) => {
  const deviceMenuList = generateMenuItems(normalizedData);
  const [selectedSensor, setSelectedSensor] = useState(deviceMenuList[0].id);
  const [isLoadingSensor, setIsLoadingSensor] = useState(false);
  const sanitizedValue = deviceMenuList.length > 0 ? selectedSensor : "";

  const handleChangeSensor = (event: SelectChangeEvent<string>) => {
    setIsLoadingSensor(true);
    setSelectedSensor(event.target.value);
    setTimeout(() => {
      setIsLoadingSensor(false);
    }, 100);
  };

  const singleDeviceData = normalizedData[selectedSensor].data;
  if (!singleDeviceData)
    return (
      <Typography>No recent data available for {selectedSensor}.</Typography>
    );
  const recentDeviceData: CommonDeviceType | null =
    singleDeviceData && inspectData(singleDeviceData);

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
  const parameterValues = Object.keys(paramAQIStandardMap).map(
    (parameter, index) => {
      return (
        <WithLoading
          isLoading={isLoadingSensor}
          key={index}
          variant="rectangular"
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
      <Box pr={0.5} pb={1} component="form">
        <FormControl fullWidth size="small">
          <InputLabel
            id="sensor-label"
            shrink={true}
            sx={{ backgroundColor: "white", px: 1 }}
          >
            Sensor
          </InputLabel>
          <Select
            labelId="sensor-label"
            id="sensor-select"
            value={sanitizedValue}
            onChange={handleChangeSensor}
            variant="outlined"
          >
            {deviceMenuList.map(({ id, name }) => (
              <MenuItem key={id} value={id}>
                {`${id}: ${name}`}
              </MenuItem>
            ))}
          </Select>
          {sensorSelectionHelperText && (
            <FormHelperText>
              {sensorSelectionHelperText ||
                "Select a working sensor from above to view current parameter values."}
            </FormHelperText>
          )}
        </FormControl>
        {Array.isArray(recentDeviceData) && recentDeviceData.length === 0 && (
          <Typography>No Data Available for {selectedSensor}</Typography>
        )}
      </Box>
      {/* selector end */}
      <WithLoading isLoading={isLoadingSensor}>
        {dateTime && (
          <Typography>
            {paramAQITitle} {dateTime}
          </Typography>
        )}
      </WithLoading>
      {/* Parameter and AQI data */}
      <Box display="flex" flexWrap="wrap">
        {recentDeviceData && parameterValues}
      </Box>
    </Box>
  );
};

export default AirQualityParameterSection;
