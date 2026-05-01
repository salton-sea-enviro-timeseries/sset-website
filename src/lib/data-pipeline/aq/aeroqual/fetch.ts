// src/lib/data-pipeline/aq/aeroqual/fetch.ts
import { getAeroqualAuthCookie } from "./auth";
import { parseISO } from "date-fns";
import { format, utcToZonedTime } from "date-fns-tz";
import { getEndDate, getStartDate } from "@/utils";
import { AeroqualOriginalData, FetchAeroqualDeviceDataParams } from "./types";

const ENDPOINT_BASE_URL = "https://api.cloud.aeroqual.com/v2/instruments";

function getDefaultOriginalData(): AeroqualOriginalData {
  return {
    From: "",
    To: "",
    AveragingPeriod: 0,
    Instruments: []
  };
}

export async function fetchAeroqualDeviceData({
  sensorId,
  startDate,
  endDate,
  cookies
}: FetchAeroqualDeviceDataParams): Promise<AeroqualOriginalData> {
  const authCookie = cookies ?? (await getAeroqualAuthCookie());
  try {
    const options: RequestInit = {
      method: "GET",
      headers: {
        accept: "application/json",
        Cookie: authCookie
      }
    };

    const timeZone = "America/Los_Angeles";
    const today = utcToZonedTime(new Date(), timeZone);

    let from = startDate;
    let to = endDate;

    if (!from || !to) {
      from = getStartDate(today, 8, "aeroqual");
      to = getEndDate(today, "aeroqual");
    } else {
      from = format(parseISO(from), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
      to = format(parseISO(to), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
    }

    const url = new URL(
      `${ENDPOINT_BASE_URL}/${encodeURIComponent(sensorId)}/data`
    );

    url.searchParams.append("from", from);
    url.searchParams.append("to", to);
    url.searchParams.append("includeDiagnostics", "false");
    url.searchParams.append("rawValues", "false");
    url.searchParams.append("utc", "false");
    url.searchParams.append("includeSensorWithNoData", "false");

    const requestUrl = url.toString();

    const response = await fetch(requestUrl, options);

    if (response.status === 404) {
      console.warn(`Data not found for sensor: ${sensorId}`);
      return getDefaultOriginalData();
    }

    if (!response.ok) {
      throw new Error(
        `Failed to fetch Aeroqual device data. HTTP Status: ${response.status}`
      );
    }

    const data: AeroqualOriginalData = await response.json();

    const instrument = data.Instruments?.[0];

    if (!instrument || !instrument.Data || instrument.Data.length === 0) {
      console.log(`No data available for sensor: ${sensorId}`);
      return getDefaultOriginalData();
    }

    return data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(
        `Error fetching Aeroqual data for sensor ID ${sensorId}: ${err.message}`
      );
    } else {
      console.error("Unknown error fetching Aeroqual data:", err);
    }

    return getDefaultOriginalData();
  }
}
