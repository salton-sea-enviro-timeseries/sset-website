import { utcToZonedTime } from "date-fns-tz";
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
  // TODO look into DeviceID for all o
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
  days
}: {
  sensorId: string;
  days: number;
}) {
  // default 10 days
  // const startDateFromDaysSelected = days ? days : 10;
  try {
    const options = {
      method: "GET",
      headers: {
        username: USERNAME,
        token: PASSWORD
      }
    };
    // console.log("aqmd days:", days);
    /**
     * TODO: Get most recent data for now. Will want to allow
     * start and end date params in the future.
     */
    const timeZone = "America/Los_Angeles";
    const today = utcToZonedTime(new Date(), timeZone);
    const startDate = getStartDate(today, days);
    const endDate = getEndDate(today);
    const url = new URL(`${ENDPOINT_BASE_URL}/deviceaveragedata`);
    url.searchParams.append("sensorId", sensorId);
    url.searchParams.append("StartDateTime", startDate);
    url.searchParams.append("EndDateTime", endDate);

    const requestUrl = decodeURIComponent(url.toString()).replace(/\+/g, "%20");
    const data = await (await fetch(requestUrl, options)).json();
    return data.data.length === 0
      ? { DeviceId: sensorId, data: [] }
      : data.data;
  } catch (err) {
    console.log(err);
  }
}
