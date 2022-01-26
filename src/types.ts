export interface SiteData {
  date: string;
  site: string;
  longitude: number;
  latitude: number;
  ammonia: number;
  chlorophyll: number;
  ph: number;
  water_temperature: number;
  phycoerythrin: number;
  nitrate: number;
  nitrite: number;
  sulphate: number;
  sulphide: number;
  turbidity: number;
  salinity: number;
  dissolved_oxygen: number;
  phosphate: number;
}

export interface MediaObject {
  title?: string;
  provider?: string;
  description?: string;
  imageUrl?: string;
  link: string;
}

export interface Data {
  [key: string]: SiteData;
}

export enum Parameter {
  "Salinity" = "salinity",
  "Water Temperature" = "water_temperature",
  "pH" = "ph",
  "Turbidity" = "turbidity",
  "Dissolved Oxygen" = "dissolved_oxygen",
  "Chlorophyll" = "chlorophyll",
  "Phycoerythrin" = "phycoerythrin",
  "Nitrate" = "nitrate",
  "Ammonia" = "ammonia",
  "Phosphate" = "phosphate",
  "Sulphate" = "sulphate",
  "Sulphide" = "sulphide"
}

export enum Units {
  "salinity" = "PSU",
  "water_temperature" = "°C",
  "ph" = "ph",
  "turbidity" = "FNU",
  "dissolved_oxygen" = "mg/L",
  "chlorophyll" = "μg/L",
  "phycoerythrin" = "μg/L",
  "nitrate" = "mg/L",
  "ammonia" = "mg/L",
  "phosphate" = "mg/L",
  "sulphate" = "mg/L",
  "sulphide" = "mg/L"
}

type NoValue = "-" | "" | "N/A" | "" | ">>" | "<<";
type NumericDataPoint = number | NoValue;

export interface RawProbeData {
  DATE: string;
  "site name"?: string;
  "Sal (psu)": NumericDataPoint;
  "Temp (F)": NumericDataPoint;
  pH: NumericDataPoint;
  "ODO (mg/L)": NumericDataPoint;
  "Chlorophyll (µg/L)": NumericDataPoint;
  "PE (ug/L)": NumericDataPoint;
  "GPS Latitude": number;
  "GPS Longitude": number;
}

export interface RawNutrientsData {
  Date: string;
  "Sample ID"?: string;
  nitrite: NumericDataPoint;
  nitrate: NumericDataPoint;
  ammonia: NumericDataPoint;
  phosphate: NumericDataPoint;
  sulphate: NumericDataPoint;
  sulphide: NumericDataPoint;
  turbidity: NumericDataPoint;
}
