import { groupBy } from "lodash";
import { Data, SiteData } from "types";
import { getAverage } from "utils";

export const getMapData = (data: SiteData[]) => {
  const dataBySite = groupBy(data, (item) => item.site.trim().toLowerCase());
  const mapData = Object.keys(dataBySite).reduce((acc, key) => {
    // @ts-ignore
    acc[key] = {
      site: key,
      // From Photometer
      ammonia: getAverage("ammonia", dataBySite[key]),
      nitrate: getAverage("nitrate", dataBySite[key]),
      nitrite: getAverage("nitrite", dataBySite[key]),
      sulphate: getAverage("sulphate", dataBySite[key]),
      sulphide: getAverage("sulphide", dataBySite[key]),
      phosphate: getAverage("phosphate", dataBySite[key]),
      latitude: parseFloat(
        (dataBySite[key].find((d) => (d as any).latitude) as any)?.latitude
      ),
      longitude: parseFloat(
        (dataBySite[key].find((d) => (d as any).longitude) as any)?.longitude
      ),
      salinity: getAverage("salinity", dataBySite[key]),
      water_temperature: getAverage("water_temperature", dataBySite[key]),
      ph: getAverage("ph", dataBySite[key]),
      turbidity: getAverage("turbidity", dataBySite[key]),
      dissolved_oxygen: getAverage("dissolved_oxygen", dataBySite[key]),
      chlorophyll: getAverage("chlorophyll", dataBySite[key]),
      phycoerythrin: getAverage("phycoerythrin", dataBySite[key])
    };
    return acc;
  }, {} as Data);
  return mapData;
};
