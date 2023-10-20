import ApiResponse, { getQuantDevice } from "lib/quant";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;

  if (method !== "GET")
    return res.status(405).end(`Method ${method} Not Allowed`);

  try {
    const result: ApiResponse = await getQuantDevice(
      query.startDate as string,
      query.endDate as string
    );
    if (result.error) {
      console.warn(result.error);
      return res.status(200).json([]);
    }
    const device = result.data || [];
    const filteredData = device.filter(
      (entry) => entry["geo.lon"] && entry["geo.lat"]
    );

    return res.status(200).json(
      filteredData.map(
        ({
          "geo.lat": Longitude,
          "geo.lon": Latitude,
          "met.rh": RH,
          "met.temp": Temp,
          "model.pm.pm1": Model_PM_PM1,
          "model.pm.pm10": Model_PM_PM10,
          pm1: PM1,
          pm10: PM10,
          pm25,
          co: CO,
          no2: NO2,
          o3: O3,
          sn,
          timestamp,
          timestamp_local,
          url
        }) => {
          return {
            Longitude,
            Latitude,
            RH,
            Temp,
            Model_PM_PM1,
            Model_PM_PM10,
            PM1,
            PM10,
            "PM2.5": pm25,
            CO,
            NO2,
            O3,
            sn,
            timestamp,
            timestamp_local,
            url
          };
        }
      )
    );
  } catch (err) {
    // @ts-ignore
    return res.status(500).json({ message: err.message });
  }
}
