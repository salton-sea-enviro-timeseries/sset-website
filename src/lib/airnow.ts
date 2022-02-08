const API_KEY = process.env.AIRNOW_API_KEY as string;
const BASE_URL = "https://www.airnowapi.org";
const FORECAST_ENDPOINT = `${BASE_URL}/aq/forecast/zipcode/`;

export enum ResponseFormat {
  JSON = "application/json",
  CSV = "text/csv",
  XML = "application/xml"
}

export interface AQRequestParams {
  format?: ResponseFormat;
  date?: string;
  distance?: string;
  zipCode: string;
}

interface Params extends AQRequestParams {
  API_KEY?: string;
}

const defaultParams: Pick<Params, "format" | "API_KEY"> = {
  format: ResponseFormat.JSON,
  API_KEY
};

type ParamKey = keyof Params;
export const getForecast = async (
  params: AQRequestParams
): Promise<ForecastResponse[]> => {
  const url = new URL(`${FORECAST_ENDPOINT}`);
  const requestParams = { ...params, ...defaultParams };
  Object.keys(requestParams).forEach((key) => {
    if (requestParams[key as ParamKey] !== undefined) {
      url.searchParams.append(key, requestParams[key as ParamKey] as string);
    }
  });
  return await (await fetch(url.toString())).json();
};
export interface ForecastResponse {
  DateIssue: string;
  DateForecast: string;
  ReportingArea: string;
  StateCode: string;
  Latitude: string;
  Longitude: string;
  ParameterName: string;
  AQI: number; // -1 if not available
  Category: {
    Number: number;
    Name: string;
  };
  ActionDay: boolean;
}
