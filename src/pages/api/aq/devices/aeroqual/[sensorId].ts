import {
  OriginalData,
  TransformedData,
  getAeroqualDeviceData
} from "lib/aeroqual";
import type { NextApiRequest, NextApiResponse } from "next";
import { getCookies } from "util/getCookies";
function transformData(originalData: OriginalData): TransformedData[] {
  if (!originalData.Instruments || originalData.Instruments.length === 0) {
    return [];
  }
  return originalData.Instruments.flatMap((instrument) =>
    instrument.Data.map((dataPoint) => ({
      sn: instrument.Serial,
      timestamp_local: dataPoint.Time,
      ...dataPoint.Data
    }))
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
    const cookies = await getCookies(req, "aq_auth");
    if (cookies) {
      res.setHeader("set-cookie", cookies);
    }
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
