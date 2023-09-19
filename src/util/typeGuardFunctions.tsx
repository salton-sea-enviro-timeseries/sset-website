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
  deviceData?: CommonDeviceType | null
): CommonDeviceType[T] | undefined {
  if (!deviceData) {
    return undefined;
  }
  return deviceData[key];
}
function isArrayOf<T>(data: any, property: keyof T): data is T[] {
  return Array.isArray(data) && data.length > 0 && property in data[0];
}
function isNoDataAvailable(data: DataType): data is [NoDataAvailable] {
  return isArrayOf(data, "data");
}
function inspectData(sensorData: CommonDeviceType[]): CommonDeviceType | null {
  if (isNoDataAvailable(sensorData)) {
    return null;
  } else {
    // latest data for quant is first item, aqmd is last item
    return sensorData[0].sn ? sensorData[0] : sensorData[sensorData.length - 1];
  }
}
function isMODRawDeviceDataResponse(
  data: any
): data is MODRawDeviceDataResponse {
  if (!data) return false;
  return !Array.isArray(data) && "timestamp_local" in data;
}

function isRawDeviceAverageDataResponse(
  data: any
): data is RawDeviceAverageDataResponse {
  if (!data) return false;
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
