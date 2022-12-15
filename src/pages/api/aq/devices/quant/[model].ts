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
      "geo.lat": Longitude,
      "geo.lon": Latitude,
      "met.rh": RH,
      "met.temp": Temp,
      "model.pm.pm1": Model_PM_PM1,
      "model.pm.pm10": Model_PM_PM10,
      pm1: PM1,
      pm10: PM10,
      pm25: PM2_5,
      sn,
      timestamp,
      timestamp_local,
      url
    } = await getQuantDevice();
    return res.status(200).json({
      Longitude,
      Latitude,
      RH,
      Temp,
      Model_PM_PM1,
      Model_PM_PM10,
      PM1,
      PM10,
      PM2_5,
      sn,
      timestamp,
      timestamp_local,
      url
    });
  } catch (err) {
    // @ts-ignore
    return res.status(500).json({ message: err.message });
  }
}
