import { endOfDay, parse, startOfDay } from "date-fns";
import { format, utcToZonedTime } from "date-fns-tz";
import { getEndDate, getStartDate } from "utils";

const USERNAME = process.env.AQMD_USERNAME as string;
const PASSWORD = process.env.AQMD_PASSWORD as string;

const ENDPOINT_BASE_URL = "https://aqportal.aqmd.gov/external/api";
// TODO: look into the api and register for api key, add limits etc
// https://docs.openaq.org/docs/getting-started
export type DeviceAvergeDataRequestParams = {
  startDate?: string;
  endDate?: string;
  communityId: number;
};

export interface RawDeviceAverageDataResponse {
  TimeStamp: number;
  DateTime: string;
  StartDate: string;
  EndDate: string;
  DeviceTitle: string;
  DeviceStatus: string;
  WorkingStatus: string;
  ProgramId: number;
  CommunityId: number;
  DeviceId: string;
  Longitude: number;
  Latitude: number;
  Averagingperiod: string;
  O3: number;
  O3UOM: string;
  PM10: number;
  PM10UOM: string;
  "PM2.5": number;
  "PM2.5UOM": string;
  NO2: number;
  NO2UOM: string;
  Temp: number;
  TempUOM: string;
  Humidity: number;
  HumidityUOM: string;
  DewPoint: number;
  DewPointUOM: string;
}

export type DevicesRequestParams = {
  groupId: number;
};

export type Device = Pick<
  RawDeviceAverageDataResponse,
  | "DeviceId"
  | "DeviceTitle"
  | "Latitude"
  | "Longitude"
  | "DeviceStatus"
  | "WorkingStatus"
> & {
  Provider: string;
  DeviceGroup: string;
  Program: string;
  Community: string;
  DataLastRecorded: string;
};

export async function getDevices({ groupId }: DevicesRequestParams) {
  const options = {
    method: "GET",
    headers: {
      username: USERNAME,
      token: PASSWORD
    }
  };

  const url = new URL(`${ENDPOINT_BASE_URL}/devicedata`);
  url.searchParams.append("Group", groupId.toString());
  // @ts-ignore
  const data = await (await fetch(url, options)).json();
  return data.data as Device[];
}

export async function getDeviceData({
  sensorId,
  startDate,
  endDate
}: {
  sensorId: string;
  startDate?: string;
  endDate?: string;
}) {
  try {
    const options = {
      method: "GET",
      headers: {
        username: USERNAME,
        token: PASSWORD
      }
    };
    const timeZone = "America/Los_Angeles";
    const today = utcToZonedTime(new Date(), timeZone);
    if (!startDate || !endDate) {
      startDate = getStartDate(today, 8, "aqmd");
      endDate = getEndDate(today, "aqmd");
    } else {
      startDate = format(
        startOfDay(parse(startDate, "yyyy-M-d", new Date())),
        "yyyy-MM-dd HH:mm:ss"
      );
      endDate = format(
        endOfDay(parse(endDate, "yyyy-M-d", new Date())),
        "yyyy-MM-dd HH:mm:ss"
      );
    }
    const url = new URL(`${ENDPOINT_BASE_URL}/deviceaveragedata`);
    url.searchParams.append("sensorId", sensorId);
    url.searchParams.append("StartDateTime", startDate);
    url.searchParams.append("EndDateTime", endDate);

    const requestUrl = decodeURIComponent(url.toString()).replace(/\+/g, "%20");
    const response = await fetch(requestUrl, options);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch aqmd device data. HTTP Status: ${response.status}`
      );
    }

    const data = await response.json();
    return data.data.length === 0
      ? { DeviceId: sensorId, data: [] }
      : data.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(
        `Error fetching aqmd device data for sensor ID ${sensorId}: ${err.message}`
      );
    } else {
      console.error(
        "An unknown error occurred while fetching device data: ",
        err
      );
    }
  }
}
