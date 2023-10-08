import { CommonDeviceType } from "types";

export function calcParamAQI(data: CommonDeviceType[]) {
  return data.map(
    ({ EndDate, timestamp_local, O3, NO2, PM10, "PM2.5": PM2_5, PM1, CO }) => {
      return {
        O3: O3 && Math.round((O3 / 70) * 100),
        // leaving NO2 as is
        NO2: NO2 && Math.round(NO2),
        PM10: PM10 && Math.round((PM10 / 150) * 100),
        PM2_5: PM2_5 && Math.round((PM2_5 / 35) * 100),
        PM1,
        // need to define breakpoints to calculate accurate aqi
        CO: CO && Math.round((CO / 35000) * 100),
        x: timestamp_local ? timestamp_local : EndDate
      };
    }
  );
}
