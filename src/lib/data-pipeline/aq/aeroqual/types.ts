// src/lib/data-pipeline/aq/aeroqual/types.ts

export type AeroqualCredentials = {
  username?: string;
  password?: string;
};

export type FetchAeroqualDeviceDataParams = {
  sensorId: string;
  startDate?: string;
  endDate?: string;
  cookies?: string;
  credentials?: AeroqualCredentials;
};
export interface AeroqualOriginalData {
  From: string;
  To: string;
  AveragingPeriod: number;
  Instruments: any[];
}

export interface NormalizedAeroqualRow {
  device_id: string;
  device_name: string;
  timestamp_local: string;
  metric: string;
  value: number;
  unit: string | null;
  location_id: string | null;
  inlet: string | null;
}

export type WideAeroqualMeasurementRow = {
  device_id: string;
  device_name: string;
  timestamp_local: string;
  location_id?: string | null;
  inlet?: string | null;

  h2s?: number;
  no2?: number;
  ws?: number;
  wd?: number;
  rain?: number;
  airT?: number;
  airRH?: number;
  battery?: number;

  o3?: number;
  pm25?: number;
  pm10?: number;
  temp?: number;
  rh?: number;
  dp?: number;
  no2Historic?: number;
};
