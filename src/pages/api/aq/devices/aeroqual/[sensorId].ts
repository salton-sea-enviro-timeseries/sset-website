// pages/api/aq/devices/aeroqual/[sensorId].ts

import type { NextApiRequest, NextApiResponse } from "next";
import CookieManager from "lib/CookieManager";
import {
  fetchAeroqualDeviceData,
  cleanAeroqualData,
  normalizeAeroqualData
} from "@/lib/data-pipeline/aq/aeroqual";

const credentials = {
  username: process.env.AEROQUAL_USERNAME,
  password: process.env.AEROQUAL_PASSWORD
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;

  if (method !== "GET") {
    return res.status(405).end(`Method ${method} Not Allowed`);
  }

  try {
    const sensorId = query.sensorId as string;
    const startDate = query.startDate as string | undefined;
    const endDate = query.endDate as string | undefined;

    const cookieManager = CookieManager.getInstance();
    const cookies = await cookieManager.getCookie(credentials);

    const rawData = await fetchAeroqualDeviceData({
      sensorId,
      startDate,
      endDate,
      cookies
    });

    const cleanedData = cleanAeroqualData(rawData);
    const normalizedData = normalizeAeroqualData(cleanedData);

    return res.status(200).json(normalizedData);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }

    console.error("An unexpected error occurred:", err);
    return res.status(500).json({ message: "An unexpected error occurred" });
  }
}
