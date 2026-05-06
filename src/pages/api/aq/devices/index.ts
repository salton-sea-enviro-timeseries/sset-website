// src/pages/api/aq/devices/index.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { getAqDevices } from "@/lib/queries/aq/devices";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const devices = await getAqDevices();

    return res.status(200).json({
      count: devices.length,
      data: devices
    });
  } catch (error) {
    console.error("Failed to fetch AQ devices:", error);

    return res.status(500).json({
      error: "Failed to fetch AQ devices"
    });
  }
}
