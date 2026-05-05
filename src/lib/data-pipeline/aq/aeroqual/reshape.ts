import { NormalizedAeroqualRow, WideAeroqualMeasurementRow } from "./types";

type WideMetricField =
  | "h2s"
  | "no2"
  | "ws"
  | "wd"
  | "rain"
  | "airT"
  | "airRH"
  | "battery";

const METRIC_TO_FIELD: Record<string, WideMetricField> = {
  H2S: "h2s",
  NO2: "no2",
  WS: "ws",
  WD: "wd",
  RAIN: "rain",
  "AIR T": "airT",
  "AIR RH": "airRH",
  "Battery voltage": "battery"
};

export function reshapeAeroqualRowsToWide(
  rows: NormalizedAeroqualRow[]
): WideAeroqualMeasurementRow[] {
  const grouped = new Map<string, WideAeroqualMeasurementRow>();

  for (const row of rows) {
    const key = [
      row.device_id,
      row.timestamp_local,
      row.location_id ?? "",
      row.inlet ?? ""
    ].join("|");

    if (!grouped.has(key)) {
      grouped.set(key, {
        device_id: row.device_id,
        device_name: row.device_name,
        timestamp_local: row.timestamp_local,
        location_id: row.location_id,
        inlet: row.inlet
      });
    }

    const wideRow = grouped.get(key)!;
    const field = METRIC_TO_FIELD[row.metric];

    if (!field) continue;

    wideRow[field] = row.value;
  }

  return Array.from(grouped.values());
}
