import {
  OriginalData,
  TransformedData,
  getAeroqualDeviceData
} from "lib/aeroqual";
import _ from "lodash";
import { loginAndGetCookies } from "lib/loginAndGetCookies";
import type { NextApiRequest, NextApiResponse } from "next";

function ppmToPpb(ppm: number): number {
  return _.round(ppm * 1000, 2);
}

function transformData(originalData: OriginalData): TransformedData[] {
  if (!originalData.Instruments || originalData.Instruments.length === 0) {
    return [];
  }
  return originalData.Instruments.flatMap((instrument) =>
    instrument.Data.map((dataPoint) => {
      const h2s_ppb = dataPoint.Data.H2S
        ? ppmToPpb(dataPoint.Data.H2S)
        : dataPoint.Data.H2S;

      return {
        sn: instrument.Serial,
        timestamp_local: dataPoint.Time,
        H2S: h2s_ppb,
        NO2: dataPoint.Data.NO2,
        "VOC L": dataPoint.Data["VOC L"],
        "Battery voltage": dataPoint.Data["Battery voltage"]
      };
    })
  );
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;
  if (method !== "GET")
    return res.status(405).end(`Method ${method} Not Allowed`);

  try {
    const cookies = await loginAndGetCookies();
    const data = await getAeroqualDeviceData({
      sensorId: query.sensorId as string,
      startDate: query.startDate as string,
      endDate: query.endDate as string,
      cookies
    });
    const reformatData = transformData(data);
    return res.status(200).json(reformatData);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    } else {
      console.error("An unexpected error occurred:", err);
      return res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
}
