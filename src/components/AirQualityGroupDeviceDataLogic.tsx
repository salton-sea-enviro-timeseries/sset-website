import React, { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { AirQualityDevices, CommonDeviceType } from "types";
import determineSourceOfData from "lib/determineSourceOfData";
import { fetchMultipleDeviceDetails } from "util/fetchMultipleDeviceDetails";
import { mapDeviceNames } from "util/mapDeviceNames";
import AirQualityPlots from "./AirQualityPlots";
import AirQualitySection from "./AirQualitySection";
import { Box, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import LoadingChart from "./LoadingChart";
import AQLegend from "./AQLegend";
import SelectMenuList from "./SelectMenuList";
import useSelect from "hooks/useSelect";

type DeviceRawData = {
  id: string;
  name: string;
  data: CommonDeviceType[];
};
type DataType = CommonDeviceType[];
// ==============================================================
const AirQualityGroupDeviceDataLogic = ({
  devices
}: {
  devices: AirQualityDevices[];
}) => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    setCurrentDate(new Date(Date.now()).toLocaleDateString());
  }, []);

  const { selectedValue, handleSelectChange, options } = useSelect<number>({
    initialValues: [30, 60, 90, 120],
    defaultValue: 30
  });

  const sensorUrls = devices.map(({ sensorId }) => {
    const sensorInfoArray = sensorId.split(":");
    const sensorIdList = determineSourceOfData(sensorInfoArray[0]);
    return sensorIdList;
  });
  const {
    data: sensorData = [],
    error,
    isValidating
  } = useSWR<DataType>(
    () => [selectedValue, ...sensorUrls],
    fetchMultipleDeviceDetails,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000
    }
  );

  const groupedData = useMemo(() => {
    return sensorData.reduce(
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
  }, [sensorData]);

  if (error) return <Typography>{`Error loading data`}</Typography>;
  //TODO: add a date range selector for user
  return (
    <>
      <Box display={"flex"} justifyContent={"flex-end"}>
        <SelectMenuList
          options={options}
          helperText={"Select number of days from current day to view data"}
          selectedValue={selectedValue}
          handleSelectChange={handleSelectChange}
        />
      </Box>
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
      ) : sensorData.length > 0 ? (
        <>
          <AirQualitySection normalizedData={groupedData} key={selectedValue} />
          <AirQualityPlots
            normalizedData={groupedData}
            isLoading={isValidating}
          />
        </>
      ) : (
        <Typography>
          No data available for the specified days as of {currentDate}
        </Typography>
      )}
    </>
  );
};
export default AirQualityGroupDeviceDataLogic;
