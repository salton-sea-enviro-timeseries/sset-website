import { getAeroqualDeviceData } from "lib/aeroqual";
import CookieManager from "lib/CookieManager";
import type { NextApiRequest, NextApiResponse } from "next";
import transformAeroqualData from "util/transformAeroqualData";

const credentials = {
  username: process.env.AQMD_AEROQUAL_USERNAME,
  password: process.env.AQMD_AEROQUAL_PASSWORD
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;
  if (method !== "GET")
    return res.status(405).end(`Method ${method} Not Allowed`);
  const sensorId = query.sensorId as string;
  try {
    const cookieManager = CookieManager.getInstance();
    const cookies = await cookieManager.getCookie(credentials);

    const data = await getAeroqualDeviceData({
      sensorId: query.sensorId as string,
      startDate: query.startDate as string,
      endDate: query.endDate as string,
      cookies
    });
    const reformatData = transformAeroqualData(data);
    return res.status(200).json(reformatData);
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error processing request for sensor: ${sensorId}`, err);
      return res.status(500).json({ message: err.message });
    } else {
      console.error(
        `An unexpected error occurred for sensor: ${sensorId}`,
        err
      );
      return res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
}
