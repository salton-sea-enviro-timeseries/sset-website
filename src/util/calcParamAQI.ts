import { CommonDeviceType } from "types";
import _ from "lodash";
//TODO check with group to see how they want to round values
//TODO review AirQualitySection aqi is being calculated twice
export function calcParamAQI(data: CommonDeviceType[]) {
  return data.map(
    ({
      EndDate,
      timestamp_local,
      O3,
      NO2,
      PM10,
      "PM2.5": PM2_5,
      PM1,
      CO,
      H2S
    }) => {
      return {
        O3: O3 ? _.round((O3 / 70) * 100, 2) : O3,
        NO2: NO2 ? _.round(NO2, 2) : NO2,
        PM10: PM10 ? _.round((PM10 / 150) * 100, 2) : PM10,
        PM2_5: PM2_5 ? _.round((PM2_5 / 35) * 100, 2) : PM2_5,
        PM1: PM1 ? _.round(PM1, 2) : PM1,
        CO: CO ? _.round((CO / 35000) * 100, 2) : CO,
        H2S: H2S,
        x: timestamp_local ? timestamp_local : EndDate
      };
    }
  );
}
