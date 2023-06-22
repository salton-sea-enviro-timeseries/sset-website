import React, { useMemo } from "react";
import useSWR from "swr";
import { AirQualityDevices, CommonDeviceType } from "types";
import "chartjs-adapter-date-fns";
import determineSourceOfData from "lib/determineSourceOfData";
import { fetchMultipleDeviceDetails } from "util/fetchMultipleDeviceDetails";
import { mapDeviceNames } from "util/mapDeviceNames";
import AirQualityPlots from "./AirQualityPlots";
import AirQualitySection from "./AirQualitySection";

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
  const sensorUrls = devices.map(({ sensorId }) => {
    const sensorInfoArray = sensorId.split(":");
    const sensorIdList = determineSourceOfData(sensorInfoArray[0]);
    return sensorIdList;
  });
  const { data: sensorData = [], error } = useSWR<DataType>(
    sensorUrls,
    fetchMultipleDeviceDetails
  );
  // group all data based on sensor ID
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
  const isLoading = !Object.keys(sensorData).length && !error;
  return (
    <>
      <AirQualitySection
        normalizedData={groupedData}
        isLoading={isLoading}
        deviceList={devices}
        error={error}
      />
      {/* Todo Fix empty chart when there is no data */}
      <AirQualityPlots normalizedData={groupedData} isLoading={isLoading} />
    </>
  );
};
export default AirQualityGroupDeviceDataLogic;
