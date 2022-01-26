import { getProbeData, getNutrientsData } from "lib/sheets";
import { groupBy } from "lodash";
import type { NextApiRequest, NextApiResponse } from "next";
import { SiteData } from "types";

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<SiteData[]>
) {
  const { method } = req;
  if (method !== "GET") {
    return res.status(405).end(`Method ${method} Not Allowed`);
  }

  if (!process.env.GOOGLE_SHEETS_PRIVATE_KEY) {
    return res.status(500).end("No private key found");
  }

  try {
    const probeData = await getProbeData();
    const nutrientsData = await getNutrientsData();

    /**
     * map RawNutrientsData to SiteData
     */
    const mappedNutrientsData = nutrientsData.map((o) => {
      const item: Pick<
        SiteData,
        | "date"
        | "site"
        | "nitrite"
        | "nitrate"
        | "phosphate"
        | "ammonia"
        | "sulphate"
        | "sulphide"
        | "turbidity"
      > = {
        date: o.Date,
        site: o["Sample ID"] as string,
        nitrite: o.nitrite as number,
        nitrate: o.nitrate as number,
        ammonia: o.ammonia as number,
        sulphate: o.sulphate as number,
        phosphate: o.phosphate as number,
        sulphide: o.sulphide as number,
        turbidity: o.turbidity as number
      };
      return item;
    });

    /**
     * map RawProbeData to SiteData
     */
    const mappedProbeData = probeData.map((o) => {
      const item: Pick<
        SiteData,
        | "date"
        | "site"
        | "latitude"
        | "longitude"
        | "date"
        | "salinity"
        | "water_temperature"
        | "chlorophyll"
        | "phycoerythrin"
        | "ph"
        | "dissolved_oxygen"
      > = {
        site: o["site name"] as string,
        latitude: o["GPS Latitude"],
        longitude: o["GPS Longitude"],
        date: o.DATE,
        salinity: o["Sal (psu)"] as number,
        water_temperature: o["Temp (F)"] as number,
        chlorophyll: o["Chlorophyll (µg/L)"] as number,
        ph: o.pH as number,
        dissolved_oxygen: o["ODO (mg/L)"] as number,
        phycoerythrin: o["PE (ug/L)"] as number
      };
      return item;
    });

    let data: SiteData[] = [];

    const mergedData = [...mappedNutrientsData, ...mappedProbeData];

    mergedData.forEach((o) => {
      const base = mappedProbeData.find((p) => p.site === o.site);
      const nutrientsDataBySiteAndDate = mappedNutrientsData.find(
        (p) => p.site === o.site && p.date === o.date
      );
      const probeDataBySiteAndDate = mappedProbeData.find(
        (p) => p.site === o.site && p.date === o.date
      );

      let push = {};

      if (nutrientsDataBySiteAndDate) {
        push = { ...push, ...nutrientsDataBySiteAndDate };
      }

      if (probeDataBySiteAndDate) {
        push = { ...push, ...probeDataBySiteAndDate };
      }

      if (base) {
        push = { ...push, latitude: base.latitude, longitude: base.longitude };
      }

      // @ts-ignore
      data.push(push);
    });

    return res.status(200).json(data);
  } catch (err) {
    // @ts-ignore
    return res.status(500).json({ message: err.message });
  }
}
