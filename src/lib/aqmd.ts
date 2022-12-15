import { addHours, startOfHour, subHours } from "date-fns";
import { utcToZonedTime, formatInTimeZone } from "date-fns-tz";

const USERNAME = process.env.AQMD_USERNAME as string;
const PASSWORD = process.env.AQMD_PASSWORD as string;

const ENDPOINT_BASE_URL = "https://aqportal.aqmd.gov/external/api";

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

export async function getDeviceData({ sensorId }: { sensorId: string }) {
  try {
    const options = {
      method: "GET",
      headers: {
        username: USERNAME,
        token: PASSWORD
      }
    };

    /**
     * TODO: Get most recent data for now. Will want to allow
     * start and end date params in the future.
     */
    const timeZone = "America/Los_Angeles";
    const today = utcToZonedTime(new Date(), timeZone);

    /**
     * Start date is 24 hours ago because I wasn't getting any data
     * for some reason even though it device "DataLastRecoded" is
     * within now - 1 hour and now. Need to check with AQMD.
     */
    const startDate = formatInTimeZone(
      startOfHour(subHours(today, 48)),
      "UTC",
      "yyyy-MM-dd HH:mm:ss"
    );
    const endDate = formatInTimeZone(
      startOfHour(addHours(today, 1)),
      "UTC",
      "yyyy-MM-dd HH:mm:ss"
    );

    const url = new URL(`${ENDPOINT_BASE_URL}/deviceaveragedata`);
    url.searchParams.append("sensorId", sensorId);
    url.searchParams.append("StartDateTime", startDate);
    url.searchParams.append("EndDateTime", endDate);

    const requestUrl = decodeURIComponent(url.toString()).replace(/\+/g, "%20");

    const data = await (await fetch(requestUrl, options)).json();

    // The last item in the array is the most recent data
    return data.data;
  } catch (err) {
    console.log(err);
  }
}
