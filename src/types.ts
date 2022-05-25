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
  "water_temperature" = "°F",
  "ph" = "ph",
  "turbidity" = "FNU",
  "dissolved_oxygen" = "mg/L",
  "chlorophyll" = "μg/L",
  "phycoerythrin" = "μg/L",
  "nitrate" = "mg/L N",
  "ammonia" = "mg/L N",
  "phosphate" = "mg/L",
  "sulphate" = "mg/L",
  "sulphide" = "mg/L"
}

export const ParameterMapping = {
  [Parameter.Salinity]: {
    name: "Salinity",
    unit: Units.salinity,
    description:
      "Salinity is the concentration of salt in the water. High salinity levels make the Salton Sea uninhabitable to many fish and as their food source dwindles, an unreliable water source for many fish-eating birds. As a comparison, the average salinity of the ocean is 35 PSU. Currently, the Salton Sea's salinity has been increasing as the water evaporates and not enough water exists to replenish the Salton Sea."
  },
  [Parameter["Water Temperature"]]: {
    name: "Water Temperature",
    unit: Units.water_temperature,
    description:
      'Warmer temperatures can impact the levels of dissolved oxygen, rates of photosynthesis (the process used by plants and algae to "make food") and can generally make an aquatic habitat uninhabitable if temperatures are high enough. Temperature can vary with water depth, with generally cooler temperatures below the surface.'
  },
  [Parameter.pH]: {
    name: "pH",
    unit: Units.ph,
    description:
      "pH indicates how acidic or basic a body of water is with 0 being extremely acidic, 7 being neutral and 14 being extremely basic. If pH levels are too high or too low, organisms living within the body of water may likely die if it is not within their tolerable threshold. Additionally, pH levels can affect the solubility of toxic chemicals, and even metals, within a body of water."
  },
  [Parameter.Turbidity]: {
    name: "Turbidity",
    unit: Units.turbidity,
    description:
      "Turbidity is a measure of the relative clarity of water. Higher turbidity indicates less scattered sunlight and is often caused by suspended sediment in the water, which can have negative impacts on aquatic life."
  },
  [Parameter["Dissolved Oxygen"]]: {
    name: "Dissolved Oxygen",
    unit: Units.dissolved_oxygen,
    description:
      "Optical dissolved oxygen concentrations indicate the amount of oxygen in the water. Oxygen levels will typically be higher closer to the surface and often at the lowest as water depth increases. There are also other factors that can impact oxygen levels, such as decomposition of dead phytoplankton."
  },
  [Parameter.Chlorophyll]: {
    name: "Chlorophyll",
    unit: Units.chlorophyll,
    description:
      "Chlorophyll concentration is an indicator for the presence of photosynthetic phytoplankton (or algae) in the Salton Sea. High concentrations of chlorophyll in the water can indicate algal blooms."
  },
  [Parameter.Phycoerythrin]: {
    name: "Phycoerythrin",
    unit: Units.phycoerythrin,
    description:
      "Phycoerythrin is an accessory pigment to the primary photosynthetic pigment, chlorophyll. Phycoerythrin is commonly found in harmful algal bloom forming cyanobacteria (blue-green algae) and is useful for monitoring algal blooms in the Salton Sea."
  },
  [Parameter.Nitrate]: {
    name: "Nitrate",
    unit: Units.nitrate,
    description:
      "Nitrate is the main nitrogenous compound (ie: ammonia, nitrate, nitrite) utilized by algae and is often the limiting nutrient for algal growth in the ocean. Nitrate run off into the Salton Sea can lead to eutrophication, overstimulate algal growth, create harmful algal blooms, and deoxygenation at depth."
  },
  [Parameter.Ammonia]: {
    name: "Ammonia",
    unit: Units.ammonia,
    description:
      "Ammonia is an important nitrogenous compound (ie: ammonia, nitrate, nitrite) utilized by algae. Similar to nitrate, high levels of runoff can lead to harmful algal blooms and deoxygenation at depth."
  },
  [Parameter.Phosphate]: {
    name: "Phosphate",
    unit: Units.phosphate,
    description:
      "Phosphate is an important nutrient for algal growth in inland lakes and can often be the limiting nutrient for algal growth. Phosphate runoff from fertilizers are often the primary cause of algae blooms in lakes."
  },
  [Parameter.Sulphate]: {
    name: "Sulphate",
    unit: Units.sulphate,
    description:
      "The sulfate concentration in the Salton Sea is about 10 times that of the modern ocean and has continued to increase annually as a result of agricultural runoff and interventions to curb algae blooms. Such high levels of sulfate in the lake make the water chemistry imbalanced. As a result, there is spontaneous gypsum crystal precipitation in the surface waters and rapid crust formation on the lakeshore. Most importantly, microbes use sulfate and produce sulfide, which leads to a rotten egg smell, mostly during the summer."
  },
  [Parameter.Sulphide]: {
    name: "Sulphide",
    unit: Units.sulphide,
    description:
      "Sulfide is the product of anaerobic (without oxygen) microbial reaction that occurs in the Salton Sea water column when there is no dissolved oxygen available due to eutrophication in the summer. When sulfide is accumulated in the water column, daily and seasonal water mixing induces sulfidic gas emission. This sulfidic gas emission is what creates the rotten egg yolk smell on the Salton Sea shoreline, specifically prolific in the summer months. The South Coast Air Quality Monitoring District is actively monitoring the release of this odor (more information on forecast can be found on saltonseaodor.org). Sulfide is unstable in environments with oxygen, so we measure very low values of sulfide in the surface of the Sea."
  }
};

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

export type Language = "en" | "es";
