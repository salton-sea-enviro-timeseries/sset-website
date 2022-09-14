import { subHours } from "date-fns";
import { utcToZonedTime, formatInTimeZone } from "date-fns-tz";
import { groupBy } from "lodash";

const USERNAME = process.env.AQMD_USERNAME as string;
const PASSWORD = process.env.AQMD_PASSWORD as string;

const ENDPOINT_BASE_URL = "https://aqportal.aqmd.gov/external/api";

export type DeviceAvergeDataRequestParams = {
  startDate?: string;
  endDate?: string;
  communityId: number;
};

interface RawDeviceAvergeDataResponse {
  TimeStamp: number;
  DateTime: string;
  StartDate: string;
  EndDate: string;
  DeviceTitle: string;
  DeviceStatus: string;
  WorkingStatus: string;
  ProgramId: number;
  CommunityId: number;
  DeviceID: string;
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
  RawDeviceAvergeDataResponse,
  | "DeviceID"
  | "DeviceTitle"
  | "Latitude"
  | "Longitude"
  | "DeviceStatus"
  | "WorkingStatus"
>;

export async function getDevices({ groupId }: DevicesRequestParams) {
  try {
    const options = {
      method: "GET",
      headers: {
        username: USERNAME,
        token: PASSWORD
      }
    };

    const url = new URL(`${ENDPOINT_BASE_URL}/devicedata`);
    url.searchParams.append("group", groupId.toString());

    const requestUrl = decodeURIComponent(url.toString()).replace(/\+/g, "%20");
    console.log(requestUrl);

    const data = await (await fetch(requestUrl, options)).json();
    // console.log(data.data.length);
    return data;
    // const groupedData = groupBy(data.data, "DeviceTitle");
    // const devices = Object.keys(groupedData).reduce((acc, key) => {
    //   const device = groupedData[key][0];
    //   acc[key] = {
    //     DeviceID: device.DeviceID,
    //     DeviceTitle: device.DeviceTitle,
    //     Latitude: device.Latitude,
    //     Longitude: device.Longitude,
    //     DeviceStatus: device.DeviceStatus,
    //     WorkingStatus: device.WorkingStatus
    //   };
    //   return acc;
    // }, {} as { [key: string]: Device });
    // return devices;
  } catch (err) {
    console.log(err);
  }
}

// export async function getDevices({ communityId }: DevicesRequestParams) {
//   try {
//     const options = {
//       method: "GET",
//       headers: {
//         username: USERNAME,
//         token: PASSWORD
//       }
//     };

//     const timeZone = "America/Los_Angeles";
//     const today = utcToZonedTime(new Date(), timeZone);

//     const endDate = formatInTimeZone(today, "UTC", "yyyy-MM-dd HH:mm:ss");
//     const startDate = formatInTimeZone(
//       subHours(today, 3),
//       "UTC",
//       "yyyy-MM-dd HH:mm:ss"
//     );

//     const url = new URL(ENDPOINT_BASE_URL);
//     url.searchParams.append("community", communityId.toString());
//     url.searchParams.append("StartDateTime", startDate);
//     url.searchParams.append("EndDateTime", endDate);

//     const requestUrl = decodeURIComponent(url.toString()).replace(/\+/g, "%20");

//     const data = await (await fetch(requestUrl, options)).json();
//     console.log(data.data.length);
//     const groupedData = groupBy(data.data, "DeviceTitle");
//     const devices = Object.keys(groupedData).reduce((acc, key) => {
//       const device = groupedData[key][0];
//       acc[key] = {
//         DeviceID: device.DeviceID,
//         DeviceTitle: device.DeviceTitle,
//         Latitude: device.Latitude,
//         Longitude: device.Longitude,
//         DeviceStatus: device.DeviceStatus,
//         WorkingStatus: device.WorkingStatus
//       };
//       return acc;
//     }, {} as { [key: string]: Device });
//     return devices;
//   } catch (err) {
//     console.log(err);
//   }
// }
