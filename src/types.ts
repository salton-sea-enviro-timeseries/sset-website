export interface SiteData {
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
  phosphate_hr: number;
  phosphate_lr: number;
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
  // "Phosphate" = "phosphate",
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

export interface RawPhotometerData {
  Date: string;
  "Sample ID"?: string;
  Nitrite: string;
  Nitrate: string;
  Ammonia: string;
  "Phosphate HR": string;
  "Phosphate LR": string;
  Sulphate: string;
  Sulphide: string;
  Skip: string;
}

export interface RawNutrientsData {
  date: string;
  time: string;
  Latitude: string;
  Longitude: string;
  "Barometer (mmHg)": string;
  sal: string;
  tds: string;
  temp: string;
  sigmat: string;
  sigma: string;
  pH: string;
  orp: string;
  turbidity: string;
  ODO_sat: string;
  ODO_mgl: string;
  Chl: string;
  pe: string;
  depth: string;
  site: string;
}
