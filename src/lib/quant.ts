import {
  differenceInDays,
  endOfDay,
  parse,
  startOfDay,
  subDays
} from "date-fns";
import { format, utcToZonedTime } from "date-fns-tz";
import { getEndDate, getStartDate } from "utils";
//NOTE: To keep the endpoint fast, at most 31 days of data can be requested at a time.
//TODO : create group to query all sensors
const ENDPOINT_BASE_URL = "https://api.quant-aq.com";
const KEY = process.env.QUANTAQ_APIKEY as string;
const base64Credentials = Buffer.from(`${KEY}:`).toString("base64");
const options = {
  method: "GET",
  headers: {
    Authorization: `Basic ${base64Credentials}`
  }
};
export interface MODRawDeviceDataResponse {
  rh: string;
  n_datapoints: number;
  temp: string;
  pm1: number;
  pm10: number;
  pm25: number;
  PM1: number;
  PM10: number;
  "PM2.5": number;
  CO: number;
  CO2: number;
  NO2: number;
  O3: number;
  sn: string;
  period_start_utc: string;
  period_end: string;
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

export async function getQuantDevices() {
  const DEVICES = ["MOD-PM-00174", "MOD-PM-00368", "MOD-00069"];
  const DEFAULT_DATA = {
    Latitude: null,
    Longitude: null,
    DeviceId: null,
    WorkingStatus: null
  };
  const devicesPromises = DEVICES.map(async (model) => {
    try {
      const url = new URL(`v1/devices/${model}`, ENDPOINT_BASE_URL);
      const response = await fetch(url.toString(), options);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch quant devices. HTTP Status: ${response.status}`
        );
      }
      const data = await response.json();
      return {
        Latitude: data.geo.lat ?? "",
        Longitude: data.geo.lon ?? "",
        DeviceId: data?.sn ?? "",
        WorkingStatus:
          data?.status === "ACTIVE" ? "Working-Quant" : "Not Working-Quant"
      };
    } catch (error) {
      console.error(`Error fetching device ${model}: `, error);
      return DEFAULT_DATA;
    }
  });

  const deviceResults = await Promise.allSettled(devicesPromises);
  const devices = deviceResults.map((result) =>
    result.status === "fulfilled" ? result.value : DEFAULT_DATA
  );
  return devices;
}

export async function getQuantDeviceData(
  model: string,
  startDate?: string,
  endDate?: string
) {
  const timeZone = "America/Los_Angeles";
  const today = utcToZonedTime(new Date(), timeZone);
  const yesterday = subDays(today, 1);

  if (!startDate || !endDate) {
    startDate = getStartDate(today, 8, "quant");
    endDate = getEndDate(yesterday, "quant");
  } else {
    const start = startOfDay(parse(startDate, "yyyy-MM-dd", new Date()));
    const end = endOfDay(parse(endDate, "yyyy-MM-dd", new Date()));
    const daysDifference = differenceInDays(end, start);
    if (daysDifference > 31) {
      console.error(
        "Error:  Selected range exceeds 31 days for Quant sensors."
      );
      return { data: [], error: "Selected range exceeds 31 days" };
    }
    startDate = format(start, "yyyy-MM-dd");
    endDate = format(subDays(end, 1), "yyyy-MM-dd");
  }
  const url = new URL(ENDPOINT_BASE_URL);
  url.pathname += "/device-api/v1/data/resampled";
  url.searchParams.append("sn", model);
  url.searchParams.append("start_date", startDate);
  url.searchParams.append("end_date", endDate);
  //TODO add option to change time period
  url.searchParams.append("period", "1h");
  try {
    const response = await fetch(url.toString(), options);
    if (!response.ok) {
      let errorMsg: string;
      switch (response.status) {
        case 404:
          errorMsg = `Quant Device not found. Check the request Url.`;
          break;
        case 500:
          errorMsg = `Server error when fetching Quant Device.`;
          break;
        default:
          errorMsg = `Status ${response.status}: Unknown error when fetching Quant Device.`;
          break;
      }
      return {
        data: [],
        error: errorMsg,
        status: response.status
      };
    }
    const data: { data: RawMODDeviceDataResponse[] } = await response.json();
    console.log("data: ", data);
    return { data: data.data };
  } catch (err: unknown) {
    let errorMsg = "Unexpected error occurred.";
    if (err instanceof Error) {
      console.log(`Error in getQuantDevices: ${err.message}`);
      errorMsg = err.message;
    } else {
      console.error("An unknown error occurred: ", err);
      return {
        data: [],
        error: errorMsg
      };
    }

    return { data: [], error: "Unexpected error occurred." };
  }
}
