import { BLOCKS, NodeData, TopLevelBlock } from "@contentful/rich-text-types";
import { TransformedData } from "lib/aeroqual";
import { RawDeviceAverageDataResponse } from "lib/aqmd";
import { MODRawDeviceDataResponse } from "lib/quant";

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
// export enum AirQualityParameter {
//   "O3" = "Ground-level ozone",
//   "PM10" = "Particle pollution",
//   "PM2_5" = "Fine particles",
//   "NO2" = "Nitrogen Dioxide",
//   "PM1" = "Ultra fine"
// }
// export enum AirQualityParameter {
//   "Ground-level ozone" ="O3" ,
//   "Particle pollution"="PM10" ,
//  "Fine particles"=  "PM2_5" ,
//   "Nitrogen Dioxide"="NO2" ,
//   "Ultra fine"= "PM1"
// }
export enum AirQualityParameter {
  O3 = "O3",
  PM10 = "PM10",
  PM2_5 = "PM2_5",
  NO2 = "NO2",
  PM1 = "PM1",
  CO = "CO",
  H2S = "H2S"
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
//Removed form AirQualityPlots and using CMS instead for translations and content
export const AirQualityParameterMapping = {
  [AirQualityParameter.O3]: {
    name: "Ground-level ozone",
    href: "https://www.epa.gov/ground-level-ozone-pollution/ground-level-ozone-basics",
    description:
      "Ozone at ground level is a harmful air pollutant, elevated exposures can affect sensitive vegetation and people with asthma."
  },
  [AirQualityParameter.PM10]: {
    name: "Particle pollution",
    href: "https://www.epa.gov/pmcourse/what-particle-pollution",
    description:
      "Particulate matter also known at particle pollution or PM, is a general term for a mixture of solid and liquid droplets suspended in the air. PM10 stands for inhalable particles, with a diameter that are fewer than 10 microns."
  },
  [AirQualityParameter.PM2_5]: {
    name: "Particle pollution",
    href: "https://www.epa.gov/pmcourse/what-particle-pollution",
    description:
      "Particulate matter also known at particle pollution or PM, is a general term for a mixture of solid and liquid droplets suspended in the air. PM2.5 stands for inhalable particles, with a diameter that are fewer than 2.5 microns."
  },
  [AirQualityParameter.NO2]: {
    name: "Nitrogen Dioxide",
    href: "https://www.epa.gov/no2-pollution/basic-information-about-no2",
    description:
      "NO2 is one of a group of highly reactive gases known as oxides of nitrogen. Nitrogen Dioxide primarily gets in the air from the burning of fuel such as emissions from cars, trucks, and power plants."
  },
  [AirQualityParameter.PM1]: {
    name: "Ultra fine particulate matter",
    href: "https://www.epa.gov/pm-pollution/particulate-matter-pm-basics",
    description:
      "Particulate matter also known at particle pollution or PM, is a general term for a mixture of solid and liquid droplets suspended in the air. PM1 stands for inhalable particles, with a diameter that are fewer than 1 microns."
  },
  [AirQualityParameter.CO]: {
    name: "Carbon Monoxide",
    href: "https://www.epa.gov/co-pollution/basic-information-about-carbon-monoxide-co-outdoor-air-pollution#What%20is%20CO",
    description:
      "CO is a colorless, odorless gas that can be harmful when inhaled in large amounts. It is released usually from burning fossil fuels or machinery."
  },
  [AirQualityParameter.H2S]: {
    name: "Hydrogen Sulfide",
    href: "https://ww2.arb.ca.gov/resources/hydrogen-sulfide-and-health",
    description:
      "Hydrogen sulfide is a colorless gas with the odor of rotten eggs. The most common sources of H2S emissions are oil and natural gas extraction and processing, and natural emissions from geothermal fields."
  }
};

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
// =================================================== CMS Contentful Types Start======================================
export type LocaleOption<T> = {
  "en-US": T;
  es: T;
};
export type LocaleDefault<T> = {
  "en-US": T;
};

type Metadata = {
  metadata: LocaleDefault<{
    fields: {
      site_title: LocaleDefault<string>;
      open_graph_image?: LocaleDefault<string>;
      open_graph_site_type?: LocaleDefault<string>;
      open_graph_site_url?: LocaleDefault<string>;
      open_graph_site_description?: LocaleDefault<string>;
    };
  }>;
};

type Fields<T> = {
  fields: T;
};

export type BodyValues = {
  content: [{ value: string }];
};
export type NestedObjBodyText = {
  content: TopLevelBlock[];
  nodeType: BLOCKS.DOCUMENT;
  data: NodeData;
};

export type PageContent = [
  Fields<{
    body: LocaleOption<NestedObjBodyText>;
    title: LocaleOption<string>;
  }>
];

type NavLinkItems = { href: string; label: string };

type HeroImage = LocaleDefault<
  Fields<{
    title: LocaleDefault<string>;
    file: LocaleDefault<{ url: string }>;
  }>
>;

type HeroContent = LocaleDefault<
  Fields<{
    subTitle: LocaleOption<string>;
    title: LocaleOption<string>;
    buttonText: LocaleOption<string>;
    heroImage: HeroImage;
  }>
>;
export type MenuItem = Fields<{
  short_hand_identifier: LocaleOption<string>;
  name: LocaleOption<string>;
  unit: LocaleDefault<string>;
  description: LocaleOption<{ content: [BodyValues] }>;
  paramKey: LocaleDefault<string>;
  href: LocaleDefault<string>;
}>;
type memberInfo = Fields<{
  name: LocaleDefault<string>;
  email: LocaleDefault<string>;
  website: LocaleDefault<string>;
  affiliation: HeroImage;
}>;
type MenuList = LocaleDefault<[MenuItem]>;
export type MenuItemFields = MenuItem["fields"];
export type Profile = {
  community: string;
  fullName: string;
  responses: string;
  timestamp: string;
  title: string;
  image?: string;
};

export type Question = {
  [key: string]: string;
};

export type AboutPage = {
  Title: LocaleDefault<string>;
  profileList: LocaleDefault<Profile[]>;
  questions: LocaleOption<Question>;
};
type MediaFile = Fields<{
  file: LocaleDefault<{ url: string }>;
  title: LocaleDefault<string>;
}>;
// ========= Page types ==========================
export type HomePage = {
  content: LocaleOption<PageContent>;
  hero: HeroContent;
  label: LocaleDefault<string>;
  media: LocaleDefault<MediaFile[]>;
  metadata: Metadata;
};

export type DashboardPage = {
  download_nutrients_data_button: LocaleOption<string>;
  download_sensor_data_button: LocaleOption<string>;
  label: LocaleDefault<string>;
  map_caption_main: LocaleOption<string>;
  map_caption_secondary: LocaleOption<string>;
  menuList: MenuList;
  readMe: LocaleOption<MediaFile>;
};

export type AirQualityPage = {
  label: LocaleDefault<string>;
  button_text: LocaleOption<string>;
  start_date: LocaleOption<string>;
  end_date: LocaleOption<string>;
  param_aqi_title: LocaleOption<string>;
  param_selection_text: LocaleOption<string>;
  chart_main_caption: LocaleOption<string>;
  map_caption: LocaleOption<string>;
  param_descriptions_list: MenuList;
  sensor_selection_helper_text: LocaleOption<string>;
  mod_sensor_warning_text: LocaleOption<string>;
};

export type ContactPage = {
  members: LocaleDefault<memberInfo[]>;
  applyLink: LocaleDefault<string>;
  body: LocaleOption<string>;
  callToAction: LocaleOption<string>;
  metadata: Metadata;
  title: LocaleOption<string>;
  heroImage: HeroImage;
};

// TODO: Add types to NavLinks for contentful if we decide to retrieve nav content
// - Issue is we would call getCmsContent 3 times one for index and two for dashbaord
// - Need to revisit
export type NavLinks = { navItems: LocaleOption<NavLinkItems[]> };
// =================================================== CMS Contentful Types End======================================
// =================================================== Air Quality Types Start ======================================
export type AirQualityDevices = {
  site: string;
  value: string;
  latitude: number;
  longitude: number;
  sensorId: string;
  location: string;
  color: string;
};
export interface DeviceDataResponse extends RawDeviceAverageDataResponse {
  DeviceID: string;
}
export type CommonDeviceType = DeviceDataResponse &
  MODRawDeviceDataResponse &
  TransformedData;
