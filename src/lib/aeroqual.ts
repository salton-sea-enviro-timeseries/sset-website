import { parseISO } from "date-fns";
import { format, utcToZonedTime } from "date-fns-tz";
import { getEndDate, getStartDate } from "utils";
const ENDPOINT_BASE_URL = "https://cloud.aeroqual.com/v2/instruments";
interface AeroqualDeviceDataParams {
  sensorId: string;
  startDate?: string;
  endDate?: string;
  cookies: string;
}
interface OriginalInstrumentData {
  Serial: string;
  Name: string;
  Organisation: string;
  TimeZone: string;
  SummerTimeAdjusted: boolean;

  Data: Array<{
    Time: string;
    Data: {
      H2S: number;
      NO2: number;
      "VOC L": number;
      "Battery voltage": number;
    };
    LocationId: string;
    SensorDisplayData: {
      H2S: string;
      NO2: string;
      "VOC L": string;
      "Battery voltage": string;
    };
    Inlet: string;
  }>;
}
export interface OriginalData {
  From: string;
  To: string;
  AveragingPeriod: number;
  Instruments: OriginalInstrumentData[];
}
export interface TransformedData {
  sn: string;
  timestamp_local: string;
  H2S: number;
  NO2: number;
  "VOC L": number;
  "Battery voltage": number;
}
function getDefaultOriginalData(): OriginalData {
  return {
    From: "",
    To: "",
    AveragingPeriod: 0,
    Instruments: []
  };
}
export async function getAeroqualDeviceData({
  sensorId,
  startDate,
  endDate,
  cookies
}: AeroqualDeviceDataParams): Promise<OriginalData> {
  try {
    const options = {
      method: "GET",
      headers: {
        ...(cookies && {
          Cookie: cookies
        })
      }
    };
    const timeZone = "America/Los_Angeles";
    const today = utcToZonedTime(new Date(), timeZone);

    if (!startDate || !endDate) {
      startDate = getStartDate(today, 8, true);
      endDate = getEndDate(today, true);
    } else {
      startDate = format(parseISO(startDate), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
      endDate = format(parseISO(endDate), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
    }
    // lets default averaging period to 60min for now
    const AVERAGING_Period = "60";
    //TODO change averaging period 60 min <8days only>
    const url = new URL(`${ENDPOINT_BASE_URL}/${sensorId}/data`);
    url.searchParams.append("averagingPeriod", AVERAGING_Period);
    url.searchParams.append("from", startDate);
    url.searchParams.append("to", endDate);

    const requestUrl = decodeURIComponent(url.toString()).replace(/\+/g, "%20");
    const response = await fetch(requestUrl, options);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch aeroqual device data. HTTP Status: ${response.status}`
      );
    }

    const data: OriginalData = await response.json();
    if (data.Instruments[0].Data.length === 0) {
      return getDefaultOriginalData();
    }
    return data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(
        `Error fetching aeroqual device data for sensor ID ${sensorId}: ${err.message}`
      );
    } else {
      console.error(
        "An unknown error occurred while fetching device data: ",
        err
      );
    }
    return getDefaultOriginalData();
  }
}
