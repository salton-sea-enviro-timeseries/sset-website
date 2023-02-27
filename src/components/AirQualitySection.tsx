import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";
import useSWR from "swr";
import { Skeleton } from "@material-ui/lab";
import { MenuItem, TextField } from "@material-ui/core";
import { fetcher } from "utils";
import AQLegend from "./AQLegend";
import WithLoading from "./WithLoading";
import { RawDeviceAverageDataResponse } from "lib/aqmd";
import { useState } from "react";
import AirQualityParamBox from "./AirQualityParamBox";
import { MODRawDeviceDataResponse } from "lib/quant";
import determineSourceOfData from "lib/determineSourceOfData";
import { format, parse } from "date-fns";

type ParamAQIStandardMap = {
  O3: number;
  "PM2.5": number;
  PM10: number;
  NO2: number;
  PM1: null;
};
type airQualityDevices = {
  site: string;
  value: string;
  latitude: number;
  longitude: number;
  sensorId: string;
  location: string;
  color: string;
};
type DataType =
  | RawDeviceAverageDataResponse[]
  | MODRawDeviceDataResponse[]
  | [string];
type CommonDeviceType = RawDeviceAverageDataResponse & MODRawDeviceDataResponse;
const paramAQIStandardMap: ParamAQIStandardMap = {
  O3: 70,
  "PM2.5": 35,
  PM10: 150,
  NO2: 100,
  PM1: null // set to null since there is no standard,
};

function isDataTypeQuant(data: DataType): data is MODRawDeviceDataResponse[] {
  return "Model_PM_PM1" in data;
}
const AirQualitySection = ({ devices }: { devices: airQualityDevices[] }) => {
  const [selectedSensor, setSelectedSensor] = useState("MOD-PM-00404");
  const sanitizedValue = devices.length > 0 ? selectedSensor : "";
  const { data: deviceData = [], error: deviceDataError } = useSWR<DataType>(
    determineSourceOfData(selectedSensor),
    fetcher
  );
  if (deviceDataError) console.error(deviceDataError);
  const isLoading = !Object.keys(deviceData).length && !deviceDataError;
  const handleChangeSensor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSensor(event.target.value);
  };
  if (deviceDataError) return <Typography>Error loading data</Typography>;

  //  Device values for aqmd array
  const recentDeviceData = isDataTypeQuant(deviceData)
    ? (deviceData[0] as CommonDeviceType)
    : (deviceData[deviceData?.length - 1] as CommonDeviceType);

  const dateTime = isDataTypeQuant(deviceData)
    ? format(new Date(deviceData[0].timestamp_local), "MMM d yyyy hh:mm a zz")
    : recentDeviceData !== undefined && recentDeviceData.TimeStamp !== undefined
    ? format(
        new Date(recentDeviceData.TimeStamp * 1000),
        "MMM d yyyy hh:mm a zz"
      )
    : null;

  const workingDeviceList = devices.map(({ sensorId, value }) => {
    const sensorInfoArray = sensorId.split(":");
    return value[0] === "W" ? (
      <MenuItem key={sensorId} value={sensorInfoArray[0]}>
        {sensorId}
      </MenuItem>
    ) : null;
  });

  const parameterValues = Object.keys(paramAQIStandardMap).map(
    (parameter, index) => {
      return isLoading ? (
        <Box flex={1} p={1} key={index} m={0.5}>
          <Skeleton variant="rect" height={85} width="100%" />
        </Box>
      ) : (
        <AirQualityParamBox
          key={parameter}
          parameter={parameter}
          parameterValue={
            recentDeviceData[parameter as keyof ParamAQIStandardMap]
          }
          unitOfMeasure={
            recentDeviceData[
              `${parameter}UOM` as keyof RawDeviceAverageDataResponse
            ]
          }
          aqiStandard={
            paramAQIStandardMap[parameter as keyof ParamAQIStandardMap]
          }
        />
      );
    }
  );
  return (
    <Box pb={5}>
      {}
      {/* selector start */}
      <Box pr={0.5} pb={1}>
        <WithLoading variant="rect" height={40} isLoading={isLoading}>
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
        </WithLoading>
      </Box>
      {/* selector end */}
      {deviceData[0 as keyof DataType] === "No data available" && (
        <Typography>No data available</Typography>
      )}
      <WithLoading isLoading={isLoading}>
        {dateTime && <Typography>AQI Values From {dateTime}</Typography>}
      </WithLoading>
      {/* Parameter and AQI data */}
      <Box display="flex" flexWrap="wrap">
        {parameterValues}
      </Box>
      {isLoading ? <Skeleton height={50} width="100%" /> : <AQLegend />}
    </Box>
  );
};

export default AirQualitySection;
