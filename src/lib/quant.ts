import { differenceInDays, endOfDay, parse, startOfDay } from "date-fns";
import { format, utcToZonedTime } from "date-fns-tz";
import { getEndDate, getStartDate } from "utils";
//TODO create two functions to handle sensor details and sensor data
const MODEL_NUM = "MOD-00069";
const BASE_URL = `https://app.quant-aq.com/ui-device-data/modulair-pm/${MODEL_NUM}`;
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
//TODO move common types
interface RawMODDeviceDataResponse
  extends Omit<MODRawDeviceDataResponse, "CO" | "NO2" | "O3"> {
  co: number;
  no2: number;
  o3: number;
}
export default interface ApiResponse {
  data?: RawMODDeviceDataResponse[];
  error?: string;
}
export async function getQuantDevice(startDate?: string, endDate?: string) {
  const timeZone = "America/Los_Angeles";
  const today = utcToZonedTime(new Date(), timeZone);

  if (!startDate || !endDate) {
    startDate = getStartDate(today, 8, "quant");
    endDate = getEndDate(today, "quant");
  } else {
    const start = startOfDay(parse(startDate, "yyyy-MM-dd", new Date()));
    const end = endOfDay(parse(endDate, "yyyy-MM-dd", new Date()));
    const daysDifference = differenceInDays(end, start);
    if (daysDifference > 8) {
      console.error("Error:  Selected range exceeds 8 days for Quant sensors.");
      return { data: [], error: "Selected range exceeds 8 days" };
    }
    startDate = format(start, "yyyy-MM-dd");
    endDate = format(end, "yyyy-MM-dd");
  }
  const options = {
    method: "GET"
  };
  const url = new URL(BASE_URL);
  url.searchParams.append("t0", startDate);
  url.searchParams.append("tf", endDate);
  const requestUrl = decodeURIComponent(url.toString());
  try {
    const response = await fetch(requestUrl, options);
    if (!response.ok) {
      let errorMsg: string;
      switch (response.status) {
        case 404:
          errorMsg = `Quant Device not found. Check the request Url.`;
        case 500:
          errorMsg = `Server error when fetching Quant Device.`;
        default:
          errorMsg = `Status ${response.status}: Unknown error when fetching Quant Device.`;
      }
      return {
        data: [],
        error: errorMsg,
        status: response.status
      };
    }
    const data: { data: RawMODDeviceDataResponse[] } = await response.json();
    return { data: data.data };
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(`Error in getQuantDevices: ${err.message}`);
    } else {
      console.error("An unknown error occurred: ", err);
      return {
        data: [],
        error: "An unknown error occurred while fetching device data."
      };
    }

    return { data: [], error: "Unexpected error occurred." };
  }
}
