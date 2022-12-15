import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";
import useSWR from "swr";
import { Skeleton } from "@material-ui/lab";
import { MenuItem, TextField } from "@material-ui/core";
import { fetcher } from "utils";
import AQLegend from "./AQLegend";
import WithLoading from "./WithLoading";
import { RawDeviceAverageDataResponse } from "lib/aqmd";
import { useEffect, useState } from "react";
import AirQualityParamBox from "./AirQualityParamBox";
import { timeStamp } from "console";
import { MODRawDeviceDataResponse } from "lib/quant";

type ParamAQIStandardMap = {
  O3: number;
  PM2_5: number;
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

function determineSourceOfData(sensor: string) {
  const regex = /^M/g;
  return sensor.match(regex)
    ? `../api/aq/devices/quant/${sensor}`
    : `../api/aq/devices/aqmd/${sensor}`;
}

const paramAQIStandardMap: ParamAQIStandardMap = {
  O3: 70,
  PM2_5: 35,
  //TODO find way to edit key for PM2.5
  "PM2.5": 35,
  PM10: 150,
  NO2: 100,
  PM1: null // set to null since there is no standard
};

const AirQualitySection = ({ devices }: { devices: airQualityDevices[] }) => {
  const [sensor, setSensor] = useState("MOD-PM-00404");
  //TODO correct typing for useSWR < RawDeviceAverageDataResponse[] | MODRawDeviceDataResponse[]>
  const { data: deviceData = [], error: deviceDataError } = useSWR(
    determineSourceOfData(sensor),
    fetcher
  );

  if (deviceDataError) console.error(deviceDataError);
  const isLoading = !Object.keys(deviceData).length && !deviceDataError;
  const handleChangeSensor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSensor(event.target.value);
  };
  if (deviceDataError) return <Typography>Error loading data</Typography>;
  const recentDeviceData = deviceData.length
    ? deviceData[deviceData?.length - 1]
    : deviceData;
  const dateTime = deviceData.length
    ? recentDeviceData?.DateTime
    : deviceData.timestamp;

  const workingDeviceList = devices.map(({ sensorId, value }) => {
    const sensorInfoArray = sensorId.split(":");
    return value[0] === "W" ? (
      <MenuItem key={sensorId} value={sensorInfoArray[0]}>
        {sensorId}
      </MenuItem>
    ) : null;
  });
  return (
    <Box pb={5}>
      {/* selector start */}
      <Box pr={0.5} pb={1}>
        <WithLoading variant="rect" height={40} isLoading={isLoading}>
          <TextField
            fullWidth
            label="Sensor"
            select
            size="small"
            variant="outlined"
            value={sensor}
            onChange={handleChangeSensor}
          >
            {workingDeviceList}
          </TextField>
        </WithLoading>
      </Box>
      {/* selector end */}
      <WithLoading isLoading={isLoading}>
        <Typography>{dateTime}</Typography>
      </WithLoading>
      {/* Parameter and AQI data */}
      <Box display="flex" flexWrap="wrap">
        {Object.keys(paramAQIStandardMap).map((parameter, index) => {
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
        })}
      </Box>
      {isLoading ? <Skeleton height={50} width="100%" /> : <AQLegend />}
    </Box>
  );
};

export default AirQualitySection;
