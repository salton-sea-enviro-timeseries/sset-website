// src/lib/data-pipeline/aq/aeroqual/normalize.ts
import { AeroqualOriginalData } from "./types";

export function normalizeAeroqualData(originalData: AeroqualOriginalData) {
  const rows = [];

  for (const instrument of originalData.Instruments ?? []) {
    for (const dataPoint of instrument.Data ?? []) {
      for (const [metric, rawValue] of Object.entries(dataPoint.Data ?? {})) {
        if (rawValue === null || rawValue === undefined) continue;
        if (typeof rawValue !== "number") continue;

        let value = rawValue;
        let unit: string | null = null;

        if (metric === "H2S") {
          value = Math.round(rawValue * 1000 * 100) / 100;
          unit = "ppb";
        }

        rows.push({
          device_id: instrument.Serial,
          device_name: instrument.Name,
          timestamp_local: dataPoint.Time,
          metric,
          value,
          unit,
          location_id: dataPoint.LocationId || null,
          inlet: dataPoint.Inlet || null
        });
      }
    }
  }

  return rows;
}
