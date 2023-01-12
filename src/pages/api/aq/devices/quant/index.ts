import { getQuantDevice } from "lib/quant";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  if (method !== "GET")
    return res.status(405).end(`Method ${method} Not Allowed`);

  try {
    const {
      "geo.lat": Latitude,
      "geo.lon": Longitude,
      sn,
      timestamp_local: WorkingStatus
    } = await getQuantDevice();

    return res.status(200).json({
      Latitude,
      Longitude,
      DeviceId: sn,
      WorkingStatus: WorkingStatus ? "Working-Quant" : "Not Working-Quant"
    });
  } catch (err) {
    // @ts-ignore
    return res.status(500).json({ message: err.message });
  }
}
