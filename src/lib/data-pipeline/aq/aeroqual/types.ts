// src/lib/data-pipeline/aq/aeroqual/types.ts

export interface AeroqualCredentials {
  username?: string;
  password?: string;
}

export interface FetchAeroqualDeviceDataParams {
  sensorId: string;
  startDate?: string;
  endDate?: string;
  cookies?: string;
}

export interface AeroqualOriginalData {
  From: string;
  To: string;
  AveragingPeriod: number;
  Instruments: any[];
}
