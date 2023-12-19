import { Device, getDeviceData } from "lib/aqmd";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Device[]>
) {
  const { method, query } = req;
  if (method !== "GET")
    return res.status(405).end(`Method ${method} Not Allowed`);

  try {
    const data = await getDeviceData({
      sensorId: query.sensorId as string,
      startDate: query.startDate as string,
      endDate: query.endDate as string
    });
    return res.status(200).json(data);
  } catch (err) {
    // @ts-ignore
    return res.status(500).json({ message: err.message });
  }
}
