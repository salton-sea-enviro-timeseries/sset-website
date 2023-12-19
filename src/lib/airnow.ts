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

export enum AirQualityIndex {
  Good = 1,
  Moderate = 2,
  UnhealthyForSensitiveGroups = 3,
  Unhealthy = 4,
  VeryUnhealthy = 5,
  Hazardous = 6
}

export const AirQualityMapping = {
  [AirQualityIndex.Good]: {
    color: "#689f38",
    min: 0,
    max: 50
  },
  [AirQualityIndex.Moderate]: {
    color: "#fbc02d",
    min: 51,
    max: 100
  },
  [AirQualityIndex.UnhealthyForSensitiveGroups]: {
    color: "#f57c00",
    min: 101,
    max: 150
  },
  [AirQualityIndex.Unhealthy]: {
    color: "#c53929",
    min: 151,
    max: 200
  },
  [AirQualityIndex.VeryUnhealthy]: {
    color: "#ad1457",
    min: 201,
    max: 300
  },
  [AirQualityIndex.Hazardous]: {
    color: "#880e4f",
    min: 301,
    max: 500
  }
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
    Number: AirQualityIndex;
    Name: string;
  };
  ActionDay: boolean;
}
