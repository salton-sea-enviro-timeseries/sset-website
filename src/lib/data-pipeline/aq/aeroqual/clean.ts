// src/lib/data-pipeline/aq/aeroqual/clean.ts

import { AeroqualOriginalData } from "./types";

export function cleanAeroqualData(
  data: AeroqualOriginalData
): AeroqualOriginalData {
  if (!data.Instruments) return data;

  for (const instrument of data.Instruments) {
    if (!instrument.Data) continue;

    instrument.Data = instrument.Data.filter(
      (entry: { Time: any; Data: any }) => {
        // remove entries with no timestamp
        if (!entry.Time) return false;

        // remove entries with no data object
        if (!entry.Data) return false;

        return true;
      }
    );

    for (const entry of instrument.Data) {
      for (const key of Object.keys(entry.Data)) {
        const value = entry.Data[key];

        // remove NaN
        if (typeof value === "number" && Number.isNaN(value)) {
          entry.Data[key] = null;
        }

        // optional: clamp negative values (example)
        // if (key === "WS" && value < 0) {
        //   entry.Data[key] = null;
        // }
      }
    }
  }

  return data;
}
