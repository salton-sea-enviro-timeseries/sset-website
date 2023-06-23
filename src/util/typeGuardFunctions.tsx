import { RawDeviceAverageDataResponse } from "lib/aqmd";
import { MODRawDeviceDataResponse } from "lib/quant";
import { CommonDeviceType } from "types";

interface NoDataAvailable {
  DeviceId: string;
  data: [];
}
type DataType =
  | RawDeviceAverageDataResponse[]
  | MODRawDeviceDataResponse[]
  | [NoDataAvailable];

// Helper function to check if data is an array of a certain type
function safeAccess<T extends keyof CommonDeviceType>(
  key: T,
  deviceData: CommonDeviceType | []
) {
  return Array.isArray(deviceData) ? undefined : deviceData[key];
}
function isArrayOf<T>(data: any, property: keyof T): data is T[] {
  return Array.isArray(data) && data.length > 0 && property in data[0];
}
function isNoDataAvailable(data: DataType): data is [NoDataAvailable] {
  return isArrayOf(data, "data");
}

function inspectData(sensorData: CommonDeviceType[]): CommonDeviceType | [] {
  if (isNoDataAvailable(sensorData)) {
    return [];
  } else {
    return sensorData[0].sn ? sensorData[0] : sensorData[sensorData.length - 1];
  }
}

function isMODRawDeviceDataResponse(
  data: any
): data is MODRawDeviceDataResponse {
  return !Array.isArray(data) && "timestamp_local" in data;
}

function isRawDeviceAverageDataResponse(
  data: any
): data is RawDeviceAverageDataResponse {
  return !Array.isArray(data) && "DateTime" in data;
}

export {
  isArrayOf,
  isNoDataAvailable,
  inspectData,
  isMODRawDeviceDataResponse,
  isRawDeviceAverageDataResponse,
  safeAccess
};
