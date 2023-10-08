import { utcToZonedTime } from "date-fns-tz";
import { getEndDate, getStartDate } from "utils";

const MODEL_NUM = "MOD-00069";
const BASE_URL = `https://app.quant-aq.com/ui-device-data/modulair-pm/${MODEL_NUM}`;
//Todo if Mod doesnt exist and response is emtpy do something
export interface MODRawDeviceDataResponse {
  "geo.lat": number;
  "geo.lon": number;
  "met.rh": number;
  "met.temp": number;
  "model.pm.pm1": number;
  "model.pm.pm10": number;
  "model.pm.pm25": number;
  pm1: number;
  pm10: number;
  pm25: number;
  PM1: number;
  PM10: number;
  "PM2.5": number;
  CO: number;
  NO2: number;
  O3: number;
  sn: string;
  timestamp: string;
  timestamp_local: string;
  url: string;
}
interface RawMODDeviceDataResponse
  extends Omit<MODRawDeviceDataResponse, "CO" | "NO2" | "O3"> {
  co: number;
  no2: number;
  o3: number;
}
export async function getQuantDevice(days: number = 15) {
  // console.log("days: ", days);
  // const startDateFromDaysSelected = days ? days * 24 : 240;
  const timeZone = "America/Los_Angeles";
  const today = utcToZonedTime(new Date(), timeZone);
  const startDate = getStartDate(today, days, true);
  const endDate = getEndDate(today, true);
  const options = {
    method: "GET"
  };
  const url = new URL(BASE_URL);
  url.searchParams.append("t0", startDate);
  url.searchParams.append("tf", endDate);
  const requestUrl = decodeURIComponent(url.toString());
  try {
    const response: { data: RawMODDeviceDataResponse[] } = await (
      await fetch(requestUrl, options)
    ).json();
    return response.data;
  } catch (err) {
    console.log(err);
    // throw new Error("Error fetching Quant device data");
    return [];
  }
}
